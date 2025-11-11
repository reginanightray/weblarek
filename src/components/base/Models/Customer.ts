import { ICustomer } from "../../../types/index.ts";

export class Customer {
  private customerInfo: ICustomer = {
    payment: null,
    email: null,
    phone: null,
    address: null,
  };

  setCustomerInfo(customerInfo: ICustomer): void {
    this.customerInfo.payment = customerInfo.payment;
    this.customerInfo.email = customerInfo.email;
    this.customerInfo.address = customerInfo.address;
    this.customerInfo.phone = customerInfo.phone;
  }

  getCustomerInfo(): ICustomer {
    return this.customerInfo;
  }

  eraseCustomerInfo(): void {
    //очистка данных покупателя;
    this.customerInfo = {
      payment: null,
      email: null,
      phone: null,
      address: null,
    };
  }

  isCorrect(): { [key in keyof ICustomer]?: string } {
    //валидация данных.
    let errors: { [key in keyof ICustomer]?: string } = {};
    if (!this.customerInfo.payment) {
      errors.payment = "Не выбран тип оплаты";
    }
    if (!this.customerInfo.email) {
      errors.email = "Не указан email-адрес";
    }
    if (!this.customerInfo.address) {
      errors.address = "Не указан адрес покупателя";
    }
    if (!this.customerInfo.phone) {
      errors.phone = "Не указан номер телефона";
    }

    return errors;
  }
}

export default Customer;
