/**
 * Invoice Generator Utility
 * Generates a styled, printable HTML invoice for an order.
 * Supports download as HTML and simulated email sending.
 */

import { Order } from '../types/types';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import appConfig from '../config/appConfig';

function getInvoiceNumber(order: Order): string {
  return order.id.slice(0, 8).toLowerCase();
}

/**
 * Generate a self-contained HTML invoice string for a given order.
 */
/**
 * Generate a clean, self-contained HTML fragment of the invoice with inline styles.
 * This is highly optimized for email clients (like Gmail and Outlook) which strip header styles.
 */
export function generateInvoiceFragment(order: Order): string {
  const invoiceDate = new Date(order.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const currency = appConfig.currency_symbol;
  const fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const escapeHtml = (value: unknown) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const formatMoney = (value: number) => `${currency}${value.toFixed(2)}`;
  const invoiceNumber = getInvoiceNumber(order);
  const customerName = order.user_email?.split('@')[0]?.replace(/[._-]+/g, ' ') || 'Valued Customer';
  const escapedCustomerName = escapeHtml(customerName);
  const escapedAddress = escapeHtml(order.shipping_address || 'Not provided').replace(/\n/g, '<br />');

  const badgeStyles = {
    pending: 'background-color: #fff7ed; color: #c2410c; border-color: #fed7aa;',
    accepted: 'background-color: #eff6ff; color: #1d4ed8; border-color: #bfdbfe;',
    ready: 'background-color: #eef2ff; color: #4338ca; border-color: #c7d2fe;',
    shipped: 'background-color: #f5f3ff; color: #6d28d9; border-color: #ddd6fe;',
    delivered: 'background-color: #ecfdf5; color: #047857; border-color: #a7f3d0;',
  };
  const currentBadgeStyle = badgeStyles[order.status as keyof typeof badgeStyles] || badgeStyles.pending;

  const itemRows = order.items.map((item, index) => {
    const hasDiscount = item.discount_percentage !== undefined && item.discount_percentage > 0;
    const finalPrice = hasDiscount
      ? item.price * (1 - item.discount_percentage / 100)
      : item.price;
    const lineTotal = finalPrice * item.quantity;
    const imageCell = item.image_url
      ? `<img src="${escapeHtml(item.image_url)}" alt="${escapeHtml(item.name)}" width="44" height="44" style="display: block; width: 44px; height: 44px; object-fit: cover; border-radius: 10px; border: 1px solid #e5e7eb;" />`
      : `<div style="width: 44px; height: 44px; border-radius: 10px; background-color: #f1f5f9; border: 1px solid #e5e7eb; text-align: center; line-height: 44px; color: #94a3b8; font-weight: 800; font-size: 11px;">${index + 1}</div>`;

    const priceDisplay = hasDiscount
      ? `<span style="text-decoration: line-through; color: #94a3b8; margin-right: 6px; font-size: 11px; font-family: ${fontFamily};">${formatMoney(item.price)}</span><span style="color: #dc2626; font-weight: 800; font-family: ${fontFamily};">${formatMoney(finalPrice)}</span>`
      : formatMoney(item.price);

    return `
      <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f8fafc'};">
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; vertical-align: middle;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td style="padding-right: 12px; vertical-align: middle;">${imageCell}</td>
              <td style="vertical-align: middle;">
                <div style="font-weight: 800; color: #111827; font-size: 14px; line-height: 1.35; font-family: ${fontFamily};">${escapeHtml(item.name)}</div>
                ${hasDiscount ? `<div style="margin-top: 5px;"><span style="display: inline-block; font-size: 10px; background-color: #fee2e2; color: #b91c1c; padding: 3px 7px; border-radius: 999px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.4px; font-family: ${fontFamily};">-${item.discount_percentage}% off</span></div>` : ''}
              </td>
            </tr>
          </table>
        </td>
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #475569; font-weight: 800; font-family: ${fontFamily};">${item.quantity}</td>
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #475569; font-family: ${fontFamily};">${priceDisplay}</td>
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 900; color: #111827; font-family: ${fontFamily};">${formatMoney(lineTotal)}</td>
      </tr>
    `;
  }).join('');

  return `
  <div class="invoice-container" style="max-width: 760px; margin: 24px auto; background-color: #ffffff; border-radius: 22px; box-shadow: 0 18px 50px rgba(15, 23, 42, 0.10); overflow: hidden; border: 1px solid #e5e7eb; font-family: ${fontFamily}; color: #334155; text-align: left;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 34px 36px; background-color: #111827; color: #ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="vertical-align: top;">
                <div style="font-size: 13px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #a5b4fc; font-family: ${fontFamily};">Magical Products</div>
                <h1 style="font-size: 34px; line-height: 1.05; font-weight: 900; margin: 8px 0 0; color: #ffffff; font-family: ${fontFamily};">Invoice</h1>
              </td>
              <td style="vertical-align: top; text-align: right;">
                <div style="display: inline-block; border: 1px solid rgba(255,255,255,0.20); border-radius: 14px; padding: 12px 14px; background-color: rgba(255,255,255,0.08);">
                  <div style="font-size: 10px; font-weight: 900; letter-spacing: 1.4px; text-transform: uppercase; color: #cbd5e1; font-family: ${fontFamily};">Amount Due</div>
                  <div style="font-size: 28px; font-weight: 900; color: #ffffff; margin-top: 3px; font-family: ${fontFamily};">${formatMoney(order.total_price)}</div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 28px 36px 18px; background-color: #ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="width: 25%; padding: 0 10px 12px 0; vertical-align: top;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${fontFamily};">Invoice No.</div>
                <div style="font-size: 15px; font-weight: 900; color: #111827; margin-top: 5px; font-family: ${fontFamily};">#${invoiceNumber}</div>
              </td>
              <td style="width: 25%; padding: 0 10px 12px 0; vertical-align: top;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${fontFamily};">Date</div>
                <div style="font-size: 15px; font-weight: 800; color: #111827; margin-top: 5px; font-family: ${fontFamily};">${invoiceDate}</div>
              </td>
              <td style="width: 25%; padding: 0 10px 12px 0; vertical-align: top;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${fontFamily};">Payment</div>
                <div style="font-size: 15px; font-weight: 800; color: #111827; margin-top: 5px; text-transform: capitalize; font-family: ${fontFamily};">${escapeHtml(order.payment_method)}</div>
              </td>
              <td style="width: 25%; padding: 0 0 12px 0; vertical-align: top;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${fontFamily};">Status</div>
                <div style="margin-top: 5px;"><span style="display: inline-block; padding: 5px 11px; border-radius: 999px; border: 1px solid; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.7px; font-family: ${fontFamily}; ${currentBadgeStyle}">${escapeHtml(order.status)}</span></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 0 36px 28px; background-color: #ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="width: 50%; vertical-align: top; padding: 18px; background-color: #f8fafc; border: 1px solid #e5e7eb; border-radius: 16px;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #64748b; font-family: ${fontFamily};">Bill To</div>
                <div style="font-size: 16px; font-weight: 900; color: #111827; margin-top: 8px; text-transform: capitalize; font-family: ${fontFamily};">${escapedCustomerName}</div>
                ${order.user_email ? `<div style="font-size: 13px; font-weight: 700; color: #475569; margin-top: 6px; font-family: ${fontFamily};">${escapeHtml(order.user_email)}</div>` : ''}
                ${order.user_phone ? `<div style="font-size: 13px; font-weight: 700; color: #475569; margin-top: 4px; font-family: ${fontFamily};">${escapeHtml(order.user_phone)}</div>` : ''}
              </td>
              <td style="width: 18px;">&nbsp;</td>
              <td style="width: 50%; vertical-align: top; padding: 18px; background-color: #f8fafc; border: 1px solid #e5e7eb; border-radius: 16px;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #64748b; font-family: ${fontFamily};">Ship To</div>
                <div style="font-size: 14px; font-weight: 800; color: #111827; line-height: 1.55; margin-top: 8px; font-family: ${fontFamily};">${escapedAddress}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 0 36px 30px; background-color: #ffffff;">
          <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.6px; color: #64748b; margin-bottom: 12px; font-family: ${fontFamily};">Order Items</div>
          <table style="width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="padding: 12px 14px; text-align: left; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${fontFamily};">Item</th>
            <th style="padding: 12px 14px; text-align: center; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${fontFamily};">Qty</th>
            <th style="padding: 12px 14px; text-align: right; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${fontFamily};">Price</th>
            <th style="padding: 12px 14px; text-align: right; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${fontFamily};">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 0 36px 34px; background-color: #ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="vertical-align: top; color: #64748b; font-size: 12px; line-height: 1.6; padding-right: 18px; font-family: ${fontFamily};">
                <strong style="display: block; color: #111827; font-size: 13px; margin-bottom: 4px;">Thank you for shopping with us.</strong>
                This invoice was generated on ${generatedDate}. Keep it for your records.
              </td>
              <td style="width: 260px; vertical-align: top;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; background-color: #111827; border-radius: 16px;">
                  <tr>
                    <td style="padding: 18px 20px;">
                      <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; color: #cbd5e1; font-family: ${fontFamily};">Total Paid</div>
                      <div style="font-size: 32px; line-height: 1.1; font-weight: 900; color: #ffffff; margin-top: 6px; font-family: ${fontFamily};">${formatMoney(order.total_price)}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
}

/**
 * Generate a self-contained HTML invoice string for a given order.
 */
export function generateInvoiceHTML(order: Order): string {
  const fragment = generateInvoiceFragment(order);
  const invoiceNumber = getInvoiceNumber(order);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice #${invoiceNumber}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    body { margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', sans-serif; }
    @media print {
      body { background-color: #ffffff; }
      .invoice-container { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; border: none !important; }
    }
  </style>
</head>
<body>
  ${fragment}
</body>
</html>`;
}

/**
 * Download an invoice as an HTML file that the user can print to PDF.
 */
export function downloadInvoice(order: Order): void {
  const invoiceNumber = getInvoiceNumber(order);
  const html = generateInvoiceHTML(order);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `invoice-${invoiceNumber}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success('Invoice downloaded!', { duration: 2000 });
}


/**
 * Send an invoice to an email address via EmailJS.
 */
export async function sendInvoiceToEmail(order: Order, email: string): Promise<void> {
  // Generate only the clean HTML fragment (with inline styles) to inject into the EmailJS template.
  // This avoids double <html>/<head> nesting that breaks email client formatting.
  const invoiceFragment = generateInvoiceFragment(order);
  const invoiceNumber = getInvoiceNumber(order);

  const templateParams = {
    user_email: email,                                                    // Matches "To Email" field
    order_id: invoiceNumber,                                             // Matches {{order_id}}
    customer_name: order.user_email?.split('@')[0] || 'Valued Customer',  // Matches {{customer_name}}
    html: invoiceFragment,                                                // In case the template uses {{{html}}}
    invoice_html: invoiceFragment,                                        // In case the template uses {{{invoice_html}}}
  };

  try {
    const response = await emailjs.send(
      'service_xazkrll',
      'template_34vxj9a',
      templateParams,
      'emsNVSiJb6w9WhEFH'
    );
    console.log('Email sent!', response);
    toast.success(`Invoice sent to ${email}!`, { duration: 4000 });
  } catch (error) {
    console.error('EmailJS error:', error);
    toast.error('Failed to send email. Invoice downloaded instead.');
    downloadInvoice(order);
  }
}
