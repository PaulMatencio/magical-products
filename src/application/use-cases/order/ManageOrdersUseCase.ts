import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';
import { IEventRepository } from '../../../domain/repositories/IEventRepository';
import { Order as OrderDTO, CartItem } from '../../../types/types';
import { Order as OrderAggregate } from '../../../domain/entities/Order';
import { DomainEvents } from '../../../domain/common/DomainEvents';

export class ManageOrdersUseCase {
  constructor(
    private orderRepo: IOrderRepository,
    private eventRepo: IEventRepository
  ) {}


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
    return orders.map(order => this.sanitizeOrder(order));
  }

  async createOrder(
    items: CartItem[], 
    totalPrice: number, 
    paymentMethod: string, 
    shippingAddress: string, 
    userPhone: string
  ): Promise<OrderDTO> {
    // 1. Create domain aggregate (performs business validation)
    const orderAggregate = OrderAggregate.create(
      items, 
      totalPrice, 
      shippingAddress, 
      userPhone
    );
    
    // 2. Persist via repository (Transactionally saves Order + Events)
    const orderDto = await this.orderRepo.createOrderWithEvents(
      items, 
      orderAggregate.totalPrice.value, 
      paymentMethod, 
      orderAggregate.shippingAddress, 
      orderAggregate.domainEvents,
      userPhone
    );
    
    // Clear events from aggregate after successful handoff to repo
    orderAggregate.clearEvents();
    
    return this.sanitizeOrder(orderDto);
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
    return order ? this.sanitizeOrder(order) : null;
  }
}

