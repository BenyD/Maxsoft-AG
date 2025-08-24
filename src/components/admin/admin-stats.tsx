import { 
  DocumentTextIcon, 
  ClockIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline'

interface AdminStatsProps {
  totalApplications: number
  pendingApplications: number
  monthlyApplications: number
}

export function AdminStats({ 
  totalApplications, 
  pendingApplications, 
  monthlyApplications 
}: AdminStatsProps) {
  const stats = [
    {
      name: 'Total Applications',
      value: totalApplications,
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'All time applications'
    },
    {
      name: 'Pending Review',
      value: pendingApplications,
      icon: ClockIcon,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      description: 'Awaiting your decision'
    },
    {
      name: 'This Month',
      value: monthlyApplications,
      icon: CalendarIcon,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'New applications this month'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-center">
            <div className={`flex-shrink-0 w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.name}
              </p>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value.toLocaleString()}
                </p>
                {stat.name === 'This Month' && (
                  <span className="ml-2 text-sm text-green-600 font-medium">
                    +{Math.round((monthlyApplications / Math.max(totalApplications, 1)) * 100)}%
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stat.description}
              </p>
            </div>
          </div>
          
          {/* Progress bar for pending applications */}
          {stat.name === 'Pending Review' && pendingApplications > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Review Progress</span>
                <span>{Math.round(((totalApplications - pendingApplications) / totalApplications) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(((totalApplications - pendingApplications) / totalApplications) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
