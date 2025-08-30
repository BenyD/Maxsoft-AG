import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Link } from '@/components/link'
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/components/magicui/terminal'
import { NavbarServer } from '@/components/navbar-server'
import { Screenshot } from '@/components/screenshot'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import { getMostRecentPost, getTestimonials } from '@/sanity/queries'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import {
  DollarSign,
  Factory,
  GraduationCap,
  Landmark,
  Stethoscope,
  Store,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Maxsoft IT Solutions - Dein Partner für innovative IT-Lösungen',
}

async function Hero() {
  const mostRecentPost = await getMostRecentPost()

  return (
    <div className="relative">
      <div className="absolute inset-0 z-10">
        <Gradient className="absolute inset-2 bottom-0 rounded-4xl opacity-80 ring-1 ring-black/5 ring-inset" />
      </div>
      <Container className="relative z-20">
        <NavbarServer
          banner={
            mostRecentPost?.data ? (
              <Link
                href={`/blog/${mostRecentPost.data.slug?.current}`}
                className="flex items-center gap-1 rounded-full bg-[#01A2EE]/35 px-3 py-0.5 text-sm/6 font-medium text-white data-hover:bg-[#01A2EE]/30"
              >
                {mostRecentPost.data.title}
                <ChevronRightIcon className="size-4" />
              </Link>
            ) : undefined
          }
        />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <h1 className="font-display text-4xl/[1.1] font-medium tracking-tight text-balance text-gray-950 sm:text-5xl/[1.1] md:text-6xl/[1.1]">
                Maxsoft IT Solutions
              </h1>
              <h2 className="text-2xl/[1.3] font-medium text-gray-950 sm:text-3xl/[1.3] md:text-4xl/[1.3]">
                Dein Partner für innovative IT-Lösungen
              </h2>
              <p className="max-w-2xl text-lg/[1.6] text-gray-950/75 sm:text-xl/[1.6]">
                Maxsoft bietet massgeschneiderte IT-Lösungen für Unternehmen
                jeder Grösse. Anstatt dich mit komplexen, unverständlichen
                Technologien allein zu lassen, bieten wir dir klare, umsetzbare
                Strategien, die deine IT-Prozesse optimieren. Wir verstehen,
                dass die Technologie ständig im Wandel ist, und helfen dir, mit
                den neuesten Innovationen Schritt zu halten, um deine
                Wettbewerbsfähigkeit zu steigern. Wir bieten dir die
                Flexibilität, deine IT individuell anzupassen.
              </p>
              <div className="flex flex-col gap-x-6 gap-y-4 sm:flex-row">
                <Button href="/contact#booking">Loslegen</Button>
                <Button variant="secondary" href="/company">
                  Mehr erfahren
                </Button>
              </div>
            </div>

            {/* Right Column - Terminal Component */}
            <div className="hidden lg:block">
              <div className="relative h-[500px] w-full">
                {/* Background decorative elements */}
                <div className="absolute inset-0">
                  {/* Subtle grid pattern */}
                  <div className="absolute inset-0 opacity-[0.03]">
                    <div className="h-full w-full bg-[linear-gradient(90deg,transparent_0%,#01A2EE_50%,transparent_100%)]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,#01A2EE_50%,transparent_100%)]"></div>
                  </div>

                  {/* Floating tech elements */}
                  <div className="absolute top-8 right-8 h-16 w-16 rounded-lg border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
                    <div className="absolute inset-2 rounded border border-blue-400/20 bg-blue-500/10"></div>
                    <div className="absolute top-2 left-2 h-1 w-4 rounded bg-blue-400/60"></div>
                    <div className="absolute top-4 left-2 h-1 w-3 rounded bg-purple-400/60"></div>
                    <div className="absolute top-6 left-2 h-1 w-5 rounded bg-blue-400/60"></div>
                  </div>

                  {/* Network node */}
                  <div className="absolute top-24 right-32 h-8 w-8">
                    <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30"></div>
                    <div className="absolute inset-1 rounded-full bg-blue-500/20"></div>
                    <div className="absolute inset-2 rounded-full bg-blue-400/40"></div>
                  </div>

                  {/* Data flow line */}
                  <div className="absolute top-40 right-20 h-12 w-12">
                    <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-blue-400 to-transparent"></div>
                    <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-400 to-transparent"></div>
                  </div>
                </div>

                {/* Terminal with enhanced styling */}
                <div className="relative z-10 h-full w-full">
                  <Terminal className="h-full w-full border-gray-300 bg-white/80 shadow-xl ring-1 ring-gray-200/50 backdrop-blur-sm">
                    <TypingAnimation>
                      &gt; maxsoft init --projekt=it-loesungen
                    </TypingAnimation>

                    <AnimatedSpan className="text-green-600">
                      ✓ Initialisiere Maxsoft IT-Lösungen...
                    </AnimatedSpan>

                    <AnimatedSpan className="text-blue-600">
                      ✓ Lade Kern-Technologien...
                    </AnimatedSpan>

                    <AnimatedSpan className="text-blue-600">
                      ✓ Konfiguriere Cloud-Infrastruktur...
                    </AnimatedSpan>

                    <AnimatedSpan className="text-blue-600">
                      ✓ Richte Sicherheitsprotokolle ein...
                    </AnimatedSpan>

                    <AnimatedSpan className="text-blue-600">
                      ✓ Optimiere Performance...
                    </AnimatedSpan>

                    <AnimatedSpan className="text-green-600">
                      ✓ Projekt erfolgreich initialisiert!
                    </AnimatedSpan>

                    <TypingAnimation>
                      &gt; maxsoft deploy --umgebung=produktion
                    </TypingAnimation>

                    <AnimatedSpan className="text-amber-600">
                      ⚡ Deploye zu Produktion...
                    </AnimatedSpan>

                    <AnimatedSpan className="text-green-600">
                      ✓ Deployment abgeschlossen!
                    </AnimatedSpan>

                    <TypingAnimation className="text-gray-600">
                      # Bereit für Innovation
                    </TypingAnimation>
                  </Terminal>
                </div>

                {/* Floating particles */}
                <div className="absolute top-80 right-16 h-2 w-2 animate-bounce rounded-full bg-blue-400/60"></div>
                <div
                  className="absolute top-96 right-40 h-2.5 w-2.5 animate-bounce rounded-full bg-purple-400/60"
                  style={{ animationDelay: '0.5s' }}
                ></div>
                <div
                  className="absolute top-72 right-24 h-2 w-2 animate-bounce rounded-full bg-emerald-400/60"
                  style={{ animationDelay: '1s' }}
                ></div>

                {/* Animated circles */}
                <div className="absolute top-64 right-20 h-4 w-4 animate-spin rounded-full border border-blue-400/30"></div>
                <div
                  className="absolute top-80 right-36 h-3 w-3 animate-spin rounded-full border border-purple-400/30"
                  style={{ animationDirection: 'reverse' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

function IndexSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <div className="mb-16">
          <Subheading>Über uns</Subheading>
          <Heading as="h2" className="mt-2 max-w-3xl">
            Entdecke unsere Kernbereiche
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Lerne die verschiedenen Aspekte von Maxsoft kennen und erfahre, wie
            wir Unternehmen bei ihrer digitalen Transformation unterstützen.
          </p>
        </div>
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Technologies Card */}
          <Link href="/technologies" className="group block h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
              <div className="mb-4 h-56 w-full flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src="/pictures/technologies.png"
                  alt="Technologien"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <Subheading>Technologien</Subheading>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Technologien
                </h3>
                <p className="flex-1 text-base text-gray-600">
                  Wir setzen auf moderne Technologien und bewährte Tools, um
                  deine IT effizienter und sicherer zu machen.
                </p>
                {/* Click indicator */}
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700">
                  Mehr erfahren
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Competencies Card */}
          <Link href="/competencies" className="group block h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
              <div className="mb-4 h-56 w-full flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src="/pictures/competencies.png"
                  alt="Kompetenzen"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <Subheading>Kompetenzen</Subheading>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Kompetenzen
                </h3>
                <p className="flex-1 text-base text-gray-600">
                  Mit unserer Erfahrung in IT-Sicherheit, Cloud-Lösungen,
                  Infrastrukturautomatisierung und mehr bieten wir dir die
                  besten Lösungen, die perfekt zu deinem Unternehmen passen.
                </p>
                {/* Click indicator */}
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700">
                  Mehr erfahren
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Services Card */}
          <Link href="/services" className="group block h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
              <div className="mb-4 h-56 w-full flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src="/pictures/services.png"
                  alt="Dienstleistungen"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <Subheading>Dienstleistungen</Subheading>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Dienstleistungen
                </h3>
                <p className="flex-1 text-base text-gray-600">
                  Unsere Services bieten dir massgeschneiderte Lösungen, die
                  deine IT-Systeme optimieren und zukunftssicher machen.
                </p>
                {/* Click indicator */}
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700">
                  Mehr erfahren
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <Screenshot
          width={1216}
          height={1000}
          src="/pictures/meeting.jpg"
          className="mx-auto w-full max-w-4xl"
        />
      </Container>
    </div>
  )
}

