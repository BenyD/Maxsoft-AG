import {
  ArrowPathIcon,
  BoltIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CircleStackIcon,
  ClipboardDocumentListIcon,
  CloudIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  DocumentCheckIcon,
  EyeIcon,
  GlobeAltIcon,
  LightBulbIcon,
  MapIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'
import type { ComponentType } from 'react'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  ArrowPathIcon,
  BoltIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CircleStackIcon,
  ClipboardDocumentListIcon,
  CloudIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  DocumentCheckIcon,
  EyeIcon,
  GlobeAltIcon,
  LightBulbIcon,
  MapIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  UsersIcon,
}

interface IconProps {
  name: string
  className?: string
  fallback?: string
}

export function Icon({ name, className = 'h-5 w-5', fallback }: IconProps) {
  const IconComponent = iconMap[name]

  if (IconComponent) {
    return <IconComponent className={className} />
  }

  // Fallback to text if icon not found
  return (
    <span
      className={`${className} flex items-center justify-center text-xs font-semibold`}
    >
      {fallback || name.charAt(0)}
    </span>
  )
}
