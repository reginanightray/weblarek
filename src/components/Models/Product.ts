import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";
import { actions } from "../../utils/actions.ts";

export class Product {
  protected items: IProduct[] = [];
  protected selectedItem: IProduct | null = null;
  constructor(private events: IEvents) {
    this.events = events;
  }

  setItem(items: IProduct[]): void {
    this.items = items;
    this.events.emit(actions.PRODUCT_RECIEVED, items);
  }

  getItem(): IProduct[] {
    return this.items;
  }

  getItemByID(id: string): IProduct | undefined {
    return this.items.find((item) => item.id === id);
  }

  setSelectedItem(chosenItem: IProduct | null): void {
    this.selectedItem = chosenItem;
  }

  getSelectedItem(): IProduct | null {
    return this.selectedItem;
  }
}

export default Product;
