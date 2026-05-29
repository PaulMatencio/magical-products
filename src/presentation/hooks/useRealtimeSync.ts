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

                // Sync localStorage cache
                try {
                  const LOCAL_ORDERS_KEY = 'product_catalogue_orders';
                  const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
                  if (localOrdersStr) {
                    const localOrders: Order[] = JSON.parse(localOrdersStr);
                    const updatedLocal = localOrders.map(lo => 
                      lo.id === id ? { ...lo, status } : lo
                    );
                    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updatedLocal));
                  }
                } catch (err) {
                  console.error('Realtime: Failed to update local storage order status:', err);
                }
              }
            } else if (payload.eventType === 'DELETE') {
              const deletedOrderId = (payload.old as any).id;
              setOrders(prev => prev.filter(o => o.id !== deletedOrderId));

              // Sync localStorage cache
              try {
                const LOCAL_ORDERS_KEY = 'product_catalogue_orders';
                const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
                if (localOrdersStr) {
                  const localOrders: Order[] = JSON.parse(localOrdersStr);
                  const updatedLocal = localOrders.filter(lo => lo.id !== deletedOrderId);
                  localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updatedLocal));
                }
              } catch (err) {
                console.error('Realtime: Failed to delete order from local storage:', err);
              }
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
            const discount_percentage = raw.discount_percentage !== undefined ? Number(raw.discount_percentage) : undefined;
            const name = raw.name;
            const title = raw.title;
            const description = raw.description;
            const image_url = raw.image_url;

            setCart(prev => prev.map(item => item.id === id ? { ...item, price, discount_percentage: discount_percentage ?? item.discount_percentage } : item));
            updateProductQuantityLocally(id, quantity, inStock, {
              price,
              discount_percentage,
              name,
              title,
              description,
              image_url
            });
          }
        )
        .subscribe((status, err) => {
          console.log('Realtime: inventory-updates status:', status, err || '');
          if (status === 'CHANNEL_ERROR') {
            console.error('Realtime: inventory-updates subscription failed. Please verify that the table "products" is added to the "supabase_realtime" publication.');
          }
        });

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
