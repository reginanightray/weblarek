import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IProduct } from "../../types";
import { actions } from "../../utils/actions";



export class Modal extends Component<IProduct> {
  modalContent: HTMLElement;
  closeButton: HTMLElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.modalContent = ensureElement<HTMLElement>(".modal__content", this.container);
    this.closeButton = ensureElement<HTMLElement>(".modal__close", this.container);
    this.closeButton.addEventListener("click", () => {
      this.events.emit(actions.CART_CLOSE, this.container);
      console.log("Close button clicked");
    })
  }

  set content(modalElement: HTMLElement) {
    this.modalContent.replaceChildren(modalElement);
  };
//content: HTMLElement
  open(content: HTMLElement) {
    this.modalContent.replaceChildren(content);
    this.container.classList.add('modal_active');
  };

  close() {
    this.modalContent.replaceChildren();
    this.container.classList.remove("modal_active");
  };
}