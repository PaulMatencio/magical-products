/// <reference path="../deno.d.ts" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const blockfrostProjectId = Deno.env.get('BLOCKFROST_PROJECT_ID') || '';
    const cardanoNetwork = Deno.env.get('CARDANO_NETWORK') || 'preprod';
    const usdmPolicyAsset = Deno.env.get('CARDANO_USDM_POLICY_ASSET') || 'c4868454a43be0a4f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f55553444d';

    const blockfrostBaseUrl = cardanoNetwork === 'mainnet' 
      ? 'https://cardano-mainnet.blockfrost.io/api/v0' 
      : 'https://cardano-preprod.blockfrost.io/api/v0';

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { payment_id, order_id, reason } = await req.json().catch(() => ({}));

    let paymentRecord;
    if (payment_id) {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('id', payment_id)
        .single();
      if (error || !data) {
        throw new Error(`Payment record not found for ID ${payment_id}`);
      }
      paymentRecord = data;
    } else if (order_id) {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('order_id', order_id)
        .maybeSingle();
      if (error || !data) {
        throw new Error(`Payment record not found for Order ID ${order_id}`);
      }
      paymentRecord = data;
    } else {
      throw new Error('Either payment_id or order_id must be provided.');
    }

    if (paymentRecord.provider_status !== 'succeeded') {
      throw new Error(`Cannot refund payment in state: ${paymentRecord.provider_status}`);
    }

    const refundAmount = paymentRecord.amount_paid || paymentRecord.amount_requested;
    const currency = paymentRecord.requested_currency || 'USDM';
    const originalTxHash = paymentRecord.crypto_transaction_hash;

    const refundRequestId = `req_ref_${Math.random().toString(36).substring(2, 11)}`;
    const refundStatus = 'pending'; // Stays pending for secure manual / off-chain execution

    // 1. Identify recipient Cardano address (lookup original sender address via Blockfrost inputs)
    let payerAddress = paymentRecord.metadata?.payer_cardano_address || '';
    if (!payerAddress && originalTxHash && blockfrostProjectId) {
      try {
        console.log(`Resolving sender address for transaction ${originalTxHash}...`);
        const txRes = await fetch(`${blockfrostBaseUrl}/txs/${originalTxHash}/utxos`, {
          headers: { 'project_id': blockfrostProjectId }
        });
        if (txRes.ok) {
          const txData = await txRes.json();
          if (txData.inputs && txData.inputs.length > 0) {
            payerAddress = txData.inputs[0].address;
          }
        }
      } catch (err) {
        console.error("Error resolving payer address:", err);
      }
    }

    const cardanoRefundObj = {
      id: refundRequestId,
      amount: refundAmount,
      reason: reason || 'requested_by_customer',
      status: refundStatus,
      currency: currency,
      provider: 'cardano_x402',
      refunded_at: new Date().toISOString(),
      recipient_address: payerAddress || 'unknown',
      is_real_refund: false,
    };

    // 1. Insert record into refunds table
    await supabase
      .from('refunds')
      .insert({
        payment_id: paymentRecord.id,
        provider_refund_id: refundRequestId,
        amount: refundAmount,
        reason: cardanoRefundObj.reason,
        status: refundStatus,
        processed_at: new Date().toISOString(),
        metadata: { cardano_refund: cardanoRefundObj }
      });

    // 2. Update payment status to pending_refund
    const finalPaymentStatus = 'pending_refund';
    await supabase
      .from('payments')
      .update({
        provider_status: finalPaymentStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentRecord.id);

    // 3. Log event
    await supabase
      .from('payment_events')
      .insert({
        payment_id: paymentRecord.id,
        event_type: 'payment.refunded',
        old_status: paymentRecord.provider_status,
        new_status: finalPaymentStatus,
        payload: {
          refund_id: refundRequestId,
          amount_refunded: refundAmount,
          currency: currency,
          reason: cardanoRefundObj.reason,
          cardano_refund: cardanoRefundObj
        }
      });

    return new Response(
      JSON.stringify({ success: true, refund_id: refundRequestId, status: refundStatus }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Cardano Refund processing error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
