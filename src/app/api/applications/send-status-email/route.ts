import { sendEmail } from '@/lib/email'
import { createAdminClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { applicationId, newStatus, interviewDate, interviewTime } =
      await request.json()

    if (!applicationId || !newStatus) {
      return NextResponse.json(
        { error: 'Application ID and new status are required' },
        { status: 400 },
      )
    }

    const supabase = createAdminClient()

    // Get application details
    const { data: application, error: fetchError } = await supabase
      .from('job_applications')
      .select(
        `
        *,
        job_listings (
          title,
          category
        )
      `,
      )
      .eq('id', applicationId)
      .single()

    if (fetchError || !application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 },
      )
    }

    // Generate email content based on status
    const emailContent = generateStatusEmail(
      newStatus,
      application,
      interviewDate,
      interviewTime,
    )

    // Send email to candidate
    try {
      await sendEmail({
        to: application.candidate_email,
        subject: emailContent.subject,
        html: emailContent.html,
      })
    } catch (emailError) {
      console.error('Failed to send status email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send email notification' },
        { status: 500 }
      )
    }

    // Log the email communication
    const { error: logError } = await supabase
      .from('job_applications')
      .update({
        communications: [
          ...(application.communications || []),
          {
            type: 'status_update_email',
            status: newStatus,
            sent_at: new Date().toISOString(),
            subject: emailContent.subject,
            recipient: application.candidate_email,
          },
        ],
      })
      .eq('id', applicationId)

    if (logError) {
      console.error('Failed to log communication:', logError)
    }

    return NextResponse.json({
      success: true,
      message: 'Status update email sent successfully',
    })
  } catch (error) {
    console.error('Error sending status email:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

function generateStatusEmail(
  status: string,
  application: {
    candidate_name: string
    job_listings?: {
      title: string
      category: string
    }
  },
  interviewDate?: string,
  interviewTime?: string,
) {
  const candidateName = application.candidate_name
  const position = application.job_listings?.title || 'the position'
  const companyName = 'Maxsoft AG'

  let subject = ''
  let html = ''

  switch (status) {
    case 'shortlisted':
      subject = 'Congratulations! You have been shortlisted'
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #01A2EE;">Congratulations, ${candidateName}!</h2>
          <p>We are pleased to inform you that your application for the <strong>${position}</strong> position has been shortlisted!</p>
          <p>This means you have successfully passed our initial review and we would like to move forward with your application.</p>
          <p>Our team will be in touch shortly to discuss the next steps in the hiring process.</p>
          <p>In the meantime, if you have any questions, please don't hesitate to contact us at <a href="mailto:info@maxsoft.ch">info@maxsoft.ch</a>.</p>
          <p>Best regards,<br>The ${companyName} Team</p>
        </div>
      `
      break

    case 'interviewing':
      subject = 'Interview Scheduled - Next Steps'
      const formattedDate = interviewDate ? new Date(interviewDate).toLocaleDateString(
        'en-US',
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      ) : 'TBD'
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #01A2EE;">Interview Scheduled</h2>
          <p>Dear ${candidateName},</p>
          <p>Great news! We would like to schedule an interview for the <strong>${position}</strong> position.</p>
          ${interviewDate && interviewTime ? `
          <p><strong>Interview Details:</strong></p>
          <ul>
            <li><strong>Date:</strong> ${formattedDate}</li>
            <li><strong>Time:</strong> ${interviewTime}</li>
            <li><strong>Position:</strong> ${position}</li>
          </ul>
          <p>Please confirm this time works for you by replying to this email. If you need to reschedule, please let us know at least 24 hours in advance.</p>
          ` : `
          <p>We will be in touch shortly to schedule a convenient interview time.</p>
          `}
          <p>We look forward to meeting you!</p>
          <p>Best regards,<br>The ${companyName} Team</p>
        </div>
      `
      break

    case 'offered':
      subject = 'Welcome to Maxsoft AG!'
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #01A2EE;">Welcome to the Team!</h2>
          <p>Dear ${candidateName},</p>
          <p>We are delighted to offer you the <strong>${position}</strong> position at ${companyName}!</p>
          <p>Your skills, experience, and enthusiasm impressed us throughout the interview process, and we believe you will be a valuable addition to our team.</p>
          <p>Our HR team will be in touch shortly with all the necessary paperwork and onboarding details.</p>
          <p>Welcome aboard!</p>
          <p>Best regards,<br>The ${companyName} Team</p>
        </div>
      `
      break

    case 'rejected':
      subject = 'Application Update'
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #01A2EE;">Application Update</h2>
          <p>Dear ${candidateName},</p>
          <p>Thank you for your interest in the <strong>${position}</strong> position at ${companyName} and for taking the time to apply.</p>
          <p>After careful consideration, we regret to inform you that we have decided to move forward with other candidates whose qualifications more closely match our current needs.</p>
          <p>We appreciate your interest in joining our team and wish you the very best in your future endeavors.</p>
          <p>Best regards,<br>The ${companyName} Team</p>
        </div>
      `
      break

    case 'hired':
      subject = 'Welcome to Maxsoft AG!'
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #01A2EE;">Welcome to the Team!</h2>
          <p>Dear ${candidateName},</p>
          <p>Congratulations! We are thrilled to confirm that you have been hired for the <strong>${position}</strong> position at ${companyName}!</p>
          <p>Our HR team will be in touch shortly with all the necessary paperwork and onboarding details.</p>
          <p>Welcome aboard!</p>
          <p>Best regards,<br>The ${companyName} Team</p>
        </div>
      `
      break

    case 'withdrawn':
      subject = 'Application Withdrawal Confirmed'
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #01A2EE;">Application Withdrawal Confirmed</h2>
          <p>Dear ${candidateName},</p>
          <p>We have received your request to withdraw your application for the <strong>${position}</strong> position at ${companyName}.</p>
          <p>Your application has been withdrawn from our system. We wish you the best in your future endeavors.</p>
          <p>If you change your mind and would like to reapply in the future, we would be happy to consider your application again.</p>
          <p>Best regards,<br>The ${companyName} Team</p>
        </div>
      `
      break

    default:
      subject = 'Application Status Update'
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #01A2EE;">Application Status Update</h2>
          <p>Dear ${candidateName},</p>
          <p>Your application for the <strong>${position}</strong> position has been updated.</p>
          <p><strong>New Status:</strong> ${status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</p>
          <p>We will keep you informed of any further developments in your application process.</p>
          <p>If you have any questions, please contact us at <a href="mailto:info@maxsoft.ch">info@maxsoft.ch</a>.</p>
          <p>Best regards,<br>The ${companyName} Team</p>
        </div>
      `
  }

  return { subject, html }
}
