import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Keyboard } from '@/components/keyboard'
import { Link } from '@/components/link'
import { LinkedAvatars } from '@/components/linked-avatars'
import { LogoCluster } from '@/components/logo-cluster'
import { LogoTimeline } from '@/components/logo-timeline'
import { Map } from '@/components/map'
import { NavbarServer } from '@/components/navbar-server'
import { Screenshot } from '@/components/screenshot'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import { getMostRecentPost, getTestimonials } from '@/sanity/queries'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import {
  AcademicCapIcon,
  BanknotesIcon,
  BeakerIcon,
  BuildingLibraryIcon,
  BuildingOfficeIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid'
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

function AboutSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Heading as="h2" className="max-w-3xl">
          Über Maxsoft AG
        </Heading>
        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Mit Sitz in der Schweiz sind wir eine führende IT-Beratung, die sich
          darauf konzentriert, Unternehmen durch die komplexe Welt der
          Technologie zu führen. Unser Team von Experten bietet maßgeschneiderte
          Lösungen, die Innovation und Wachstum fördern und Kunden weltweit mit
          Schweizer Präzision und Zuverlässigkeit bedienen.
        </p>
        <div className="mt-8">
          <Button href="/company" variant="secondary">
            Mehr über uns erfahren
          </Button>
        </div>
        <Screenshot
          width={1216}
          height={768}
          src="/pictures/meeting.jpg"
          className="mt-16 h-144 sm:h-auto sm:w-304"
        />
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <Container>
      <div id="technologies">
        <Subheading>Technologien</Subheading>
        <Heading as="h3" className="mt-2 max-w-3xl">
          Die Werkzeuge, die wir einsetzen, um außergewöhnliche Ergebnisse zu
          erzielen.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            eyebrow="Cloud-Plattform"
            title="Microsoft Azure"
            description="Geschäftslösungen basierend auf Microsoft Azure Cloud Services für skalierbare, sichere und zuverlässige Cloud-Infrastruktur."
            graphic={
              <div className="h-80 bg-[url(/pictures/azure.png)] bg-size-[1000px_560px] bg-position-[left_-109px_top_-112px] bg-no-repeat" />
            }
            fade={['bottom']}
            className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
          />
          <BentoCard
            eyebrow="Produktivitätssuite"
            title="Microsoft 365"
            description="Microsoft 365 ist eine umfassende Produktivitätssuite, während Microsoft Copilot ein KI-gestützter Coding-Assistent ist, der die Entwicklereffizienz steigert."
            graphic={
              <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-size-[1100px_650px] bg-position-[left_-38px_top_-73px] bg-no-repeat" />
            }
            fade={['bottom']}
            className="lg:col-span-3 lg:rounded-tr-4xl"
          />
          <BentoCard
            eyebrow="Frontend-Entwicklung"
            title="NextJS, React, React Native, TailwindCSS, ShadcnUI"
            description="Neueste Technologie-Frameworks für den Bau moderner, skalierbarer Web- und Mobile-Anwendungen mit neuesten Funktionen und optimaler Leistung."
            graphic={
              <div className="flex size-full pt-10 pl-10">
                <Keyboard highlighted={['LeftCommand', 'LeftShift', 'D']} />
              </div>
            }
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            eyebrow="DevOps & Infrastruktur"
            title="DevOps-Technologien"
            description="Umfassende DevOps-Lösungen einschließlich Supabase, Vercel, GitHub, Docker, HuggingFace und Ollama für moderne Entwicklungs-Workflows und KI-Integration."
            graphic={<LogoCluster />}
            className="lg:col-span-2"
          />
          <BentoCard
            eyebrow="Open Source"
            title="Red Hat & HashiCorp"
            description="Führende Open-Source-Lösungen für Cloud, Linux, Kubernetes und Multi-Cloud-Infrastrukturautomatisierung mit Terraform, Vault und Consul."
            graphic={<Map />}
            className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
          />
          <BentoCard
            eyebrow="Sicherheitslösungen"
            title="Barracuda Networks"
            description="Der weltweit führende Anbieter von E-Mail-Schutz, Anwendungsschutz, Netzwerksicherheit und Datensicherheitslösungen für umfassenden Geschäftsschutz."
            graphic={
              <div className="h-80 bg-[url(/pictures/barracuda.png)] bg-size-[1000px_560px] bg-position-[left_-109px_top_-112px] bg-no-repeat" />
            }
            className="lg:col-span-2"
          />
          <BentoCard
            eyebrow="Cybersicherheit"
            title="Fortinet Group"
            description="Ein Cybersicherheitsunternehmen, das Netzwerksicherheitslösungen und -dienste für umfassenden Bedrohungsschutz und Unternehmenssicherheit bereitstellt."
            graphic={
              <div className="h-80 bg-[url(/pictures/fortinet.png)] bg-size-[1000px_560px] bg-position-[left_-109px_top_-112px] bg-no-repeat" />
            }
            className="lg:col-span-2"
          />
          <BentoCard
            eyebrow="Design & Prototyping"
            title="Framer & Figma"
            description="Professionelle Design- und Prototyping-Tools für die Erstellung beeindruckender Benutzeroberflächen, interaktiver Prototypen und kollaborativer Design-Workflows."
            graphic={
              <div className="h-80 bg-[url(/pictures/framer-figma.png)] bg-size-[1000px_560px] bg-position-[left_-109px_top_-112px] bg-no-repeat" />
            }
            className="lg:col-span-2"
          />
        </div>
      </div>
    </Container>
  )
}

