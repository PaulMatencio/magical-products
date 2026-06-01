/// <reference path="../deno.d.ts" />

//  To view execution logs for this function in the cloud, navigate to:
//  https://supabase.com/dashboard/project/cejwvvmvdjnbgrckjczg/functions/stripe-checkout/logs
//
//  To deploy stripe-checkout:
//  npx supabase functions deploy stripe-checkout --no-verify-jwt --project-ref cejwvvmvdjnbgrckjczg
//


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
      apiVersion: '2026-04-22.dahlia', // Stable API version compatible with standard SDK
      httpClient: Stripe.createFetchHttpClient(),
    });

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const body = await req.json();
    const { action, payment_id, session_id, cart, invoice_email, redirect_origin, payment_method } = body;

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

      // Resolve session_id
      const activeSessionId = session_id || paymentRecord.provider_payment_id;
      if (!activeSessionId) {
        throw new Error('No Stripe session ID found for this payment confirmation.');
      }

      // Retrieve the checkout session from Stripe, expanding payment_intent
      const session = await stripe.checkout.sessions.retrieve(activeSessionId, {
        expand: ['payment_intent']
      });

      // Check if session status is complete and payment is paid
      if (session.status === 'complete' && session.payment_status === 'paid') {
        let orderId = paymentRecord.order_id;

        // Extract the actual payment method type used (e.g. 'card', 'wero')
        let paymentMethodUsed = paymentRecord.provider || 'card';
        const pi = session.payment_intent as any;
        if (pi && pi.payment_method_types && pi.payment_method_types.length > 0) {
          paymentMethodUsed = pi.payment_method_types[0];
        }

        // If there's no order_id yet, create the order via RPC
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
            console.error(`Failed to create order via RPC in confirm action:`, orderError);
          } else if (orderData?.id) {
            orderId = orderData.id;
          }
        } else {
          // If the order was pre-created, update its payment method to match the actual one used
          const { error: orderUpdateErr } = await supabase
            .from('orders')
            .update({ payment_method: paymentMethodUsed })
            .eq('id', orderId);
          if (orderUpdateErr) {
            console.error(`Failed to update order ${orderId} payment method in confirm action:`, orderUpdateErr);
          }
        }

        // Extract payment intent ID safely from expanded object or fallback to string/session.id
        let paymentIntentId = session.id;
        if (session.payment_intent) {
          paymentIntentId = typeof session.payment_intent === 'string'
            ? session.payment_intent
            : (session.payment_intent as any).id || session.id;
        }

        // Update the payment record to succeeded
        const { error: updateErr } = await supabase
          .from('payments')
          .update({
            provider_status: 'succeeded',
            amount_paid: session.amount_total,
            completed_at: new Date().toISOString(),
            order_id: orderId || null,
            provider_payment_id: paymentIntentId,
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
      } else if (session.status === 'expired') {
        // Mark payment as cancelled
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
      } else {
        // Check if there is an error message in the underlying PaymentIntent
        const pi = session.payment_intent as any;
        const lastError = pi?.last_payment_error?.message;

        if (lastError) {
          // Update the payment record to failed
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
        }

        return new Response(
          JSON.stringify({ status: session.status, payment_status: session.payment_status }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    if (!payment_id) {
      throw new Error('Missing payment_id in request.');
    }

    // Fetch the pending payment record to verify it exists and get the amount
    const { data: paymentRecord, error: fetchErr } = await supabase
      .from('payments')
      .select('*')
      .eq('id', payment_id)
      .single();

    if (fetchErr || !paymentRecord) {
      throw new Error(`Payment record not found: ${fetchErr?.message || 'Unknown error'}`);
    }

    if (paymentRecord.provider_status !== 'pending') {
      throw new Error(`Payment record is not in pending status: ${paymentRecord.provider_status}`);
    }

    // Build line items from cart details
    const lineItems = cart.map((item: any) => {
      // item.price is in EUR (float), Stripe expects amount in cents
      const unitAmount = Math.round(Number(item.price || 0) * 100);
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name || 'Magical Product',
            images: item.image_url ? [item.image_url] : [],
          },
          unit_amount: unitAmount,
        },
        quantity: Number(item.cart_quantity || 1),
      };
    });

    let base = redirect_origin || req.headers.get('origin') || 'http://localhost:3000';
    if (base.endsWith('/')) {
      base = base.slice(0, -1);
    }

    const allowedPaymentMethods = payment_method === 'wero' ? ['wero'] : ['card'];

    // Create Checkout Session following security and API best practices
    const session = await stripe.checkout.sessions.create({
      // payment_method_types: allowedPaymentMethods,
      mode: 'payment',
      customer_email: invoice_email || undefined,
      line_items: lineItems,
      success_url: `${base}/?payment_id=${payment_id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/?view=checkout&payment_id=${payment_id}`,
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        payment_id: payment_id,
        is_sandbox: 'true',
      },
      payment_intent_data: {
        metadata: {
          payment_id: payment_id,
          is_sandbox: 'true',
        },
        description: `Order payment for ID: ${payment_id}`,
        receipt_email: invoice_email || undefined,
      },
    });

    // Update the payment record with the provider session ID as soon as it is generated
    const { error: dbUpdateErr } = await supabase
      .from('payments')
      .update({
        provider_payment_id: session.id
      })
      .eq('id', payment_id);

    if (dbUpdateErr) {
      console.error(`Failed to save session.id to payment record ${payment_id}:`, dbUpdateErr);
    }

    return new Response(
      JSON.stringify({ id: session.id, url: session.url }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
