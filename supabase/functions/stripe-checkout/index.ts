/// <reference path="../deno.d.ts" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';
import Stripe from 'https://esm.sh/stripe@16.12.0?target=denonext';

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
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY secret is not configured.');
    }

    // Initialize Stripe with the recommended API version
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-04-22.dahlia',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const body = await req.json();
    const { action, payment_id, session_id, cart, invoice_email } = body;

    // --- 1. Confirm/Verify Payment Status ---
    if (action === 'confirm' || (payment_id && !cart)) {
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

      // Resolve payment intent ID
      const activePaymentIntentId = session_id || paymentRecord.provider_payment_id;
      if (!activePaymentIntentId) {
        throw new Error('No Stripe PaymentIntent ID found for this payment confirmation.');
      }

      // Retrieve the PaymentIntent from Stripe
      const pi = await stripe.paymentIntents.retrieve(activePaymentIntentId);

      // Handle successful payment
      if (pi.status === 'succeeded') {
        let orderId = paymentRecord.order_id;
        const paymentMethodUsed = pi.payment_method_types?.[0] || 'card';

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
            p_payment_method: paymentMethodUsed,
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
          } else if (orderData?.id) {
            orderId = orderData.id;
          }
        } else {
          // Update order payment method
          const { error: orderUpdateErr } = await supabase
            .from('orders')
            .update({ payment_method: paymentMethodUsed })
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
            amount_paid: pi.amount_received,
            completed_at: new Date().toISOString(),
            order_id: orderId || null,
            provider_payment_id: pi.id,
            provider: paymentMethodUsed
          })
          .eq('id', payment_id);

        if (updateErr) {
          console.error(`Failed to update payment record ${payment_id}:`, updateErr);
        }

        return new Response(
          JSON.stringify({ status: 'succeeded', order_id: orderId }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else if (pi.status === 'canceled') {
        // Handle canceled payment
        await supabase
          .from('payments')
          .update({
            provider_status: 'cancelled',
            completed_at: new Date().toISOString()
          })
          .eq('id', payment_id);

        return new Response(
          JSON.stringify({ status: 'cancelled' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else if (pi.last_payment_error) {
        // Handle failed payment with explicit error
        const lastError = pi.last_payment_error.message || 'Payment failed';

        await supabase
          .from('payments')
          .update({
            provider_status: 'failed',
            completed_at: new Date().toISOString()
          })
          .eq('id', payment_id);

        return new Response(
          JSON.stringify({ status: 'failed', error: lastError }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        // Still pending / requires action
        return new Response(
          JSON.stringify({ status: pi.status }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // --- 2. Create PaymentIntent ---
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

    // Calculate total amount in cents from cart
    const totalAmountCents = cart.reduce((sum: number, item: any) => {
      const unitAmount = Math.round(Number(item.price || 0) * 100);
      return sum + (unitAmount * Number(item.cart_quantity || 1));
    }, 0);

    if (totalAmountCents <= 0) {
      throw new Error('Invalid cart total amount.');
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmountCents,
      currency: 'eur',
      description: `Order payment for ID: ${payment_id}`,
      receipt_email: invoice_email || undefined,
      metadata: {
        payment_id: payment_id,
        is_sandbox: 'true',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Save PaymentIntent ID to database payment record
    const { error: dbUpdateErr } = await supabase
      .from('payments')
      .update({
        provider_payment_id: paymentIntent.id
      })
      .eq('id', payment_id);

    if (dbUpdateErr) {
      console.error(`Failed to save paymentIntent.id to payment record ${payment_id}:`, dbUpdateErr);
    }

    return new Response(
      JSON.stringify({ 
        id: paymentIntent.id, 
        clientSecret: paymentIntent.client_secret 
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
