import { Component } from "../base/Component";
import { IProduct } from "../../types/index";
import { ensureElement } from "../../utils/utils";

export abstract class CardDefault extends Component<IProduct> {
  protected title: HTMLElement;
  protected price: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.title = ensureElement<HTMLElement>(".card__title", this.container);
    this.price = ensureElement<HTMLElement>(".card__price", this.container);
  }

  set titleValue(value: string) {
    if (this.title) {
      this.title.textContent = value;
    }
  }

  set priceValue(value: number | null) {
    if (this.price) {
      this.price.textContent =
        value === null ? `Бесценно` : `${value} синапсов`;
    }
  }

  render(data: Partial<IProduct>): HTMLElement {
    if (data.title !== undefined) {
      this.titleValue = data.title;
    }
    if (data.price !== undefined) {
      this.priceValue = data.price;
    }
    return this.container;
  }
}
