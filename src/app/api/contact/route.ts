import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { contactFormSchema } from "@/lib/schemas";

// Visitors write every field, so escape them before they go into the email's
// HTML. Otherwise anyone could put links or markup into the email we receive.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Keep a visitor's name to one line in the subject.
function oneLine(value: string) {
  return value.replace(/[\r\n\t]+/g, " ").trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactFormSchema.parse(body);

    // The hidden "website" field is only ever filled by bots. Answer as if it
    // worked so they don't retry, but send nothing.
    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error("SENDGRID_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    sgMail.setApiKey(apiKey);

    await sgMail.send({
      to: ["amy@agentblueprint.ai", "chris@agentblueprint.ai"],
      from: "no-reply@agentblueprint.ai",
      subject: `New Contact Form Submission from ${oneLine(data.name)}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        data.message ? `Message: ${data.message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
        ${data.message ? `<p><strong>Message:</strong> ${escapeHtml(data.message).replace(/\r?\n/g, "<br>")}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
