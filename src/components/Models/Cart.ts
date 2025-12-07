import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";
import { actions } from "../../utils/actions.ts";

export class Cart {
  private addedProduct: IProduct[] = [];

  constructor(private events: IEvents) {
      this.events = events;
    }

  getItems(): IProduct[] {
    return this.addedProduct;
  }

  addToCart(addedProduct: IProduct): void {
    this.addedProduct.push(addedProduct);
    this.events.emit(actions.PRODUCT_CLICKED);
  }

  removeFromCart(productID: string): void {
    this.addedProduct = this.addedProduct.filter(
      (product) => product.id !== productID
    );
    this.events.emit(actions.PRODUCT_CLICKED);
  }

  removeAllItems(): void {
    this.addedProduct = [];
  }

  getTotalCost(): number {
    return this.addedProduct.reduce(
      (total, product) =>
        typeof product.price === "number" ? total + product.price : total,
      0
    );
  }

  getAmountOfItems(): number {
    return this.addedProduct.length;
  }

  isAvailable(productID: string): boolean {
    return this.addedProduct.some((product) => product.id === productID);
  }
}

export default Cart;
