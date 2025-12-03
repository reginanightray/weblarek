import { FormDefault } from "./FormDefault";
import { ICustomer } from "../../types";
import { TPayment } from "../../types";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class FormContacts extends FormDefault {
  emailElement: HTMLInputElement;
  phoneElement: HTMLInputElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.emailElement = ensureElement<HTMLInputElement>(".form__input[name='email']");
    this.phoneElement = ensureElement<HTMLInputElement>(".form__input[name='phone']");
    this.phoneElement.addEventListener('input', () =>
      this.events.emit("input: phone")
    );
    this.emailElement.addEventListener('input', () =>
      this.events.emit("input: email")
    );
  }

  set email (email: string) {
    this.emailElement.value= email;
  }

  set phone (phone: string) {
    this.phoneElement.value = phone;
  }

}