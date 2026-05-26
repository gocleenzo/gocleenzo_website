import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }

    // ── 1. Save to Supabase ──────────────────────────────────────────────────
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert([{ name, email, phone: phone || null, message }]);

    if (dbError) {
      console.error('Supabase insert error:', dbError.message);
      return Response.json({ error: 'Failed to save message: ' + dbError.message }, { status: 500 });
    }

    // ── 2. Send email via Resend ─────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Cleenzo Contact <onboarding@resend.dev>',
          to: [process.env.ADMIN_EMAIL],
          subject: `New message from ${name} — Cleenzo`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
              <div style="background:#0e7490;padding:28px 32px;border-radius:16px 16px 0 0;">
                <h1 style="color:#fff;font-size:20px;margin:0;">🧹 New Cleenzo Contact Message</h1>
              </div>
              <div style="background:#fff;padding:28px 32px;border:1px solid #e0f7fa;border-top:none;border-radius:0 0 16px 16px;">
                <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
                  <tr><td style="padding:8px 0;color:#6b7280;width:80px;vertical-align:top;">Name</td><td style="padding:8px 0;font-weight:600;color:#0c4a6e;">${name}</td></tr>
                  <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#06b6d4;">${email}</a></td></tr>
                  <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Phone</td><td style="padding:8px 0;color:#0c4a6e;">${phone || '—'}</td></tr>
                </table>
                <div style="background:#f0fdfe;border-radius:12px;padding:16px 20px;">
                  <p style="color:#6b7280;font-size:12px;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Message</p>
                  <p style="color:#111827;line-height:1.75;font-size:15px;margin:0;">${message}</p>
                </div>
                <p style="margin-top:20px;font-size:12px;color:#9ca3af;">Reply directly to this email to respond to ${name}.</p>
              </div>
            </div>
          `,
          reply_to: email,
        }),
      });

      if (!emailRes.ok) {
        console.error('Resend error:', await emailRes.text());
        // Don't fail — message is already saved in DB
      }
    }

    return Response.json({ success: true });

  } catch (err) {
    console.error('Contact route error:', err);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}