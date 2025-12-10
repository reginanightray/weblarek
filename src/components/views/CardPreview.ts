import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardCatalog } from "./CardCatalog";
import { IProduct } from "../../types";
import { actions } from "../../utils/actions";

export class CardPreview extends CardCatalog {
  descriptionElement: HTMLElement;
  cardButton: HTMLButtonElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.descriptionElement = ensureElement(".card__text", this.container);
    this.cardButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );
    this.cardButton.addEventListener("click", () => {
      this.events.emit(actions.CARD_BUTTON_CLICKED);
    });
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.cardButton.textContent = value;
  }

  set isButtonDisabled(value: boolean) {
    this.cardButton.disabled = value;
  }

  render(data: Partial<IProduct>): HTMLElement {
    super.render(data);
    if (data.description !== undefined) this.description = data.description;
    return this.container;
  }
}
