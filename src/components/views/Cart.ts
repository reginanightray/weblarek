import { IEvents } from "../base/Events";
import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { actions } from "../../utils/actions";

interface IBasket {
  listItems: HTMLElement[];
  totalPrice: number;
  isToOrderButtonDisabled: boolean;
}

export class Cart extends Component<IBasket> {
  totalElement: HTMLElement;
  toOrderButton: HTMLButtonElement;
  cartList: HTMLElement;
  constructor(private events: IEvents, container: HTMLElement) {
    super(container);
    this.totalElement = ensureElement(".basket__price", this.container);
    this.toOrderButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );
    this.cartList = ensureElement(".basket__list", this.container);
    this.toOrderButton.disabled = true;
    this.toOrderButton.addEventListener("click", () => {
      this.events.emit(actions.MAKE_ORDER);
    });
  }
  set isToOrderButtonDisabled(value: boolean) {
    this.toOrderButton.disabled = value;
  }

  set listItems(list: HTMLElement[]) {
    this.cartList.replaceChildren(...list);
  }

  set totalPrice(price: number) {
    this.totalElement.textContent = `${price} синапсов`;
  }
}
