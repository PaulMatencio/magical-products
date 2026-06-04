/// <reference path="../deno.d.ts" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    console.log("Received Adyen Webhook event:", JSON.stringify(body));

    const notificationItems = body.notificationItems || [];
    if (notificationItems.length === 0) {
      return new Response('[accepted]', { status: 200, headers: { ...corsHeaders, 'Content-Type': 'text/plain' } });
    }

    const item = notificationItems[0]?.NotificationRequestItem;
    if (!item) {
      throw new Error('Invalid Adyen webhook structure: NotificationRequestItem missing.');
    }

    const { eventCode, merchantReference, pspReference, success, amount } = item;

    console.log(`Processing Adyen webhook item: eventCode=${eventCode}, merchantReference=${merchantReference}, success=${success}`);

    // If there is no merchantReference (payment_id), we cannot correlate it, so return accepted
    if (!merchantReference) {
      console.warn("No merchantReference (payment_id) found in webhook payload. Skipping.");
      return new Response('[accepted]', { status: 200, headers: { ...corsHeaders, 'Content-Type': 'text/plain' } });
    }

    // Fetch the payment record
    const { data: paymentRecord, error: fetchErr } = await supabase
      .from('payments')
      .select('*')
      .eq('id', merchantReference)
      .maybeSingle();

    if (fetchErr || !paymentRecord) {
      console.warn(`Payment record ${merchantReference} not found in database. Skipping.`);
      return new Response('[accepted]', { status: 200, headers: { ...corsHeaders, 'Content-Type': 'text/plain' } });
    }

    // Handle webhook event codes
    if (eventCode === 'AUTHORISATION') {
      const isSuccess = success === 'true' || success === true;

      // If already processed, just acknowledge
      if (['succeeded', 'failed', 'cancelled', 'refunded'].includes(paymentRecord.provider_status)) {
        console.log(`Payment ${paymentRecord.id} is already in state: ${paymentRecord.provider_status}. Skipping.`);
        return new Response('[accepted]', { status: 200, headers: { ...corsHeaders, 'Content-Type': 'text/plain' } });
      }

      if (isSuccess) {
        let orderId = paymentRecord.order_id;

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
            p_payment_method: 'adyen',
            p_shipping_address: shippingAddress,
            p_user_phone: userPhone,
            p_user_email: userEmail,
            p_user_id: userId,
            p_event_type: 'OrderCreated',
            p_event_payload: { items: cartItems, total_price: totalPrice },
            p_payment_id: paymentRecord.id
          });

          if (orderError) {
            console.error(`Failed to create order via RPC in Adyen webhook:`, orderError);
          } else if (orderData?.id) {
            orderId = orderData.id;
          }
        } else {
          // Update order payment method
          await supabase
            .from('orders')
            .update({ payment_method: 'adyen' })
            .eq('id', orderId);
        }

        // Update payment record to succeeded
        const amountPaidCents = amount?.value || paymentRecord.amount_requested;
        await supabase
          .from('payments')
          .update({
            provider_status: 'succeeded',
            amount_paid: amountPaidCents,
            completed_at: new Date().toISOString(),
            order_id: orderId || null,
            provider_payment_id: pspReference || paymentRecord.provider_payment_id,
            provider: 'adyen'
          })
          .eq('id', paymentRecord.id);

        console.log(`Adyen payment ${paymentRecord.id} successfully completed via AUTHORISATION webhook.`);

      } else {
        // Failed
        await supabase
          .from('payments')
          .update({
            provider_status: 'failed',
            completed_at: new Date().toISOString()
          })
          .eq('id', paymentRecord.id);

        if (paymentRecord.order_id) {
          const { error: cancelErr } = await supabase.rpc('cancel_order_with_inventory', {
            p_order_id: paymentRecord.order_id
          });
          if (cancelErr) console.error("Failed to cancel order:", cancelErr);
        }

        console.log(`Adyen payment ${paymentRecord.id} marked as failed via webhook.`);
      }
    } else if (eventCode === 'REFUND') {
      const isSuccess = success === 'true' || success === true;
      const refundStatus = isSuccess ? 'succeeded' : 'failed';
      const finalPaymentStatus = isSuccess ? 'refunded' : 'succeeded';

      // Update payment record status
      await supabase
        .from('payments')
        .update({
          provider_status: finalPaymentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentRecord.id);

      // Update refunds table status if a record exists matching payment_id and provider_refund_id = pspReference
      await supabase
        .from('refunds')
        .update({
          status: refundStatus,
          processed_at: new Date().toISOString()
        })
        .eq('payment_id', paymentRecord.id);

      if (paymentRecord.order_id && isSuccess) {
        await supabase
          .from('orders')
          .update({ status: 'refunded' })
          .eq('id', paymentRecord.order_id);
      }

      console.log(`Adyen refund event processed for payment ${paymentRecord.id}. Status: ${refundStatus}`);
    }

    return new Response('[accepted]', { status: 200, headers: { ...corsHeaders, 'Content-Type': 'text/plain' } });

  } catch (err: any) {
    console.error("Adyen Webhook function error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
