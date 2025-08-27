'use client'

import { Heading, Lead, Subheading } from '@/components/text'
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  DocumentIcon,
  EyeIcon,
  MapPinIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { StatusBadge } from './status-badge'
import { StatusUpdateModal } from './status-update-modal'

interface ApplicationDetailsProps {
  application: {
    id: string
    candidate_name: string
    candidate_email: string
    candidate_phone?: string | null
    candidate_linkedin?: string | null
    candidate_github?: string | null
    candidate_location?: string | null
    cover_letter?: string | null
    resume_url: string
    additional_documents?: string[] | null
    skills: string[]
    experience_years?: number | null
    current_company?: string | null
    current_position?: string | null
    expected_salary?: number | null
    notice_period?: string | null
    status: string
    priority: string
    rating?: number | null
    assigned_to?: string | null
    internal_notes?: string | null
    created_at: string
    updated_at: string
    job_listing_id: string
    source?: string | null
    tags?: string[] | null
    gdpr_consent: boolean
    jobListing?: {
      _id: string
      title: string
      category?: {
        name: string
        color: string
      }
      location?: string
      employmentType?: string
      description?: string
      requirements?: string[]
      benefits?: string[]
    } | null
  }
}

export function ApplicationDetails({ application }: ApplicationDetailsProps) {
  const [showStatusModal, setShowStatusModal] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      case 'low':
        return 'text-green-600 bg-green-50'
      case 'urgent':
        return 'text-purple-600 bg-purple-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Applications
          </button>
        </div>

        <div className="space-y-4">
          <Subheading>Application Details</Subheading>
          <Heading as="h1" className="max-w-4xl">
            {application.candidate_name}
          </Heading>
          <Lead className="max-w-3xl">
            Application for {application.jobListing?.title || 'Position'} •
            Submitted {formatDate(application.created_at)}
          </Lead>
        </div>
      </div>

      {/* Status Overview */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <StatusBadge status={application.status} />
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getPriorityColor(application.priority)}`}
          >
            {application.priority.charAt(0).toUpperCase() +
              application.priority.slice(1)}{' '}
            Priority
          </span>
        </div>

        {application.rating && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{application.rating}/5</span>
          </div>
        )}

        {application.assigned_to && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <UserIcon className="h-4 w-4" />
            <span>Assigned to {application.assigned_to}</span>
          </div>
        )}

        <div className="ml-auto flex gap-3">
          <button
            onClick={() => setShowStatusModal(true)}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Update Status
          </button>
          <a
            href={`mailto:${application.candidate_email}`}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Send Email
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Job Position Information */}
          {application.jobListing ? (
            <div className="space-y-6">
              <div>
                <Subheading>Position Applied For</Subheading>
                <Heading as="h2" className="mt-2">
                  {application.jobListing.title}
                </Heading>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {application.jobListing.category && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                      Category
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      {application.jobListing.category.name}
                    </p>
                  </div>
                )}

                {application.jobListing.location && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                      Location
                    </p>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-gray-400" />
                      <p className="text-lg font-medium text-gray-900">
                        {application.jobListing.location}
                      </p>
                    </div>
                  </div>
                )}

                {application.jobListing.employmentType && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                      Employment Type
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      {application.jobListing.employmentType}
                    </p>
                  </div>
                )}
              </div>

              {application.jobListing.description && (
                <div className="space-y-3">
                  <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    Description
                  </p>
                  <p className="leading-relaxed text-gray-700">
                    {application.jobListing.description}
                  </p>
                </div>
              )}

              {application.jobListing.requirements &&
                application.jobListing.requirements.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                      Requirements
                    </p>
                    <ul className="space-y-2">
                      {application.jobListing.requirements.map(
                        (requirement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></div>
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

              {application.jobListing.benefits &&
                application.jobListing.benefits.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                      Benefits
                    </p>
                    <ul className="space-y-2">
                      {application.jobListing.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          ) : (
            <div className="space-y-4">
              <Subheading>Position Applied For</Subheading>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                <BriefcaseIcon className="mx-auto mb-3 h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500">Job listing not found</p>
                <p className="mt-1 text-xs text-gray-400">
                  ID: {application.job_listing_id}
                </p>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="space-y-6">
            <div>
              <Subheading>Personal Information</Subheading>
              <Heading as="h2" className="mt-2">
                {application.candidate_name}
              </Heading>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                  Email
                </p>
                <a
                  href={`mailto:${application.candidate_email}`}
                  className="text-lg font-medium text-gray-900 hover:text-blue-600"
                >
                  {application.candidate_email}
                </a>
              </div>

              {application.candidate_phone && (
                <div className="space-y-2">
                  <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    Phone
                  </p>
                  <a
                    href={`tel:${application.candidate_phone}`}
                    className="text-lg font-medium text-gray-900 hover:text-blue-600"
                  >
                    {application.candidate_phone}
                  </a>
                </div>
              )}

              {application.candidate_location && (
                <div className="space-y-2">
                  <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    Location
                  </p>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                    <p className="text-lg font-medium text-gray-900">
                      {application.candidate_location}
                    </p>
                  </div>
                </div>
              )}

              {application.candidate_linkedin && (
                <div className="space-y-2">
                  <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    LinkedIn
                  </p>
                  <a
                    href={application.candidate_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-gray-900 hover:text-blue-600"
                  >
                    View Profile
                  </a>
                </div>
              )}

              {application.candidate_github && (
                <div className="space-y-2">
                  <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    GitHub
                  </p>
                  <a
                    href={application.candidate_github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-gray-900 hover:text-blue-600"
                  >
                    View Profile
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-6">
            <div>
              <Subheading>Professional Information</Subheading>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {application.current_company && (
                <div className="space-y-2">
                  <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    Current Company
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {application.current_company}
                  </p>
                </div>
              )}

              {application.current_position && (
                <div className="space-y-2">
                  <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    Current Position
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {application.current_position}
                  </p>
                </div>
              )}

              {application.experience_years && (
                <div className="space-y-2">
                  <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    Years of Experience
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {application.experience_years} years
                  </p>
                </div>
              )}

              {application.expected_salary && (
                <div className="space-y-2">
                  <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    Expected Salary
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {formatCurrency(application.expected_salary)}
                  </p>
                </div>
              )}

              {application.notice_period && (
                <div className="space-y-2">
                  <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                    Notice Period
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {application.notice_period}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <div>
              <Subheading>Skills & Expertise</Subheading>
            </div>
            <div className="flex flex-wrap gap-3">
              {application.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Cover Letter */}
          {application.cover_letter && (
            <div className="space-y-6">
              <div>
                <Subheading>Cover Letter</Subheading>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <p className="leading-relaxed whitespace-pre-wrap text-gray-700">
                  {application.cover_letter}
                </p>
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="space-y-6">
            <div>
              <Subheading>Documents</Subheading>
            </div>
            <div className="space-y-4">
              <a
                href={application.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <EyeIcon className="h-4 w-4" />
                View Resume
              </a>

              {application.additional_documents &&
                application.additional_documents.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                      Additional Documents
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {application.additional_documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <EyeIcon className="h-4 w-4" />
                          Document {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Application Metadata */}
          <div className="space-y-6">
            <div>
              <Subheading>Application Details</Subheading>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Application ID
                </p>
                <p className="font-mono text-sm text-gray-900">
                  {application.id.slice(0, 8)}...
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Submitted
                </p>
                <p className="text-sm text-gray-900">
                  {formatDate(application.created_at)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Last Updated
                </p>
                <p className="text-sm text-gray-900">
                  {formatDate(application.updated_at)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Source
                </p>
                <p className="text-sm text-gray-900 capitalize">
                  {application.source || 'Website'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                  GDPR Consent
                </p>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    application.gdpr_consent
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {application.gdpr_consent ? 'Consented' : 'Not Consented'}
                </span>
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="space-y-6">
            <div>
              <Subheading>Internal Notes</Subheading>
            </div>
            {application.internal_notes ? (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
                  {application.internal_notes}
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                <DocumentIcon className="mx-auto mb-2 h-6 w-6 text-gray-400" />
                <p className="text-sm text-gray-500">No internal notes</p>
              </div>
            )}
          </div>

          {/* Tags */}
          {application.tags && application.tags.length > 0 && (
            <div className="space-y-6">
              <div>
                <Subheading>Tags</Subheading>
              </div>
              <div className="flex flex-wrap gap-2">
                {application.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <StatusUpdateModal
          application={application}
          isOpen={showStatusModal}
          onClose={() => setShowStatusModal(false)}
        />
      )}
    </div>
  )
}
