import { IApi, IProduct, IOrder } from "../../types/index.ts";

export class ApiService {
  private api: IApi;

  constructor(Api: IApi) {
    this.api = Api;
  }

  async get(): Promise<IProduct[]> {
    try {
      const data = await this.api.get<{ items: IProduct[] }>("/product");
      return data.items;
    } catch (error) {
      console.log("Ошибка получения данных: ", error);
      return [];
    }
  }

  async post(order: Object): Promise<IOrder> {
    try {
      return await this.api.post<IOrder>("/order", order);
    } catch (error) {
      console.log("Ошибка отправки данных на сервер");
      return await this.api.post<IOrder>("/order", order);
    }
  }
}

export default ApiService;
