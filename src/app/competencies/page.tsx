import { Container } from '@/components/container'
import { EmptyState } from '@/components/empty-state'
import { Footer } from '@/components/footer'
import { NavbarServer } from '@/components/navbar-server'
import { Heading, Subheading } from '@/components/text'
import { image } from '@/sanity/image'
import { getCompetencies } from '@/sanity/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kompetenzen - Maxsoft AG',
  description:
    'Entdecken Sie die Kernkompetenzen von Maxsoft AG in der IT-Beratung, Cloud-Lösungen und digitaler Transformation.',
}

function CompetencyCard({
  competency,
  spanTwoColumns = false,
  spanTwoRows = false,
}: {
  competency: {
    _id: string
    title: string
    eyebrow: string
    description: string
    image: { asset: { _ref: string; _type: string } }
    order: number
  }
  spanTwoColumns?: boolean
  spanTwoRows?: boolean
}) {
  const getSpanClasses = () => {
    if (spanTwoColumns && spanTwoRows) return 'lg:col-span-2 lg:row-span-2'
    if (spanTwoColumns) return 'lg:col-span-2'
    if (spanTwoRows) return 'lg:row-span-2'
    return ''
  }

  const getImageHeight = () => {
    if (spanTwoColumns && spanTwoRows) return 'h-80' // Largest for 2x2 cards
    if (spanTwoColumns) return 'h-64' // Wide for 2x1 cards
    if (spanTwoRows) return 'h-72' // Tall for 1x2 cards
    return 'h-56' // Standard for 1x1 cards
  }

  const getTitleSize = () => {
    if (spanTwoColumns && spanTwoRows) return 'text-2xl' // Largest for 2x2 cards
    if (spanTwoColumns || spanTwoRows) return 'text-xl' // Medium for spanning cards
    return 'text-lg' // Standard for regular cards
  }

  const getDescriptionSize = () => {
    if (spanTwoColumns && spanTwoRows) return 'text-lg' // Larger for 2x2 cards
    if (spanTwoColumns || spanTwoRows) return 'text-base' // Medium for spanning cards
    return 'text-base' // Standard for regular cards
  }

  return (
    <div className={`group ${getSpanClasses()}`}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
        {/* Image Section */}
        <div
          className={`mb-4 w-full flex-shrink-0 overflow-hidden rounded-lg ${getImageHeight()}`}
        >
          <img
            alt={competency.title || 'Kompetenz'}
            src={image(competency.image).url()}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col">
          {competency.eyebrow && (
            <Subheading className="mb-2">{competency.eyebrow}</Subheading>
          )}
          <h3 className={`mb-2 font-semibold text-gray-900 ${getTitleSize()}`}>
            {competency.title}
          </h3>
          <p className={`flex-1 text-gray-600 ${getDescriptionSize()}`}>
            {competency.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default async function CompetenciesPage() {
  const competenciesResponse = await getCompetencies()
  const competencies = competenciesResponse?.data || []
  const hasCompetencies = competencies.length > 0

  // Create dynamic bento grid layout
  const createBentoLayout = (
    competencies: Array<{
      _id: string
      title: string
      eyebrow: string
      description: string
      image: { asset: { _ref: string; _type: string } }
      order: number
    }>,
  ) => {
    if (competencies.length === 0) return []

    const sortedCompetencies = competencies.sort(
      (a, b) => (a.order || 0) - (b.order || 0),
    )
    const layout: Array<{
      competency: {
        _id: string
        title: string
        eyebrow: string
        description: string
        image: { asset: { _ref: string; _type: string } }
        order: number
      }
      spanTwoColumns: boolean
      spanTwoRows: boolean
    }> = []

    // First competency: Hero card (2x2 - spans both columns and rows)
    if (sortedCompetencies.length > 0) {
      layout.push({
        competency: sortedCompetencies[0],
        spanTwoColumns: true,
        spanTwoRows: true,
      })
    }

    // Second competency: Standard card (1x1)
    if (sortedCompetencies.length > 1) {
      layout.push({
        competency: sortedCompetencies[1],
        spanTwoColumns: false,
        spanTwoRows: false,
      })
    }

    // Remaining competencies: Dynamic layout
    for (let i = 2; i < sortedCompetencies.length; i++) {
      const position = i - 2
      const shouldSpanTwoColumns = position % 4 === 0 // Every 4th card spans 2 columns
      const shouldSpanTwoRows = position % 5 === 0 && !shouldSpanTwoColumns // Every 5th card spans 2 rows (but not if it already spans columns)

      layout.push({
        competency: sortedCompetencies[i],
        spanTwoColumns: shouldSpanTwoColumns,
        spanTwoRows: shouldSpanTwoRows,
      })
    }

    return layout
  }

  const bentoLayout = createBentoLayout(competencies)

  return (
    <div className="overflow-hidden">
      <Container className="relative z-20">
        <NavbarServer />
      </Container>
      <Container className="mt-16">
        <div className="mb-16">
          <Subheading>Kompetenzen</Subheading>
          <Heading as="h1" className="mt-1 max-w-4xl">
            Kundenfokus durch innovative, hochwertige Lösungen
          </Heading>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            Unsere Expertise liegt in der Entwicklung massgeschneiderter
            IT-Lösungen, die Unternehmen dabei unterstützen, ihre digitalen
            Ziele zu erreichen und nachhaltig zu wachsen.
          </p>
        </div>
      </Container>

      {!hasCompetencies ? (
        <EmptyState
          title="Kompetenzen kommen bald"
          description="Wir entwickeln derzeit unser Kompetenzprofil. Kontaktieren Sie uns in der Zwischenzeit, um Ihre spezifischen IT-Bedürfnisse und massgeschneiderte Lösungen zu besprechen."
          actionText="Kontakt aufnehmen"
          actionHref="/contact"
          secondaryActionText="Über uns erfahren"
          secondaryActionHref="/company"
        />
      ) : (
        <Container className="mb-16">
          <div className="lg:grid-rows-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bentoLayout.map(({ competency, spanTwoColumns, spanTwoRows }) => (
              <CompetencyCard
                key={competency._id}
                competency={competency}
                spanTwoColumns={spanTwoColumns}
                spanTwoRows={spanTwoRows}
              />
            ))}
          </div>
        </Container>
      )}
      <Footer />
    </div>
  )
}
