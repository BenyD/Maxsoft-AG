import { clsx } from 'clsx'

export function Container({
  className,
  children,
  id,
}: {
  className?: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <div id={id} className={clsx(className, 'px-6 lg:px-8')}>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">{children}</div>
    </div>
  )
}
