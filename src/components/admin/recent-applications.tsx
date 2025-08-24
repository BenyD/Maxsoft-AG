import { CalendarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Application {
  id: string
  candidate_name: string
  candidate_email: string
  status: string
  created_at: string
  job_listings?: {
    title: string
    category: string
  }
}

interface RecentApplicationsProps {
  applications: Application[]
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'reviewed':
        return 'bg-blue-100 text-blue-800'
      case 'shortlisted':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Recent Applications
        </h3>
        <p className="py-8 text-center text-gray-500">No applications yet</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900">
          Recent Applications
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        {applications.map((application) => (
          <div key={application.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    {application.candidate_name}
                  </h4>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                      application.status,
                    )}`}
                  >
                    {application.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {application.candidate_email}
                </p>
                {application.job_listings && (
                  <p className="mt-1 text-sm text-gray-600">
                    Applied for: {application.job_listings.title}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4" />
                <span>{formatDate(application.created_at)}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <Link
                href={`/admin/applications/${application.id}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 px-6 py-4">
        <Link
          href="/admin/applications"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          View All Applications →
        </Link>
      </div>
    </div>
  )
}
