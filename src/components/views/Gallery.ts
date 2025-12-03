//import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IProduct } from "../../types";

interface IGallery {
  cardList: IProduct[]
}

export class Gallery extends Component<IGallery> {
  constructor(protected Events: IEvents, container: HTMLElement) {
    super(container);
  }

  set catalog(cardList: HTMLElement[]) {
    this.container.replaceChildren(...cardList);
  }
}
