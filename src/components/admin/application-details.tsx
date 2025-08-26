'use client'

import {
  AcademicCapIcon,
  ArrowLeftIcon,
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
      {/* Enhanced Header Actions */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-blue-100 p-3">
                <StatusBadge status={application.status} />
              </div>
              <div className="rounded-xl bg-orange-100 p-3">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getPriorityColor(application.priority)}`}
                >
                  {application.priority.charAt(0).toUpperCase() +
                    application.priority.slice(1)}{' '}
                  Priority
                </span>
              </div>
            </div>
            {application.rating && (
              <div className="flex items-center space-x-2 rounded-xl bg-yellow-100 p-3">
                <StarIcon className="h-5 w-5 text-yellow-500" />
                <span className="text-lg font-bold text-yellow-700">
                  {application.rating}/5
                </span>
              </div>
            )}
            {application.assigned_to && (
              <div className="flex items-center space-x-2 rounded-xl bg-purple-100 p-3">
                <UserIcon className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-semibold text-purple-700">
                  Assigned to {application.assigned_to}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setShowStatusModal(true)}
              className="inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <EyeIcon className="mr-2 h-5 w-5" />
              Update Status
            </button>
            <a
              href={`mailto:${application.candidate_email}`}
              className="inline-flex items-center justify-center rounded-xl border border-green-300 bg-green-50 px-6 py-3 text-sm font-semibold text-green-700 shadow-sm transition-all duration-200 hover:bg-green-100 hover:shadow-md focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              <EnvelopeIcon className="mr-2 h-5 w-5" />
              Send Email
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Job Position Information */}
          {application.jobListing ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
                <div className="mr-4 rounded-xl bg-purple-100 p-3">
                  <ArrowLeftIcon className="h-6 w-6 rotate-90 text-purple-600" />
                </div>
                Position Applied For
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-purple-50 p-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-600">
                    Job Title
                  </label>
                  <p className="text-xl font-bold text-purple-700">
                    {application.jobListing.title}
                  </p>
                </div>
                {application.jobListing.category && (
                  <div className="rounded-xl bg-purple-50 p-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-600">
                      Category
                    </label>
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
                      {application.jobListing.category.name}
                    </span>
                  </div>
                )}
                {application.jobListing.location && (
                  <div className="rounded-xl bg-purple-50 p-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-600">
                      Location
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="rounded-lg bg-purple-100 p-2">
                        <MapPinIcon className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-lg font-semibold text-gray-900">
                        {application.jobListing.location}
                      </span>
                    </div>
                  </div>
                )}
                {application.jobListing.employmentType && (
                  <div className="rounded-xl bg-purple-50 p-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-600">
                      Employment Type
                    </label>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                      {application.jobListing.employmentType}
                    </span>
                  </div>
                )}
              </div>

              {application.jobListing.description && (
                <div className="mt-6 rounded-xl bg-purple-50 p-4">
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    Job Description
                  </label>
                  <div className="prose prose-sm max-w-none">
                    <p className="leading-relaxed text-gray-700">
                      {application.jobListing.description}
                    </p>
                  </div>
                </div>
              )}

              {application.jobListing.requirements &&
                application.jobListing.requirements.length > 0 && (
                  <div className="mt-6 rounded-xl bg-purple-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      Requirements
                    </label>
                    <ul className="space-y-2">
                      {application.jobListing.requirements.map(
                        (requirement, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-purple-400"></span>
                            <span className="text-sm text-gray-700">
                              {requirement}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

              {application.jobListing.benefits &&
                application.jobListing.benefits.length > 0 && (
                  <div className="mt-6 rounded-xl bg-purple-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      Benefits
                    </label>
                    <ul className="space-y-2">
                      {application.jobListing.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-green-400"></span>
                          <span className="text-sm text-gray-700">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
                <div className="mr-4 rounded-xl bg-gray-100 p-3">
                  <BriefcaseIcon className="h-6 w-6 text-gray-600" />
                </div>
                Position Applied For
              </h3>
              <div className="rounded-xl bg-gray-50 p-6 text-center">
                <BriefcaseIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="mb-2 text-lg font-semibold text-gray-600">
                  Job Listing Not Found
                </p>
                <p className="mb-4 text-sm text-gray-500">
                  The job listing for this application could not be retrieved.
                </p>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="font-mono text-sm text-gray-600">
                    Job Listing ID: {application.job_listing_id}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
              <div className="mr-4 rounded-xl bg-blue-100 p-3">
                <UserIcon className="h-6 w-6 text-blue-600" />
              </div>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4">
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Full Name
                </label>
                <p className="text-lg font-bold text-gray-900">
                  {application.candidate_name}
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Email
                </label>
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <EnvelopeIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <a
                    href={`mailto:${application.candidate_email}`}
                    className="text-lg font-semibold text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  >
                    {application.candidate_email}
                  </a>
                </div>
              </div>
              {application.candidate_phone && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-600">
                    Phone
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-green-100 p-2">
                      <PhoneIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <a
                      href={`tel:${application.candidate_phone}`}
                      className="text-lg font-semibold text-green-600 transition-colors hover:text-green-800 hover:underline"
                    >
                      {application.candidate_phone}
                    </a>
                  </div>
                </div>
              )}
              {application.candidate_location && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-600">
                    Location
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-purple-100 p-2">
                      <MapPinIcon className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {application.candidate_location}
                    </span>
                  </div>
                </div>
              )}
              {application.candidate_linkedin && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-600">
                    LinkedIn
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <LinkIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <a
                      href={application.candidate_linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              )}
              {application.candidate_github && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-600">
                    GitHub
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                      <LinkIcon className="h-4 w-4 text-gray-600" />
                    </div>
                    <a
                      href={application.candidate_github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-gray-600 transition-colors hover:text-gray-800 hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
              <div className="mr-4 rounded-xl bg-indigo-100 p-3">
                <BriefcaseIcon className="h-6 w-6 text-indigo-600" />
              </div>
              Professional Information
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {application.current_company && (
                <div className="rounded-xl bg-indigo-50 p-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-600">
                    Current Company
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-indigo-100 p-2">
                      <BuildingOfficeIcon className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {application.current_company}
                    </span>
                  </div>
                </div>
              )}
              {application.current_position && (
                <div className="rounded-xl bg-indigo-50 p-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-600">
                    Current Position
                  </label>
                  <span className="text-lg font-semibold text-gray-900">
                    {application.current_position}
                  </span>
                </div>
              )}
              {application.experience_years && (
                <div className="rounded-xl bg-indigo-50 p-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-600">
                    Years of Experience
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-indigo-100 p-2">
                      <AcademicCapIcon className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {application.experience_years} years
                    </span>
                  </div>
                </div>
              )}
              {application.expected_salary && (
                <div className="rounded-xl bg-indigo-50 p-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-600">
                    Expected Salary
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-green-100 p-2">
                      <CurrencyDollarIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-lg font-bold text-green-700">
                      {formatCurrency(application.expected_salary)}
                    </span>
                  </div>
                </div>
              )}
              {application.notice_period && (
                <div className="rounded-xl bg-indigo-50 p-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-600">
                    Notice Period
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-orange-100 p-2">
                      <ClockIcon className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {application.notice_period}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
              <div className="mr-4 rounded-xl bg-green-100 p-3">
                <AcademicCapIcon className="h-6 w-6 text-green-600" />
              </div>
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-3">
              {application.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border border-blue-200 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Cover Letter */}
          {application.cover_letter && (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
                <div className="mr-4 rounded-xl bg-yellow-100 p-3">
                  <DocumentIcon className="h-6 w-6 text-yellow-600" />
                </div>
                Cover Letter
              </h3>
              <div className="prose prose-lg max-w-none">
                <div className="rounded-xl bg-gray-50 p-6">
                  <p className="leading-relaxed whitespace-pre-wrap text-gray-700">
                    {application.cover_letter}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
              <div className="mr-4 rounded-xl bg-purple-100 p-3">
                <DocumentIcon className="h-6 w-6 text-purple-600" />
              </div>
              Documents
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl bg-purple-50 p-4">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Resume/CV
                </label>
                <a
                  href={application.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl border border-purple-300 bg-white px-6 py-3 text-sm font-semibold text-purple-700 shadow-sm transition-all duration-200 hover:border-purple-400 hover:bg-purple-50 hover:shadow-md focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <EyeIcon className="mr-2 h-5 w-5" />
                  View Resume
                </a>
              </div>

              {application.additional_documents &&
                application.additional_documents.length > 0 && (
                  <div className="rounded-xl bg-purple-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      Additional Documents
                    </label>
                    <div className="space-y-3">
                      {application.additional_documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-xl border border-purple-300 bg-white px-6 py-3 text-sm font-semibold text-purple-700 shadow-sm transition-all duration-200 hover:border-purple-400 hover:bg-purple-50 hover:shadow-md focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          <EyeIcon className="mr-2 h-5 w-5" />
                          Document {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Application Metadata */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="mb-6 flex items-center text-lg font-bold text-gray-900">
              <div className="mr-3 rounded-lg bg-gray-100 p-2">
                <CalendarIcon className="h-5 w-5 text-gray-600" />
              </div>
              Application Details
            </h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-3">
                <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Application ID
                </label>
                <p className="font-mono text-sm font-bold text-gray-900">
                  {application.id.slice(0, 8)}...
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Job Listing ID
                </label>
                <p className="font-mono text-sm font-bold text-gray-900">
                  {application.job_listing_id.slice(0, 8)}...
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Submitted
                </label>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900">
                    {formatDate(application.created_at)}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Last Updated
                </label>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900">
                    {formatDate(application.updated_at)}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Source
                </label>
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {application.source || 'Website'}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  GDPR Consent
                </label>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                    application.gdpr_consent
                      ? 'border border-green-200 bg-green-100 text-green-800'
                      : 'border border-red-200 bg-red-100 text-red-800'
                  }`}
                >
                  {application.gdpr_consent ? '✓ Consented' : '✗ Not Consented'}
                </span>
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="mb-6 flex items-center text-lg font-bold text-gray-900">
              <div className="mr-3 rounded-lg bg-yellow-100 p-2">
                <DocumentIcon className="h-5 w-5 text-yellow-600" />
              </div>
              Internal Notes
            </h3>
            {application.internal_notes ? (
              <div className="rounded-xl bg-yellow-50 p-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
                  {application.internal_notes}
                </p>
              </div>
            ) : (
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <DocumentIcon className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500 italic">
                  No internal notes added yet.
                </p>
              </div>
            )}
          </div>

          {/* Tags */}
          {application.tags && application.tags.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="mb-6 flex items-center text-lg font-bold text-gray-900">
                <div className="mr-3 rounded-lg bg-indigo-100 p-2">
                  <StarIcon className="h-5 w-5 text-indigo-600" />
                </div>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {application.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full border border-indigo-200 bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 text-xs font-semibold text-indigo-800 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Application Timeline */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="mb-6 flex items-center text-lg font-bold text-gray-900">
              <div className="mr-3 rounded-lg bg-blue-100 p-2">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
              Application Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Application Submitted
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(application.created_at)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Last Updated
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(application.updated_at)}
                  </p>
                </div>
              </div>
              {application.assigned_to && (
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      Assigned To
                    </p>
                    <p className="text-xs text-gray-500">
                      {application.assigned_to}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Application Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="mb-6 flex items-center text-lg font-bold text-gray-900">
              <div className="mr-3 rounded-lg bg-green-100 p-2">
                <DocumentIcon className="h-5 w-5 text-green-600" />
              </div>
              Additional Details
            </h3>
            <div className="space-y-4">
              {application.source && (
                <div className="rounded-lg bg-green-50 p-3">
                  <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Application Source
                  </label>
                  <p className="text-sm font-semibold text-gray-900 capitalize">
                    {application.source}
                  </p>
                </div>
              )}
              {application.notice_period && (
                <div className="rounded-lg bg-green-50 p-3">
                  <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Notice Period
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {application.notice_period}
                  </p>
                </div>
              )}
              {application.expected_salary && (
                <div className="rounded-lg bg-green-50 p-3">
                  <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Expected Salary
                  </label>
                  <p className="text-sm font-bold text-green-700">
                    {formatCurrency(application.expected_salary)}
                  </p>
                </div>
              )}
            </div>
          </div>
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
