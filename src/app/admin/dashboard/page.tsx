import { AdminStats } from '@/components/admin/admin-stats'
import { RecentApplications } from '@/components/admin/recent-applications'
import { createServerComponentClient } from '@/lib/supabase'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = createServerComponentClient()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-lg text-gray-600">
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
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Applications
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Latest job applications that need your attention
                </p>
              </div>
              <Link
                href="/admin/applications"
                className="inline-flex items-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
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
            <RecentApplications applications={recentApplications || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
