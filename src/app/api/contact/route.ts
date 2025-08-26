import { sendEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, service, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    // Send email to Maxsoft team
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937;">New Contact Form Submission</h2>
        <p>A new contact form has been submitted through the website.</p>
        <br>
        <h3>Contact Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
          ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
          ${service ? `<li><strong>Service of Interest:</strong> ${service}</li>` : ''}
        </ul>
        <br>
        <h3>Message:</h3>
        <p style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          ${message.replace(/\n/g, '<br>')}
        </p>
        <br>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', {
          timeZone: 'Europe/Zurich',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}</p>
      </div>
    `

    try {
      await sendEmail({
        to: 'info@maxsoft.ch',
        subject: `New Contact Form: ${name}${company ? ` from ${company}` : ''}`,
        html: adminEmailHtml,
      })

      // Send confirmation email to the user
      const userEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #01A2EE; margin: 0;">Maxsoft AG</h1>
            <p style="color: #6b7280; margin: 8px 0 0 0;">Your Partner for Innovative IT Solutions</p>
          </div>
          
          <h2 style="color: #1f2937;">Thank You for Contacting Us!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to Maxsoft AG. We have received your message and our team will review it carefully.</p>
          <p>We typically respond to all inquiries within 24 hours during business days. If your request is urgent, please don't hesitate to call us directly.</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Your Message Summary:</h3>
            ${service ? `<p><strong>Service of Interest:</strong> ${service}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <p>In the meantime, you can:</p>
          <ul>
            <li>Visit our <a href="https://maxsoft.ch/services" style="color: #01A2EE;">services page</a> to learn more about our offerings</li>
            <li>Book a consultation through our <a href="https://maxsoft.ch/contact" style="color: #01A2EE;">booking system</a></li>
            <li>Explore our <a href="https://maxsoft.ch/company" style="color: #01A2EE;">company page</a> to learn more about our team</li>
          </ul>
          
          <p>If you have any immediate questions, please contact us at:</p>
          <div style="background-color: #f0f9ff; padding: 16px; border-radius: 8px; border-left: 4px solid #01A2EE;">
            <p style="margin: 0;"><strong>Email:</strong> <a href="mailto:info@maxsoft.ch" style="color: #01A2EE;">info@maxsoft.ch</a></p>
          </div>
          
          <br>
          <p>Best regards,</p>
          <p>The Maxsoft AG Team</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
          <p style="text-align: center; color: #6b7280; font-size: 14px;">
            Maxsoft AG<br>
            Birkenstrasse 49, 6343 Risch-Rotkreuz, Switzerland<br>
            <a href="https://maxsoft.ch" style="color: #01A2EE;">maxsoft.ch</a>
          </p>
        </div>
      `

      await sendEmail({
        to: email,
        subject: 'Thank you for contacting Maxsoft AG',
        html: userEmailHtml,
      })

      console.log('Emails sent successfully')
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Continue with the response even if emails fail
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Contact form API error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 },
    )
  }
}
