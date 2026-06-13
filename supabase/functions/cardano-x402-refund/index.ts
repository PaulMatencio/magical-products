/// <reference path="../deno.d.ts" />

import { handleRefundRequest } from '../../_shared/refundOrchestrator.ts';
import { PaymentRefundAdapter, RefundResult } from '../../_shared/paymentProvider.ts';
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

class CardanoRefundAdapter extends PaymentRefundAdapter {
  providerName = 'cardano_x402';

  async executeRefund(
    paymentRecord: any,
    reason: string | null,
    _reqBody: Record<string, unknown>,
    _reqHeaders: Headers,
    _supabase: SupabaseClient
  ): Promise<RefundResult> {
    const blockfrostProjectId = Deno.env.get('BLOCKFROST_PROJECT_ID') || '';
    const cardanoNetwork = Deno.env.get('CARDANO_NETWORK') || 'preprod';
    const blockfrostBaseUrl = cardanoNetwork === 'mainnet' 
      ? 'https://cardano-mainnet.blockfrost.io/api/v0' 
      : 'https://cardano-preprod.blockfrost.io/api/v0';

    const isCrypto = paymentRecord.payment_method === 'crypto';
    const feeLovelace = 200000; // Standard Cardano Preprod fee
    let refundAmount = paymentRecord.amount_paid || paymentRecord.amount_requested || 0;
    if (isCrypto && refundAmount > feeLovelace) {
      refundAmount = refundAmount - feeLovelace;
    }
    const currency = paymentRecord.requested_currency || 'USDM';
    const originalTxHash = paymentRecord.crypto_transaction_hash;

    const refundRequestId = `req_ref_${Math.random().toString(36).substring(2, 11)}`;
    const refundStatus = 'pending';

    // Identify recipient Cardano address (lookup original sender address via Blockfrost inputs)
    let payerAddress = paymentRecord.metadata?.payer_cardano_address || paymentRecord.metadata?.customer_wallet_address || '';
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

    return {
      status: 'pending',
      amountRefunded: refundAmount,
      providerRefundId: refundRequestId,
      recipientAddress: payerAddress || undefined,
      metadata: { cardano_refund: cardanoRefundObj }
    };
  }
}

Deno.serve(async (req) => {
  return handleRefundRequest(req, new CardanoRefundAdapter());
});
