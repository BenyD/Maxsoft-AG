import { formatDistanceToNow } from 'date-fns'
import { StatusBadge } from './status-badge'

interface Application {
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
}

interface RecentApplicationsProps {
  applications: Application[]
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  if (!applications || applications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
        <p className="text-gray-500">When candidates apply for positions, they&apos;ll appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <div
          key={application.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
        >
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {application.candidate_name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
            </div>
            
            {/* Application Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {application.candidate_name}
                </p>
                <StatusBadge status={application.status} />
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  {application.job_listing_id || 'Unknown Position'}
                </span>
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}
                </span>
                {application.priority && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    application.priority === 'high' ? 'bg-red-100 text-red-800' :
                    application.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {application.priority.charAt(0).toUpperCase() + application.priority.slice(1)} Priority
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <a
              href={`/admin/applications/${application.id}`}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              View Details
              <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
