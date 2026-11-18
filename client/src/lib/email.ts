// Dual-channel email integration:
// 1. Nodemailer via /api/contact (Gmail SMTP) - primary
// 2. Web3Forms API - backup/fallback
// Service: https://web3forms.com
// Access Key is configured directly (no external service signup needed)

const WEB3FORMS_ACCESS_KEY = "d8c3692f-74a2-429a-b696-d46d4308ed16";
const WEB3FORMS_API_URL = "https://api.web3forms.com/submit";

// The project type mapping for display purposes
const PROJECT_TYPE_LABELS: Record<string, string> = {
  "Product Landing Page": "Product Landing Page",
  "Label & Packaging Design": "Label & Packaging Design",
  "Advertising Posters": "Advertising Posters",
  other: "Other",
};

const BUDGET_LABELS: Record<string, string> = {
  "under-1500": "Under MDL 1,500",
  "1500-3500": "MDL 1,500 - 3,500",
  "3500-6500": "MDL 3,500 - 6,500",
  "6500-10000": "MDL 6,500 - 10,000",
  "10000+": "MDL 10,000+",
};

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  description: string;
}

/**
 * Send via Nodemailer backend (Gmail SMTP)
 */
async function sendViaNodemailer(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true, message: "Nodemailer" };
    } else {
      return { success: false, message: result.message || "Nodemailer failed" };
    }
  } catch (error) {
    return { success: false, message: "Nodemailer unavailable" };
  }
}

/**
 * Send via Web3Forms API (backup)
 */
async function sendViaWeb3Forms(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    const formData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: data.name,
      from_email: data.email,
      subject: `New Project Inquiry from ${data.name}`,
      name: data.name,
      email: data.email,
      company: data.company || "Not provided",
      project_type: PROJECT_TYPE_LABELS[data.projectType] || data.projectType || "Not specified",
      budget: BUDGET_LABELS[data.budget] || data.budget || "Not specified",
      description: data.description,
      message: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "Not provided"}
Project Type: ${PROJECT_TYPE_LABELS[data.projectType] || data.projectType || "Not specified"}
Budget: ${BUDGET_LABELS[data.budget] || data.budget || "Not specified"}

Project Description:
${data.description}
      `.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const response = await fetch(WEB3FORMS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true, message: "Web3Forms" };
    } else {
      return { success: false, message: result.message || "Web3Forms failed" };
    }
  } catch (error) {
    return { success: false, message: "Web3Forms unavailable" };
  }
}

/**
 * Send contact email using both channels for redundancy.
 * Returns success if at least one channel succeeds.
 */
export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  // Validation
  if (!data.name || !data.email || !data.description) {
    return { success: false, message: "Missing required fields" };
  }

  // Send to both channels simultaneously
  // Try Nodemailer first as primary
  const nodemailerResult = await sendViaNodemailer(data);
  if (nodemailerResult.success) {
    return { success: true, message: "Message sent successfully!" };
  }

  // Fallback to Web3Forms if Nodemailer fails
  console.warn("Nodemailer failed, trying Web3Forms fallback:", nodemailerResult.message);
  const web3formsResult = await sendViaWeb3Forms(data);
  
  if (web3formsResult.success) {
    return { success: true, message: "Message sent successfully via backup service!" };
  }

  return {
    success: false,
    message: "Failed to send message. Please try again later or email directly.",
  };
}

export function isEmailConfigured(): boolean {
  return true; // Always true since we have dual channels
}
