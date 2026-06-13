import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';
import { PaymentWebhookAdapter, WebhookEventResult } from './paymentProvider.ts';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export async function handleWebhookRequest(
  req: Request,
  adapter: PaymentWebhookAdapter,
  supabaseClient?: any // Dependency Injection for testability
) {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Use DI client or instantiate default client
  const supabase = supabaseClient || createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    const bodyText = await req.text();
    const headers = req.headers;

    // Acknowledge preflight or check request
    const events = await adapter.parseAndVerifyWebhook(req, bodyText, headers, supabase);

    let lastMatchedPaymentRecord: any = null;

    for (const event of events) {
      if (event.eventType === 'ignore') {
        continue;
      }

      // Fetch the payment record
      let paymentRecord = null;
      if (event.paymentId) {
        const { data, error } = await supabase
          .from('payments')
          .select('*')
          .eq('id', event.paymentId)
          .maybeSingle();
        if (!error && data) {
          paymentRecord = data;
        }
      } else if (event.providerPaymentId) {
        const { data, error } = await supabase
          .from('payments')
          .select('*')
          .eq('provider_payment_id', event.providerPaymentId)
          .maybeSingle();
        if (!error && data) {
          paymentRecord = data;
        }
      }

      if (!paymentRecord) {
        console.warn(`Payment record not found for webhook event. paymentId=${event.paymentId}, providerPaymentId=${event.providerPaymentId}. Skipping.`);
        continue;
      }

      lastMatchedPaymentRecord = paymentRecord;
      let orderId = paymentRecord.order_id;

      if (event.eventType === 'payment_succeeded') {
        if (paymentRecord.provider_status === 'succeeded') {
          console.log(`Payment ${paymentRecord.id} is already succeeded. skipping.`);
          continue;
        }

        // Create order via RPC if it doesn't exist yet
        if (!orderId) {
          const meta = paymentRecord.metadata || {};
          const cartItems = meta.cart || [];
          const totalPrice = paymentRecord.amount_requested ? (paymentRecord.amount_requested / 100) : 0;
          const shippingAddress = meta.shipping_address || '';
          const userPhone = meta.user_phone || '';
          const userEmail = meta.invoice_email || paymentRecord.user_email || '';
          const userId = paymentRecord.user_id || null;

          const { data: orderData, error: orderError } = await supabase.rpc('create_order_with_outbox', {
            p_items: cartItems,
            p_total_price: totalPrice,
            p_payment_method: event.paymentMethodUsed || adapter.providerName,
            p_shipping_address: shippingAddress,
            p_user_phone: userPhone,
            p_user_email: userEmail,
            p_user_id: userId,
            p_event_type: 'OrderCreated',
            p_event_payload: { items: cartItems, total_price: totalPrice },
            p_payment_id: paymentRecord.id
          });

          if (orderError) {
            console.error(`Failed to create order via RPC in webhook orchestrator:`, orderError);
          } else if (orderData?.id) {
            orderId = orderData.id;
          }
        } else {
          // Update order payment method
          const { error: orderUpdateErr } = await supabase
            .from('orders')
            .update({ payment_method: event.paymentMethodUsed || adapter.providerName })
            .eq('id', orderId);
          if (orderUpdateErr) {
            console.error(`Failed to update order ${orderId} payment method:`, orderUpdateErr);
          }
        }

        // Update payment record to succeeded
        const { error: updateErr } = await supabase
          .from('payments')
          .update({
            provider_status: 'succeeded',
            amount_paid: event.amount || paymentRecord.amount_requested,
            completed_at: new Date().toISOString(),
            order_id: orderId || null,
            provider_payment_id: event.providerPaymentId || paymentRecord.provider_payment_id,
            provider: event.paymentMethodUsed || adapter.providerName
          })
          .eq('id', paymentRecord.id);

        if (updateErr) {
          console.error(`Failed to update payment record ${paymentRecord.id} to succeeded:`, updateErr);
        } else {
          console.log(`Payment ${paymentRecord.id} successfully updated to succeeded via webhook orchestrator.`);
        }

      } else if (event.eventType === 'payment_failed' || event.eventType === 'payment_cancelled') {
        if (['succeeded', 'failed', 'cancelled', 'refunded'].includes(paymentRecord.provider_status)) {
          console.log(`Payment ${paymentRecord.id} is in final state: ${paymentRecord.provider_status}. skipping.`);
          continue;
        }

        const dbStatus = event.eventType === 'payment_cancelled' ? 'cancelled' : 'failed';

        const { error: updateErr } = await supabase
          .from('payments')
          .update({
            provider_status: dbStatus,
            completed_at: new Date().toISOString()
          })
          .eq('id', paymentRecord.id);

        if (updateErr) {
          console.error(`Failed to update payment record ${paymentRecord.id} to ${dbStatus}:`, updateErr);
        } else {
          console.log(`Payment ${paymentRecord.id} marked as ${dbStatus} via webhook orchestrator.`);
        }

        if (orderId) {
          const { error: cancelOrderError } = await supabase.rpc('cancel_order_with_inventory', {
            p_order_id: orderId
          });
          if (cancelOrderError) {
            console.error(`Failed to cancel order ${orderId} via RPC:`, cancelOrderError);
          } else {
            console.log(`Order ${orderId} cancelled and inventory restored successfully.`);
          }
        }

      } else if (event.eventType === 'refund_processed') {
        const isSuccess = event.refundStatus === 'succeeded';
        const finalPaymentStatus = isSuccess ? 'refunded' : 'succeeded';

        await supabase
          .from('payments')
          .update({
            provider_status: finalPaymentStatus,
            updated_at: new Date().toISOString()
          })
          .eq('id', paymentRecord.id);

        // Update refunds status if record exists
        await supabase
          .from('refunds')
          .update({
            status: event.refundStatus,
            processed_at: new Date().toISOString()
          })
          .eq('payment_id', paymentRecord.id);

        if (orderId && isSuccess) {
          await supabase
            .from('orders')
            .update({ status: 'refunded' })
            .eq('id', orderId);
        }

        console.log(`Refund event processed for payment ${paymentRecord.id}. Status: ${event.refundStatus}`);
      }
    }

    // Call adapter's response helper
    return adapter.getResponseForEvent(events, lastMatchedPaymentRecord);

  } catch (error: any) {
    console.error(`Webhook error [${adapter.providerName}]:`, error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
