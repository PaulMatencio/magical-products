

### What was added

#### 1. **Invoice Generator Utility** (`src/utils/invoiceGenerator.ts`)
A shared module that generates beautiful, self-contained HTML invoices. Features:
- Styled with Google Fonts (Inter), gradient header, clean table layout
- Status badges color-coded per order status
- Fully print-ready (`@media print` styles included)
- `downloadInvoice(order)` — downloads as a `.html` file the user can open and print to PDF
- `sendInvoiceToEmail(order, email)` — simulates email sending (downloads the file + shows a confirmation toast). In production you'd replace this with a Supabase Edge Function or API call.

#### 2. **GuestOrderTracking** — 3 new features:
- **Optional Email field** below the search form — labeled "Email for Invoice (optional)"
- **"Download Invoice"** button always visible when an order is found
- **"Send to email@..."** button appears conditionally only when the user fills in the email field

#### 3. **SuccessPage** — Invoice download button
- After placing an order, users now see an **"Invoice"** button alongside "Back to Store" and "View History"
- It resolves the last order from `sessionStorage` + the order hook to generate the full invoice

#### 4. **OrderHistory** — Invoice button per order
- Each order card now has a small **"Invoice"** download button in the footer, right next to the payment method badge


### What was added

**Checkout page** (`Checkout.tsx`):
- Added an **"Email for Invoice (optional)"** input field with a `✉ Mail` icon, placed right below the phone/WhatsApp field, spanning the full width
- The field is completely optional — it doesn't affect form validation
- The `onComplete` callback now passes the `invoiceEmail` as a 5th parameter

**AppRouter** (`AppRouter.tsx`):
- Updated the `onComplete` handler to receive `invoiceEmail`
- After a successful order creation, if the user provided an email, it automatically calls `sendInvoiceToEmail(order, invoiceEmail)` which:
  - Downloads the styled HTML invoice to their device
  - Shows a toast: *"Invoice sent to user@email.com! A copy has also been downloaded."*

The flow is: User fills in the email → confirms order → order is created → invoice is auto-generated and "sent" to the provided email. If they leave the email field empty, nothing happens — checkout works exactly as before.