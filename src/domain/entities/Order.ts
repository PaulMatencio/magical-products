import { AggregateRoot } from "../common/AggregateRoot";
import { Price } from "../value-objects/Price";
import { Phone } from "../value-objects/Phone";
import { CartItem } from "../../types/types";
import { OrderPlacedEvent } from "../events/OrderPlacedEvent";

interface OrderProps {
  items: CartItem[];
  totalPrice: Price;
  status: 'pending' | 'ready' | 'shipped' | 'delivered';
  shippingAddress: string;
  userPhone?: Phone;
  userId?: string;
  userEmail?: string;
  createdAt: Date;
}

/**
 * Order Aggregate Root.
 * Manages the consistency of an order and its items.
 */
export class Order extends AggregateRoot<OrderProps> {
  private constructor(props: OrderProps, id?: string) {
    super(props, id);
  }

  /**
   * Factory method to create a new Order with domain validation.
   */
  public static create(
    items: CartItem[],
    totalPrice: number,
    shippingAddress: string,
    userPhone?: string,
    userId?: string,
    userEmail?: string,
    id?: string
  ): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const order = new Order({
      items,
      totalPrice: Price.create(totalPrice),
      status: 'pending',
      shippingAddress,
      userPhone: userPhone ? Phone.create(userPhone) : undefined,
      userId,
      userEmail,
      createdAt: new Date()
    }, id || crypto.randomUUID());

    // Record the event
    order.addDomainEvent(new OrderPlacedEvent(order));

    return order;
  }


  // Domain Logic: Transitioning status
  public markAsReady(): void {
    if (this.props.status !== 'pending') {
      throw new Error("Only pending orders can be marked as ready");
    }
    this.props.status = 'ready';
  }

  public ship(): void {
    if (this.props.status !== 'ready') {
      throw new Error("Order must be ready before it can be shipped");
    }
    this.props.status = 'shipped';
  }

  // Getters
  get status() { return this.props.status; }
  get items() { return this.props.items; }
  get totalPrice() { return this.props.totalPrice; }
  get shippingAddress() { return this.props.shippingAddress; }
}

