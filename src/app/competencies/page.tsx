import { CMSBentoGrid } from '@/components/cms-bento-grid'
import { Container } from '@/components/container'
import { EmptyState } from '@/components/empty-state'
import { Footer } from '@/components/footer'
import { NavbarServer } from '@/components/navbar-server'
import { Heading, Subheading } from '@/components/text'
import { getCompetencies } from '@/sanity/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kompetenzen - Maxsoft AG',
  description:
    'Entdecken Sie die Kernkompetenzen von Maxsoft AG in der IT-Beratung, Cloud-Lösungen und digitaler Transformation.',
}

export default async function CompetenciesPage() {
  const competenciesResponse = await getCompetencies()
  const competencies = competenciesResponse?.data || []
  const hasCompetencies = competencies.length > 0

  return (
    <div className="overflow-hidden">
      <Container className="relative z-20">
        <NavbarServer />
      </Container>
      <div className="bg-gray-900">
        <Container className="pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24">
          <div className="mb-16">
            <Subheading dark>Kompetenzen</Subheading>
            <Heading as="h1" dark className="mt-1 max-w-4xl">
              Kundenfokus durch innovative, hochwertige Lösungen.
            </Heading>
            <p className="mt-3 max-w-2xl text-lg text-gray-300">
              Unsere Expertise liegt in der Entwicklung maßgeschneiderter
              IT-Lösungen, die Unternehmen dabei unterstützen, ihre digitalen
              Ziele zu erreichen und nachhaltig zu wachsen.
            </p>
          </div>
        </Container>
      </div>

      {!hasCompetencies ? (
        <EmptyState
          title="Kompetenzen kommen bald"
          description="Wir entwickeln derzeit unser Kompetenzprofil. Kontaktieren Sie uns in der Zwischenzeit, um Ihre spezifischen IT-Bedürfnisse und maßgeschneiderte Lösungen zu besprechen."
          actionText="Kontakt aufnehmen"
          actionHref="/contact"
          secondaryActionText="Über uns erfahren"
          secondaryActionHref="/company"
        />
      ) : (
        <div className="bg-gray-900">
          <CMSBentoGrid items={competencies} dark={true} className="py-16" />
        </div>
      )}
      <Footer />
    </div>
  )
}
