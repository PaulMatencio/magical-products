import { IDomainEvent } from "../common/DomainEvents";
import { Order } from "../entities/Order";
import { TraceContext } from "../common/TraceContext";

export class OrderPlacedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public correlationId: string;
  public orderId: string;
  public shippingAddress: string;
  public totalPrice: number;

  constructor(order: Order) {
    this.dateTimeOccurred = new Date();
    this.correlationId = TraceContext.getCorrelationId();
    this.orderId = order.id;
    this.shippingAddress = order.shippingAddress;
    this.totalPrice = order.totalPrice.value;
  }

  getAggregateId(): string {
    return this.orderId;
  }
}

