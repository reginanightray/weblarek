import { CardDefault } from "./CardDefault";
import { ensureElement } from "../../utils/utils";
import { ICardActions } from "../../types";

export class CardCart extends CardDefault {
  indexElement: HTMLElement;
  deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, events?: ICardActions) {
    super(container);
    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container
    );
    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container
    );
    this.deleteButton.addEventListener("click", () => {
      if (events?.onClick) {
        this.container.addEventListener("click", events.onClick);
      }
    });
  }

  set index(value: number) {
    this.indexElement.textContent = value.toString();
  }
}
