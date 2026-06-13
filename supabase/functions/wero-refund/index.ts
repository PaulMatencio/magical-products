/// <reference path="../deno.d.ts" />

import { handleRefundRequest } from '../_shared/refundOrchestrator.ts';
import { PaymentRefundAdapter, RefundResult } from '../_shared/paymentProvider.ts';

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

class WeroRefundAdapter extends PaymentRefundAdapter {
  providerName = 'wero';

  async executeRefund(
    paymentRecord: any,
    reason: string | null,
    _reqBody: any,
    _reqHeaders: Headers,
    _supabase: any
  ): Promise<RefundResult> {
    const apiKeyId = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_ID') || Deno.env.get('VITE_WORLDLINE_PAYMENT_APIKEY_ID') || Deno.env.get('WORDLINE_PAYMENT_APIKEY_ID') || '';
    const apiKeySecret = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_SECRET') || Deno.env.get('VITE_WORLDLINE_PAYMENT_APIKEY_SECRET') || Deno.env.get('WORDLINE_PAYMENT_APIKEY_SECRET') || '';
    const paymentUrl = Deno.env.get('WORLDLINE_PAYMENT_URL') || Deno.env.get('VITE_WORLDLINE_PAYMENT_URL') || Deno.env.get('WORDLINE_PAYMENT_URL') || '';
    const merchantId = Deno.env.get('WORLDLINE_MERCHANT_ID') || Deno.env.get('WORLDLINE_MERCHAND_ID') || Deno.env.get('VITE_WORLDLINE_MERCHAND_ID') || 'magicaltrends';
    const baseUrl = paymentUrl.replace(/\/$/, '') || 'https://payment.preprod.direct.worldline-solutions.com';

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
        const apiPath = `/v2/${merchantId}/payments/${realPaymentId}/refund`;
        const apiUrl = `${baseUrl}${apiPath}`;
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

    return {
      status: refundStatus as any,
      amountRefunded: refundAmount,
      providerRefundId: weroRefundId,
      metadata: { wero_refund: weroRefundObj }
    };
  }
}

Deno.serve(async (req) => {
  return handleRefundRequest(req, new WeroRefundAdapter());
});
