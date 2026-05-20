import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';
import { notificationService } from '../../services/notificationService';
import { useInventory } from '../../context/InventoryContext';
import { useCart } from '../../context/CartContext';
import { Order } from '../../types/types';

export function useRealtimeSync(setOrders: React.Dispatch<React.SetStateAction<Order[]>>, notifiedRef: React.MutableRefObject<Record<string, string>>) {
  const { updateProductQuantityLocally } = useInventory();
  const { setCart } = useCart();
  const [realtimeError, setRealtimeError] = useState<string | null>(null);

  useEffect(() => {
    const setupRealtime = () => {
      const ordersSub = supabase
        .channel('order-status-changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'orders' },
          (payload) => {
            console.log('Realtime: Order Event:', payload);
            if (payload.eventType === 'UPDATE') {
              const newOrder = payload.new as any;
              const { id, status } = newOrder;
              if (notifiedRef.current[id] !== status) {
                if (status === 'accepted') {
                  notificationService.sendNotification("Order Accepted!", `Order #${id.slice(0, 8)} accepted.`);
                } else if (status === 'shipped') {
                  notificationService.sendNotification("Order Shipped!", `Order #${id.slice(0, 8)} shipped.`);
                }
                notifiedRef.current[id] = status;
                setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
              }
            } else if (payload.eventType === 'DELETE') {
              const deletedOrderId = (payload.old as any).id;
              setOrders(prev => prev.filter(o => o.id !== deletedOrderId));
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') setRealtimeError(null);
          else if (status === 'CHANNEL_ERROR') setRealtimeError('Realtime updates are currently unavailable.');
        });

      const inventorySub = supabase
        .channel('inventory-updates')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'products' },
          (payload) => {
            console.log('Realtime: Inventory Sync:', payload);
            const raw = payload.new as any;
            const id = String(raw.id);
            const quantity = Number(raw.quantity);
            const inStock = Boolean(raw.in_stock);
            const price = Number(raw.price);

            setCart(prev => prev.map(item => item.id === id ? { ...item, price } : item));
            updateProductQuantityLocally(id, quantity, inStock);
          }
        )
        .subscribe();

      return { ordersSub, inventorySub };
    };

    const { ordersSub, inventorySub } = setupRealtime();

    return () => {
      supabase.removeChannel(ordersSub);
      supabase.removeChannel(inventorySub);
    };
  }, [setOrders, notifiedRef, setCart, updateProductQuantityLocally]);

  return { realtimeError, setRealtimeError };
}
