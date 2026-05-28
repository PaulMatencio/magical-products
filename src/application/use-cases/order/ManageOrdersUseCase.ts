import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';
import { IEventRepository } from '../../../domain/repositories/IEventRepository';
import { Order as OrderDTO, CartItem, OrderItem } from '../../../types/types';
import { Order as OrderAggregate } from '../../../domain/entities/Order';
import { TraceContext } from '../../../domain/common/TraceContext';

export class ManageOrdersUseCase {
  constructor(
    private orderRepo: IOrderRepository,
    private eventRepo: IEventRepository
  ) {}

  private toDTO(order: OrderAggregate): OrderDTO {
    const items: OrderItem[] = order.items.map((item: any) => {
      if ('quantity' in item) {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image_url: item.image_url || '',
          discount_percentage: item.discount_percentage ?? 0
        };
      }
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.cart_quantity,
        image_url: item.image_url || '',
        discount_percentage: item.discount_percentage ?? 0
      };
    });

    return {
      id: order.id,
      created_at: order.createdAt.toISOString(),
      total_price: order.totalPrice.value,
      status: order.status as any,
      payment_method: order.paymentMethod,
      shipping_address: order.shippingAddress,
      items,
      is_guest: order.isGuest,
      user_phone: order.userPhone?.value || undefined,
      user_id: order.userId || undefined,
      user_email: order.userEmail || undefined,
      status_history: order.statusHistory as any
    };
  }

  private sanitizeOrder(order: OrderDTO): OrderDTO {
    if (!order.items || order.items.length === 0) return order;
    const calculatedTotal = order.items.reduce((sum, item) => {
      const hasDiscount = item.discount_percentage !== undefined && item.discount_percentage > 0;
      const finalPrice = hasDiscount ? item.price * (1 - item.discount_percentage / 100) : item.price;
      return sum + (finalPrice * item.quantity);
    }, 0);
    return {
      ...order,
      total_price: calculatedTotal > 0 ? calculatedTotal : order.total_price
    };
  }

  async getOrders(): Promise<OrderDTO[]> {
    const orders = await this.orderRepo.fetchOrders();
    return orders.map(order => this.sanitizeOrder(this.toDTO(order)));
  }

  async createOrder(
    items: CartItem[], 
    totalPrice: number, 
    paymentMethod: string, 
    shippingAddress: string, 
    userPhone: string
  ): Promise<OrderDTO> {
    const correlationId = TraceContext.getCorrelationId();
    TraceContext.log(`[Trace: ${correlationId}] [UseCase] [createOrder] Initiating order aggregate creation for ${items.length} items.`);

    // 1. Create domain aggregate (performs business validation)
    const orderAggregate = OrderAggregate.create(
      items, 
      totalPrice, 
      shippingAddress, 
      paymentMethod,
      false, // default isGuest value; overwritten by the repository on persist
      userPhone
    );
    
    TraceContext.log(`[Trace: ${correlationId}] [UseCase] [createOrder] Order aggregate created with ID: ${orderAggregate.id}. Persisting via repository...`);

    // 2. Persist via repository (Transactionally saves Order + Events)
    const persistedAggregate = await this.orderRepo.createOrderWithEvents(
      items, 
      orderAggregate.totalPrice.value, 
      paymentMethod, 
      orderAggregate.shippingAddress, 
      orderAggregate.domainEvents,
      userPhone
    );
    
    TraceContext.log(`[Trace: ${correlationId}] [UseCase] [createOrder] Order persisted successfully.`);

    // Clear events from aggregate after successful handoff to repo
    orderAggregate.clearEvents();
    
    return this.sanitizeOrder(this.toDTO(persistedAggregate));
  }

  async updateShippingAddress(orderId: string, newAddress: string): Promise<void> {
    await this.orderRepo.updateShippingAddress(orderId, newAddress);
  }

  async deleteOrder(orderId: string): Promise<void> {
    await this.orderRepo.deleteOrder(orderId);
  }

  async upgradeGuestOrders(userId: string): Promise<void> {
    await this.orderRepo.upgradeGuestOrders(userId);
  }

  async trackGuestOrder(orderId: string, emailOrPhone: string): Promise<OrderDTO | null> {
    const order = await this.orderRepo.trackGuestOrder(orderId, emailOrPhone);
    return order ? this.sanitizeOrder(this.toDTO(order)) : null;
  }
}
