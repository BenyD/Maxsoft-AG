import { AnimatedNumber } from '@/components/animated-number'
import { AnimationWrapper } from '@/components/animation-wrapper'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { NavbarServer } from '@/components/navbar-server'
import { Heading, Lead, Subheading } from '@/components/text'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns - Maxsoft AG',
  description:
    'Maxsoft AG ist eine führende Schweizer IT-Beratung mit über 20 Jahren Erfahrung, mit Sitz in Rotkreuz, Kanton Zug. Wir bieten massgeschneiderte IT-Lösungen für Unternehmen aller Grössen und Branchen.',
}

function Header() {
  return (
    <Container className="mt-16">
      <AnimationWrapper animation="slideUp" delay={0.2}>
        <Heading as="h1" className="relative z-30">
          Maxsoft – Dein IT-Partner seit über 20 Jahren
        </Heading>
      </AnimationWrapper>
      <AnimationWrapper animation="slideUp" delay={0.4}>
        <Lead className="mt-6 max-w-3xl">
          Maxsoft ist ein Schweizer IT-Unternehmen mit Sitz in Rotkreuz ZG. Wir
          bieten massgeschneiderte IT-Lösungen für Unternehmen jeder Grösse und
          Branche. Unser Team aus erfahrenen IT-Architekten und Ingenieuren
          hilft dir, deine IT-Prozesse zu optimieren und deine IT-Abteilung zu
          einem echten Business-Partner zu machen. Dank unserer langjährigen
          Expertise verstehen wir deine Herausforderungen und begleiten dich bei
          der Umsetzung zukunftsfähiger IT-Lösungen.
        </Lead>
      </AnimationWrapper>
    </Container>
  )
}

function VisionValues() {
  return (
    <Container className="mt-32 mb-16">
      {/* Mission, Vision & Values */}
      <div className="space-y-16">
        {/* Mission */}
        <AnimationWrapper animation="scaleIn" delay={0.2}>
          <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-500">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <Subheading>Unsere Mission</Subheading>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">
              IT-Modernisierung für nachhaltiges Wachstum
            </h3>
            <p className="mt-4 text-base text-gray-600">
              Wir unterstützen Unternehmen dabei, ihre IT zu modernisieren, die
              Effizienz zu steigern und das Wachstum zu fördern – mit
              innovativen und praktischen Lösungen.
            </p>
          </div>
        </AnimationWrapper>

        {/* Vision */}
        <AnimationWrapper animation="scaleIn" delay={0.4}>
          <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-purple-500">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <Subheading>Unsere Vision</Subheading>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">
              Zukunft der IT-Entscheidungsfindung
            </h3>
            <p className="mt-4 text-base text-gray-600">
              Wir möchten eine Zukunft schaffen, in der Unternehmen ihre IT
              optimal nutzen, um fundierte Entscheidungen zu treffen und
              Herausforderungen in Chancen zu verwandeln.
            </p>
          </div>
        </AnimationWrapper>

        {/* Values */}
        <AnimationWrapper animation="scaleIn" delay={0.6}>
          <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-orange-500">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <Subheading>Unsere Werte</Subheading>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Transparenz
                  </h4>
                  <p className="text-base text-gray-600">
                    Wir kommunizieren offen und ehrlich.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Partnerschaft
                  </h4>
                  <p className="text-base text-gray-600">
                    Wir arbeiten eng mit dir zusammen und sind immer an deiner
                    Seite.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Nachhaltigkeit
                  </h4>
                  <p className="text-base text-gray-600">
                    Wir denken langfristig und nachhaltig in allen Lösungen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </Container>
  )
}

export default function Company() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <NavbarServer />
      </Container>
      <Header />
      <Container>
        {/* Main content with images on the right */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          {/* Left column: Warum Maxsoft and Statistics */}
          <div className="space-y-16">
            {/* Warum Maxsoft? section */}
            <AnimationWrapper animation="slideUp" delay={0.6}>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Warum Maxsoft?
                </h2>
                <p className="mt-6 text-lg text-gray-600">
                  Maxsoft unterscheidet sich durch unseren ganzheitlichen
                  Ansatz. Wir navigieren dich durch alle Phasen der
                  IT-Modernisierung – von der Analyse über das Design bis hin
                  zur Implementierung und dem laufenden Betrieb. Mit unserer
                  Erfahrung in verschiedenen Branchen bieten wir dir Lösungen,
                  die perfekt zu deinen spezifischen Anforderungen passen.
                </p>
              </div>
            </AnimationWrapper>

            {/* Statistics */}
            <AnimationWrapper animation="slideUp" delay={0.8}>
              <div>
                <Subheading>Unser Weg</Subheading>
                <hr className="mt-6 border-t border-gray-200" />
                <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                    <dt className="text-lg/[1.6] text-gray-600">Gründung</dt>
                    <dd className="order-first text-6xl font-medium tracking-tight">
                      2020
                    </dd>
                  </div>
                  <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                    <dt className="text-lg/[1.6] text-gray-600">Mitarbeiter</dt>
                    <dd className="order-first text-6xl font-medium tracking-tight">
                      <AnimatedNumber start={1} end={3} />+
                    </dd>
                  </div>
                  <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                    <dt className="text-lg/[1.6] text-gray-600">Neue Kunden</dt>
                    <dd className="order-first text-6xl font-medium tracking-tight">
                      <AnimatedNumber start={8} end={10} />+
                    </dd>
                  </div>
                  <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                    <dt className="text-lg/[1.6] text-gray-600">
                      Projekte abgeschlossen
                    </dt>
                    <dd className="order-first text-6xl font-medium tracking-tight">
                      <AnimatedNumber start={12} end={15} />+
                    </dd>
                  </div>
                </dl>
              </div>
            </AnimationWrapper>
          </div>

          {/* Right column: Images spanning both sections */}
          <AnimationWrapper animation="scaleIn" delay={1.0}>
            <div className="pt-20 lg:-mr-16 xl:mr-auto">
              <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
                <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                  <img
                    alt="professional working"
                    src="/company/1.jpg"
                    className="block size-full object-cover"
                  />
                </div>
                <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
                  <img
                    alt="team discussion"
                    src="/company/2.jpg"
                    className="block size-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                  <img
                    alt="working in office"
                    src="/company/3.jpg"
                    className="block size-full object-cover"
                  />
                </div>
                <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
                  <img
                    alt="team collaboration"
                    src="/company/4.jpg"
                    className="block size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimationWrapper>
        </section>
      </Container>
      <VisionValues />
      <Footer />
    </main>
  )
}
