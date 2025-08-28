import { Button } from '@/components/button'
import { Container } from '@/components/container'

interface EmptyStateProps {
  title: string
  description: string
  actionText: string
  actionHref: string
  secondaryActionText?: string
  secondaryActionHref?: string
}

export function EmptyState({
  title,
  description,
  actionText,
  actionHref,
  secondaryActionText,
  secondaryActionHref,
}: EmptyStateProps) {
  return (
    <Container className="py-24">
      <div className="text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-10 w-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="mb-8 max-w-md mx-auto leading-relaxed text-gray-600">
          {description}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href={actionHref}>{actionText}</Button>
          {secondaryActionText && secondaryActionHref && (
            <Button href={secondaryActionHref} variant="outline">
              {secondaryActionText}
            </Button>
          )}
        </div>
      </div>
    </Container>
  )
}
