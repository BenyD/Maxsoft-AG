import { BriefcaseIcon } from '@heroicons/react/24/outline'
import { formatDistanceToNow } from 'date-fns'
import { StatusBadge } from './status-badge'

export interface Application {
  id: string
  candidate_name: string
  candidate_email: string
  status: string
  priority?: string
  rating?: number
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

interface RecentApplicationsProps {
  applications: Application[]
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  if (!applications || applications.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          No applications yet
        </h3>
        <p className="text-gray-500">
          When candidates apply for positions, they&apos;ll appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {applications.map((application) => (
        <div
          key={application.id}
          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
        >
          {/* Priority indicator bar */}
          {application.priority && (
            <div
              className={`absolute top-0 bottom-0 left-0 w-1 ${
                application.priority === 'urgent'
                  ? 'bg-red-500'
                  : application.priority === 'high'
                    ? 'bg-orange-500'
                    : application.priority === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
              }`}
            />
          )}

          <div className="flex items-start space-x-4 pl-4">
            {/* Enhanced Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white shadow-lg">
                  {application.candidate_name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                {/* Status indicator dot */}
                <div
                  className={`absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white ${
                    application.status === 'new'
                      ? 'bg-blue-500'
                      : application.status === 'reviewing'
                        ? 'bg-yellow-500'
                        : application.status === 'shortlisted'
                          ? 'bg-green-500'
                          : application.status === 'interviewing'
                            ? 'bg-purple-500'
                            : application.status === 'offered'
                              ? 'bg-indigo-500'
                              : application.status === 'hired'
                                ? 'bg-emerald-500'
                                : application.status === 'rejected'
                                  ? 'bg-red-500'
                                  : 'bg-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Enhanced Application Info */}
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {application.candidate_name}
                    </h3>
                    <StatusBadge status={application.status} />
                  </div>

                  {/* Job Position Info */}
                  <div className="mb-3">
                    {application.jobListing ? (
                      <div className="flex items-center space-x-2">
                        <BriefcaseIcon className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {application.jobListing.title}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-400">
                        <BriefcaseIcon className="h-4 w-4 text-gray-400" />
                        <span>Position ID: {application.job_listing_id}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Priority Badge */}
                {application.priority && (
                  <div className="flex-shrink-0">
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
                      title={`Priority: ${application.priority}. Can be manually set or auto-calculated based on experience, skills match, and application timing.`}
                    >
                      {application.priority === 'urgent'
                        ? '🚨'
                        : application.priority === 'high'
                          ? '⚡'
                          : application.priority === 'medium'
                            ? '📊'
                            : '📈'}{' '}
                      {application.priority === 'urgent'
                        ? 'Urgent'
                        : application.priority === 'high'
                          ? 'High'
                          : application.priority === 'medium'
                            ? 'Medium'
                            : 'Low'}
                    </span>
                  </div>
                )}
              </div>

              {/* Additional Details Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      {formatDistanceToNow(new Date(application.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </span>

                  {application.experience_years && (
                    <span className="flex items-center space-x-1">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{application.experience_years} years exp.</span>
                    </span>
                  )}

                  {application.skills && application.skills.length > 0 && (
                    <span className="flex items-center space-x-1">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      <span>{application.skills.slice(0, 2).join(', ')}</span>
                      {application.skills.length > 2 && (
                        <span className="text-gray-400">
                          +{application.skills.length - 2} more
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {/* Enhanced Action Button */}
                <div className="flex-shrink-0 translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                  <a
                    href={`/admin/applications/${application.id}`}
                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  >
                    View Details
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
