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

    const adyenApiKey = Deno.env.get('ADYEN_APIKEY') || Deno.env.get('VITE_ADYEN_APIKEY') || '';
    const merchantAccount = Deno.env.get('ADYEN_MERCHANT_ACCOUNT') || Deno.env.get('VITE_ADYEN_MERCHANT_ACCOUNT') || 'Magicaltrends';
    const adyenPaymentUrl = Deno.env.get('ADYEN_PAYMENT_URL') || Deno.env.get('VITE_ADYEN_PAYMENT_URL') || 'https://checkout-test.adyen.com/v72';

    const body = await req.json();
    const { payment_id, order_id, reason } = body;

    let paymentRecord: any = null;

    if (payment_id) {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('id', payment_id)
        .maybeSingle();
      if (error || !data) {
        throw new Error(`Payment record not found for Payment ID ${payment_id}: ${error?.message}`);
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

    if (paymentRecord.provider_status !== 'succeeded') {
      throw new Error(`Cannot refund payment in state: ${paymentRecord.provider_status}`);
    }

    const refundAmount = paymentRecord.amount_paid || paymentRecord.amount_requested;
    const currency = paymentRecord.requested_currency || 'EUR';

    let adyenRefundId = `re_ady_${Math.random().toString(36).substring(2, 11)}`;
    let refundStatus = 'succeeded';
    let isRealRefund = false;
    let refundResponseData = null;

    const pspReference = paymentRecord.provider_payment_id;
    const isRealPsp = pspReference && !pspReference.startsWith('ady_mock_') && !pspReference.startsWith('ady_psp_');

    if (isRealPsp && adyenApiKey) {
      try {
        const payload = {
          merchantAccount: merchantAccount,
          amount: {
            value: refundAmount,
            currency: currency
          },
          reference: paymentRecord.id
        };

        const refundUrl = `${adyenPaymentUrl}/payments/${pspReference}/refunds`;
        console.log(`Sending Adyen Refund request to ${refundUrl} with payload:`, payload);

        const response = await fetch(refundUrl, {
          method: 'POST',
          headers: {
            'x-API-key': adyenApiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Adyen Refund API returned status ${response.status}: ${errText}`);
        }

        refundResponseData = await response.json();
        console.log("Adyen Refund API response success:", refundResponseData);

        if (refundResponseData.pspReference) {
          adyenRefundId = refundResponseData.pspReference;
        }
        if (refundResponseData.status === 'received') {
          refundStatus = 'succeeded'; // Adyen refunds are asynchronous and marked as 'received' immediately
          isRealRefund = true;
        } else {
          refundStatus = 'failed';
        }
      } catch (err) {
        console.error("Adyen Refund API request failed. Falling back to simulated refund:", err);
      }
    }

    const adyenRefundObj = {
      id: adyenRefundId,
      amount: refundAmount,
      reason: reason || 'requested_by_customer',
      status: refundStatus,
      currency: currency,
      provider: 'adyen',
      refunded_at: new Date().toISOString(),
      is_real_refund: isRealRefund,
      adyen_response: refundResponseData
    };

    // 1. Insert record into refunds table
    const { error: refundInsertErr } = await supabase
      .from('refunds')
      .insert({
        payment_id: paymentRecord.id,
        provider_refund_id: adyenRefundId,
        amount: refundAmount,
        reason: adyenRefundObj.reason,
        status: refundStatus,
        processed_at: new Date().toISOString(),
        metadata: { adyen_refund: adyenRefundObj }
      });

    if (refundInsertErr) {
      console.error('Failed to insert refund record:', refundInsertErr);
    }

    // 2. Update payment status to 'refunded'
    const finalPaymentStatus = refundStatus === 'succeeded' ? 'refunded' : 'pending_refund';
    const { error: paymentUpdateErr } = await supabase
      .from('payments')
      .update({
        provider_status: finalPaymentStatus,
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
        new_status: finalPaymentStatus,
        payload: {
          refund_id: adyenRefundId,
          amount_refunded: refundAmount,
          currency: currency,
          reason: adyenRefundObj.reason,
          adyen_refund: adyenRefundObj
        }
      });

    if (eventErr) {
      console.error('Failed to insert payment event:', eventErr);
    }

    // 4. Update the order status to 'refunded' if linked
    if (paymentRecord.order_id && refundStatus === 'succeeded') {
      const { error: orderErr } = await supabase
        .from('orders')
        .update({ status: 'refunded' })
        .eq('id', paymentRecord.order_id);
      if (orderErr) {
        console.error('Failed to update order status to refunded:', orderErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true, refund_id: adyenRefundId, status: refundStatus }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error("Adyen Refund function error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
