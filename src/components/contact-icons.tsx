import {
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  LinkIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

const iconMap = {
  CalendarIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  LinkIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  ClockIcon,
}

export function ContactIcon({
  iconName,
  className,
}: {
  iconName: string
  className?: string
}) {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || MapPinIcon

  return <IconComponent className={className} />
}
