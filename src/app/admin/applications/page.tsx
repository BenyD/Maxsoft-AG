import { ApplicationsFilters } from '@/components/admin/applications-filters'
import { ApplicationsTable } from '@/components/admin/applications-table'
import { createServerComponentClient } from '@/lib/supabase'

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>
}) {
  try {
    const supabase = createServerComponentClient()

    // Await searchParams
    const params = await searchParams

    // Build query based on search params
    let query = supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (params.status && params.status !== 'all') {
      query = query.eq('status', params.status)
    }

    if (params.search) {
      query = query.or(
        `candidate_name.ilike.%${params.search}%,candidate_email.ilike.%${params.search}%`,
      )
    }

    // Get total count for pagination
    const { count: totalApplications, error: countError } = await supabase
      .from('job_applications')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('Error fetching application count:', countError)
      throw new Error(
        `Failed to fetch application count: ${countError.message}`,
      )
    }

    // Apply pagination
    const page = parseInt(params.page || '1')
    const pageSize = 10
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    query = query.range(from, to)

    const { data: applications, error: queryError } = await query

    if (queryError) {
      console.error('Error fetching applications:', queryError)
      throw new Error(`Failed to fetch applications: ${queryError.message}`)
    }

    // Debug logging
    console.log('Query results:', {
      totalApplications,
      applicationsCount: applications?.length || 0,
      page,
      pageSize,
      from,
      to,
    })

    const totalPages = Math.ceil((totalApplications || 0) / pageSize)

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Job Applications
                </h1>
                <p className="text-lg text-gray-600">
                  Manage and review all job applications in one place
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-lg border border-gray-200 bg-white px-4 py-2">
                  <span className="text-sm font-medium text-gray-900">
                    {totalApplications || 0} Total Applications
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <ApplicationsFilters
              currentStatus={params.status || 'all'}
              currentSearch={params.search || ''}
            />
          </div>

          {/* Applications Table */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    All Applications
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Showing {applications?.length || 0} of{' '}
                    {totalApplications || 0} applications
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    Page {page} of {totalPages}
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <ApplicationsTable
                applications={applications || []}
                currentPage={page}
                totalCount={totalApplications || 0}
                pageSize={pageSize}
              />
            </div>
          </div>

          {/* Pagination Info */}
          {totalPages > 1 && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2">
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages} • {totalApplications || 0} total
                  applications
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Applications page error:', error)

    // Return error UI
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-12 w-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-2xl font-bold text-red-900">
              Error Loading Applications
            </h1>
            <p className="mb-6 text-red-700">
              {error instanceof Error
                ? error.message
                : 'An unexpected error occurred while loading applications.'}
            </p>
            <div className="space-y-3">
              <p className="text-sm text-red-600">
                Please check the following:
              </p>
              <ul className="space-y-1 text-sm text-red-600">
                <li>• Database connection is working</li>
                <li>• Supabase configuration is correct</li>
                <li>• Required tables exist in the database</li>
                <li>• Environment variables are set properly</li>
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="/admin/applications"
                className="inline-flex items-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              >
                Try Again
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
