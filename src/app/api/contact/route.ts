import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { ok: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const payload = (await req.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      service?: string;
      message?: string;
    };

    const name = (payload.name || "").trim();
    const email = (payload.email || "").trim();
    const phone = (payload.phone || "").trim();
    const service = (payload.service || "").trim();
    const message = (payload.message || "").trim();

    if (!name || !email || !phone || !service || !message) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const subject = `New inquiry from ${name}`;

    const text = `Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}`;

    const html = `
      <h2>New inquiry from ${escapeHtml(name)}</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <hr />
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    const result = await resend.emails.send({
      from: "Orbitwelve <content@orbitwelve.com>",
      to: ["contact@orbitwelve.com"],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (result.error) {
      return Response.json(
        { ok: false, error: result.error.message || "Failed to send" },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
