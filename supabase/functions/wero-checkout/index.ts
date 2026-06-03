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
    const apiKeyId = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_ID') || Deno.env.get('VITE_WORLDLINE_PAYMENT_APIKEY_ID') || '';
    const apiKeySecret = Deno.env.get('WORLDLINE_PAYMENT_APIKEY_SECRET') || Deno.env.get('VITE_WORLDLINE_PAYMENT_APIKEY_SECRET') || '';
    const paymentUrl = Deno.env.get('WORLDLINE_PAYMENT_URL') || Deno.env.get('VITE_WORLDLINE_PAYMENT_URL') || '';
    const merchantId = Deno.env.get('WORLDLINE_MERCHANT_ID') || Deno.env.get('WORLDLINE_MERCHAND_ID') || Deno.env.get('VITE_WORLDLINE_MERCHAND_ID') || 'magicaltrends';
    const baseUrl = paymentUrl.replace(/\/$/, '') || 'https://payment.preprod.direct.worldline-solutions.com';

    console.log(`Wero Checkout Invoked. Keys Configured: ${!!(apiKeyId && apiKeySecret)}, Merchant ID: ${merchantId}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { action, payment_id, status, wero_phone, wero_mode, cart, invoice_email } = body;

    // --- 1. Confirm/Verify Payment Status ---
    if (action === 'confirm' || (payment_id && !cart)) {
      if (!payment_id) {
        throw new Error('Missing payment_id for confirmation.');
      }

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

      let finalStatus = status || 'succeeded';
      let worldlinePaymentId = paymentRecord.metadata?.worldline_payment_id || null;

      // If it is a real Worldline session, check the status from Worldline Connect API
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
              // Still pending / customer filling form
              finalStatus = 'pending';
            }
          } else {
            console.error(`Worldline Connect API Get Status failed: ${apiResponse.status}`);
          }
        } catch (wlErr) {
          console.error("Error fetching status from Worldline preprod API:", wlErr);
        }
      }

      if (finalStatus === 'succeeded') {
        let orderId = paymentRecord.order_id;

        if (!orderId) {
          const meta = paymentRecord.metadata || {};
          const cartItems = meta.cart || [];
          const totalPrice = paymentRecord.amount_requested ? (paymentRecord.amount_requested / 100) : 0;
          const shippingAddress = meta.shipping_address || '';
          const userPhone = meta.user_phone || '';
          const userEmail = meta.invoice_email || paymentRecord.user_email || '';
          const userId = paymentRecord.user_id || null;

          const { data: orderData, error: orderError } = await supabase.rpc('create_order_with_outbox', {
            p_items: cartItems,
            p_total_price: totalPrice,
            p_payment_method: 'wero',
            p_shipping_address: shippingAddress,
            p_user_phone: userPhone,
            p_user_email: userEmail,
            p_user_id: userId,
            p_event_type: 'OrderCreated',
            p_event_payload: { items: cartItems, total_price: totalPrice },
            p_payment_id: payment_id
          });

          if (orderError) {
            console.error(`Failed to create order via RPC in confirm:`, orderError);
            throw new Error(`Failed to create order: ${orderError.message}`);
          } else if (orderData?.id) {
            orderId = orderData.id;
          }
        } else {
          const { error: orderUpdateErr } = await supabase
            .from('orders')
            .update({ payment_method: 'wero' })
            .eq('id', orderId);
          if (orderUpdateErr) {
            console.error(`Failed to update order ${orderId} payment method:`, orderUpdateErr);
          }
        }

        const { error: updateErr } = await supabase
          .from('payments')
          .update({
            provider_status: 'succeeded',
            amount_paid: paymentRecord.amount_requested,
            completed_at: new Date().toISOString(),
            order_id: orderId || null,
            metadata: {
              ...paymentRecord.metadata,
              worldline_payment_id: worldlinePaymentId
            }
          })
          .eq('id', payment_id);

        if (updateErr) {
          console.error(`Failed to update payment record ${payment_id}:`, updateErr);
        }

        return new Response(
          JSON.stringify({ status: 'succeeded', order_id: orderId }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else if (finalStatus === 'cancelled' || finalStatus === 'failed') {
        const dbStatus = finalStatus === 'cancelled' ? 'cancelled' : 'failed';

        await supabase
          .from('payments')
          .update({
            provider_status: dbStatus,
            completed_at: new Date().toISOString()
          })
          .eq('id', payment_id);

        if (paymentRecord.order_id) {
          const { error: cancelErr } = await supabase.rpc('cancel_order_with_inventory', {
            p_order_id: paymentRecord.order_id
          });
          if (cancelErr) console.error("Failed to cancel order:", cancelErr);
        }

        return new Response(
          JSON.stringify({ status: dbStatus, order_id: paymentRecord.order_id }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        // Return active pending status
        return new Response(
          JSON.stringify({ status: 'pending', order_id: paymentRecord.order_id }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // --- 2. Initiate Wero Payment ---
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

    let weroTxId = `wer_tx_${Math.random().toString(36).substring(2, 11)}`;
    let redirectUrl = `https://wero-sandbox.pay/transfer?id=${weroTxId}`;
    let qrCodeData = `wero://pay?id=${weroTxId}&amount=${(paymentRecord.amount_requested / 100).toFixed(2)}&currency=EUR`;
    let isRealWorldline = false;

    // If real keys are present, construct signature and query Worldline Direct API
    if (apiKeyId && apiKeySecret && paymentUrl) {
      try {
        const originHeader = req.headers.get('origin') || 'http://localhost:5173';
        const returnUrl = `${originHeader}/checkout?payment_id=${payment_id}`;
        const amountInCents = Math.round(Number(paymentRecord.amount_requested));

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
                emailAddress: paymentRecord.user_email || paymentRecord.metadata?.invoice_email || "test@wero.com"
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
          redirectUrl = `https://${responseData.partialRedirectUrl}`;
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

    const { error: dbUpdateErr } = await supabase
      .from('payments')
      .update({
        provider_payment_id: weroTxId,
        metadata: {
          ...paymentRecord.metadata,
          wero_phone: wero_phone || null,
          wero_mode: wero_mode || 'phone',
          is_real_worldline: isRealWorldline
        }
      })
      .eq('id', payment_id);

    if (dbUpdateErr) {
      console.error(`Failed to save wero tx ID to payment record ${payment_id}:`, dbUpdateErr);
    }

    return new Response(
      JSON.stringify({
        wero_tx_id: weroTxId,
        qrCodeData,
        redirectUrl,
        is_real_worldline: isRealWorldline
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
