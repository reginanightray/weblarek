import { CardDefault } from "./CardDefault";
import { IEvents } from "../base/Events"; 
import { ensureElement } from "../../utils/utils";

export class CardCart extends CardDefault {
  indexElement: HTMLElement;
  deleteButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.indexElement = ensureElement<HTMLElement>(".basket__item-index", this.container);
    this.deleteButton = ensureElement<HTMLButtonElement>(".basket__item-delete", this.container);
    this.deleteButton.addEventListener("click", () => {
      this.events.emit("item: delete");
      console.log('item delete');
    });
  }

  set index(value: number) {
    this.indexElement.textContent = value.toString();
  }
}