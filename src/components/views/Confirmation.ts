import { Component } from "../base/Component";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { actions } from "../../utils/actions";

export class Confirmation extends Component<IProduct> {
  totalCostElement: HTMLElement;
  closeButton: HTMLButtonElement;
  constructor(private events: IEvents, container: HTMLElement) {
    super(container);
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container
    );
    this.totalCostElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container
    );
    this.closeButton.addEventListener("click", () => {
      this.events.emit(actions.ORDER_COMPLETED);
    });
  }

  set total(value: number) {
    this.totalCostElement.textContent = `Списано ${value} синапсов`;
  }
}
