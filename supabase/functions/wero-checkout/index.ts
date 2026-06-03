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

    const wordlineApiKeyId = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_ID');
    const wordlineApiKeySecret = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_SECRET');
    console.log(`Wero Checkout Invoked. Wordline API Key Present: ${!!(wordlineApiKeyId && wordlineApiKeySecret)}`);

    // Parse request body
    const body = await req.json();
    const { action, payment_id, wero_phone, wero_mode, cart, invoice_email, status } = body;

    // --- 1. Confirm/Verify Wero Payment Status ---
    if (action === 'confirm') {
      if (!payment_id) {
        throw new Error('Missing payment_id for confirmation.');
      }

      // Fetch current payment status first
      const { data: paymentRecord, error: fetchErr } = await supabase
        .from('payments')
        .select('*')
        .eq('id', payment_id)
        .single();

      if (fetchErr || !paymentRecord) {
        throw new Error(`Payment record not found: ${fetchErr?.message || 'Unknown error'}`);
      }

      // If already processed, return immediately
      if (paymentRecord.provider_status === 'succeeded' || paymentRecord.provider_status === 'failed' || paymentRecord.provider_status === 'cancelled') {
        return new Response(
          JSON.stringify({ status: paymentRecord.provider_status, order_id: paymentRecord.order_id }),
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
            p_payment_id: payment_id
          });

          if (orderError) {
            console.error(`Failed to create order via RPC in confirm:`, orderError);
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
          .eq('id', payment_id);

        if (updateErr) {
          console.error(`Failed to update payment record ${payment_id}:`, updateErr);
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
          .eq('id', payment_id);

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
    }

    // --- 2. Initiate Wero Payment ---
    if (!payment_id) {
      throw new Error('Missing payment_id in request.');
    }

    // Fetch the pending payment record
    const { data: paymentRecord, error: fetchErr } = await supabase
      .from('payments')
      .select('*')
      .eq('id', payment_id)
      .single();

    if (fetchErr || !paymentRecord) {
      throw new Error(`Payment record not found: ${fetchErr?.message || 'Unknown error'}`);
    }

    if (paymentRecord.provider_status !== 'pending') {
      throw new Error(`Payment record is not pending: ${paymentRecord.provider_status}`);
    }

    const mockWeroId = `wer_tx_${Math.random().toString(36).substring(2, 11)}`;

    // Update payment record with mock provider payment ID
    const { error: dbUpdateErr } = await supabase
      .from('payments')
      .update({
        provider_payment_id: mockWeroId,
        metadata: {
          ...paymentRecord.metadata,
          wero_phone: wero_phone || null,
          wero_mode: wero_mode || 'phone'
        }
      })
      .eq('id', payment_id);

    if (dbUpdateErr) {
      console.error(`Failed to save wero tx ID to payment record ${payment_id}:`, dbUpdateErr);
    }

    // Generate mock QR code data and redirect url
    const qrCodeData = `wero://pay?id=${mockWeroId}&amount=${(paymentRecord.amount_requested / 100).toFixed(2)}&currency=EUR`;
    const redirectUrl = `https://wero-sandbox.pay/transfer?id=${mockWeroId}`;

    return new Response(
      JSON.stringify({
        wero_tx_id: mockWeroId,
        qrCodeData,
        redirectUrl
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
