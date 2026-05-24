## install supabase cli on your local machine ( node.js)
npm install -g supabase

## set the pinata jwt secret
npx  supabase secrets set PINATA_JWT="your_pinata_jwt_here"

## deploy the edge function

**Run the deployment command from the root folder:**

**Supabase CLI is looking for the folder ./supabase/functions/upload-to-ipfs/index.ts**

npx supabase functions deploy upload-to-ipfs --no-verify-jwt

**Selected project**: cejwvvmvdjnbgrckjczg
**WARNING**: Docker is not running
**Uploading asset (upload-to-ipfs): supabase/functions/upload-to-ipfs/index.ts**
**Deployed Functions on project cejwvvmvdjnbgrckjczg: upload-to-ipfs**
**You can inspect your deployment in the Dashboard: https://supabase.com/dashboard/project/cejwvvmvdjnbgrckjczg/functions**
`

npx supabase secrets list --project-ref cejwvvmvdjnbgrckjczg



