'use client'

import { Button } from '@/components/button'
import { JobApplicationForm } from '@/components/job-application-form'
import { Heading, Lead, Subheading } from '@/components/text'
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { Icon } from '@/components/ui/icon'
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid'
import { useState } from 'react'

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
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const handleApplicationSubmit = async () => {
    try {
      // The form already submits to the API, so we just need to handle the success
      // Application submission logging removed

      setApplicationSubmitted(true)
      setShowApplicationForm(false)

      // Show success message
      setShowSuccessAlert(true)
    } catch (error) {
      console.error('Error handling application submission:', error)
      throw error
    }
  }

  return (
    <>
      <div className="max-w-4xl">
        {/* Breadcrumb and Header */}
        <div className="mb-12">
          <Button variant="secondary" href="/careers" className="mb-8">
            ← Back to Careers
          </Button>

          <div className="mb-6">
            <div
              className={`inline-block rounded-lg ${job.category.color} px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm`}
            >
              {job.category.name}
            </div>
          </div>

          <Heading as="h1" className="mb-6">
            {job.title}
          </Heading>

          <Lead className="mb-8 max-w-3xl text-lg text-gray-700">
            {job.shortDescription}
          </Lead>

          {/* Job Details Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
              <MapPinIcon className="h-6 w-6 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-600">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
              <BriefcaseIcon className="h-6 w-6 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Type</p>
                <p className="text-sm text-gray-600">{job.employmentType}</p>
              </div>
            </div>
            {job.salary && (
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                <CurrencyDollarIcon className="h-6 w-6 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Salary</p>
                  <p className="text-sm text-gray-600">{job.salary}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Job Content */}
        <div className="space-y-12">
          {job.requirements && job.requirements.length > 0 && (
            <section>
              <Subheading as="h2" className="mb-6">
                Requirements
              </Subheading>
              <div className="rounded-lg bg-gray-50 p-6">
                <ul className="space-y-3">
                  {job.requirements.map(
                    (requirement: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </section>
          )}

          {job.responsibilities && job.responsibilities.length > 0 && (
            <section>
              <Subheading as="h2" className="mb-6">
                Responsibilities
              </Subheading>
              <div className="rounded-lg bg-gray-50 p-6">
                <ul className="space-y-3">
                  {job.responsibilities.map(
                    (responsibility: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </section>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <section>
              <Subheading as="h2" className="mb-6">
                Benefits
              </Subheading>
              <div className="rounded-lg bg-gray-50 p-6">
                <ul className="space-y-3">
                  {job.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {job.aboutCompany && (
            <section>
              <Subheading as="h2" className="mb-6">
                About Maxsoft AG
              </Subheading>
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="leading-relaxed text-gray-700">
                  {job.aboutCompany}
                </p>
              </div>
            </section>
          )}

          {job.howToApply && (
            <section>
              <Subheading as="h2" className="mb-6">
                How to Apply
              </Subheading>
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="leading-relaxed text-gray-700">
                  {job.howToApply}
                </p>
              </div>
            </section>
          )}

          {/* Apply Now Section */}
          <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center">
            <Subheading as="h2" className="mb-4">
              Bereit, unserem Team beizutreten?
            </Subheading>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600">
              {applicationSubmitted
                ? 'Vielen Dank für Ihre Bewerbung! Wir werden sie prüfen und uns bald bei Ihnen melden.'
                : 'Wir freuen uns darauf, von Ihnen zu hören! Klicken Sie auf den Button unten, um Ihre Bewerbung zu starten.'}
            </p>
            <div className="flex justify-center">
              {!applicationSubmitted ? (
                <Button
                  onClick={() => setShowApplicationForm(true)}
                  className="px-8 py-3 text-lg"
                >
                  Jetzt bewerben
                </Button>
              ) : (
                <div className="text-lg font-medium text-green-600">
                  ✅ Bewerbung erfolgreich eingereicht
                </div>
              )}
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>
                Bei Fragen zu dieser Position kontaktieren Sie uns bitte unter
              </p>
              <a
                href="mailto:info@maxsoft.ch"
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                info@maxsoft.ch
              </a>
            </div>
          </section>
        </div>

        {/* Bottom Spacing */}
        <div className="h-16" />
      </div>

      {showApplicationForm && (
        <JobApplicationForm
          jobId={job._id}
          jobTitle={job.title}
          onSubmit={handleApplicationSubmit}
          onCancel={() => setShowApplicationForm(false)}
        />
      )}

      {/* Success Alert */}
      <Alert open={showSuccessAlert} onClose={() => setShowSuccessAlert(false)}>
        <AlertTitle className="flex items-center gap-2">
          <Icon name="DocumentCheckIcon" className="h-5 w-5 text-green-600" />
          Bewerbung erfolgreich eingereicht!
        </AlertTitle>
        <AlertDescription>
          Wir werden Ihre Bewerbung prüfen und uns bald bei Ihnen melden.
        </AlertDescription>
        <AlertActions>
          <Button
            onClick={() => setShowSuccessAlert(false)}
            className="px-4 py-2"
          >
            OK
          </Button>
        </AlertActions>
      </Alert>
    </>
  )
}
