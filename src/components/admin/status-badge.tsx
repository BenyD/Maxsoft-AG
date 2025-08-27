import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon, 
  EyeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'new':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: ClockIcon,
          label: 'New'
        }
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: ClockIcon,
          label: 'Pending Review'
        }
      case 'reviewing':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: EyeIcon,
          label: 'Under Review'
        }
      case 'shortlisted':
        return {
          color: 'bg-green-100 text-green-800',
          icon: CheckCircleIcon,
          label: 'Shortlisted'
        }
      case 'interviewing':
        return {
          color: 'bg-purple-100 text-purple-800',
          icon: PhoneIcon,
          label: 'Interviewing'
        }
      case 'offered':
        return {
          color: 'bg-emerald-100 text-emerald-800',
          icon: CheckCircleIcon,
          label: 'Offer Made'
        }
      case 'hired':
        return {
          color: 'bg-emerald-100 text-emerald-800',
          icon: CheckCircleIcon,
          label: 'Hired'
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
          label: status ? status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ') : 'Unknown'
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
