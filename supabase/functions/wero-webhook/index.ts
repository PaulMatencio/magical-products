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

    const wordlineWebhookId = Deno.env.get('WORLDLINE_WEBHOOKS_ID');
    const wordlineWebhookSecret = Deno.env.get('WORLDLINE_WEBHOOKS_SECRET');
    const wordlinePaymentUrl = Deno.env.get('WORLDLINE_PAYMENT_URL') || Deno.env.get('WORDLINE_PAYMENT_URL');
    console.log(`Wero Webhook Invoked. Wordline Webhook Secret Present: ${!!(wordlineWebhookId && wordlineWebhookSecret)}, URL Present: ${!!wordlinePaymentUrl}`);

    // Parse webhook payload
    const body = await req.json();
    const { wero_tx_id, payment_id, status } = body;

    console.log(`Received Wero Webhook event: tx_id=${wero_tx_id}, payment_id=${payment_id}, status=${status}`);

    if (!payment_id && !wero_tx_id) {
      throw new Error('Missing payment_id or wero_tx_id in webhook payload.');
    }

    // Fetch the payment record
    let query = supabase.from('payments').select('*');
    if (payment_id) {
      query = query.eq('id', payment_id);
    } else {
      query = query.eq('provider_payment_id', wero_tx_id);
    }

    const { data: paymentRecord, error: fetchErr } = await query.maybeSingle();

    if (fetchErr || !paymentRecord) {
      throw new Error(`Payment record not found: ${fetchErr?.message || 'Unknown error'}`);
    }

    // If already finalized, return early
    if (paymentRecord.provider_status === 'succeeded' || paymentRecord.provider_status === 'failed' || paymentRecord.provider_status === 'cancelled') {
      return new Response(
        JSON.stringify({ status: paymentRecord.provider_status, already_processed: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const finalStatus = status || 'succeeded';

    if (finalStatus === 'succeeded') {
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
          p_payment_method: 'wero',
          p_shipping_address: shippingAddress,
          p_user_phone: userPhone,
          p_user_email: userEmail,
          p_user_id: userId,
          p_event_type: 'OrderCreated',
          p_event_payload: { items: cartItems, total_price: totalPrice },
          p_payment_id: paymentRecord.id
        });

        if (orderError) {
          console.error(`Failed to create order via RPC in webhook:`, orderError);
          throw new Error(`Failed to create order: ${orderError.message}`);
        } else if (orderData?.id) {
          orderId = orderData.id;
        }
      } else {
        // Update order payment method
        const { error: orderUpdateErr } = await supabase
          .from('orders')
          .update({ payment_method: 'wero' })
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
          amount_paid: paymentRecord.amount_requested,
          completed_at: new Date().toISOString(),
          order_id: orderId || null
        })
        .eq('id', paymentRecord.id);

      if (updateErr) {
        console.error(`Failed to update payment record ${paymentRecord.id}:`, updateErr);
      }

      return new Response(
        JSON.stringify({ status: 'succeeded', order_id: orderId }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // Handle cancelled or failed Wero payment
      const dbStatus = finalStatus === 'cancelled' ? 'cancelled' : 'failed';

      await supabase
        .from('payments')
        .update({
          provider_status: dbStatus,
          completed_at: new Date().toISOString()
        })
        .eq('id', paymentRecord.id);

      if (paymentRecord.order_id) {
        const { error: cancelErr } = await supabase.rpc('cancel_order_with_inventory', {
          p_order_id: paymentRecord.order_id
        });
        if (cancelErr) console.error("Failed to cancel order:", cancelErr);
      }

      return new Response(
        JSON.stringify({ status: dbStatus, order_id: paymentRecord.order_id }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
