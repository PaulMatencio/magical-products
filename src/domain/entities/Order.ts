import { AggregateRoot } from "../common/AggregateRoot";
import { Price } from "../value-objects/Price";
import { Phone } from "../value-objects/Phone";
import { CartItem } from "../../types/types";
import { OrderPlacedEvent } from "../events/OrderPlacedEvent";

interface OrderProps {
  items: CartItem[];
  totalPrice: Price;
  status: 'pending' | 'ready' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  isGuest: boolean;
  userPhone?: Phone;
  userId?: string;
  userEmail?: string;
  createdAt: Date;
  statusHistory?: Record<string, string>;
  paymentId?: string | null;
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
    paymentMethod: string,
    isGuest: boolean,
    userPhone?: string,
    userId?: string,
    userEmail?: string,
    id?: string,
    paymentId?: string | null
  ): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const order = new Order({
      items,
      totalPrice: Price.create(totalPrice),
      status: 'pending',
      shippingAddress,
      paymentMethod,
      isGuest,
      userPhone: userPhone ? Phone.create(userPhone) : undefined,
      userId,
      userEmail,
      createdAt: new Date(),
      statusHistory: { pending: new Date().toISOString() },
      paymentId
    }, id || crypto.randomUUID());

    // Record the event
    order.addDomainEvent(new OrderPlacedEvent(order));

    return order;
  }

  /**
   * Reconstructs an existing order from persistent store.
   */
  public static reconstruct(
    id: string,
    items: CartItem[],
    totalPrice: number,
    status: 'pending' | 'ready' | 'shipped' | 'delivered' | 'cancelled',
    shippingAddress: string,
    paymentMethod: string,
    isGuest: boolean,
    createdAt: Date,
    userPhone?: string,
    userId?: string,
    userEmail?: string,
    statusHistory?: Record<string, string>,
    paymentId?: string | null
  ): Order {
    return new Order({
      items,
      totalPrice: Price.create(totalPrice),
      status,
      shippingAddress,
      paymentMethod,
      isGuest,
      userPhone: userPhone ? Phone.create(userPhone) : undefined,
      userId,
      userEmail,
      createdAt,
      statusHistory,
      paymentId
    }, id);
  }

  // Domain Logic: Transitioning status
  public markAsReady(): void {
    if (this.props.status !== 'pending') {
      throw new Error("Only pending orders can be marked as ready");
    }
    this.props.status = 'ready';
    if (this.props.statusHistory) {
      this.props.statusHistory.ready = new Date().toISOString();
    }
  }

  public ship(): void {
    if (this.props.status !== 'ready') {
      throw new Error("Order must be ready before it can be shipped");
    }
    this.props.status = 'shipped';
    if (this.props.statusHistory) {
      this.props.statusHistory.shipped = new Date().toISOString();
    }
  }

  public deliver(): void {
    if (this.props.status !== 'shipped') {
      throw new Error("Order must be shipped before it can be delivered");
    }
    this.props.status = 'delivered';
    if (this.props.statusHistory) {
      this.props.statusHistory.delivered = new Date().toISOString();
    }
  }

  public cancel(): void {
    if (this.props.status === 'delivered') {
      throw new Error("Delivered orders cannot be cancelled");
    }
    this.props.status = 'cancelled';
    if (this.props.statusHistory) {
      this.props.statusHistory.cancelled = new Date().toISOString();
    }
  }

  // Getters
  get status() { return this.props.status; }
  get items() { return this.props.items; }
  get totalPrice() { return this.props.totalPrice; }
  get shippingAddress() { return this.props.shippingAddress; }
  get paymentMethod() { return this.props.paymentMethod; }
  get isGuest() { return this.props.isGuest; }
  get createdAt() { return this.props.createdAt; }
  get userPhone() { return this.props.userPhone; }
  get userId() { return this.props.userId; }
  get userEmail() { return this.props.userEmail; }
  get statusHistory() { return this.props.statusHistory; }
  get paymentId() { return this.props.paymentId; }
}
