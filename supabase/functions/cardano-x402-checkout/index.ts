/// <reference path="../deno.d.ts" />

import { handleCheckoutRequest, corsHeaders } from '../_shared/checkoutOrchestrator.ts';
import { PaymentProviderAdapter, CartItem, PaymentIntentResult, VerificationResult } from '../_shared/paymentProvider.ts';

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

class CardanoAdapter extends PaymentProviderAdapter {
  providerName = 'cardano_x402';

  async handleCustomAction(
    action: string,
    body: any,
    _reqHeaders: Headers,
    _supabase: any
  ): Promise<Response | null> {
    if (action === 'submit_tx') {
      const { txHex } = body;
      if (!txHex) {
        throw new Error('Missing transaction hex (txHex) in submit request.');
      }

      const cardanoNetwork = Deno.env.get('CARDANO_NETWORK') || 'preprod';
      const blockfrostProjectId = Deno.env.get('BLOCKFROST_PROJECT_ID') || '';
      const blockfrostBaseUrl = cardanoNetwork === 'mainnet' 
        ? 'https://cardano-mainnet.blockfrost.io/api/v0' 
        : 'https://cardano-preprod.blockfrost.io/api/v0';

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
    return null;
  }

  async createCheckoutSession(
    paymentId: string,
    _amountInCents: number,
    _email: string | null,
    _cart: CartItem[],
    _reqBody: any,
    _reqHeaders: Headers,
    supabase: any
  ): Promise<PaymentIntentResult> {
    const cardanoNetwork = Deno.env.get('CARDANO_NETWORK') || 'preprod';
    const targetAddress = Deno.env.get('CARDANO_TARGET_ADDRESS') || 'addr_test1qp98z50aselep9dc0rsnfx55l5lvzrjc3k8w5hnuvp98exc4uf3y5cpku5etafrsjtpmyr3uhph67qh6nq9t0vvav6gslc696y'; 
    const usdmPolicyAsset = Deno.env.get('CARDANO_USDM_POLICY_ASSET') || 'c4868454a43be0a4f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f55553444d';

    const { data: paymentRecord, error: fetchErr } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (fetchErr || !paymentRecord) {
      throw new Error(`Payment record not found: ${fetchErr?.message || 'Unknown error'}`);
    }

    const providerPaymentId = `x402_${paymentId}`;

    const { error: dbUpdateErr } = await supabase
      .from('payments')
      .update({
        crypto_address: targetAddress,
        crypto_network: cardanoNetwork
      })
      .eq('id', paymentId);

    if (dbUpdateErr) {
      console.error(`Failed to save cardano crypto address to payment record ${paymentId}:`, dbUpdateErr);
    }

    return {
      providerPaymentId: providerPaymentId,
      status: 402,
      requirements: {
        amount: paymentRecord.amount_requested.toString(),
        asset: paymentRecord.requested_currency === 'ADA' ? 'lovelace' : usdmPolicyAsset,
        payTo: targetAddress,
      }
    } as any;
  }

  async verifyPaymentStatus(
    paymentRecord: any,
    sessionIdOrTxHash: string | null,
    _reqBody: any,
    _reqHeaders: Headers,
    supabase: any
  ): Promise<VerificationResult> {
    const blockfrostProjectId = Deno.env.get('BLOCKFROST_PROJECT_ID') || '';
    const cardanoNetwork = Deno.env.get('CARDANO_NETWORK') || 'preprod';
    const targetAddress = Deno.env.get('CARDANO_TARGET_ADDRESS') || 'addr_test1qp98z50aselep9dc0rsnfx55l5lvzrjc3k8w5hnuvp98exc4uf3y5cpku5etafrsjtpmyr3uhph67qh6nq9t0vvav6gslc696y'; 
    const usdmPolicyAsset = Deno.env.get('CARDANO_USDM_POLICY_ASSET') || 'c4868454a43be0a4f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f55553444d';
    const blockfrostBaseUrl = cardanoNetwork === 'mainnet' 
      ? 'https://cardano-mainnet.blockfrost.io/api/v0' 
      : 'https://cardano-preprod.blockfrost.io/api/v0';

    const activeTxHash = sessionIdOrTxHash || paymentRecord.crypto_transaction_hash;
    if (!activeTxHash) {
      throw new Error('No transaction hash found to confirm this payment.');
    }

    const { data: dupTxRecord } = await supabase
      .from('payments')
      .select('id')
      .eq('crypto_transaction_hash', activeTxHash)
      .neq('id', paymentRecord.id)
      .eq('provider_status', 'succeeded')
      .maybeSingle();

    if (dupTxRecord) {
      throw new Error('Transaction hash has already been redeemed for another payment.');
    }

    console.log(`Checking UTxO outputs for transaction: ${activeTxHash} on ${cardanoNetwork}`);
    const utxoRes = await fetch(`${blockfrostBaseUrl}/txs/${activeTxHash}/utxos`, {
      headers: { 'project_id': blockfrostProjectId }
    });

    if (!utxoRes.ok) {
      return {
        status: 'pending',
        error: 'Transaction not found on-chain yet.'
      };
    }

    const utxoData = await utxoRes.json();
    const expectedAmount = Number(paymentRecord.amount_requested);
    let paymentAmountReceived = 0;
    let targetOutputFound = false;

    for (const output of utxoData.outputs) {
      if (output.address === targetAddress) {
        targetOutputFound = true;
        if (paymentRecord.requested_currency === 'ADA') {
          const lovelaceAsset = output.amount.find((a: any) => a.unit === 'lovelace');
          if (lovelaceAsset) {
            paymentAmountReceived += Number(lovelaceAsset.quantity);
          }
        } else {
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

    const { error: hashUpdateErr } = await supabase
      .from('payments')
      .update({ crypto_transaction_hash: activeTxHash })
      .eq('id', paymentRecord.id);

    if (hashUpdateErr) {
      console.error(`Failed to update crypto_transaction_hash on payments for ${paymentRecord.id}:`, hashUpdateErr);
    }

    return {
      status: 'succeeded',
      amountPaid: paymentAmountReceived,
      providerPaymentId: `x402_${paymentRecord.id}`,
      paymentMethodUsed: 'cardano_x402',
    };
  }
}

Deno.serve(async (req) => {
  return handleCheckoutRequest(req, new CardanoAdapter());
});
