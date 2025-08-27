import { ApplicationDetails } from '@/components/admin/application-details'
import { createAdminClient } from '@/lib/supabase'
import { getJobListings } from '@/sanity/queries'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

interface ApplicationDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function ApplicationDetailsPage({
  params,
}: ApplicationDetailsPageProps) {
  const { id } = await params
  const supabase = createAdminClient()

  // Fetch application details
  const { data: application, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !application) {
    notFound()
  }

  // Fetch job listings from Sanity to get position details
  const jobListings = await getJobListings()
  const jobListing = jobListings.data?.find(
    (job: { _id: string }) => job._id === application.job_listing_id,
  )

  // Enhance application with job listing information
  const enhancedApplication = {
    ...application,
    jobListing: jobListing || null,
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Enhanced Header */}
      <div className="mb-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/admin/applications"
            className="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Applications
          </Link>
        </div>

        {/* Main Header */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="mb-3 text-4xl font-bold text-gray-900">
                Application Details
              </h1>
              <p className="mb-4 text-xl text-gray-600">
                Reviewing application for{' '}
                <span className="font-semibold text-blue-600">
                  {application.candidate_name}
                </span>
              </p>

              {/* Job Position Information */}
              {enhancedApplication.jobListing && (
                <div className="mb-4 rounded-xl border border-blue-200 bg-white p-4">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <ArrowLeftIcon className="h-5 w-5 rotate-90 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {enhancedApplication.jobListing.title}
                      </h3>
                      {enhancedApplication.jobListing.category && (
                        <p className="text-sm font-medium text-blue-600">
                          {enhancedApplication.jobListing.category.name}
                        </p>
                      )}
                      {enhancedApplication.jobListing.location && (
                        <p className="text-sm text-gray-600">
                          📍 {enhancedApplication.jobListing.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  ID: {application.id.slice(0, 8)}...
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                  Submitted:{' '}
                  {new Date(application.created_at).toLocaleDateString()}
                </span>
                {enhancedApplication.jobListing && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    Position:{' '}
                    {enhancedApplication.jobListing.title.slice(0, 20)}...
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <Link
                href={`/admin/applications`}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                View All Applications
              </Link>
              <a
                href={`mailto:${application.candidate_email}`}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Contact Candidate
              </a>
            </div>
          </div>
        </div>
      </div>

      <ApplicationDetails application={enhancedApplication} />
    </div>
  )
}
