'use client'

import { Button } from '@/components/button'
import { JobApplicationForm } from '@/components/job-application-form'
import { Heading, Subheading } from '@/components/text'
import { useState } from 'react'

interface JobApplicationFormState {
  jobListingId: string
  candidateName: string
  candidateEmail: string
  candidatePhone: string
  candidateLinkedin: string
  candidateLocation: string
  coverLetter: string
  resume: File | null
  additionalDocuments: (File | null)[]
  skills: string[]
  experienceYears: number | null
  currentCompany: string
  currentPosition: string
  expectedSalary: number | null
  noticePeriod: string
  gdprConsent: boolean
}

interface JobPageClientProps {
  job: {
    _id: string
    title: string
    category: {
      name: string
      color: string
    }
    location: string
    employmentType: string
    salary?: string
    shortDescription: string
    requirements?: string[]
    responsibilities?: string[]
    benefits?: string[]
    aboutCompany?: string
    howToApply?: string
  }
}

export function JobPageClient({ job }: JobPageClientProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  const handleApplicationSubmit = async (data: JobApplicationFormState) => {
    try {
      // The form already submits to the API, so we just need to handle the success
      console.log('Application submitted successfully:', data)

      setApplicationSubmitted(true)
      setShowApplicationForm(false)

      // Show success message
      alert(
        'Application submitted successfully! We will review your application and get back to you soon.',
      )
    } catch (error) {
      console.error('Error handling application submission:', error)
      throw error
    }
  }

  return (
    <>
      <div className="max-w-4xl">
        <div className="mb-8">
          <Button variant="secondary" href="/careers" className="mb-6">
            ← Back to Careers
          </Button>

          <div
            className={`inline-block rounded-lg ${job.category.color} mb-4 px-4 py-2 text-sm font-semibold`}
          >
            {job.category.name}
          </div>

          <Heading as="h1">{job.title}</Heading>

          <div className="mt-6 flex flex-wrap gap-4 text-gray-600">
            <span className="flex items-center gap-2">📍 {job.location}</span>
            <span className="flex items-center gap-2">
              💼 {job.employmentType}
            </span>
            {job.salary && (
              <span className="flex items-center gap-2">💰 {job.salary}</span>
            )}
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="mb-8 text-lg text-gray-700">{job.shortDescription}</p>

          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-8">
              <Subheading as="h2">Requirements</Subheading>
              <ul className="mt-4 space-y-2">
                {job.requirements.map((requirement: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="mb-8">
              <Subheading as="h2">Responsibilities</Subheading>
              <ul className="mt-4 space-y-2">
                {job.responsibilities.map(
                  (responsibility: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {responsibility}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <div className="mb-8">
              <Subheading as="h2">Benefits</Subheading>
              <ul className="mt-4 space-y-2">
                {job.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.aboutCompany && (
            <div className="mb-8">
              <Subheading as="h2">About Maxsoft AG</Subheading>
              <p className="mt-4 text-gray-700">{job.aboutCompany}</p>
            </div>
          )}

          {job.howToApply && (
            <div className="mb-8">
              <Subheading as="h2">How to Apply</Subheading>
              <p className="mt-4 text-gray-700">{job.howToApply}</p>
            </div>
          )}

          <div className="mt-12 rounded-lg border bg-gray-50 p-6">
            <div className="text-center">
              <Subheading as="h2" className="mb-4">
                Ready to Join Our Team?
              </Subheading>
              <p className="mb-6 text-gray-600">
                {applicationSubmitted
                  ? "Thank you for your application! We'll review it and get back to you soon."
                  : "We're excited to hear from you! Click the button below to start your application."}
              </p>
              {!applicationSubmitted ? (
                <Button
                  onClick={() => setShowApplicationForm(true)}
                  className="px-8 py-3"
                >
                  Apply Now
                </Button>
              ) : (
                <div className="font-medium text-green-600">
                  ✅ Application Submitted Successfully
                </div>
              )}
              <p className="mt-3 text-sm text-gray-500">
                For questions about this position, please contact us at{' '}
                <a
                  href="mailto:careers@maxsoft.ch"
                  className="text-[#01A2EE] hover:underline"
                >
                  careers@maxsoft.ch
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {showApplicationForm && (
        <JobApplicationForm
          jobId={job._id}
          jobTitle={job.title}
          onSubmit={handleApplicationSubmit}
          onCancel={() => setShowApplicationForm(false)}
        />
      )}
    </>
  )
}
