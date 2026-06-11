/// <reference path="../deno.d.ts" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-payment',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Helper to convert hexadecimal string to Uint8Array binary for Cardano transaction submit
function hexToUint8Array(hexString: string): Uint8Array {
  const cleanHex = hexString.startsWith("0x") ? hexString.slice(2) : hexString;
  const len = cleanHex.length;
  const u8 = new Uint8Array(len / 2);
  for (let i = 0; i < len; i += 2) {
    u8[i / 2] = parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return u8;
}

Deno.serve(async (req) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const blockfrostProjectId = Deno.env.get('BLOCKFROST_PROJECT_ID') || '';
    const cardanoNetwork = Deno.env.get('CARDANO_NETWORK') || 'preprod'; // preprod or mainnet
    const targetAddress = Deno.env.get('CARDANO_TARGET_ADDRESS') || 'addr_test1qp98z50aselep9dc0rsnfx55l5lvzrjc3k8w5hnuvp98exc4uf3y5cpku5etafrsjtpmyr3uhph67qh6nq9t0vvav6gslc696y'; 
    const usdmPolicyAsset = Deno.env.get('CARDANO_USDM_POLICY_ASSET') || 'c4868454a43be0a4f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f55553444d';

    const blockfrostBaseUrl = cardanoNetwork === 'mainnet' 
      ? 'https://cardano-mainnet.blockfrost.io/api/v0' 
      : 'https://cardano-preprod.blockfrost.io/api/v0';

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json().catch(() => ({}));
    const { action, payment_id, txHex, txHash: inputTxHash, cart } = body;

    // --- Action: Submit Raw Signed Transaction Hex (Route 1) ---
    if (action === 'submit_tx') {
      if (!txHex) {
        throw new Error('Missing transaction hex (txHex) in submit request.');
      }

      const txBinary = hexToUint8Array(txHex);

      console.log(`Submitting raw Cardano transaction to Blockfrost (${cardanoNetwork})...`);
      const submitRes = await fetch(`${blockfrostBaseUrl}/tx/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/cbor',
          'project_id': blockfrostProjectId,
        },
        body: txBinary as any,
      });

      if (!submitRes.ok) {
        const errorText = await submitRes.text();
        throw new Error(`Blockfrost submission failed: ${errorText}`);
      }

      const txHash = await submitRes.json();
      return new Response(
        JSON.stringify({ success: true, txHash }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- Action: Confirm / Verify Payment Status ---
    if (action === 'confirm' || (action === undefined && payment_id && inputTxHash)) {
      if (!payment_id) {
        throw new Error('Missing payment_id for confirmation.');
      }

      // Fetch payment record
      const { data: paymentRecord, error: fetchErr } = await supabase
        .from('payments')
        .select('*')
        .eq('id', payment_id)
        .single();

      if (fetchErr || !paymentRecord) {
        throw new Error(`Payment record not found: ${fetchErr?.message || 'Unknown error'}`);
      }

      if (paymentRecord.provider_status === 'succeeded' || paymentRecord.provider_status === 'failed' || paymentRecord.provider_status === 'cancelled') {
        return new Response(
          JSON.stringify({ status: paymentRecord.provider_status, order_id: paymentRecord.order_id }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify the transaction hash
      const activeTxHash = inputTxHash || paymentRecord.crypto_transaction_hash;
      if (!activeTxHash) {
        throw new Error('No transaction hash found to confirm this payment.');
      }

      // 1. Double-Spend Protection: Check if this transaction hash was already used by another payment
      const { data: dupTxRecord } = await supabase
        .from('payments')
        .select('id')
        .eq('crypto_transaction_hash', activeTxHash)
        .neq('id', payment_id)
        .eq('provider_status', 'succeeded')
        .maybeSingle();

      if (dupTxRecord) {
        throw new Error('Transaction hash has already been redeemed for another payment.');
      }

      // 2. Fetch transaction UTxO details from Blockfrost
      console.log(`Checking UTxO outputs for transaction: ${activeTxHash} on ${cardanoNetwork}`);
      const utxoRes = await fetch(`${blockfrostBaseUrl}/txs/${activeTxHash}/utxos`, {
        headers: { 'project_id': blockfrostProjectId }
      });

      if (!utxoRes.ok) {
        // Transaction might not be mined/indexed yet, return pending status
        return new Response(
          JSON.stringify({ status: 'pending', message: 'Transaction not found on-chain yet.' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const utxoData = await utxoRes.json();
      
      // We expect the amount_requested in smallest crypto units (or cents for stablecoins like USDM)
      const expectedAmount = Number(paymentRecord.amount_requested);
      let paymentAmountReceived = 0;
      let targetOutputFound = false;

      // Scan through all transaction outputs for destination address & correct assets
      for (const output of utxoData.outputs) {
        if (output.address === targetAddress) {
          targetOutputFound = true;
          // Look for USDM or ADA (lovelace) depending on what was requested
          if (paymentRecord.requested_currency === 'ADA') {
            const lovelaceAsset = output.amount.find((a: any) => a.unit === 'lovelace');
            if (lovelaceAsset) {
              paymentAmountReceived += Number(lovelaceAsset.quantity);
            }
          } else {
            // Token/USDM asset
            const targetAsset = output.amount.find((a: any) => a.unit === usdmPolicyAsset);
            if (targetAsset) {
              paymentAmountReceived += Number(targetAsset.quantity);
            }
          }
        }
      }

      if (!targetOutputFound || paymentAmountReceived < expectedAmount) {
        throw new Error(`Insufficient payment received. Expected: ${expectedAmount}, Received: ${paymentAmountReceived}`);
      }

      // 3. Complete and create order
      let orderId = paymentRecord.order_id;
      if (!orderId) {
        const meta = paymentRecord.metadata || {};
        const cartItems = meta.cart || [];
        const totalPrice = paymentRecord.fiat_amount_cents 
          ? (paymentRecord.fiat_amount_cents / 100) 
          : (paymentRecord.amount_requested / 100); // fallback

        const shippingAddress = meta.shipping_address || '';
        const userPhone = meta.user_phone || '';
        const userEmail = meta.invoice_email || paymentRecord.user_email || '';
        const userId = paymentRecord.user_id || null;

        const { data: orderData, error: orderError } = await supabase.rpc('create_order_with_outbox', {
          p_items: cartItems,
          p_total_price: totalPrice,
          p_payment_method: 'cardano_x402',
          p_shipping_address: shippingAddress,
          p_user_phone: userPhone,
          p_user_email: userEmail,
          p_user_id: userId,
          p_event_type: 'OrderCreated',
          p_event_payload: { items: cartItems, total_price: totalPrice },
          p_payment_id: payment_id
        });

        if (orderError) {
          console.error(`Failed to create order via RPC:`, orderError);
        } else if (orderData?.id) {
          orderId = orderData.id;
        }
      }

      // 4. Update payment record
      await supabase
        .from('payments')
        .update({
          provider_status: 'succeeded',
          amount_paid: paymentAmountReceived,
          completed_at: new Date().toISOString(),
          crypto_transaction_hash: activeTxHash,
          order_id: orderId || null,
        })
        .eq('id', payment_id);

      return new Response(
        JSON.stringify({ status: 'succeeded', order_id: orderId }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- Action: Initiate Payment (Create Session/Requirements) ---
    if (!payment_id) {
      throw new Error('Missing payment_id in request.');
    }

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

    // Return the x402 payment requirements
    const providerPaymentId = `x402_${payment_id}`;
    
    // Save provider payment ID to database
    await supabase
      .from('payments')
      .update({
        provider_payment_id: providerPaymentId,
        crypto_address: targetAddress,
        crypto_network: cardanoNetwork
      })
      .eq('id', payment_id);

    return new Response(
      JSON.stringify({
        status: 402, // x402 status embedded
        requirements: {
          amount: paymentRecord.amount_requested.toString(),
          asset: paymentRecord.requested_currency === 'ADA' ? 'lovelace' : usdmPolicyAsset,
          payTo: targetAddress,
        }
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
