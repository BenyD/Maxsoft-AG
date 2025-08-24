import {
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

const iconMap = {
  MapPinIcon: MapPinIcon,
  PhoneIcon: PhoneIcon,
  EnvelopeIcon: EnvelopeIcon,
  GlobeIcon: GlobeAltIcon,
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
