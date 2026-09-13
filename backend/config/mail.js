const nodemailer = require("nodemailer")

function createMailTransporter() {
  if (process.env.BREVO_API_KEY) {
    return nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_LOGIN || process.env.BREVO_FROM_EMAIL,
        pass: process.env.BREVO_API_KEY,
      },
    })
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

function senderAddress() {
  const email = process.env.BREVO_FROM_EMAIL || process.env.SMTP_FROM || process.env.SMTP_USER
  const name = process.env.BREVO_FROM_NAME || "Federalogistic"
  return email ? `"${name}" <${email}>` : undefined
}

async function sendMail({ to, subject, html }) {
  const transporter = createMailTransporter()
  const from = senderAddress()
  if (!transporter || !from || !to) return false
  await transporter.sendMail({ from, to, subject, html })
  return true
}

function emailHtml({ title, preheader = "", body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#2459d8 0%,#1a3faf 100%);padding:32px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:10px 18px;margin-bottom:16px;">
              <span style="color:#fff;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Federalogistic</span>
            </div>
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;line-height:1.2;">${title}</h1>
            ${preheader ? `<p style="margin:10px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">${preheader}</p>` : ""}
          </td>
        </tr>
        <tr><td style="padding:36px 40px;">${body}</td></tr>
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#94a3b8;font-size:12px;">© ${new Date().getFullYear()} Federalogistic · All rights reserved</p>
            <p style="margin:6px 0 0;color:#cbd5e1;font-size:11px;">This email was sent automatically. Please do not reply.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

module.exports = { sendMail, emailHtml }
