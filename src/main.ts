import "./scss/styles.scss";
import { Cart } from "./components/Models/Cart";
import { Customer } from "./components/Models/Customer";
import { Product } from "./components/Models/Product";
import { apiProducts } from "../src/utils/data";
import { ICustomer, IProduct } from "./types";
import { ApiService } from "./components/Models/ApiService";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";
import { IOrder } from "./types";
import { Header } from "./components/views/Header";
import { EventEmitter } from "./components/base/Events";
import { Gallery } from "./components/views/Gallery";
import { CardCatalog } from "./components/views/CardCatalog";
import { IEvents } from "./components/base/Events";
import { Modal } from "./components/views/Modal";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Cart as CartLayout } from "./components/views/Cart";
import { CardCart } from "./components/views/CardCart";
import { Confirmation } from "./components/views/Confirmation";
import { CardPreview } from "./components/views/CardPreview";
import { FormOrder } from "./components/views/FormOrder";
import { FormContacts } from "./components/views/FormContacts";
import { actions } from "./utils/actions";
import { CDN_URL } from "./utils/constants";

//инициализация серверной части

const newApi = new Api(API_URL);
const newApiService = new ApiService(newApi);

//брокер событий
const events = new EventEmitter();

//модели данных
const productModel = new Product(events);
const customerModel = new Customer();
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
})

//корзинка
const cart = new CartLayout(events, cloneTemplate("#basket"))

// карточка-превью 
const previewCard = new CardPreview(events, cloneTemplate("#card-preview"));
//карточки товаров
events.on(actions.PRODUCT_RECIEVED, () => {
  const itemsCards = productModel.getItem().map((item) => {
    const card = new CardCatalog(cloneTemplate("#card-catalog"), {
      onClick: () => events.emit(actions.CARD_OPEN, item)
    });
    return card.render(item);
  });
  gallery.catalog = itemsCards; 
});

//открытие корзины
events.on(actions.CART_OPEN, () => {
  modal.open(cart.render());
})

//подробные карточки
events.on(actions.CARD_OPEN, (card: IProduct) => {
  
  if (cartModel.isAvailable(card.id)) {
    previewCard.buttonText = "Удалить из корзины"
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
  console.log(productModel.getSelectedItem());
  }
);
/*
events.on(actions.PRODUCT_CLICKED, () => {
  const item = productModel.getSelectedItem();
  console.log(item);
  if (item) {
    if (cartModel.isAvailable(item.id)){
      cartModel.removeFromCart(item.id);
    } else {
      cartModel.addToCart(item);
    }
  }
})
*/
/*
//карточки товаров 
//рендерим карточки
const catalogCardList = items.map(item => {
  const catalogCartView = cloneTemplate("#card-catalog");
  galleryElement.appendChild(catalogCartView);
  const catalogCard = new CardCatalog(events, catalogCartView);
  catalogCard.render(item);
  return catalogCard;
});
console.log(catalogCardList)



//корзина

//подтверждение заказа
const confirmationElement = cloneTemplate("#success");
modal.content = confirmationElement; 

const confirmation = new Confirmation(events, confirmationElement);
confirmation.totalCost = 1000000;

//подробная карточка
const previewCardElement = cloneTemplate("#card-preview");
modal.content = previewCardElement;
const previewCard = new CardPreview(events, previewCardElement);
previewCard.render(items[1]);

//Первая форма оформления заказа
const formOrderElement = cloneTemplate("#order");
modal.content = formOrderElement
const formOrder = new FormOrder(events, formOrderElement);

formOrder.address = "улицаПушкина" ;
formOrder.isButtonDisabled = false;
formOrder.payment = "card";

//Вторая форма оформления заказа (ввода контактных данных)
const formContactsElement = cloneTemplate("#contacts");
modal.content = formContactsElement;
const formContacts = new FormContacts(events, formContactsElement);
formContacts.email = "pushkin@mail.ru";
formContacts.phone = "79991307877"
formContacts.isButtonDisabled = false;

modal.close();*/
