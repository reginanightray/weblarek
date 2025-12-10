import { FormDefault } from "./FormDefault";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { actions } from "../../utils/actions";

export class FormContacts extends FormDefault {
  emailElement: HTMLInputElement;
  phoneElement: HTMLInputElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.emailElement = ensureElement<HTMLInputElement>(
      ".form__input[name='email']",
      this.container
    );
    this.phoneElement = ensureElement<HTMLInputElement>(
      ".form__input[name='phone']",
      this.container
    );
    this.phoneElement.addEventListener("input", () =>
      this.events.emit(actions.PHONE_INPUT, this.phoneElement)
    );
    this.emailElement.addEventListener("input", () =>
      this.events.emit(actions.EMAIL_INPUT, this.emailElement)
    );
    this.container.addEventListener("submit", (e?: SubmitEvent) => {
      this.events.emit(actions.DATA_SUBMIT, e);
      this.events.emit(actions.CONFIRM_ORDER, e);
    });
  }

  set email(email: string) {
    this.emailElement.value = email;
  }

  set phone(phone: string) {
    this.phoneElement.value = phone;
  }
}
