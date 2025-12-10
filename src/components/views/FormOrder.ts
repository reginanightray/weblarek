import { FormDefault } from "./FormDefault";
import { TPayment } from "../../types";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { actions } from "../../utils/actions";

export class FormOrder extends FormDefault {
  cashButton: HTMLButtonElement;
  cardButton: HTMLButtonElement;
  addressElement: HTMLInputElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.cashButton = ensureElement<HTMLButtonElement>(
      ".button[name='cash']",
      this.container
    );
    this.cardButton = ensureElement<HTMLButtonElement>(
      ".button[name='card']",
      this.container
    );
    this.addressElement = ensureElement<HTMLInputElement>(
      ".form__input",
      this.container
    );
    this.cardButton.addEventListener("click", () => {
      this.events.emit(actions.PAYMENT_CHOOSEN, this.cardButton);
    });
    this.cashButton.addEventListener("click", () => {
      this.events.emit(actions.PAYMENT_CHOOSEN, this.cashButton);
    });
    this.addressElement.addEventListener("input", () => {
      this.events.emit(actions.ADDRESS_INPUT, this.addressElement);
    });
    this.container.addEventListener("submit", (e?: SubmitEvent) => {
      this.events.emit(actions.DATA_SUBMIT, e);
    });
  }

  set payment(value: TPayment) {
    this.cardButton.classList.toggle(
      "button_alt-active",
      this.cardButton.name === value
    );
    this.cashButton.classList.toggle(
      "button_alt-active",
      this.cashButton.name === value
    );
  }

  set address(value: string) {
    this.addressElement.value = value;
  }
}
