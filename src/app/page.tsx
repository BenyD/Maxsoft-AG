import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Link } from '@/components/link'
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
  Heart,
  Landmark,
  Store,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Maxsoft AG - Führende IT-Beratung, die innovative Technologielösungen für Unternehmen weltweit bereitstellt.',
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
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Ihr Partner für innovative IT-Lösungen
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Maxsoft AG hilft Unternehmen dabei, durch modernste IT-Lösungen und
            strategische Technologieberatung zu innovieren und zu wachsen.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="/contact">Loslegen</Button>
            <Button variant="secondary" href="/company">
              Mehr erfahren
            </Button>
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
            Entdecken Sie unsere Kernbereiche
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Lernen Sie die verschiedenen Aspekte von Maxsoft AG kennen und
            erfahren Sie, wie wir Unternehmen bei ihrer digitalen Transformation
            unterstützen.
          </p>
        </div>
        <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Technologies Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:ring-gray-300">
            <div className="mb-6 h-48 w-full overflow-hidden rounded-xl">
              <img
                src="/pictures/technologies.jpg"
                alt="Technologien"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <Subheading>Technologien</Subheading>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Moderne IT-Lösungen
              </h3>
              <p className="mb-6 text-gray-600">
                Entdecken Sie die modernsten Technologien, die wir einsetzen, um
                außergewöhnliche IT-Lösungen zu entwickeln.
              </p>
              <Button
                href="/technologies"
                variant="secondary"
                className="w-full"
              >
                Technologien entdecken
              </Button>
            </div>
          </div>

          {/* Competencies Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:ring-gray-300">
            <div className="mb-6 h-48 w-full overflow-hidden rounded-xl">
              <img
                src="/pictures/competencies.jpg"
                alt="Kompetenzen"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <Subheading>Kompetenzen</Subheading>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                IT-Beratung & Cloud
              </h3>
              <p className="mb-6 text-gray-600">
                Unsere Kernkompetenzen in der IT-Beratung, Cloud-Lösungen und
                digitalen Transformation.
              </p>
              <Button
                href="/competencies"
                variant="secondary"
                className="w-full"
              >
                Kompetenzen entdecken
              </Button>
            </div>
          </div>

          {/* About Us Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:ring-gray-300">
            <div className="mb-6 h-48 w-full overflow-hidden rounded-xl">
              <img
                src="/pictures/about-us.jpg"
                alt="Über uns"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <Subheading>Über uns</Subheading>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Unser Team
              </h3>
              <p className="mb-6 text-gray-600">
                Lernen Sie unser Team kennen und erfahren Sie mehr über unsere
                Geschichte und Werte.
              </p>
              <Button href="/company" variant="secondary" className="w-full">
                Mehr erfahren
              </Button>
            </div>
          </div>
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
    <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
      <Container>
        <div id="branchen">
          <Subheading dark>Branchen</Subheading>
          <Heading as="h3" dark className="mt-2 max-w-3xl">
            Branchen, die wir erfolgreich unterstützen.
          </Heading>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-3">
            <BentoCard
              dark
              eyebrow="Finanzwesen"
              title="Banken und Versicherungen"
              description="Sicher und digital – mit IT-Lösungen für eine moderne Finanzwelt."
              graphic={
                <div className="flex h-64 items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200"></div>
                    <div className="relative rounded-2xl bg-white/95 p-8 shadow-lg ring-1 ring-blue-400/30">
                      <DollarSign
                        className="h-16 w-16 text-blue-800"
                        strokeWidth={1.5}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-400/40"></div>
                    </div>
                  </div>
                </div>
              }
              className="lg:col-span-1"
            />
            <BentoCard
              dark
              eyebrow="Industrie"
              title="Produktion"
              description="Effizientere Produktionsprozesse durch stabile und moderne IT-Systeme."
              graphic={
                <div className="flex h-64 items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-100 to-green-200"></div>
                    <div className="relative rounded-2xl bg-white/95 p-8 shadow-lg ring-1 ring-green-400/30">
                      <Factory
                        className="h-16 w-16 text-green-800"
                        strokeWidth={1.5}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-green-400/40"></div>
                    </div>
                  </div>
                </div>
              }
              className="lg:col-span-1"
            />
            <BentoCard
              dark
              eyebrow="Gesundheit"
              title="Gesundheitswesen"
              description="IT für eine bessere Patientenversorgung und optimierte Prozesse."
              graphic={
                <div className="flex h-64 items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-100 to-red-200"></div>
                    <div className="relative rounded-2xl bg-white/95 p-8 shadow-lg ring-1 ring-red-400/30">
                      <Heart
                        className="h-16 w-16 text-red-800"
                        strokeWidth={1.5}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-red-400/40"></div>
                    </div>
                  </div>
                </div>
              }
              className="lg:col-span-1"
            />
            <BentoCard
              dark
              eyebrow="Bildung"
              title="Bildung"
              description="Stärkere Bildung durch digitale Tools für E-Learning und Verwaltung."
              graphic={
                <div className="flex h-64 items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200"></div>
                    <div className="relative rounded-2xl bg-white/95 p-8 shadow-lg ring-1 ring-purple-400/30">
                      <GraduationCap
                        className="h-16 w-16 text-purple-800"
                        strokeWidth={1.5}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-400/40"></div>
                    </div>
                  </div>
                </div>
              }
              className="lg:col-span-1"
            />
            <BentoCard
              dark
              eyebrow="Handel"
              title="Retail"
              description="Wachstum durch IT-Lösungen für eine bessere Lieferkette und stärkere Kundenbindung."
              graphic={
                <div className="flex h-64 items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200"></div>
                    <div className="relative rounded-2xl bg-white/95 p-8 shadow-lg ring-1 ring-orange-400/30">
                      <Store
                        className="h-16 w-16 text-orange-800"
                        strokeWidth={1.5}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-400/40"></div>
                    </div>
                  </div>
                </div>
              }
              className="lg:col-span-1"
            />
            <BentoCard
              dark
              eyebrow="Öffentlicher Sektor"
              title="Öffentliche Verwaltung"
              description="Sichere und moderne IT-Lösungen für öffentliche Einrichtungen."
              graphic={
                <div className="flex h-64 items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200"></div>
                    <div className="relative rounded-2xl bg-white/95 p-8 shadow-lg ring-1 ring-gray-400/30">
                      <Landmark
                        className="h-16 w-16 text-gray-700"
                        strokeWidth={1.5}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-gray-400/40"></div>
                    </div>
                  </div>
                </div>
              }
              className="lg:col-span-1"
            />
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
