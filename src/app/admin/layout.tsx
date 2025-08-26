import AdminSidebar from '@/components/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AdminSidebar />
      <main className="py-8 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