function BranchenSection() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-gradient-to-br from-gray-50 to-blue-50 py-24">
      <Container>
        <div id="branchen">
          <Subheading>Branchen</Subheading>
          <Heading as="h3" className="mt-2 max-w-3xl">
            Branchen, die wir erfolgreich unterstützen
          </Heading>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-3">
            {/* Finanzwesen Card */}
            <div className="group relative overflow-hidden rounded-xl bg-white p-5 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
              <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                  <DollarSign
                    className="h-12 w-12 text-white"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div>
                <Subheading>Finanzwesen</Subheading>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Banken und Versicherungen
                </h3>
                <p className="text-sm text-gray-600">
                  Sicher und digital – mit IT-Lösungen für eine moderne
                  Finanzwelt.
                </p>
              </div>
            </div>

            {/* Industrie Card */}
            <div className="group relative overflow-hidden rounded-xl bg-white p-5 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
              <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600">
                  <Factory className="h-12 w-12 text-white" strokeWidth={2} />
                </div>
              </div>
              <div>
                <Subheading>Industrie</Subheading>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Produkt
                </h3>
                <p className="text-sm text-gray-600">
                  Effizientere Produktionsprozesse durch stabile und moderne
                  IT-Systeme.
                </p>
              </div>
            </div>

            {/* Gesundheit Card */}
            <div className="group relative overflow-hidden rounded-xl bg-white p-5 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
              <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-400 to-rose-600">
                  <Stethoscope
                    className="h-12 w-12 text-white"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div>
                <Subheading>Gesundheit</Subheading>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Gesundheitswesen
                </h3>
                <p className="text-sm text-gray-600">
                  IT für eine bessere Patientenversorgung und optimierte
                  Prozesse.
                </p>
              </div>
            </div>

            {/* Bildung Card */}
            <div className="group relative overflow-hidden rounded-xl bg-white p-5 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
              <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-400 to-violet-600">
                  <GraduationCap
                    className="h-12 w-12 text-white"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div>
                <Subheading>Bildung</Subheading>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Bildung
                </h3>
                <p className="text-sm text-gray-600">
                  Stärkere Bildung durch digitale Tools für E-Learning und
                  Verwaltung.
                </p>
              </div>
            </div>

            {/* Handel Card */}
            <div className="group relative overflow-hidden rounded-xl bg-white p-5 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
              <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600">
                  <Store className="h-12 w-12 text-white" strokeWidth={2} />
                </div>
              </div>
              <div>
                <Subheading>Handel</Subheading>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Retail
                </h3>
                <p className="text-sm text-gray-600">
                  Wachstum durch IT-Lösungen für eine bessere Lieferkette und
                  stärkere Kundenbindung.
                </p>
              </div>
            </div>

            {/* Öffentlicher Sektor Card */}
            <div className="group relative overflow-hidden rounded-xl bg-white p-5 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
              <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-400 to-slate-600">
                  <Landmark className="h-12 w-12 text-white" strokeWidth={2} />
                </div>
              </div>
              <div>
                <Subheading>Öffentlicher Sektor</Subheading>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Öffentliche Verwaltung
                </h3>
                <p className="text-sm text-gray-600">
                  Sichere und moderne IT-Lösungen für öffentliche Einrichtungen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default async function Home() {
  const testimonials = await getTestimonials()

  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        {/* Company logos section - temporarily hidden
        <Container className="mt-10">
          <LogoCloud />
        </Container>
        */}
        <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
          <IndexSection />
        </div>
        <BranchenSection />
      </main>
      {testimonials.data && testimonials.data.length > 0 && (
        <Testimonials testimonials={testimonials.data} />
      )}
      <Footer />
    </div>
  )
}
