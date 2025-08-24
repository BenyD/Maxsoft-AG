import type { JobApplicationInsert } from '@/lib/database.types'
import {
  sendApplicationConfirmation,
  sendApplicationNotification,
} from '@/lib/email'
import { createAdminClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form data
    const jobListingId = formData.get('jobListingId') as string
    const candidateName = formData.get('candidateName') as string
    const candidateEmail = formData.get('candidateEmail') as string
    const candidatePhone = formData.get('candidatePhone') as string
    const candidateLinkedin = formData.get('candidateLinkedin') as string
    const candidateGithub = formData.get('candidateGithub') as string
    const candidateLocation = formData.get('candidateLocation') as string
    const coverLetter = formData.get('coverLetter') as string
    const resume = formData.get('resume') as File
    const additionalDocuments = formData.getAll('additionalDocuments') as File[]
    const skills = (formData.get('skills') as string)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const experienceYears =
      parseInt(formData.get('experienceYears') as string) || null
    const currentCompany = formData.get('currentCompany') as string
    const currentPosition = formData.get('currentPosition') as string
    const expectedSalary =
      parseInt(formData.get('expectedSalary') as string) || null
    const noticePeriod = formData.get('noticePeriod') as string
    const gdprConsent = formData.get('gdprConsent') === 'true'
    const jobTitle = formData.get('jobTitle') as string

    // Validate required fields
    if (
      !jobListingId ||
      !candidateName ||
      !candidateEmail ||
      !resume ||
      !gdprConsent
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(candidateEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      )
    }

    const supabase = createAdminClient()

    // Upload resume to Supabase Storage
    const resumeFileName = `resumes/${uuidv4()}-${resume.name}`
    const { error: resumeError } = await supabase.storage
      .from('applications')
      .upload(resumeFileName, resume, {
        cacheControl: '3600',
        upsert: false,
      })

    if (resumeError) {
      console.error('Resume upload failed:', resumeError)
      return NextResponse.json(
        { error: 'Failed to upload resume' },
        { status: 500 },
      )
    }

    // Get resume URL
    const { data: resumeUrlData } = supabase.storage
      .from('applications')
      .getPublicUrl(resumeFileName)

    const resumeUrl = resumeUrlData.publicUrl

    // Upload additional documents if any
    let additionalDocumentUrls: string[] = []
    if (additionalDocuments.length > 0) {
      for (const doc of additionalDocuments) {
        const docFileName = `documents/${uuidv4()}-${doc.name}`
        const { error: docError } = await supabase.storage
          .from('applications')
          .upload(docFileName, doc, {
            cacheControl: '3600',
            upsert: false,
          })

        if (!docError) {
          const { data: docUrlData } = supabase.storage
            .from('applications')
            .getPublicUrl(docFileName)
          additionalDocumentUrls.push(docUrlData.publicUrl)
        }
      }
    }

    // Create application data
    const applicationData: JobApplicationInsert = {
      id: uuidv4(),
      job_listing_id: jobListingId,
      candidate_name: candidateName,
      candidate_email: candidateEmail,
      candidate_phone: candidatePhone || null,
      candidate_linkedin: candidateLinkedin || null,
      candidate_github: candidateGithub || null,
      candidate_location: candidateLocation || null,
      cover_letter: coverLetter || null,
      resume_url: resumeUrl,
      additional_documents:
        additionalDocumentUrls.length > 0 ? additionalDocumentUrls : null,
      skills,
      experience_years: experienceYears,
      current_company: currentCompany || null,
      current_position: currentPosition || null,
      expected_salary: expectedSalary,
      notice_period: noticePeriod || null,
      status: 'new',
      priority: 'medium',
      gdpr_consent: gdprConsent,
      source: 'website',
      tags: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Insert application into Supabase
    const { data: application, error: insertError } = await supabase
      .from('job_applications')
      .insert(applicationData)
      .select()
      .single()

    if (insertError) {
      console.error('Application insertion failed:', insertError)
      return NextResponse.json(
        { error: 'Failed to save application' },
        { status: 500 },
      )
    }

    // Send confirmation email to candidate
    try {
      await sendApplicationConfirmation(candidateEmail, candidateName, jobTitle)
    } catch (emailError) {
      console.error('Confirmation email failed:', emailError)
      // Don't fail the application if email fails
    }

    // Send notification email to admin
    try {
      await sendApplicationNotification(
        jobTitle, 
        candidateName, 
        candidateEmail,
        candidatePhone || undefined,
        candidateLinkedin || undefined,
        candidateGithub || undefined,
        candidateLocation || undefined
      )
    } catch (emailError) {
      console.error('Notification email failed:', emailError)
      // Don't fail the application if email fails
    }

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: 'Application submitted successfully',
    })
  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
