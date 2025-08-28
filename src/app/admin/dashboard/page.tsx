import { AdminStats } from '@/components/admin/admin-stats'
import type { Application } from '@/components/admin/recent-applications'
import { RecentApplications } from '@/components/admin/recent-applications'
import { createAdminClient } from '@/lib/supabase'
import { getJobListings } from '@/sanity/queries'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = createAdminClient()

  // Fetch application statistics
  const { count: totalApplications } = await supabase
    .from('job_applications')
    .select('*', { count: 'exact', head: true })

  const { count: pendingApplications } = await supabase
    .from('job_applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  const thisMonth = new Date()
  thisMonth.setDate(1)
  const { count: monthlyApplications } = await supabase
    .from('job_applications')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thisMonth.toISOString())

  // Fetch recent applications
  const { data: recentApplications } = await supabase
    .from('job_applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  // Fetch job listings from Sanity to get position titles
  const jobListings = await getJobListings()
  const jobListingsMap = new Map()

  if (jobListings.data) {
    jobListings.data.forEach(
      (job: { _id: string; title: string; category?: { name: string } }) => {
        jobListingsMap.set(job._id, job)
      },
    )
  }

  // Enhance applications with job listing information
  const enhancedRecentApplications =
    recentApplications?.map(
      (app: { job_listing_id: string; [key: string]: unknown }) => ({
        ...app,
        jobListing: jobListingsMap.get(app.job_listing_id) || null,
      }),
    ) || []

  // Test database connection - removed unused variables
  await supabase.from('job_applications').select('count').limit(1)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="mb-3 text-4xl font-bold text-gray-900">
          Welcome back, Admin! 👋
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600 lg:mx-0">
          Here&apos;s what&apos;s happening with your job applications today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-12">
        <AdminStats
          totalApplications={totalApplications || 0}
          pendingApplications={pendingApplications || 0}
          monthlyApplications={monthlyApplications || 0}
        />
      </div>

      {/* Recent Applications Section */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Applications
              </h2>
              <p className="mt-2 text-gray-600">
                Latest job applications that need your attention
              </p>
            </div>
            <Link
              href="/admin/applications"
              className="inline-flex transform items-center rounded-xl border border-transparent bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              View All Applications
              <svg
                className="-mr-1 ml-2 h-4 w-4"
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
            </Link>
          </div>
        </div>
        <RecentApplications
          applications={enhancedRecentApplications as Application[]}
        />
      </div>

      {/* CMS Guide Section */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-green-50 px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Content Management
              </h2>
              <p className="mt-2 text-gray-600">
                Learn how to manage website content using Sanity CMS
              </p>
            </div>
            <Link
              href="/admin/cms-guide"
              className="inline-flex transform items-center rounded-xl border border-transparent bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-green-700 hover:to-green-800 hover:shadow-xl focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              CMS Guide
              <svg
                className="-mr-1 ml-2 h-4 w-4"
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
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Competencies</h3>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                Manage core business competencies and expertise areas
              </p>
              <Link
                href="/studio"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Add Content →
              </Link>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Team Members</h3>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                Manage staff profiles and team information
              </p>
              <Link
                href="/studio"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Add Content →
              </Link>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                  <svg
                    className="h-4 w-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Quick Access</h3>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                Direct access to Sanity Studio for content management
              </p>
              <Link
                href="/studio"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Open Studio →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
