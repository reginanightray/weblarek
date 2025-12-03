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
import { Cart as CartLayout} from "./components/views/Cart"
import { CardCart } from "./components/views/CardCart";
import { Confirmation } from "./components/views/Confirmation";
import { CardPreview } from "./components/views/CardPreview";
import { FormOrder } from "./components/views/FormOrder";
import { FormContacts } from "./components/views/FormContacts";

//инициализация серверной части

const newApi = new Api(API_URL);
const newApiService = new ApiService(newApi);

const events = new EventEmitter();

//инициализация списка товаров
const data = apiProducts;
const items = data.items;

//проверка классов представления
const headerElement = document.querySelector('.header') as HTMLElement;
const header = new Header(events, headerElement !);
header.counter = 5;

const galleryElement = document.querySelector('.gallery') as HTMLElement;
const gallery = new Gallery(events, galleryElement !);

const modalElement = document.querySelector(".modal") as HTMLElement;
const modal = new Modal(events, modalElement !);

const confirmationElement = cloneTemplate("#success");
console.log(confirmationElement);
modal.content = confirmationElement; 

const confirmation = new Confirmation(events, confirmationElement);
confirmation.totalCost = 1000000;

const previewCardElement = cloneTemplate("#card-preview");

modal.content = previewCardElement;

const previewCard = new CardPreview(events, previewCardElement);
previewCard.render(items[1]);

const formOrderElement = cloneTemplate("#order");
modal.content = formOrderElement
const formOrder = new FormOrder(events, formOrderElement);

formOrder.address = "улицаПушкина" ;
formOrder.isButtonDisabled = false;
formOrder.payment = "card";

const formContactsElement = cloneTemplate("#contacts");
modal.content = formContactsElement;
const formContacts = new FormContacts(events, formContactsElement);

formContacts.email = "pushkin@mail.ru";
formContacts.phone = "79991307877"
formContacts.isButtonDisabled = false;