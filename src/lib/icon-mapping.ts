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
} from '@heroicons/react/24/outline'

export const iconMapping = {
  ComputerDesktopIcon,
  CloudIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CircleStackIcon,
  CodeBracketIcon,
  ChartBarIcon,
  CpuChipIcon,
  ArrowPathIcon,
  LightBulbIcon,
  BuildingOfficeIcon,
  RocketLaunchIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  DeviceTabletIcon,
  MapIcon,
  BoltIcon,
  DocumentCheckIcon,
  EyeIcon,
} as const

export type IconName = keyof typeof iconMapping

export function getIconComponent(iconName: string) {
  return iconMapping[iconName as IconName] || ComputerDesktopIcon
}
