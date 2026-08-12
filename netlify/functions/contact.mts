import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  description?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export default async (request: Request) => {
  if (request.method !== "POST") {
    return Response.json({ success: false, message: "Method not allowed" }, { status: 405 });
  }

  try {
    const payload = (await request.json()) as ContactPayload;
    const name = text(payload.name);
    const email = text(payload.email);
    const company = text(payload.company) || "Not provided";
    const projectType = text(payload.projectType) || "Not specified";
    const budget = text(payload.budget) || "Not specified";
    const description = text(payload.description);

    if (!name || !email || !description) {
      return Response.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ success: false, message: "Please provide a valid email address" }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    const emailTo = process.env.EMAIL_TO || "";

    if (!emailUser || !emailPassword || !emailTo) {
      console.error("Missing EMAIL_USER, EMAIL_PASSWORD, or EMAIL_TO Netlify environment variable");
      return Response.json({ success: false, message: "Email service not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const subject = `New Project Inquiry from ${name}`;
    const plainText = `New Project Inquiry\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nProject Type: ${projectType}\nBudget: ${budget}\n\nDescription:\n${description}\n\n---\nThis email was sent from your portfolio contact form.`;

    await transporter.sendMail({
      from: emailUser,
      to: emailTo,
      replyTo: email,
      subject,
      text: plainText,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
        <h3>Description</h3>
        <p>${escapeHtml(description).replace(/\n/g, "<br>")}</p>
        <hr>
        <p><em>This email was sent from your portfolio contact form.</em></p>
      `,
    });

    return Response.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending contact email", error);
    return Response.json({ success: false, message: "Failed to send message" }, { status: 500 });
  }
};
