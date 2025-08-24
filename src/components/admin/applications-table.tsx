'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  CalendarIcon, 
  EnvelopeIcon, 
  EyeIcon,
  CheckCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { StatusBadge } from './status-badge'
import { StatusUpdateModal } from './status-update-modal'

interface Application {
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
  pageSize 
}: ApplicationsTableProps) {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showStatusModal, setShowStatusModal] = useState(false)

  const totalPages = Math.ceil(totalCount / pageSize)

  const handleStatusUpdate = (application: Application) => {
    setSelectedApplication(application)
    setShowStatusModal(true)
  }

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
      <div className="text-center py-16 px-6">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <UserIcon className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No applications found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {totalCount === 0 
            ? "No applications have been submitted yet. They'll appear here once candidates start applying." 
            : "No applications match your current filters. Try adjusting your search criteria."
          }
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4" />
                  <span>Candidate</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  <span>Position</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Priority
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Applied</span>
                </div>
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        {application.candidate_name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {application.candidate_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.candidate_email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">
                    {/* Assuming job_listing_id is linked to a job listing title */}
                    {/* This part needs to be implemented based on your actual job listing data */}
                    {application.job_listing_id ? 'Job Listing' : 'N/A'}
                  </div>
                  {/* This part needs to be implemented based on your actual job listing data */}
                  {/* {application.job_listings?.category && (
                    <div className="text-sm text-gray-500">
                      {application.job_listings.category}
                    </div>
                  )} */}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <StatusBadge status={application.status} />
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  {application.priority ? (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(application.priority)}`}>
                      {application.priority.charAt(0).toUpperCase() + application.priority.slice(1)}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">Not set</span>
                  )}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  {application.rating ? (
                    <div className="flex items-center">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-4 w-4 ${
                              star <= application.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {application.rating}/5
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Not rated</span>
                  )}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(application.created_at)}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      href={`/admin/applications/${application.id}`}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <EyeIcon className="h-4 w-4 mr-1.5" />
                      View
                    </Link>
                    <button
                      onClick={() => handleStatusUpdate(application)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <CheckCircleIcon className="h-4 w-4 mr-1.5" />
                      Update
                    </button>
                    <button
                      onClick={() => {
                        // Handle email action
                        window.open(`mailto:${application.candidate_email}`, '_blank')
                      }}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <EnvelopeIcon className="h-4 w-4 mr-1.5" />
                      Email
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, totalCount)}
            </span>{' '}
            of <span className="font-medium">{totalCount}</span> results
          </div>
          <div className="flex space-x-2">
            {currentPage > 1 && (
              <Link
                href={`/admin/applications?page=${currentPage - 1}`}
                className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={`/admin/applications?page=${currentPage + 1}`}
                className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedApplication && (
        <StatusUpdateModal
          application={selectedApplication}
          isOpen={showStatusModal}
          onClose={() => setShowStatusModal(false)}
        />
      )}
    </>
  )
}
