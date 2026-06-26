import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    const lead = req.body;

    // Validate fields
    if (!lead || !lead.name || !lead.phone || !lead.service || !lead.date) {
      return res.status(400).json({ success: false, message: "Missing required fields (name, phone, service, date)" });
    }

    // 1. Save filled lead locally to leads.json (only works in local dev environment)
    const leadsFile = path.join(process.cwd(), 'leads.json');
    let leads = [];
    
    try {
      if (fs.existsSync(leadsFile)) {
        leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
      }
    } catch (e) {
      console.warn("Failed to read leads.json:", e);
    }

    leads.push({
      ...lead,
      timestamp: new Date().toISOString()
    });

    try {
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
      console.log("Successfully wrote lead to leads.json locally.");
    } catch (e) {
      // Vercel serverless has a read-only filesystem, this is expected in production
      console.log("leads.json local write bypassed (ephemeral/read-only filesystem).");
    }

    // 2. Log lead to server console (Vercel Log Stream)
    console.log("NEW LEAD SUBMISSION (JSON):", JSON.stringify(lead));

    // 3. Send email notification
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // --- METHOD A: RESEND API (Preferred) ---
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'bookings@auyvraluxuryspa.in';
      
      // Determine recipient list
      let toEmails = ['mevryxind@gmail.com', 'auyvraluxuryspa@gmail.com'];
      if (process.env.RESEND_TO_EMAILS) {
        toEmails = process.env.RESEND_TO_EMAILS.split(',').map(e => e.trim());
      }
      
      // Smart check: Resend free tier restricts recipients of onboarding@resend.dev to the account owner (akhandjaiswal2@gmail.com)
      if (fromEmail === 'onboarding@resend.dev') {
        console.warn("Using onboarding@resend.dev: Resend restricts recipients to the account owner (akhandjaiswal2@gmail.com) until a custom domain is verified. Overriding target recipient.");
        toEmails = ['akhandjaiswal2@gmail.com'];
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: `Auyvra Luxury Spa <${fromEmail}>`,
          to: toEmails,
          subject: `New Lead Booking: ${lead.name}`,
          text: `
New Spa Booking Request:

Name: ${lead.name}
Phone: ${lead.phone}
Selected Service: ${lead.service}
Booking Date: ${lead.date}
Timestamp: ${new Date().toISOString()}
          `,
          html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 25px; border-radius: 12px; background-color: #fafafa;">
  <h2 style="color: #D4AF37; text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 12px; font-family: Georgia, serif;">New Spa Booking Request</h2>
  <p style="font-size: 15px; color: #444; line-height: 1.5;">A new booking lead was submitted from the Auyvra Spa landing page:</p>
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 15px;">
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #222; width: 35%;">Customer Name:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #444;">${lead.name}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #222;">Phone Number:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #444;"><a href="tel:${lead.phone.replace(/\s+/g, '')}" style="color: #D4AF37; text-decoration: none; font-weight: bold;">${lead.phone}</a></td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #222;">Selected Service:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #D4AF37; font-weight: bold;">${lead.service}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #222;">Booking Date:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #444;">${lead.date}</td>
    </tr>
  </table>
  <div style="margin-top: 30px; text-align: center;">
    <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" style="background-color: #075E54; color: white; padding: 12px 25px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block; box-shadow: 0 4px 10px rgba(7,94,84,0.25);">Chat with Client on WhatsApp</a>
  </div>
</div>
          `
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        console.error("Resend API Error:", resData);
        throw new Error(resData.message || "Failed to send email via Resend");
      }

      console.log("Resend email notification sent successfully. ID:", resData.id);
      return res.status(200).json({ success: true, message: "Lead saved and email sent successfully via Resend!" });

    } else {
      // --- METHOD B: SMTP FALLBACK (Nodemailer) ---
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const smtpPort = parseInt(process.env.SMTP_PORT || '587');
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (!smtpUser || !smtpPass) {
        console.warn("Neither Resend API nor SMTP credentials configured. Skipping email notifications.");
        return res.status(200).json({
          success: true,
          message: "Lead saved locally! (Email notifications skipped: credentials missing on server)"
        });
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"Auyvra Luxury Spa Leads" <${smtpUser}>`,
        to: 'mevryxind@gmail.com, auyvraluxuryspa@gmail.com',
        subject: `New Lead Booking: ${lead.name}`,
        text: `
New Spa Booking Request:

Name: ${lead.name}
Phone: ${lead.phone}
Selected Service: ${lead.service}
Booking Date: ${lead.date}
Timestamp: ${new Date().toISOString()}
        `,
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 25px; border-radius: 12px; background-color: #fafafa;">
  <h2 style="color: #D4AF37; text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 12px; font-family: Georgia, serif;">New Spa Booking Request</h2>
  <p style="font-size: 15px; color: #444; line-height: 1.5;">A new booking lead was submitted from the Auyvra Spa landing page:</p>
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 15px;">
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #222; width: 35%;">Customer Name:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #444;">${lead.name}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #222;">Phone Number:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #444;"><a href="tel:${lead.phone.replace(/\s+/g, '')}" style="color: #D4AF37; text-decoration: none; font-weight: bold;">${lead.phone}</a></td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #222;">Selected Service:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #D4AF37; font-weight: bold;">${lead.service}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #222;">Booking Date:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #444;">${lead.date}</td>
    </tr>
  </table>
  <div style="margin-top: 30px; text-align: center;">
    <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" style="background-color: #075E54; color: white; padding: 12px 25px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block; box-shadow: 0 4px 10px rgba(7,94,84,0.25);">Chat with Client on WhatsApp</a>
  </div>
</div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log("Email notification sent successfully via SMTP.");
      return res.status(200).json({ success: true, message: "Lead saved and email sent successfully via SMTP!" });
    }

  } catch (error) {
    console.error("Error handling lead submission:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
