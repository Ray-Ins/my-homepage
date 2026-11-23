import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_APP_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

export async function sendActionEmail({
  to,
  subject,
  heading,
  body,
  actionLabel,
  actionUrl,
}: {
  to: string;
  subject: string;
  heading: string;
  body: string;
  actionLabel: string;
  actionUrl: string;
}) {
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
      <h2 style="margin:0 0 16px">${escapeHtml(heading)}</h2>
      <p style="line-height:1.5">${escapeHtml(body)}</p>
      <p style="margin:24px 0">
        <a href="${actionUrl}" style="background:#111;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;display:inline-block">${escapeHtml(actionLabel)}</a>
      </p>
      <p style="font-size:12px;color:#666">If the button doesn't work, copy this link into your browser:<br/>${escapeHtml(actionUrl)}</p>
      <p style="font-size:12px;color:#666">If you didn't request this, you can ignore this email.</p>
      <p style="font-size:12px;color:#666">Inspire Partners</p>
    </div>`;

  await mailer.sendMail({
    from: `"Inspire Partners" <${process.env.NEXT_PUBLIC_APP_USER}>`,
    to,
    subject,
    html,
    text: `${heading}\n\n${body}\n\n${actionLabel}: ${actionUrl}`,
  });
}
