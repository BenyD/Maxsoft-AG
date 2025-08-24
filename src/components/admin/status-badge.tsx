import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon, 
  EyeIcon,
  UserGroupIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: ClockIcon,
          label: 'Pending Review'
        }
      case 'reviewed':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: EyeIcon,
          label: 'Reviewed'
        }
      case 'shortlisted':
        return {
          color: 'bg-green-100 text-green-800',
          icon: CheckCircleIcon,
          label: 'Shortlisted'
        }
      case 'interview_scheduled':
        return {
          color: 'bg-purple-100 text-purple-800',
          icon: PhoneIcon,
          label: 'Interview Scheduled'
        }
      case 'interviewed':
        return {
          color: 'bg-indigo-100 text-indigo-800',
          icon: UserGroupIcon,
          label: 'Interviewed'
        }
      case 'accepted':
        return {
          color: 'bg-emerald-100 text-emerald-800',
          icon: CheckCircleIcon,
          label: 'Accepted'
        }
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800',
          icon: XCircleIcon,
          label: 'Rejected'
        }
      case 'withdrawn':
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: XCircleIcon,
          label: 'Withdrawn'
        }
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: ClockIcon,
          label: status || 'Unknown'
        }
    }
  }

  const config = getStatusConfig(status)
  const IconComponent = config.icon

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
      <IconComponent className="mr-1 h-3 w-3" />
      {config.label}
    </span>
  )
}
