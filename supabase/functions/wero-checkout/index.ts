/// <reference path="../deno.d.ts" />

import { handleCheckoutRequest } from '../../_shared/checkoutOrchestrator.ts';
import { PaymentProviderAdapter, CartItem, PaymentIntentResult, VerificationResult } from '../../_shared/paymentProvider.ts';
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

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

class WeroAdapter extends PaymentProviderAdapter {
  providerName = 'wero';

  async createCheckoutSession(
    paymentId: string,
    amountInCents: number,
    email: string | null,
    _cart: CartItem[],
    reqBody: Record<string, unknown>,
    reqHeaders: Headers,
    supabase: SupabaseClient
  ): Promise<PaymentIntentResult> {
    const apiKeyId = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_ID') || Deno.env.get('VITE_WORLDLINE_PAYMENT_APIKEY_ID') || '';
    const apiKeySecret = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_SECRET') || Deno.env.get('VITE_WORLDLINE_PAYMENT_APIKEY_SECRET') || '';
    const paymentUrl = Deno.env.get('WORLDLINE_PAYMENT_URL') || Deno.env.get('VITE_WORLDLINE_PAYMENT_URL') || '';
    const merchantId = Deno.env.get('WORLDLINE_MERCHANT_ID') || Deno.env.get('WORLDLINE_MERCHAND_ID') || Deno.env.get('VITE_WORLDLINE_MERCHAND_ID') || 'magicaltrends';
    const baseUrl = paymentUrl.replace(/\/$/, '') || 'https://payment.preprod.direct.worldline-solutions.com';

    const { data: paymentRecord, error: fetchErr } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (fetchErr || !paymentRecord) {
      throw new Error(`Payment record not found: ${fetchErr?.message || 'Unknown error'}`);
    }

    let weroTxId = `wer_tx_${Math.random().toString(36).substring(2, 11)}`;
    let redirectUrl = `https://wero-sandbox.pay/transfer?id=${weroTxId}`;
    let qrCodeData = `wero://pay?id=${weroTxId}&amount=${(paymentRecord.amount_requested / 100).toFixed(2)}&currency=EUR`;
    let isRealWorldline = false;

    if (apiKeyId && apiKeySecret && paymentUrl) {
      try {
        const originHeader = reqHeaders.get('origin') || 'http://localhost:5173';
        const returnUrl = reqBody.return_url || `${originHeader}/checkout?payment_id=${paymentId}`;

        const requestBody = {
          hostedCheckoutSpecificInput: {
            returnUrl: returnUrl,
            variant: "100"
          },
          order: {
            amountOfMoney: {
              amount: amountInCents,
              currencyCode: paymentRecord.requested_currency || "EUR"
            },
            customer: {
              billingAddress: {
                countryCode: "FR"
              },
              contactDetails: {
                emailAddress: paymentRecord.user_email || email || "test@wero.com"
              }
            }
          }
        };

        const apiPath = `/v2/${merchantId}/hostedcheckouts`;
        const apiUrl = `${baseUrl}${apiPath}`;
        const dateStr = new Date().toUTCString();
        const contentType = "application/json";

        const authHeader = await getAuthorizationHeader("POST", apiPath, contentType, dateStr, apiKeyId, apiKeySecret);

        console.log(`Initiating Worldline preprod Hosted Checkout at URL: ${apiUrl}`);
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
          weroTxId = responseData.hostedCheckoutId;
          let rawRedirect = responseData.partialRedirectUrl || '';
          if (rawRedirect && !rawRedirect.includes('payment.')) {
            rawRedirect = `payment.${rawRedirect}`;
          }
          redirectUrl = `https://${rawRedirect}`;
          qrCodeData = `wero://pay?id=${weroTxId}&amount=${(paymentRecord.amount_requested / 100).toFixed(2)}&currency=EUR`;
          isRealWorldline = true;
          console.log(`Worldline preprod Hosted Checkout session created: ${weroTxId}`);
        } else {
          const errText = await apiResponse.text();
          console.warn(`Worldline preprod API request failed: ${apiResponse.status} - ${errText}. Falling back to simulation.`);
        }
      } catch (wlInitErr) {
        console.error("Failed to connect to real Worldline preprod API, using simulation fallback.", wlInitErr);
      }
    }

