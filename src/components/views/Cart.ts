import { IEvents } from "../base/Events";
import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IBasket {
  listItems: [];
  totalPrice: number;
  isToOrderButtonDisabled: boolean;
}

export class Cart extends Component<IBasket> {
  totalElement: HTMLElement;
  toOrderButton: HTMLButtonElement;
  constructor(private events: IEvents, container: HTMLElement) {
    super(container);
    this.totalElement = ensureElement(".basket__price", this.container);
    this.toOrderButton = ensureElement<HTMLButtonElement>(".basket__button", this.container);
    this.toOrderButton.disabled = true
    this.toOrderButton.addEventListener('click',() => {
      this.events.emit("orderButton: clicked");
    });
  }
  set isToOrderButtonDisabled(value: boolean) {
    this.toOrderButton.disabled = value;
  }

  set listItems(list: HTMLElement[]) {
    this.container.replaceChildren(...list);
  }

  set totalPrice (price: number) {
    this.totalElement.textContent = `${price} синапсов`
  }
}

