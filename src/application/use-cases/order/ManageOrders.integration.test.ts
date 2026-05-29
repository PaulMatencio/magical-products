import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ManageOrdersUseCase } from './ManageOrdersUseCase';
import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';
import { IEventRepository } from '../../../domain/repositories/IEventRepository';
import { DomainEvents } from '../../../domain/common/DomainEvents';
import { OrderPlacedEvent } from '../../../domain/events/OrderPlacedEvent';
import { Order as OrderAggregate } from '../../../domain/entities/Order';

describe('ManageOrdersUseCase Integration', () => {
  let mockOrderRepo: IOrderRepository;
  let mockEventRepo: IEventRepository;
  let useCase: ManageOrdersUseCase;

  beforeEach(() => {
    DomainEvents.clearHandlers();
    
    mockEventRepo = {
      save: vi.fn(),
      getUnprocessed: vi.fn(),
      markAsProcessed: vi.fn()
    } as unknown as IEventRepository;

    mockOrderRepo = {
      fetchOrders: vi.fn(),
      createOrder: vi.fn(),
      createOrderWithEvents: vi.fn().mockImplementation(async (items, total_price, payment_method, shipping_address, events, user_phone, payment_id) => {
        for (const event of events) {
          await DomainEvents.dispatch(event);
        }
        const primaryEvent = events[0] as any;
        return OrderAggregate.reconstruct(
          primaryEvent ? primaryEvent.orderId : 'order-123',
          items,
          total_price,
          'pending',
          shipping_address,
          payment_method,
          false,
          new Date(),
          user_phone,
          undefined,
          undefined,
          undefined,
          payment_id
        );
      }),
      updateShippingAddress: vi.fn(),
      deleteOrder: vi.fn(),
      upgradeGuestOrders: vi.fn(),
      syncOrders: vi.fn(),
      trackGuestOrder: vi.fn()
    } as unknown as IOrderRepository;

    useCase = new ManageOrdersUseCase(mockOrderRepo, mockEventRepo);
  });

  it('should create an order and dispatch an OrderPlacedEvent', async () => {
    // 1. Setup a spy for the Domain Event
    const eventHandler = vi.fn();
    DomainEvents.subscribe('OrderPlacedEvent', eventHandler);

    // 2. Execute the use case
    const items: any[] = [{ id: 'prod-123', name: 'Magic Wand', price: 100, cart_quantity: 1 }];
    const order = await useCase.createOrder(items, 100, 'Credit Card', '123 Magic St', '555-555-0123');

    // 3. Verify repository was called
    expect(mockOrderRepo.createOrderWithEvents).toHaveBeenCalledWith(
      items, 100, 'Credit Card', '123 Magic St', expect.any(Array), '555-555-0123', undefined
    );

    // 4. Verify Domain Event was dispatched
    expect(eventHandler).toHaveBeenCalledTimes(1);
    const event = eventHandler.mock.calls[0][0];
    expect(event).toBeInstanceOf(OrderPlacedEvent);
    expect(event.orderId).toBe(order.id);
  });

  it('should throw an error if the price is invalid', async () => {
    const items: any[] = [{ id: 'prod-123', name: 'Magic Wand', price: 100, cart_quantity: 1 }];
    await expect(
      useCase.createOrder(items, -50, 'Credit Card', '123 Magic St', '555-555-0123')
    ).rejects.toThrow('Price cannot be negative');
    
    expect(mockOrderRepo.createOrder).not.toHaveBeenCalled();
  });
});
