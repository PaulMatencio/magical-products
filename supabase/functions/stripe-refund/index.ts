/// <reference path="../deno.d.ts" />

//  To view execution logs for this function in the cloud, navigate to:
//  https://supabase.com/dashboard/project/cejwvvmvdjnbgrckjczg/functions/stripe-refund/logs
//
//  To deploy stripe-refund:
//  npx supabase functions deploy stripe-refund --no-verify-jwt --project-ref cejwvvmvdjnbgrckjczg
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

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { payment_id, order_id, reason } = await req.json();

    let paymentRecord;
    if (payment_id) {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('id', payment_id)
        .single();
      if (error || !data) {
        throw new Error(`Payment record not found for ID ${payment_id}: ${error?.message}`);
      }
      paymentRecord = data;
    } else if (order_id) {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('order_id', order_id)
        .maybeSingle();
      if (error || !data) {
        throw new Error(`Payment record not found for Order ID ${order_id}: ${error?.message}`);
      }
      paymentRecord = data;
    } else {
      throw new Error('Either payment_id or order_id must be provided.');
    }

    // Only allow refunds for succeeded payments
    if (paymentRecord.provider_status !== 'succeeded') {
      throw new Error(`Cannot refund payment in state: ${paymentRecord.provider_status}`);
    }

    let paymentIntentId = paymentRecord.provider_payment_id;
    if (!paymentIntentId) {
      throw new Error('No provider_payment_id found on payment record.');
    }

    // Backward compatibility: If the provider_payment_id is a Checkout Session ID (starts with cs_),
    // retrieve the session to extract the actual Payment Intent ID.
    if (paymentIntentId.startsWith('cs_')) {
      console.log(`provider_payment_id is a Checkout Session: ${paymentIntentId}. Retrieving session to extract Payment Intent...`);
      const session = await stripe.checkout.sessions.retrieve(paymentIntentId, {
        expand: ['payment_intent']
      });
      if (session.payment_intent) {
        paymentIntentId = typeof session.payment_intent === 'string'
          ? session.payment_intent
          : (session.payment_intent as any).id;
        console.log(`Extracted Payment Intent ID: ${paymentIntentId}`);
      } else {
        throw new Error(`Failed to extract payment_intent from checkout session ${session.id}`);
      }
    }

    console.log(`Initiating Stripe refund for payment intent: ${paymentIntentId}`);

    // Create the Stripe Refund
    const stripeRefund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: reason || 'requested_by_customer',
    });

    console.log(`Stripe refund created: ${stripeRefund.id}`);

    // 1. Insert record into refunds table
    const { error: refundInsertErr } = await supabase
      .from('refunds')
      .insert({
        payment_id: paymentRecord.id,
        provider_refund_id: stripeRefund.id,
        amount: stripeRefund.amount,
        reason: stripeRefund.reason || reason || 'requested_by_customer',
        status: stripeRefund.status === 'succeeded' ? 'succeeded' : 'pending',
        processed_at: new Date().toISOString(),
        metadata: { stripe_refund: stripeRefund }
      });

    if (refundInsertErr) {
      console.error('Failed to insert refund record:', refundInsertErr);
    }

    // 2. Update payment status to 'refunded'
    const { error: paymentUpdateErr } = await supabase
      .from('payments')
      .update({
        provider_status: 'refunded',
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentRecord.id);

    if (paymentUpdateErr) {
      console.error('Failed to update payment status:', paymentUpdateErr);
    }

    // 3. Log a refund event explicitly in the payment_events table
    const { error: eventErr } = await supabase
      .from('payment_events')
      .insert({
        payment_id: paymentRecord.id,
        event_type: 'payment.refunded',
        old_status: paymentRecord.provider_status,
        new_status: 'refunded',
        payload: {
          refund_id: stripeRefund.id,
          amount_refunded: stripeRefund.amount,
          currency: stripeRefund.currency,
          reason: stripeRefund.reason || reason,
          stripe_refund: stripeRefund
        }
      });

    if (eventErr) {
      console.error('Failed to insert payment event:', eventErr);
    }

    // 4. Update the order status to 'refunded' if linked
    if (paymentRecord.order_id) {
      // Trigger database order status change to refunded
      const { error: orderErr } = await supabase
        .from('orders')
        .update({
          status: 'refunded'
        })
        .eq('id', paymentRecord.order_id);

      if (orderErr) {
        console.error('Failed to update order status to refunded:', orderErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true, refund_id: stripeRefund.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Refund processing error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
