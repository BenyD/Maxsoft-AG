import { AnimationWrapper } from '@/components/animation-wrapper'
import { Container } from '@/components/container'
import { EmptyState } from '@/components/empty-state'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Heading, Subheading } from '@/components/text'
import { image } from '@/sanity/image'
import { getTechnologies } from '@/sanity/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technologien - Maxsoft AG',
  description:
    'Entdecken Sie die modernsten Technologien, die Maxsoft AG einsetzt, um aussergewöhnliche IT-Lösungen zu entwickeln.',
}

function TechnologyCard({
  technology,
}: {
  technology: {
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
        {/* Logo Section - Top Left */}
        <div className="mb-4 flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg">
          <img
            alt={technology.title || 'Technologie'}
            src={image(technology.image).url()}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col">
          {technology.eyebrow && (
            <Subheading className="mb-2">{technology.eyebrow}</Subheading>
          )}
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {technology.title}
          </h3>
          <p className="flex-1 text-base text-gray-600">
            {technology.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default async function TechnologiesPage() {
  const technologiesResponse = await getTechnologies()
  const technologies = technologiesResponse?.data || []
  const hasTechnologies = technologies.length > 0

  return (
    <div className="overflow-hidden">
      <GradientBackground />

      <Container className="mt-16">
        <div className="mb-16">
          <AnimationWrapper animation="slideUp" delay={0.2}>
            <Subheading>Technologien</Subheading>
          </AnimationWrapper>
          <AnimationWrapper animation="slideUp" delay={0.4}>
            <Heading as="h1" className="mt-1 max-w-4xl">
              Die Werkzeuge, die wir einsetzen, um aussergewöhnliche Ergebnisse
              zu erzielen
            </Heading>
          </AnimationWrapper>
          <AnimationWrapper animation="slideUp" delay={0.6}>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Unsere Expertise umfasst die neuesten Technologien und
              Plattformen, die es uns ermöglichen, innovative und skalierbare
              Lösungen für unsere Kunden zu entwickeln.
            </p>
          </AnimationWrapper>
        </div>
      </Container>

      {!hasTechnologies ? (
        <EmptyState
          title="Technologien kommen bald"
          description="Wir entwickeln derzeit unser Technologieportfolio. Kontaktieren Sie uns in der Zwischenzeit, um Ihre spezifischen IT-Bedürfnisse und massgeschneiderte Lösungen zu besprechen."
          actionText="Kontakt aufnehmen"
          actionHref="/contact"
          secondaryActionText="Über uns erfahren"
          secondaryActionHref="/company"
        />
      ) : (
        <Container className="mb-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {technologies
              .sort(
                (a: { order?: number }, b: { order?: number }) =>
                  (a.order || 0) - (b.order || 0),
              )
              .map(
                (
                  technology: {
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
                    key={technology._id}
                    animation="scaleIn"
                    delay={0.8 + index * 0.2}
                  >
                    <TechnologyCard
                      key={technology._id}
                      technology={technology}
                    />
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
