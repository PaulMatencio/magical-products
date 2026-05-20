import { IDomainEvent } from "../common/DomainEvents";
import { Order } from "../entities/Order";

export class OrderPlacedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public orderId: string;
  public shippingAddress: string;
  public totalPrice: number;

  constructor(order: Order) {
    this.dateTimeOccurred = new Date();
    this.orderId = order.id;
    this.shippingAddress = order.shippingAddress;
    this.totalPrice = order.totalPrice.value;
  }

  getAggregateId(): string {
    return this.orderId;
  }
}

