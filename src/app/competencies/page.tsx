import { AnimationWrapper } from '@/components/animation-wrapper'
import { Container } from '@/components/container'
import { EmptyState } from '@/components/empty-state'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
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
}: {
  competency: {
    _id: string
    title: string
    eyebrow: string
    description: string
    image: { asset: { _ref: string; _type: string } }
    order: number
  }
}) {
  return (
    <div className="group">
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
        {/* Image Section */}
        <div className="mb-4 h-56 w-full flex-shrink-0 overflow-hidden rounded-lg">
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
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {competency.title}
          </h3>
          <p className="flex-1 text-base text-gray-600">
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

  // Sort competencies by order
  const sortedCompetencies = competencies.sort(
    (a: { order: number }, b: { order: number }) =>
      (a.order || 0) - (b.order || 0),
  )

  return (
    <div className="overflow-hidden">
      <GradientBackground />
      <Container className="relative z-20">
        <NavbarServer />
      </Container>
      <Container className="mt-16">
        <div className="mb-16">
          <AnimationWrapper animation="slideUp" delay={0.2}>
            <Subheading>Kompetenzen</Subheading>
          </AnimationWrapper>
          <AnimationWrapper animation="slideUp" delay={0.4}>
            <Heading as="h1" className="mt-1 max-w-4xl">
              Kundenfokus durch innovative, hochwertige Lösungen
            </Heading>
          </AnimationWrapper>
          <AnimationWrapper animation="slideUp" delay={0.6}>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Unsere Expertise liegt in der Entwicklung massgeschneiderter
              IT-Lösungen, die Unternehmen dabei unterstützen, ihre digitalen
              Ziele zu erreichen und nachhaltig zu wachsen.
            </p>
          </AnimationWrapper>
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {sortedCompetencies.map(
              (
                competency: {
                  _id: string
                  title: string
                  eyebrow: string
                  description: string
                  image: { asset: { _ref: string; _type: string } }
                  order: number
                },
                index: number,
              ) => (
                <AnimationWrapper
                  key={competency._id}
                  animation="scaleIn"
                  delay={0.8 + index * 0.2}
                >
                  <CompetencyCard competency={competency} />
                </AnimationWrapper>
              ),
            )}
          </div>
        </Container>
      )}
      <Footer />
    </div>
  )
}
