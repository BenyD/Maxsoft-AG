'use client'

import {
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentIcon,
  EnvelopeIcon,
  EyeIcon,
  LinkIcon,
  MapPinIcon,
  PhoneIcon,
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
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      case 'urgent':
        return 'text-purple-600 bg-purple-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <StatusBadge status={application.status} />
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getPriorityColor(application.priority)}`}
          >
            {application.priority.charAt(0).toUpperCase() +
              application.priority.slice(1)}{' '}
            Priority
          </span>
          {application.rating && (
            <div className="flex items-center space-x-1">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">
                {application.rating}/5
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowStatusModal(true)}
          className="inline-flex items-center rounded-lg border border-transparent bg-[#01A2EE] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#01A2EE]/90 focus:ring-2 focus:ring-[#01A2EE] focus:ring-offset-2 focus:outline-none"
        >
          Update Status
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
              <UserIcon className="mr-2 h-5 w-5 text-[#01A2EE]" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <p className="text-sm font-medium text-gray-900">
                  {application.candidate_name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email
                </label>
                <div className="flex items-center space-x-2">
                  <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                  <a
                    href={`mailto:${application.candidate_email}`}
                    className="text-sm text-[#01A2EE] hover:underline"
                  >
                    {application.candidate_email}
                  </a>
                </div>
              </div>
              {application.candidate_phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                    <a
                      href={`tel:${application.candidate_phone}`}
                      className="text-sm text-[#01A2EE] hover:underline"
                    >
                      {application.candidate_phone}
                    </a>
                  </div>
                </div>
              )}
              {application.candidate_location && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Location
                  </label>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {application.candidate_location}
                    </span>
                  </div>
                </div>
              )}
              {application.candidate_linkedin && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    LinkedIn
                  </label>
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-4 w-4 text-gray-400" />
                    <a
                      href={application.candidate_linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#01A2EE] hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              )}
              {application.candidate_github && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    GitHub
                  </label>
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-4 w-4 text-gray-400" />
                    <a
                      href={application.candidate_github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#01A2EE] hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
              <BriefcaseIcon className="mr-2 h-5 w-5 text-[#01A2EE]" />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {application.current_company && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Current Company
                  </label>
                  <div className="flex items-center space-x-2">
                    <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {application.current_company}
                    </span>
                  </div>
                </div>
              )}
              {application.current_position && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Current Position
                  </label>
                  <span className="text-sm text-gray-900">
                    {application.current_position}
                  </span>
                </div>
              )}
              {application.experience_years && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Years of Experience
                  </label>
                  <div className="flex items-center space-x-2">
                    <AcademicCapIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {application.experience_years} years
                    </span>
                  </div>
                </div>
              )}
              {application.expected_salary && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Expected Salary
                  </label>
                  <div className="flex items-center space-x-2">
                    <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {formatCurrency(application.expected_salary)}
                    </span>
                  </div>
                </div>
              )}
              {application.notice_period && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Notice Period
                  </label>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {application.notice_period}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
              <AcademicCapIcon className="mr-2 h-5 w-5 text-[#01A2EE]" />
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {application.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Cover Letter */}
          {application.cover_letter && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Cover Letter
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-gray-700">
                  {application.cover_letter}
                </p>
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
              <DocumentIcon className="mr-2 h-5 w-5 text-[#01A2EE]" />
              Documents
            </h3>
            <div className="space-y-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Resume/CV
                </label>
                <a
                  href={application.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <EyeIcon className="mr-2 h-4 w-4" />
                  View Resume
                </a>
              </div>

              {application.additional_documents &&
                application.additional_documents.length > 0 && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-500">
                      Additional Documents
                    </label>
                    <div className="space-y-2">
                      {application.additional_documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          <EyeIcon className="mr-2 h-4 w-4" />
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
        <div className="space-y-6">
          {/* Application Metadata */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Application Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Application ID
                </label>
                <p className="font-mono text-sm text-gray-900">
                  {application.id}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Job Listing ID
                </label>
                <p className="font-mono text-sm text-gray-900">
                  {application.job_listing_id}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Submitted
                </label>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {formatDate(application.created_at)}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Last Updated
                </label>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {formatDate(application.updated_at)}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Source
                </label>
                <p className="text-sm text-gray-900 capitalize">
                  {application.source || 'Website'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  GDPR Consent
                </label>
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
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Internal Notes
            </h3>
            {application.internal_notes ? (
              <p className="text-sm whitespace-pre-wrap text-gray-700">
                {application.internal_notes}
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No internal notes added yet.
              </p>
            )}
          </div>

          {/* Tags */}
          {application.tags && application.tags.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {application.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800"
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
