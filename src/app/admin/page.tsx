import { createServerComponentClient } from '@/lib/supabase'
import { AdminStats } from '@/components/admin/admin-stats'
import { RecentApplications } from '@/components/admin/recent-applications'

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
  thisMonth.setHours(0, 0, 0, 0)

  const { count: thisMonthApplications } = await supabase
    .from('job_applications')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thisMonth.toISOString())

  // Fetch recent applications
  const { data: recentApplications } = await supabase
    .from('job_applications')
    .select(`
      *,
      job_listings (
        title,
        category
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = {
    totalApplications: totalApplications || 0,
    pendingApplications: pendingApplications || 0,
    thisMonth: thisMonthApplications || 0,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your Maxsoft Admin Dashboard. Here&apos;s an overview of your job applications.
        </p>
      </div>

      <AdminStats {...stats} />
      
      <div className="mt-8">
        <RecentApplications applications={recentApplications || []} />
      </div>
    </div>
  )
}
