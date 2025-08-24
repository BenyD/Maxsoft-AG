import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailData {
  to: string
  subject: string
  html: string
}

export const sendEmail = async (emailData: EmailData) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Maxsoft AG <noreply@maxsoft.ch>',
      ...emailData,
    })

    if (error) {
      console.error('Email sending failed:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}

export const sendApplicationConfirmation = async (
  candidateEmail: string,
  candidateName: string,
  jobTitle: string
) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1f2937;">Application Received</h2>
      <p>Dear ${candidateName},</p>
      <p>Thank you for your application for the <strong>${jobTitle}</strong> position at Maxsoft AG.</p>
      <p>We have received your application and will review it carefully. Our team will get back to you within the next few business days.</p>
      <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:info@maxsoft.ch">info@maxsoft.ch</a>.</p>
      <br>
      <p>Best regards,</p>
      <p>The Maxsoft AG Team</p>
    </div>
  `

  return sendEmail({
    to: candidateEmail,
    subject: `Application Received - ${jobTitle}`,
    html,
  })
}

export const sendApplicationNotification = async (
  jobTitle: string,
  candidateName: string,
  candidateEmail: string
) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1f2937;">New Job Application</h2>
      <p>A new application has been received for the <strong>${jobTitle}</strong> position.</p>
      <br>
      <h3>Candidate Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${candidateName}</li>
        <li><strong>Email:</strong> ${candidateEmail}</li>
        <li><strong>Position:</strong> ${jobTitle}</li>
      </ul>
      <br>
      <p>Please review the application in your admin dashboard.</p>
    </div>
  `

  // Send to admin email (you can configure this)
  const adminEmail = process.env.ADMIN_EMAIL || 'info@maxsoft.ch'
  
  return sendEmail({
    to: adminEmail,
    subject: `New Application: ${jobTitle} - ${candidateName}`,
    html,
  })
}
