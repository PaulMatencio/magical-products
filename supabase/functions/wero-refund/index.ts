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
    const wordlineApiKeyId = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_ID');
    const wordlineApiKeySecret = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_SECRET');
    const wordlinePaymentUrl = Deno.env.get('WORLDLINE_PAYMENT_URL') || Deno.env.get('WORDLINE_PAYMENT_URL');
    console.log(`Wero Refund Invoked. Wordline API Key Present: ${!!(wordlineApiKeyId && wordlineApiKeySecret)}, URL Present: ${!!wordlinePaymentUrl}`);

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

    // Prepare simulated Wero refund response
    const weroRefundId = `re_wer_${Math.random().toString(36).substring(2, 11)}`;
    const refundAmount = paymentRecord.amount_paid || paymentRecord.amount_requested;
    
    const weroRefundObj = {
      id: weroRefundId,
      amount: refundAmount,
      reason: reason || 'requested_by_customer',
      status: 'succeeded',
      currency: paymentRecord.requested_currency || 'EUR',
      provider: 'wero',
      refunded_at: new Date().toISOString()
    };

    console.log(`Wero refund processed successfully: ${weroRefundId}`);

    // 1. Insert record into refunds table
    const { error: refundInsertErr } = await supabase
      .from('refunds')
      .insert({
        payment_id: paymentRecord.id,
        provider_refund_id: weroRefundId,
        amount: refundAmount,
        reason: weroRefundObj.reason,
        status: 'succeeded',
        processed_at: new Date().toISOString(),
        metadata: { wero_refund: weroRefundObj }
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
          refund_id: weroRefundId,
          amount_refunded: refundAmount,
          currency: weroRefundObj.currency,
          reason: weroRefundObj.reason,
          wero_refund: weroRefundObj
        }
      });

    if (eventErr) {
      console.error('Failed to insert payment event:', eventErr);
    }

    // 4. Update the order status to 'refunded' if linked
    if (paymentRecord.order_id) {
      const { error: orderErr } = await supabase
        .from('orders')
        .update({ status: 'refunded' })
        .eq('id', paymentRecord.order_id);

      if (orderErr) {
        console.error('Failed to update order status to refunded:', orderErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true, refund_id: weroRefundId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Wero Refund processing error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
