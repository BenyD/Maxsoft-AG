import { BriefcaseIcon } from '@heroicons/react/24/outline'

export function NoPositionsIcon({
  className = 'mx-auto h-16 w-16',
}: {
  className?: string
}) {
  return (
    <div className="text-gray-400">
      <BriefcaseIcon className={className} />
    </div>
  )
}
