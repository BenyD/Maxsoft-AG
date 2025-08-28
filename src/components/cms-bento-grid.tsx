import { BentoCard } from '@/components/bento-card'
import { Container } from '@/components/container'
import { image } from '@/sanity/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface CMSBentoItem {
  _id: string
  title: string
  eyebrow: string
  description: string
  image: SanityImageSource
}

interface CMSBentoGridProps {
  items: CMSBentoItem[]
  dark?: boolean
  className?: string
}

export function CMSBentoGrid({
  items,
  dark = false,
  className = '',
}: CMSBentoGridProps) {
  if (!items || items.length === 0) {
    return null
  }

  // Calculate grid layout based on number of items
  const getGridClasses = (index: number, total: number) => {
    if (total === 1) return 'lg:col-span-6'
    if (total === 2)
      return index === 0
        ? 'lg:col-span-3 lg:rounded-tl-4xl'
        : 'lg:col-span-3 lg:rounded-tr-4xl'
    if (total === 3) {
      if (index === 0) return 'lg:col-span-3 lg:rounded-tl-4xl'
      if (index === 1) return 'lg:col-span-3 lg:rounded-tr-4xl'
      return 'lg:col-span-6 lg:rounded-b-4xl'
    }
    if (total === 4) {
      if (index === 0)
        return 'max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl'
      if (index === 1) return 'lg:col-span-3 lg:rounded-tr-4xl'
      if (index === 2) return 'lg:col-span-2 lg:rounded-bl-4xl'
      return 'lg:col-span-4 lg:rounded-br-4xl'
    }
    // For more than 4 items, use a more flexible layout
    if (index === 0)
      return 'max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl'
    if (index === 1) return 'lg:col-span-3 lg:rounded-tr-4xl'
    if (index === total - 1)
      return 'max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl'
    if (index === total - 2) return 'lg:col-span-2 lg:rounded-bl-4xl'
    return 'lg:col-span-2'
  }

  return (
    <Container className={className}>
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-6">
        {items.map((item, index) => (
          <BentoCard
            key={item._id}
            dark={dark}
            eyebrow={item.eyebrow}
            title={item.title}
            description={item.description}
            graphic={
              <div
                className="h-80 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${image(item.image).url()})`,
                }}
              />
            }
            className={getGridClasses(index, items.length)}
          />
        ))}
      </div>
    </Container>
  )
}
