import { FormDefault } from "./FormDefault";
import { ICustomer } from "../../types";
import { TPayment } from "../../types";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class FormOrder extends FormDefault {
  cashButton: HTMLButtonElement;
  cardButton: HTMLButtonElement;
  addressElement: HTMLInputElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.cashButton = ensureElement<HTMLButtonElement>(".button[name='cash']", this.container);
    this.cardButton = ensureElement<HTMLButtonElement>(".button[name='card']", this.container);
    this.addressElement = ensureElement<HTMLInputElement>(".form__input"), this.container;
    this.cashButton.addEventListener("click", () => {
      this.events.emit("cash: choosen");
    });
    this.cardButton.addEventListener("click", () => {
      this.events.emit("card: choosen");
    });
    this.cashButton.addEventListener("click", () => {
      this.events.emit("cash: choosen");
    });
    this.addressElement.addEventListener("input", () => {
      this.events.emit("input: adress");
    });
    this.submitButton.addEventListener("submit", () => {
      this.events.emit("submit: data");
    });
  }

  set payment(value: TPayment) {
    this.cardButton.classList.toggle('button_alt-active', this.cardButton.name === value);
    this.cashButton.classList.toggle('button_alt-active', this.cashButton.name === value);
  };

  set address(value: string) {
    this.addressElement.value = value;
  }

}