import { ApiPostMethods, IApi, IProduct } from "../../../types/index.ts";

export class ApiService {
  private Api: IApi;

  constructor(Api: IApi) {
    this.Api = Api;
  }

  async get(): Promise<IProduct[]> {
    try {
      const data = await this.Api.get<{ items: IProduct[] }>("/product");
      return data.items;
    } catch (error) {
      console.log("Ошибка получения данных: ", error);
      return [];
    }
  }

  async post(order: Object): Promise<boolean> {
    try {
      await this.Api.post("/order", order, "POST" as ApiPostMethods);
      return true;
    } catch (error) {
      console.log("Ошибка отправки данных на сервер");
      return false;
    }
  }
}

export default ApiService;
