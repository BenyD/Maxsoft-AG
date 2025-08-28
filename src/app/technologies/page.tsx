import { CMSBentoGrid } from '@/components/cms-bento-grid'
import { Container } from '@/components/container'
import { EmptyState } from '@/components/empty-state'
import { Footer } from '@/components/footer'
import { NavbarServer } from '@/components/navbar-server'
import { Heading, Subheading } from '@/components/text'
import { getTechnologies } from '@/sanity/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technologien - Maxsoft AG',
  description:
    'Entdecken Sie die modernsten Technologien, die Maxsoft AG einsetzt, um außergewöhnliche IT-Lösungen zu entwickeln.',
}

export default async function TechnologiesPage() {
  const technologiesResponse = await getTechnologies()
  const technologies = technologiesResponse?.data || []
  const hasTechnologies = technologies.length > 0

  return (
    <div className="overflow-hidden">
      <Container className="relative z-20">
        <NavbarServer />
      </Container>
      <div className="bg-linear-to-b from-white from-50% to-gray-100">
        <Container className="pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24">
          <div className="mb-16">
            <Subheading>Technologien</Subheading>
            <Heading as="h1" className="mt-1 max-w-4xl">
              Die Werkzeuge, die wir einsetzen, um außergewöhnliche Ergebnisse
              zu erzielen.
            </Heading>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Unsere Expertise umfasst die neuesten Technologien und
              Plattformen, die es uns ermöglichen, innovative und skalierbare
              Lösungen für unsere Kunden zu entwickeln.
            </p>
          </div>
        </Container>
      </div>

      {!hasTechnologies ? (
        <EmptyState
          title="Technologien kommen bald"
          description="Wir entwickeln derzeit unser Technologieportfolio. Kontaktieren Sie uns in der Zwischenzeit, um Ihre spezifischen IT-Bedürfnisse und maßgeschneiderte Lösungen zu besprechen."
          actionText="Kontakt aufnehmen"
          actionHref="/contact"
          secondaryActionText="Über uns erfahren"
          secondaryActionHref="/company"
        />
      ) : (
        <CMSBentoGrid items={technologies} dark={false} className="pb-16" />
      )}
      <Footer />
    </div>
  )
}
