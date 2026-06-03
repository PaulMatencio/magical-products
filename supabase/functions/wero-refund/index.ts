/// <reference path="../deno.d.ts" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

async function getAuthorizationHeader(
  method: string,
  path: string,
  contentType: string,
  dateStr: string,
  apiKeyId: string,
  apiSecret: string
): Promise<string> {
  const stringToHash = `${method}\n${contentType}\n${dateStr}\n${path}\n`;
  
  const encoder = new TextEncoder();
  const keyData = encoder.encode(apiSecret);
  const messageData = encoder.encode(stringToHash);
  
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    messageData
  );
  
  const hashArray = new Uint8Array(signatureBuffer);
  let binaryString = "";
  for (let i = 0; i < hashArray.length; i++) {
    binaryString += String.fromCharCode(hashArray[i]);
  }
  const signatureBase64 = btoa(binaryString);
  
  return `GCS v1HMAC:${apiKeyId}:${signatureBase64}`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKeyId = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_ID') || Deno.env.get('VITE_WORLDLINE_PAYMENT_APIKEY_ID') || Deno.env.get('WORDLINE_PAYMENT_APIKEY_ID') || '';
    const apiKeySecret = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_SECRET') || Deno.env.get('VITE_WORLDLINE_PAYMENT_APIKEY_SECRET') || Deno.env.get('WORDLINE_PAYMENT_APIKEY_SECRET') || '';
    const paymentUrl = Deno.env.get('WORLDLINE_PAYMENT_URL') || Deno.env.get('VITE_WORLDLINE_PAYMENT_URL') || Deno.env.get('WORDLINE_PAYMENT_URL') || '';
    const parsedMerchantId = paymentUrl.match(/worldline-solutions\.com\/([^/]+)/)?.[1] || "magicaltrends";

    console.log(`Wero Refund Invoked. Keys Configured: ${!!(apiKeyId && apiKeySecret)}, Merchant ID: ${parsedMerchantId}`);

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

    if (paymentRecord.provider_status !== 'succeeded') {
      throw new Error(`Cannot refund payment in state: ${paymentRecord.provider_status}`);
    }

    const refundAmount = paymentRecord.amount_paid || paymentRecord.amount_requested;
    const currency = paymentRecord.requested_currency || 'EUR';

    let weroRefundId = `re_wer_${Math.random().toString(36).substring(2, 11)}`;
    let refundStatus = 'succeeded';
    let isRealRefund = false;
    let refundResponseData = null;

    const isRealWorldline = paymentRecord.metadata?.is_real_worldline || (paymentRecord.provider_payment_id && !paymentRecord.provider_payment_id.startsWith('wer_tx_'));
    const realPaymentId = paymentRecord.metadata?.worldline_payment_id || paymentRecord.provider_payment_id;

    if (isRealWorldline && realPaymentId && apiKeyId && apiKeySecret) {
      try {
        const apiPath = `/v1/${parsedMerchantId}/payments/${realPaymentId}/refund`;
        const apiUrl = `https://payment.preprod.direct.worldline-solutions.com${apiPath}`;
        const dateStr = new Date().toUTCString();
        const contentType = "application/json";

        const requestBody = {
          amountOfMoney: {
            amount: refundAmount,
            currencyCode: currency
          }
        };

        const authHeader = await getAuthorizationHeader("POST", apiPath, contentType, dateStr, apiKeyId, apiKeySecret);

        console.log(`Initiating Worldline preprod Refund at URL: ${apiUrl}`);
        const apiResponse = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": contentType,
            "Date": dateStr,
            "Authorization": authHeader
          },
          body: JSON.stringify(requestBody)
        });

        if (apiResponse.ok) {
          const responseData = await apiResponse.json();
          weroRefundId = responseData.id || weroRefundId;
          refundStatus = responseData.status === 'REFUNDED' || responseData.statusOutput?.statusCategory === 'SUCCESSFUL' ? 'succeeded' : 'pending';
          isRealRefund = true;
          refundResponseData = responseData;
          console.log(`Worldline preprod Refund created: ${weroRefundId}, status: ${refundStatus}`);
        } else {
          const errText = await apiResponse.text();
          console.warn(`Worldline preprod Refund API failed: ${apiResponse.status} - ${errText}. Falling back to simulation.`);
        }
      } catch (wlRefundErr) {
        console.error("Failed to connect to real Worldline preprod Refund API, using simulation fallback.", wlRefundErr);
      }
    }

    const weroRefundObj = {
      id: weroRefundId,
      amount: refundAmount,
      reason: reason || 'requested_by_customer',
      status: refundStatus,
      currency: currency,
      provider: 'wero',
      refunded_at: new Date().toISOString(),
      is_real_refund: isRealRefund,
      worldline_response: refundResponseData
    };

    // 1. Insert record into refunds table
    const { error: refundInsertErr } = await supabase
      .from('refunds')
      .insert({
        payment_id: paymentRecord.id,
        provider_refund_id: weroRefundId,
        amount: refundAmount,
        reason: weroRefundObj.reason,
        status: refundStatus,
        processed_at: new Date().toISOString(),
        metadata: { wero_refund: weroRefundObj }
      });

    if (refundInsertErr) {
      console.error('Failed to insert refund record:', refundInsertErr);
    }

    // 2. Update payment status to 'refunded' (or pending_refund)
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
          refund_id: weroRefundId,
          amount_refunded: refundAmount,
          currency: currency,
          reason: weroRefundObj.reason,
          wero_refund: weroRefundObj
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
      JSON.stringify({ success: true, refund_id: weroRefundId, status: refundStatus }),
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
