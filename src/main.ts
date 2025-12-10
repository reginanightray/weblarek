import "./scss/styles.scss";
import { Cart } from "./components/Models/Cart";
import { Customer } from "./components/Models/Customer";
import { Product } from "./components/Models/Product";
import { ICustomer, IProduct, TPayment } from "./types";
import { ApiService } from "./components/Models/ApiService";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";
import { IOrder } from "./types";
import { Header } from "./components/views/Header";
import { EventEmitter } from "./components/base/Events";
import { Gallery } from "./components/views/Gallery";
import { CardCatalog } from "./components/views/CardCatalog";
import { Modal } from "./components/views/Modal";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Cart as CartLayout } from "./components/views/Cart";
import { CardCart } from "./components/views/CardCart";
import { Confirmation } from "./components/views/Confirmation";
import { CardPreview } from "./components/views/CardPreview";
import { FormOrder } from "./components/views/FormOrder";
import { FormContacts } from "./components/views/FormContacts";
import { actions } from "./utils/actions";

//инициализация серверной части

const newApi = new Api(API_URL);
const newApiService = new ApiService(newApi);

//брокер событий
const events = new EventEmitter();

//модели данных
const productModel = new Product(events);
const customerModel = new Customer(events);
const cartModel = new Cart(events);

//вызов данных с сервера
newApiService
  .getProducts()
  .then((products) => {
    productModel.setItem(products);
  })
  .catch((error) =>
    console.error("Ошибка при загрузке товаров из каталога API:", error)
  );

//шапка
const headerElement = ensureElement(".header");
const header = new Header(events, headerElement);

//галерея с карточками товаров
const galleryElement = ensureElement(".gallery");
const gallery = new Gallery(events, galleryElement);

//модальное окно
const modalElement = ensureElement(".modal");
const modal = new Modal(events, modalElement);
events.on(actions.MODAL_CLOSE, () => {
  modal.close();
});

//корзинка
const cart = new CartLayout(events, cloneTemplate("#basket"));

//форма 1
const formOrder = new FormOrder(events, cloneTemplate("#order"));

//форма 2
const formContacts = new FormContacts(events, cloneTemplate("#contacts"));

//успешно
const confirmation = new Confirmation(events, cloneTemplate("#success"));

// карточка-превью
const previewCard = new CardPreview(events, cloneTemplate("#card-preview"));

//карточки товаров
events.on(actions.PRODUCT_RECIEVED, () => {
  const itemsCards = productModel.getItem().map((item) => {
    const card = new CardCatalog(cloneTemplate("#card-catalog"), {
      onClick: () => events.emit(actions.CARD_OPEN, item),
    });
    return card.render(item);
  });
  gallery.catalog = itemsCards;
});

//открытие корзины
events.on(actions.CART_OPEN, () => {
  modal.open(cart.render());
});

//подробные карточки
events.on(actions.CARD_OPEN, (card: IProduct) => {
  if (cartModel.isAvailable(card.id)) {
    previewCard.buttonText = "Удалить из корзины";
  } else {
    previewCard.buttonText = "Купить";
  }

  if (!card.price) {
    previewCard.buttonText = "Недоступно";
    previewCard.isButtonDisabled = true;
  } else {
    previewCard.isButtonDisabled = false;
  }

  modal.open(previewCard.render(card));
  productModel.setSelectedItem(card);
});

//кнопка добавления/удаления из корзины
events.on(actions.CARD_BUTTON_CLICKED, () => {
  const item = productModel.getSelectedItem();
  if (item) {
    if (cartModel.isAvailable(item.id)) {
      cartModel.removeFromCart(item.id);
    } else {
      cartModel.addToCart(item);
    }
  }
  modal.close();
});

//обновляем корзинку
events.on(actions.CART_UPDATE, () => {
  const cartList = cartModel.getItems().map((item, index) => {
    const cartItem = new CardCart(cloneTemplate("#card-basket"), {
      onClick: () => {
        events.emit(actions.CART_ITEM_REMOVE, item);
      },
    });
    cartItem.index = index + 1;
    return cartItem.render(item);
  });
  const cartData = {
    listItems: cartList,
    totalPrice: cartModel.getTotalCost(),
    isToOrderButtonDisabled: cartList.length === 0,
  };
  cart.render(cartData);
  header.render({ counter: cartModel.getAmountOfItems() });
});

//удаление товара их корзины
events.on(actions.CART_ITEM_REMOVE, (item: IProduct) => {
  cartModel.removeFromCart(item.id);
  header.render({ counter: cartModel.getAmountOfItems() });
});

//переход к первой форме заказа
events.on(actions.MAKE_ORDER, () => {
  modal.content = formOrder.render(customerModel.getCustomerInfo());
  events.emit(actions.CUSTOMER_UPDATE);
});

//переход ко второй форме заказа
events.on(actions.DATA_SUBMIT, (e: SubmitEvent) => {
  e.preventDefault();
  modal.content = formContacts.render(customerModel.getCustomerInfo());
});

//выбор способа оплаты
events.on(actions.PAYMENT_CHOOSEN, (button: HTMLButtonElement) => {
  formOrder.payment = button.name as TPayment;
  customerModel.setCustomerInfo({ payment: button.name as TPayment });
});

//введение адреса
events.on(actions.ADDRESS_INPUT, (addresInput: HTMLInputElement) => {
  customerModel.setCustomerInfo({ address: addresInput.value });
});

//введение телефона
events.on(actions.PHONE_INPUT, (phoneInput: HTMLInputElement) => {
  customerModel.setCustomerInfo({ phone: phoneInput.value });
});

//введение email
events.on(actions.EMAIL_INPUT, (emailInput: HTMLInputElement) => {
  customerModel.setCustomerInfo({ email: emailInput.value });
});

//обработка введенных данных пользователя
events.on(actions.CUSTOMER_UPDATE, () => {
  const validationResult = customerModel.isCorrect();
  const buyerData = customerModel.getCustomerInfo();
  if (buyerData.address && buyerData.payment) {
    formOrder.isButtonDisabled = false;
    formOrder.errorMessage = "";
  } else {
    formOrder.isButtonDisabled = true;
    formOrder.errorMessage = `${validationResult.payment ?? ""} ${
      validationResult.address ?? ""
    }`;
  }
  if (buyerData.phone && buyerData.email) {
    formContacts.isButtonDisabled = false;
    formContacts.errorMessage = "";
  } else {
    formContacts.isButtonDisabled = true;
    formContacts.errorMessage = `${validationResult.phone ?? ""} ${
      validationResult.email ?? ""
    }`;
  }
});

//отправка заказа и рендер подтверждающего окна
events.on(actions.CONFIRM_ORDER, (e: SubmitEvent) => {
  e.preventDefault();
  const orderData: IOrder = {
    ...customerModel.getCustomerInfo(),
    total: cartModel.getTotalCost(),
    items: cartModel.getItems().map((item) => item.id),
  };
  newApiService
    .postOrder(orderData)
    .then((response) => {
      const orderData = response;
      modal.content = confirmation.render(orderData);
      cartModel.removeAllItems();
      customerModel.eraseCustomerInfo();
    })
    .catch((error) => {
      console.log("Ошибка отправки заказа", error);
    });
});

//очистка корзины и поля покупателя после завершения покупки
events.on(actions.ORDER_COMPLETED, () => {
  modal.close();
});