function DarkBentoSection() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32" id="competencies">
      <Container>
        <Subheading dark>Kompetenzen</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          Kundenfokus durch innovative, hochwertige Lösungen.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Cloud-Reise"
            title="Microsoft Cloud"
            description="Nutzen Sie die volle Kraft der Microsoft Cloud. Mit integrierten Lösungen wie Azure, Microsoft 365 und Dynamics 365 optimieren wir Ihre Geschäftsprozesse. Skalierbare Technologien und höchste Sicherheitsstandards gewährleisten Effizienz und Zukunftssicherheit."
            graphic={
              <div className="h-80 bg-[url(/screenshots/networking.png)] bg-size-[851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="IT-Sicherheit"
            title="Digitaler Bedrohungsschutz"
            description="Wir schützen Ihre Systeme vor digitalen Bedrohungen. Mit maßgeschneiderten Sicherheitslösungen und modernster Technologie gewährleisten wir die Integrität Ihrer Daten. Prävention, Überwachung und schnelle Reaktion stehen im Mittelpunkt unserer Strategien."
            graphic={<LogoTimeline />}
            className="lg:col-span-3 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Unternehmensarchitektur"
            title="Business-IT-Ausrichtung"
            description="Wir unterstützen und begleiten Sie beim Aufbau der Unternehmensarchitektur in Ihrem Unternehmen, um die Zusammenarbeit zwischen Business und IT zu optimieren."
            graphic={<LinkedAvatars />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Cloud-Reise"
            title="Sanfte Migration"
            description="Wir begleiten Sie auf Ihrer Reise in die Cloud. Mit sorgfältiger Planung und Implementierung gewährleisten wir eine sanfte Migration. Durch maßgeschneiderte Lösungen und moderne Technologien maximieren wir die Effizienz, Sicherheit und Flexibilität Ihrer IT-Infrastruktur."
            graphic={
              <div className="h-80 bg-[url(/screenshots/engagement.png)] bg-size-[851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    </div>
  )
}

function BranchenSection() {
  return (
    <Container className="py-32">
      <div id="branchen">
        <Subheading>Branchen</Subheading>
        <Heading as="h3" className="mt-2 max-w-3xl">
          Branchen, die wir erfolgreich unterstützen.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-3">
          <BentoCard
            eyebrow="Finanzwesen"
            title="Banken und Versicherungen"
            description="Sicher und digital – mit IT-Lösungen für eine moderne Finanzwelt."
            graphic={
              <div className="flex h-64 items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm"></div>
                  <div className="relative rounded-2xl bg-white/80 p-8 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                    <BanknotesIcon className="h-16 w-16 text-blue-600" />
                  </div>
                </div>
              </div>
            }
            className="lg:col-span-1"
          />
          <BentoCard
            eyebrow="Industrie"
            title="Produktion"
            description="Effizientere Produktionsprozesse durch stabile und moderne IT-Systeme."
            graphic={
              <div className="flex h-64 items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm"></div>
                  <div className="relative rounded-2xl bg-white/80 p-8 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                    <BuildingOfficeIcon className="h-16 w-16 text-green-600" />
                  </div>
                </div>
              </div>
            }
            className="lg:col-span-1"
          />
          <BentoCard
            eyebrow="Gesundheit"
            title="Gesundheitswesen"
            description="IT für eine bessere Patientenversorgung und optimierte Prozesse."
            graphic={
              <div className="flex h-64 items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm"></div>
                  <div className="relative rounded-2xl bg-white/80 p-8 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                    <BeakerIcon className="h-16 w-16 text-red-600" />
                  </div>
                </div>
              </div>
            }
            className="lg:col-span-1"
          />
          <BentoCard
            eyebrow="Bildung"
            title="Bildung"
            description="Stärkere Bildung durch digitale Tools für E-Learning und Verwaltung."
            graphic={
              <div className="flex h-64 items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm"></div>
                  <div className="relative rounded-2xl bg-white/80 p-8 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                    <AcademicCapIcon className="h-16 w-16 text-purple-600" />
                  </div>
                </div>
              </div>
            }
            className="lg:col-span-1"
          />
          <BentoCard
            eyebrow="Handel"
            title="Retail"
            description="Wachstum durch IT-Lösungen für eine bessere Lieferkette und stärkere Kundenbindung."
            graphic={
              <div className="flex h-64 items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm"></div>
                  <div className="relative rounded-2xl bg-white/80 p-8 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                    <ShoppingBagIcon className="h-16 w-16 text-orange-600" />
                  </div>
                </div>
              </div>
            }
            className="lg:col-span-1"
          />
          <BentoCard
            eyebrow="Öffentlicher Sektor"
            title="Öffentliche Verwaltung"
            description="Sichere und moderne IT-Lösungen für öffentliche Einrichtungen."
            graphic={
              <div className="flex h-64 items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur-sm"></div>
                  <div className="relative rounded-2xl bg-white/80 p-8 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                    <BuildingLibraryIcon className="h-16 w-16 text-gray-600" />
                  </div>
                </div>
              </div>
            }
            className="lg:col-span-1"
          />
        </div>
      </div>
    </Container>
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
          <AboutSection />
          <BentoSection />
        </div>
        <DarkBentoSection />
        <BranchenSection />
      </main>
      {testimonials.data && testimonials.data.length > 0 && (
        <Testimonials testimonials={testimonials.data} />
      )}
      <Footer />
    </div>
  )
}
