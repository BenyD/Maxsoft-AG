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
        <div className="p-6">
          <RecentApplications
            applications={enhancedRecentApplications as Application[]}
          />
        </div>
      </div>
    </div>
  )
}
