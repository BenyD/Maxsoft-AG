'use client'

import {
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { StatusBadge } from './status-badge'

export interface Application {
  id: string
  candidate_name: string
  candidate_email: string
  status: string
  priority: string
  rating: number
  created_at: string
  job_listing_id: string
  experience_years?: number
  current_position?: string
  skills?: string[]
  jobListing?: {
    _id: string
    title: string
    category?: {
      name: string
      color: string
    }
    location?: string
    employmentType?: string
  } | null
}

interface ApplicationsTableProps {
  applications: Application[]
  currentPage: number
  totalCount: number
  pageSize: number
}

export function ApplicationsTable({
  applications,
  currentPage,
  totalCount,
  pageSize,
}: ApplicationsTableProps) {
  const totalPages = Math.ceil(totalCount / pageSize)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (applications.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <UserIcon className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="mb-2 text-xl font-medium text-gray-900">
          No applications found
        </h3>
        <p className="mx-auto max-w-md text-gray-500">
          {totalCount === 0
            ? "No applications have been submitted yet. They'll appear here once candidates start applying."
            : 'No applications match your current filters. Try adjusting your search criteria.'}
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden overflow-hidden lg:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-blue-50">
              <th className="border-b-2 border-blue-200 px-6 py-5 text-left text-sm font-bold tracking-wider text-gray-700 uppercase">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>Candidate</span>
                </div>
              </th>
              <th className="border-b-2 border-blue-200 px-6 py-5 text-left text-sm font-bold tracking-wider text-gray-700 uppercase">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <BriefcaseIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <span>Position</span>
                </div>
              </th>
              <th className="border-b-2 border-blue-200 px-6 py-5 text-left text-sm font-bold tracking-wider text-gray-700 uppercase">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-indigo-100 p-2">
                    <CheckCircleIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <span>Status</span>
                </div>
              </th>
              <th className="border-b-2 border-blue-200 px-6 py-5 text-left text-sm font-bold tracking-wider text-gray-700 uppercase">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-red-100 p-2">
                    <ClockIcon className="h-5 w-5 text-red-600" />
                  </div>
                  <span>Priority</span>
                </div>
              </th>
              <th className="border-b-2 border-blue-200 px-6 py-5 text-left text-sm font-bold tracking-wider text-gray-700 uppercase">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-orange-100 p-2">
                    <StarIcon className="h-5 w-5 text-orange-600" />
                  </div>
                  <span>Rating</span>
                </div>
              </th>
              <th className="border-b-2 border-blue-200 px-6 py-5 text-left text-sm font-bold tracking-wider text-gray-700 uppercase">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-yellow-100 p-2">
                    <CalendarIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span>Applied</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {applications.map((application, index) => (
              <tr
                key={application.id}
                className={`cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
                onClick={() =>
                  (window.location.href = `/admin/applications/${application.id}`)
                }
              >
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white shadow-lg">
                        {application.candidate_name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-semibold text-gray-900">
                        {application.candidate_name}
                      </div>
                      <div className="mb-1 flex items-center text-sm text-gray-600">
                        <EnvelopeIcon className="mr-2 h-4 w-4 text-gray-400" />
                        {application.candidate_email}
                      </div>
                      {application.skills && application.skills.length > 0 && (
                        <div className="text-xs text-gray-500">
                          Skills: {application.skills.slice(0, 2).join(', ')}
                          {application.skills.length > 2 && (
                            <span className="text-gray-400">
                              {' '}
                              +{application.skills.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center text-sm font-medium text-gray-900">
                    <div className="mr-3 rounded-lg bg-purple-50 p-2">
                      <BriefcaseIcon className="h-4 w-4 text-purple-600" />
                    </div>
                    {application.jobListing ? (
                      <div>
                        <div className="font-semibold text-gray-900">
                          {application.jobListing.title}
                        </div>
                        {application.jobListing.location && (
                          <div className="mt-1 text-xs text-gray-500">
                            📍 {application.jobListing.location}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        <div>Position ID: {application.job_listing_id}</div>
                        <div className="text-xs">Job listing not found</div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-lg bg-indigo-50 p-2">
                      <CheckCircleIcon className="h-4 w-4 text-indigo-600" />
                    </div>
                    <StatusBadge status={application.status} />
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-lg bg-red-50 p-2">
                      <ClockIcon className="h-4 w-4 text-red-600" />
                    </div>
                    {application.priority ? (
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold shadow-sm ${
                          application.priority === 'urgent'
                            ? 'border border-red-200 bg-red-100 text-red-800'
                            : application.priority === 'high'
                              ? 'border border-orange-200 bg-orange-100 text-orange-800'
                              : application.priority === 'medium'
                                ? 'border border-yellow-200 bg-yellow-100 text-yellow-800'
                                : 'border border-green-200 bg-green-100 text-green-800'
                        }`}
                      >
                        {application.priority === 'urgent'
                          ? '🚨'
                          : application.priority === 'high'
                            ? '⚡'
                            : application.priority === 'medium'
                              ? '📊'
                              : '📈'}{' '}
                        {application.priority.charAt(0).toUpperCase() +
                          application.priority.slice(1)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">Not set</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-lg bg-orange-50 p-2">
                      <StarIcon className="h-4 w-4 text-orange-600" />
                    </div>
                    {application.rating ? (
                      <div>
                        <div className="mb-1 flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className={`h-4 w-4 ${
                                star <= application.rating
                                  ? 'fill-current text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.rating}/5
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Not rated</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-6 text-sm whitespace-nowrap text-gray-500">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-lg bg-yellow-50 p-2">
                      <CalendarIcon className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {formatDate(application.created_at)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(application.created_at).toLocaleTimeString(
                          'en-US',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 lg:hidden">
        {applications.map((application) => (
          <div
            key={application.id}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
            onClick={() =>
              (window.location.href = `/admin/applications/${application.id}`)
            }
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-semibold text-white shadow-lg">
                  {application.candidate_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {application.candidate_name}
                  </h3>
                  <p className="flex items-center text-sm text-gray-500">
                    <EnvelopeIcon className="mr-1 h-3 w-3" />
                    {application.candidate_email}
                  </p>
                </div>
              </div>
              <StatusBadge status={application.status} />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <BriefcaseIcon className="mr-2 h-4 w-4 text-gray-400" />
                <span>Position</span>
              </div>
              <div className="text-sm font-medium text-gray-900">
                {application.jobListing ? (
                  <div>
                    <div className="font-semibold">
                      {application.jobListing.title}
                    </div>
                    {application.jobListing.category && (
                      <div className="text-xs text-gray-500">
                        {application.jobListing.category.name}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <div>Position ID: {application.job_listing_id}</div>
                    <div className="text-xs">Job listing not found</div>
                  </div>
                )}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <ClockIcon className="mr-2 h-4 w-4 text-gray-400" />
                <span>Applied</span>
              </div>
              <div className="text-sm text-gray-900">
                {formatDate(application.created_at)}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2 h-2 w-2 rounded-full bg-gray-300"></span>
                <span>Priority</span>
              </div>
              <div>
                {application.priority ? (
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(application.priority)}`}
                  >
                    {application.priority.charAt(0).toUpperCase() +
                      application.priority.slice(1)}
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">Not set</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {(currentPage - 1) * pageSize + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, totalCount)}
            </span>{' '}
            of <span className="font-medium">{totalCount}</span> results
          </div>
          <div className="flex space-x-2">
            {currentPage > 1 && (
              <Link
                href={`/admin/applications?page=${currentPage - 1}`}
                className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={`/admin/applications?page=${currentPage + 1}`}
                className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}
