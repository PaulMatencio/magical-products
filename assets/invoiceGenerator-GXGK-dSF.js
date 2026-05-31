import{x as h,a as b}from"./index-CMbrdw-z.js";class m{constructor(o=0,i="Network Error"){this.status=o,this.text=i}}const E=()=>{if(!(typeof localStorage>"u"))return{get:t=>Promise.resolve(localStorage.getItem(t)),set:(t,o)=>Promise.resolve(localStorage.setItem(t,o)),remove:t=>Promise.resolve(localStorage.removeItem(t))}},l={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:E()},u=t=>t?typeof t=="string"?{publicKey:t}:t.toString()==="[object Object]"?t:{}:{},U=(t,o="https://api.emailjs.com")=>{if(!t)return;const i=u(t);l.publicKey=i.publicKey,l.blockHeadless=i.blockHeadless,l.storageProvider=i.storageProvider,l.blockList=i.blockList,l.limitRate=i.limitRate,l.origin=i.origin||o},_=async(t,o,i={})=>{const a=await fetch(l.origin+t,{method:"POST",headers:i,body:o}),e=await a.text(),r=new m(a.status,e);if(a.ok)return r;throw r},z=(t,o,i)=>{if(!t||typeof t!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!o||typeof o!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!i||typeof i!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},B=t=>{if(t&&t.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},T=t=>t.webdriver||!t.languages||t.languages.length===0,P=()=>new m(451,"Unavailable For Headless Browser"),K=(t,o)=>{if(!Array.isArray(t))throw"The BlockList list has to be an array";if(typeof o!="string")throw"The BlockList watchVariable has to be a string"},O=t=>{var o;return!((o=t.list)!=null&&o.length)||!t.watchVariable},q=(t,o)=>t instanceof FormData?t.get(o):t[o],L=(t,o)=>{if(O(t))return!1;K(t.list,t.watchVariable);const i=q(o,t.watchVariable);return typeof i!="string"?!1:t.list.includes(i)},j=()=>new m(403,"Forbidden"),M=(t,o)=>{if(typeof t!="number"||t<0)throw"The LimitRate throttle has to be a positive number";if(o&&typeof o!="string")throw"The LimitRate ID has to be a non-empty string"},A=async(t,o,i)=>{const a=Number(await i.get(t)||0);return o-Date.now()+a},S=async(t,o,i)=>{if(!o.throttle||!i)return!1;M(o.throttle,o.id);const a=o.id||t;return await A(a,o.throttle,i)>0?!0:(await i.set(a,Date.now().toString()),!1)},I=()=>new m(429,"Too Many Requests"),J=async(t,o,i,a)=>{const e=u(a),r=e.publicKey||l.publicKey,s=e.blockHeadless||l.blockHeadless,f=e.storageProvider||l.storageProvider,p={...l.blockList,...e.blockList},c={...l.limitRate,...e.limitRate};return s&&T(navigator)?Promise.reject(P()):(z(r,t,o),B(i),i&&L(p,i)?Promise.reject(j()):await S(location.pathname,c,f)?Promise.reject(I()):_("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:r,service_id:t,template_id:o,template_params:i}),{"Content-type":"application/json"}))},Q=t=>{if(!t||t.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},W=t=>typeof t=="string"?document.querySelector(t):t,Y=async(t,o,i,a)=>{const e=u(a),r=e.publicKey||l.publicKey,s=e.blockHeadless||l.blockHeadless,f=l.storageProvider||e.storageProvider,p={...l.blockList,...e.blockList},c={...l.limitRate,...e.limitRate};if(s&&T(navigator))return Promise.reject(P());const g=W(i);z(r,t,o),Q(g);const d=new FormData(g);return L(p,d)?Promise.reject(j()):await S(location.pathname,c,f)?Promise.reject(I()):(d.append("lib_version","4.4.1"),d.append("service_id",t),d.append("template_id",o),d.append("user_id",r),_("/api/v1.0/email/send-form",d))},G={init:U,send:J,sendForm:Y,EmailJSResponseStatus:m};function x(t){return t.id.slice(0,8).toLowerCase()}function R(t){var v,w;const o=new Date(t.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),i=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),a=b.currency_symbol,e="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",r=n=>String(n??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),s=n=>`${a}${n.toFixed(2)}`,f=x(t),p=((w=(v=t.user_email)==null?void 0:v.split("@")[0])==null?void 0:w.replace(/[._-]+/g," "))||"Valued Customer",c=r(p),g=r(t.shipping_address||"Not provided").replace(/\n/g,"<br />"),d={pending:"background-color: #fff7ed; color: #c2410c; border-color: #fed7aa;",accepted:"background-color: #eff6ff; color: #1d4ed8; border-color: #bfdbfe;",ready:"background-color: #eef2ff; color: #4338ca; border-color: #c7d2fe;",shipped:"background-color: #f5f3ff; color: #6d28d9; border-color: #ddd6fe;",delivered:"background-color: #ecfdf5; color: #047857; border-color: #a7f3d0;"},D=d[t.status]||d.pending,F=t.items.map((n,$)=>{const y=n.discount_percentage!==void 0&&n.discount_percentage>0,k=y?n.price*(1-n.discount_percentage/100):n.price,N=k*n.quantity,V=n.image_url?`<img src="${r(n.image_url)}" alt="${r(n.name)}" width="44" height="44" style="display: block; width: 44px; height: 44px; object-fit: cover; border-radius: 10px; border: 1px solid #e5e7eb;" />`:`<div style="width: 44px; height: 44px; border-radius: 10px; background-color: #f1f5f9; border: 1px solid #e5e7eb; text-align: center; line-height: 44px; color: #94a3b8; font-weight: 800; font-size: 11px;">${$+1}</div>`,C=y?`<span style="text-decoration: line-through; color: #94a3b8; margin-right: 6px; font-size: 11px; font-family: ${e};">${s(n.price)}</span><span style="color: #dc2626; font-weight: 800; font-family: ${e};">${s(k)}</span>`:s(n.price);return`
      <tr style="background-color: ${$%2===0?"#ffffff":"#f8fafc"};">
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; vertical-align: middle;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td style="padding-right: 12px; vertical-align: middle;">${V}</td>
              <td style="vertical-align: middle;">
                <div style="font-weight: 800; color: #111827; font-size: 14px; line-height: 1.35; font-family: ${e};">${r(n.name)}</div>
                ${y?`<div style="margin-top: 5px;"><span style="display: inline-block; font-size: 10px; background-color: #fee2e2; color: #b91c1c; padding: 3px 7px; border-radius: 999px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.4px; font-family: ${e};">-${n.discount_percentage}% off</span></div>`:""}
              </td>
            </tr>
          </table>
        </td>
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #475569; font-weight: 800; font-family: ${e};">${n.quantity}</td>
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #475569; font-family: ${e};">${C}</td>
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 900; color: #111827; font-family: ${e};">${s(N)}</td>
      </tr>
    `}).join("");return`
  <div class="invoice-container" style="max-width: 760px; margin: 24px auto; background-color: #ffffff; border-radius: 22px; box-shadow: 0 18px 50px rgba(15, 23, 42, 0.10); overflow: hidden; border: 1px solid #e5e7eb; font-family: ${e}; color: #334155; text-align: left;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 34px 36px; background-color: #111827; color: #ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="vertical-align: top;">
                <div style="font-size: 13px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #a5b4fc; font-family: ${e};">Magical Products</div>
                <h1 style="font-size: 34px; line-height: 1.05; font-weight: 900; margin: 8px 0 0; color: #ffffff; font-family: ${e};">Invoice</h1>
              </td>
              <td style="vertical-align: top; text-align: right;">
                <div style="display: inline-block; border: 1px solid rgba(255,255,255,0.20); border-radius: 14px; padding: 12px 14px; background-color: rgba(255,255,255,0.08);">
                  <div style="font-size: 10px; font-weight: 900; letter-spacing: 1.4px; text-transform: uppercase; color: #cbd5e1; font-family: ${e};">Amount Due</div>
                  <div style="font-size: 28px; font-weight: 900; color: #ffffff; margin-top: 3px; font-family: ${e};">${s(t.total_price)}</div>
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
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${e};">Invoice No.</div>
                <div style="font-size: 15px; font-weight: 900; color: #111827; margin-top: 5px; font-family: ${e};">#${f}</div>
              </td>
              <td style="width: 25%; padding: 0 10px 12px 0; vertical-align: top;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${e};">Date</div>
                <div style="font-size: 15px; font-weight: 800; color: #111827; margin-top: 5px; font-family: ${e};">${o}</div>
              </td>
              <td style="width: 25%; padding: 0 10px 12px 0; vertical-align: top;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${e};">Payment</div>
                <div style="font-size: 15px; font-weight: 800; color: #111827; margin-top: 5px; text-transform: capitalize; font-family: ${e};">${r(t.payment_method)}</div>
                ${t.payment_id?`<div style="font-size: 9px; color: #64748b; margin-top: 4px; font-family: ${e}; word-break: break-all; line-height: 1.2;">ID: ${r(t.payment_id)}</div>`:""}
              </td>
              <td style="width: 25%; padding: 0 0 12px 0; vertical-align: top;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${e};">Status</div>
                <div style="margin-top: 5px;"><span style="display: inline-block; padding: 5px 11px; border-radius: 999px; border: 1px solid; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.7px; font-family: ${e}; ${D}">${r(t.status)}</span></div>
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
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #64748b; font-family: ${e};">Bill To</div>
                <div style="font-size: 16px; font-weight: 900; color: #111827; margin-top: 8px; text-transform: capitalize; font-family: ${e};">${c}</div>
                ${t.user_email?`<div style="font-size: 13px; font-weight: 700; color: #475569; margin-top: 6px; font-family: ${e};">${r(t.user_email)}</div>`:""}
                ${t.user_phone?`<div style="font-size: 13px; font-weight: 700; color: #475569; margin-top: 4px; font-family: ${e};">${r(t.user_phone)}</div>`:""}
              </td>
              <td style="width: 18px;">&nbsp;</td>
              <td style="width: 50%; vertical-align: top; padding: 18px; background-color: #f8fafc; border: 1px solid #e5e7eb; border-radius: 16px;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #64748b; font-family: ${e};">Ship To</div>
                <div style="font-size: 14px; font-weight: 800; color: #111827; line-height: 1.55; margin-top: 8px; font-family: ${e};">${g}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 0 36px 30px; background-color: #ffffff;">
          <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.6px; color: #64748b; margin-bottom: 12px; font-family: ${e};">Order Items</div>
          <table style="width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="padding: 12px 14px; text-align: left; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${e};">Item</th>
            <th style="padding: 12px 14px; text-align: center; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${e};">Qty</th>
            <th style="padding: 12px 14px; text-align: right; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${e};">Price</th>
            <th style="padding: 12px 14px; text-align: right; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${e};">Total</th>
          </tr>
        </thead>
        <tbody>
          ${F}
        </tbody>
      </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 0 36px 34px; background-color: #ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="vertical-align: top; color: #64748b; font-size: 12px; line-height: 1.6; padding-right: 18px; font-family: ${e};">
                <strong style="display: block; color: #111827; font-size: 13px; margin-bottom: 4px;">Thank you for shopping with us.</strong>
                This invoice was generated on ${i}. Keep it for your records.
              </td>
              <td style="width: 260px; vertical-align: top;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; background-color: #111827; border-radius: 16px;">
                  <tr>
                    <td style="padding: 18px 20px;">
                      <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; color: #cbd5e1; font-family: ${e};">Total Paid</div>
                      <div style="font-size: 32px; line-height: 1.1; font-weight: 900; color: #ffffff; margin-top: 6px; font-family: ${e};">${s(t.total_price)}</div>
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
  `}function H(t){const o=R(t);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice #${x(t)}</title>
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
  ${o}
</body>
</html>`}function X(t){const o=x(t),i=H(t),a=new Blob([i],{type:"text/html"}),e=URL.createObjectURL(a),r=document.createElement("a");r.href=e,r.download=`invoice-${o}.html`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(e),h.success("Invoice downloaded!",{duration:2e3})}async function tt(t,o){var p;const i=R(t),a=x(t),e=H(t),s=`data:text/html;base64,${btoa(unescape(encodeURIComponent(e)))}`,f={user_email:o,order_id:a,customer_name:((p=t.user_email)==null?void 0:p.split("@")[0])||"Valued Customer",html:i,invoice_html:i,invoice_file:s};try{const c=await G.send(b.emailjs.serviceId,b.emailjs.templateId,f,b.emailjs.publicKey);console.log("Email sent!",c),h.success(`Invoice sent to ${o}!`,{duration:4e3})}catch(c){console.error("EmailJS error:",c),h.error("Failed to send email. Invoice downloaded instead."),X(t)}}export{X as downloadInvoice,R as generateInvoiceFragment,H as generateInvoiceHTML,tt as sendInvoiceToEmail};
