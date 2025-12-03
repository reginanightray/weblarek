import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardCatalog } from "./CardCatalog";
import { IProduct } from "../../types";

export class CardPreview extends CardCatalog {
  descriptionElement: HTMLElement;
  cardButton: HTMLButtonElement;
  constructor(events: IEvents, container: HTMLElement) {
    super(events, container);
    this.descriptionElement = ensureElement(".card__text", this.container);
    this.cardButton = ensureElement<HTMLButtonElement>(".card__button", this.container);
    this.cardButton.addEventListener("click", () => {
      this.events.emit("button: clicked");
      console.log("button: clicked")
    })
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

  render(data: Partial<IProduct>) : HTMLElement {
    super.render(data);
    if (data.description !== undefined) this.description = data.description;
    return this.container
  }

}
