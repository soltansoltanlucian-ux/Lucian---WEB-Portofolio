import "dotenv/config";
import type { Plugin, ViteDevServer } from "vite";
import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import fs from "node:fs";

/**
 * Vite plugin that runs the Express API server in development mode.
 * This allows the /api/contact endpoint to work during development
 * without needing a separate production build.
 * Also serves static files from public/manus-storage/ as fallback.
 */
export function vitePluginApi(): Plugin {
  return {
    name: "vite-plugin-api",
    configureServer(server: ViteDevServer) {
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
        console.log("✅ Email service configured for Gmail");
      } else {
        console.warn("⚠️  Email service not configured. Set EMAIL_USER and EMAIL_PASSWORD in .env");
      }

      const app = express();

      // Parse JSON bodies for API routes
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      // Serve static files from public/manus-storage/ as fallback
      // This runs BEFORE the storage proxy middleware
      const manusStorageDir = path.resolve(import.meta.dirname, "client", "public", "manus-storage");
      if (fs.existsSync(manusStorageDir)) {
        app.use("/manus-storage", express.static(manusStorageDir));
        console.log("✅ Manus storage static files configured");
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

          if (!transporter) {
            return res.status(500).json({
              success: false,
              message: "Email service not configured. Please set EMAIL_USER and EMAIL_PASSWORD in .env",
            });
          }

          // Format email content
          const emailContent = `
New Project Inquiry
==================

From: ${name} (${email})

Company: ${company || "Not provided"}
Project Type: ${projectType || "Not specified"}
Budget: ${budget || "Not specified"}

Project Description:
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
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #4F7CFF; color: white; padding: 24px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
    .header p { margin: 8px 0 0; font-size: 14px; opacity: 0.9; }
    .content { background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 18px; }
    .field-label { font-weight: 600; color: #4F7CFF; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #333; }
    .field-value a { color: #4F7CFF; text-decoration: none; }
    .description-box { background: #ffffff; padding: 16px; border-left: 4px solid #4F7CFF; margin-top: 10px; font-size: 14px; line-height: 1.7; color: #444; border-radius: 0 4px 4px 0; }
    .footer { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
    .date { color: #888; font-size: 12px; margin-top: 16px; padding-top: 12px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Project Inquiry</h1>
      <p>Someone is interested in working with you!</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="field-label">Company</div>
        <div class="field-value">${company || "Not provided"}</div>
      </div>
      <div class="field">
        <div class="field-label">Project Type</div>
        <div class="field-value">${projectType || "Not specified"}</div>
      </div>
      <div class="field">
        <div class="field-label">Budget</div>
        <div class="field-value">${budget || "Not specified"}</div>
      </div>
      <div class="field">
        <div class="field-label">Project Description</div>
        <div class="description-box">${description.replace(/\n/g, "<br>")}</div>
      </div>
      <div class="date">Received: ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}</div>
    </div>
    <div class="footer">
      This email was sent from your portfolio contact form.<br>
      Reply directly to this email to respond to <strong>${email}</strong>.
    </div>
  </div>
</body>
</html>
            `,
          });

          console.log(`✅ Email sent to ${emailTo} from ${name}`);

          res.json({
            success: true,
            message: "Message sent successfully!",
          });
        } catch (error) {
          console.error("❌ Error sending email:", error);
          res.status(500).json({
            success: false,
            message: "Failed to send message",
          });
        }
      });

      // Add API routes BEFORE Vite's middlewares
      server.middlewares.use(app);
    },
  };
}
