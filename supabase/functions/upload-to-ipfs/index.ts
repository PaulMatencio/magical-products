/// <reference path="../deno.d.ts" />

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
};

Deno.serve(async (req) => {
  // 1. Handle CORS preflight request immediately
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 2. Retrieve Pinata JWT from environment secrets
    const pinataJwt = Deno.env.get('PINATA_JWT') || Deno.env.get('VITE_PINATA_JWT');
    if (!pinataJwt) {
      return new Response(
        JSON.stringify({ error: 'PINATA_JWT or VITE_PINATA_JWT secret is not configured in Supabase environment secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const cleanJwt = pinataJwt.replace(/^["']|["']$/g, '');

    // --- DIAGNOSTIC AUTH TEST (GET) ---
    if (req.method === 'GET') {
      const response = await fetch('https://api.pinata.cloud/data/testAuthentication', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cleanJwt}`,
        },
      });
      const data = await response.text();
      return new Response(
        JSON.stringify({ 
          status: response.status,
          body: data,
          rawJwtLength: pinataJwt.length,
          cleanJwtLength: cleanJwt.length,
          hasQuotes: pinataJwt.startsWith('"') || pinataJwt.startsWith("'")
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- HANDLE UNPINNING (DELETE) ---
    if (req.method === 'DELETE') {
      const url = new URL(req.url);
      const cid = url.searchParams.get('cid');
      if (!cid) {
        return new Response(
          JSON.stringify({ error: 'Invalid request: Missing "cid" query parameter.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const pinataUnpinUrl = Deno.env.get('PINATA_UNPIN_URL') || 'https://api.pinata.cloud/pinning/unpin';
      
      const pinataResponse = await fetch(`${pinataUnpinUrl.replace(/\/+$/, '')}/${cid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${cleanJwt}`,
        },
      });

      if (!pinataResponse.ok && pinataResponse.status !== 404) {
        let errorMsg = pinataResponse.statusText;
        try {
          const errData = await pinataResponse.json();
          errorMsg = errData?.error?.details || errData?.error || errData?.message || errorMsg;
        } catch (_) {}
        return new Response(
          JSON.stringify({ error: `Pinata unpin failed: ${errorMsg}` }),
          { status: pinataResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- HANDLE PINNING (POST) ---
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: Request must be multipart/form-data.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Read raw request body as arrayBuffer to preserve binary integrity (e.g. image files)
    const body = await req.arrayBuffer();

    // 4. Forward the payload to Pinata API with server-secured authorization
    const pinataResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cleanJwt}`,
        'Content-Type': contentType,
      },
      body: body,
    });

    const data = await pinataResponse.json();

    return new Response(JSON.stringify(data), {
      status: pinataResponse.status,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
