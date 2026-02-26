import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { contactFormSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactFormSchema.parse(body);

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
      subject: `New Contact Form Submission from ${data.name}`,
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
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ""}
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
