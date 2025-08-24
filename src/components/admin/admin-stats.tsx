import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

interface AdminStatsProps {
  totalApplications: number
  pendingApplications: number
  thisMonth: number
}

export function AdminStats({
  totalApplications,
  pendingApplications,
  thisMonth,
}: AdminStatsProps) {
  const stats = [
    {
      name: 'Total Applications',
      value: totalApplications,
      icon: BriefcaseIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Pending Review',
      value: pendingApplications,
      icon: ClockIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'This Month',
      value: thisMonth,
      icon: CalendarIcon,
      color: 'bg-green-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
        >
          <dt>
            <div className={`absolute rounded-md p-3 ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </dd>
        </div>
      ))}
    </div>
  )
}
