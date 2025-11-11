import "./scss/styles.scss";
import { Cart } from "./components/base/Models/Cart";
import { Customer } from "./components/base/Models/Customer";
import { Product } from "./components/base/Models/Product";
import { apiProducts } from "../src/utils/data";
import { ICustomer } from "./types";
import { ApiService } from "./components/base/Models/ApiService";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";

const newProduct = new Product();
const newCart = new Cart();
const newCustomer = new Customer();

//проверка методов Product

newProduct.setItem(apiProducts.items);
console.log("Массив товаров из каталога: ", newProduct.getItem());
console.log(
  "Товар, найденный по id: ",
  newProduct.getItemByID(apiProducts.items[3].id)
);
newProduct.setSelectedItem(apiProducts.items[1]);
console.log(
  "Товар, выбранный для подробного отображения",
  newProduct.getSelectedItem()
);

//проверка методов Cart

newCart.addToCart(apiProducts.items[0]);
newCart.addToCart(apiProducts.items[1]);
newCart.addToCart(apiProducts.items[2]);
console.log("Корзина выбранных товаров: ", newCart.getItems());
const removedItem = newCart.getItems()[0].id;
console.log("Из корзины удален", removedItem);
newCart.removeFromCart(removedItem);
console.log("Обновленная корзина", newCart.getItems());
console.log("Полная стоимость заказа: ", newCart.getTotalCost());
console.log("Всего в корзине: ", newCart.getAmountofItems());
const availableItem = apiProducts.items[0].id;
console.log(
  "Данный товар в корзине? ",
  newCart.isAvailable(availableItem) ? "да" : "нет"
);
console.log(
  "А этот? ",
  newCart.isAvailable(apiProducts.items[2].id) ? "да" : "нет"
);
console.log("Очистим всю корзину");
newCart.removeAllItems();
console.log("Теперь в нашей корзине лежит: ", newCart.getItems());

//Проверка методов Customer

const firstCustomer: ICustomer = {
  payment: "cash",
  email: "lady@mail.ru",
  phone: "88005553535",
  address: "Улица Пушкина, дом Колотушкина, квартира №5",
};

const secondCustomer: ICustomer = {
  email: "lady@mail.ru",
  phone: "88005553535",
};

newCustomer.setCustomerInfo(firstCustomer);
console.log("Новый покупатель", newCustomer.getCustomerInfo());
newCustomer.setCustomerInfo(secondCustomer);
console.log("Второй покупатель", newCustomer.getCustomerInfo());
console.log("Данные валидны?", newCustomer.isCorrect());
newCustomer.eraseCustomerInfo();
console.log("Удаляем данные пользователя");
console.log(
  "Теперь у пользователя видны следующие данные",
  newCustomer.getCustomerInfo()
);

//Проверка методов класса ApiService

const newApi = new Api(API_URL);
const newApiService = new ApiService(newApi);
let order: Object = { id: "28c57cb4-3002-4445-8aa1-2a06a5055ae5", total: 2200 };
console.log(newApiService.get());
console.log(newApiService.post(order));