    const metadata = {
      ...paymentRecord.metadata,
      wero_phone: reqBody.wero_phone || null,
      wero_mode: reqBody.wero_mode || 'phone',
      is_real_worldline: isRealWorldline
    };

    return {
      providerPaymentId: weroTxId,
      metadata,
      wero_tx_id: weroTxId,
      qrCodeData,
      redirectUrl,
      is_real_worldline: isRealWorldline
    } as any;
  }

  async verifyPaymentStatus(
    paymentRecord: any,
    _sessionIdOrTxHash: string | null,
    reqBody: Record<string, unknown>,
    _reqHeaders: Headers,
    _supabase: SupabaseClient
  ): Promise<VerificationResult> {
    const apiKeyId = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_ID') || Deno.env.get('VITE_WORLDLINE_PAYMENT_APIKEY_ID') || '';
    const apiKeySecret = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_SECRET') || Deno.env.get('VITE_WORLDLINE_PAYMENT_APIKEY_SECRET') || '';
    const paymentUrl = Deno.env.get('WORLDLINE_PAYMENT_URL') || Deno.env.get('VITE_WORLDLINE_PAYMENT_URL') || '';
    const merchantId = Deno.env.get('WORLDLINE_MERCHANT_ID') || Deno.env.get('WORLDLINE_MERCHAND_ID') || Deno.env.get('VITE_WORLDLINE_MERCHAND_ID') || 'magicaltrends';
    const baseUrl = paymentUrl.replace(/\/$/, '') || 'https://payment.preprod.direct.worldline-solutions.com';

    let finalStatus = reqBody.status || 'succeeded';
    let worldlinePaymentId = paymentRecord.metadata?.worldline_payment_id || null;

    const isRealWorldline = paymentRecord.provider_payment_id && !paymentRecord.provider_payment_id.startsWith('wer_tx_');
    if (isRealWorldline && apiKeyId && apiKeySecret) {
      try {
        const apiPath = `/v2/${merchantId}/hostedcheckouts/${paymentRecord.provider_payment_id}`;
        const apiUrl = `${baseUrl}${apiPath}`;
        const dateStr = new Date().toUTCString();
        const authHeader = await getAuthorizationHeader("GET", apiPath, "", dateStr, apiKeyId, apiKeySecret);

        const apiResponse = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Date": dateStr,
            "Authorization": authHeader
          }
        });

        if (apiResponse.ok) {
          const responseData = await apiResponse.json();
          console.log(`Worldline status response:`, responseData);

          const wlStatus = responseData.status;
          const paymentObj = responseData.createdPaymentOutput?.payment;
          const paymentStatus = paymentObj?.status;
          const statusCategory = paymentObj?.statusOutput?.statusCategory;

          worldlinePaymentId = paymentObj?.id || null;

          if (wlStatus === 'PAYMENT_CREATED' && (statusCategory === 'SUCCESSFUL' || paymentStatus === 'CAPTURED' || paymentStatus === 'AUTHORISED')) {
            finalStatus = 'succeeded';
          } else if (wlStatus === 'EXPIRED' || statusCategory === 'UNSUCCESSFUL' || paymentStatus === 'REJECTED') {
            finalStatus = 'failed';
          } else {
            finalStatus = 'pending';
          }
        } else {
          console.error(`Worldline Connect API Get Status failed: ${apiResponse.status}`);
        }
      } catch (wlErr) {
        console.error("Error fetching status from Worldline preprod API:", wlErr);
      }
    }

    const metadata = {
      ...paymentRecord.metadata,
      worldline_payment_id: worldlinePaymentId
    };

    return {
      status: finalStatus as any,
      amountPaid: paymentRecord.amount_requested,
      providerPaymentId: worldlinePaymentId || paymentRecord.provider_payment_id,
      paymentMethodUsed: 'wero',
      metadata
    };
  }
}

Deno.serve(async (req) => {
  return handleCheckoutRequest(req, new WeroAdapter());
});
