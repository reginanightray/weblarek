import { ICustomer } from "../../types";
import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export abstract class FormDefault extends Component<ICustomer> {
  submitButton: HTMLButtonElement;
  errorsElement: HTMLElement;
  constructor(container: HTMLElement){
    super(container);
    this.submitButton = ensureElement<HTMLButtonElement>(".button[type='submit']", this.container);
    this.errorsElement = ensureElement(".form__errors");
  }
  set isButtonDisabled(value: boolean) {
    this.submitButton.disabled = value;
  }

  set errorMessage(message: string) {
    this.errorsElement.textContent = message;
  }
}