import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Email configuration
  const emailUser = process.env.EMAIL_USER || "";
  const emailPassword = process.env.EMAIL_PASSWORD || "";
  const emailTo = process.env.EMAIL_TO || "";

  let transporter: nodemailer.Transporter | null = null;

  if (emailUser && emailPassword) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
  }

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, projectType, budget, description } = req.body;

      // Validation
      if (!name || !email || !description) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      if (!transporter || !emailTo) {
        return res.status(500).json({
          success: false,
          message: "Email service not configured",
        });
      }

      // Format email content
      const emailContent = `
New Project Inquiry

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Project Type: ${projectType || "Not specified"}
Budget: ${budget || "Not specified"}

Description:
${description}

---
This email was sent from your portfolio contact form.
      `.trim();

      // Send email
      await transporter.sendMail({
        from: emailUser,
        to: emailTo,
        replyTo: email,
        subject: `New Project Inquiry from ${name}`,
        text: emailContent,
        html: `
          <h2>New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
          <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
          <h3>Description:</h3>
          <p>${description.replace(/\n/g, "<br>")}</p>
          <hr>
          <p><em>This email was sent from your portfolio contact form.</em></p>
        `,
      });

      res.json({
        success: true,
        message: "Message sent successfully!",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send message",
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    if (!transporter) {
      console.warn("⚠️  Email service not configured. Set EMAIL_USER and EMAIL_PASSWORD in .env");
    }
  });
}

startServer().catch(console.error);
