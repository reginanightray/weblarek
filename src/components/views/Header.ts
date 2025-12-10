import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { actions } from "../../utils/actions";

interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
  protected counterElement: HTMLElement;
  protected basketButton: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.counterElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container
    );
    this.basketButton = ensureElement<HTMLElement>(
      ".header__basket",
      this.container
    );

    this.basketButton.addEventListener("click", () => {
      this.events.emit(actions.CART_OPEN);
      console.log("basket is opened");
    });
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}
