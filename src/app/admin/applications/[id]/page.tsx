import AdminSidebar from '@/components/admin/admin-sidebar'
import { ApplicationDetails } from '@/components/admin/application-details'
import { createAdminClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Application Details
              </h1>
              <p className="mt-2 text-gray-600">
                Viewing application for {application.candidate_name}
              </p>
            </div>

            <ApplicationDetails application={application} />
          </div>
        </main>
      </div>
    </div>
  )
}
