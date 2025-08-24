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
import { getTestimonials } from '@/sanity/queries'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Maxsoft AG - Leading IT Consultancy delivering innovative technology solutions for businesses worldwide.',
}

function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-10">
        <Gradient className="absolute inset-2 bottom-0 rounded-4xl opacity-80 ring-1 ring-black/5 ring-inset" />
      </div>
      <Container className="relative z-20">
        <NavbarServer
          banner={
            <Link
              href="/blog/maxsoft-ag-expands-global-it-consulting-services"
              className="flex items-center gap-1 rounded-full bg-[#01A2EE]/35 px-3 py-0.5 text-sm/6 font-medium text-white data-hover:bg-[#01A2EE]/30"
            >
              Maxsoft AG expands global IT consulting services
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Your Partner for Innovative IT Solutions
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Maxsoft AG helps businesses innovate and grow through cutting-edge
            IT solutions and strategic technology consulting.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="/contact">Get started</Button>
            <Button variant="secondary" href="/company">
              Learn more
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
          About Maxsoft AG
        </Heading>
        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Based in Switzerland, we are a leading IT consultancy dedicated to
          helping businesses navigate the complex world of technology. Our team
          of experts provides customized solutions that drive innovation and
          growth, serving clients globally with Swiss precision and reliability.
        </p>
        <div className="mt-8">
          <Button href="/company" variant="secondary">
            Learn more about us
          </Button>
        </div>
        <Screenshot
          width={1216}
          height={768}
          src="/screenshots/app.png"
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
        <Subheading>Technologies</Subheading>
        <Heading as="h3" className="mt-2 max-w-3xl">
          The tools we use to deliver exceptional results.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            eyebrow="Cloud Platform"
            title="Microsoft Azure"
            description="Business solutions based on Microsoft Azure Cloud Services for scalable, secure, and reliable cloud infrastructure."
            graphic={
              <div className="h-80 bg-[url(/screenshots/profile.png)] bg-size-[1000px_560px] bg-position-[left_-109px_top_-112px] bg-no-repeat" />
            }
            fade={['bottom']}
            className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
          />
          <BentoCard
            eyebrow="Productivity Suite"
            title="Microsoft 365"
            description="Microsoft 365 is a comprehensive productivity suite, while Microsoft Copilot is an AI-powered coding assistant that increases developer efficiency."
            graphic={
              <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-size-[1100px_650px] bg-position-[left_-38px_top_-73px] bg-no-repeat" />
            }
            fade={['bottom']}
            className="lg:col-span-3 lg:rounded-tr-4xl"
          />
          <BentoCard
            eyebrow="Security"
            title="Barracuda Networks"
            description="The world's leading provider of email protection, application protection, network security, and data security solutions."
            graphic={
              <div className="flex size-full pt-10 pl-10">
                <Keyboard highlighted={['LeftCommand', 'LeftShift', 'D']} />
              </div>
            }
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            eyebrow="Cybersecurity"
            title="Fortinet Group"
            description="A cybersecurity company that provides network security solutions and services for comprehensive threat protection."
            graphic={<LogoCluster />}
            className="lg:col-span-2"
          />
          <BentoCard
            eyebrow="Open Source"
            title="Red Hat & HashiCorp"
            description="Leading open source solutions for cloud, Linux, Kubernetes, and multi-cloud infrastructure automation with Terraform, Vault and Consul."
            graphic={<Map />}
            className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
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
        <Subheading dark>Competencies</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          Customer focus through innovative, high-quality solutions.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Cloud Journey"
            title="Microsoft Cloud"
            description="Harness the full power of the Microsoft Cloud. With integrated solutions like Azure, Microsoft 365, and Dynamics 365, we optimize your business processes. Scalable technologies and the highest security standards ensure efficiency and future security."
            graphic={
              <div className="h-80 bg-[url(/screenshots/networking.png)] bg-size-[851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="IT Security"
            title="Digital Threat Protection"
            description="We protect your systems from digital threats. With customized security solutions and state-of-the-art technology, we ensure the integrity of your data. Prevention, monitoring, and rapid response are the focus of our strategies."
            graphic={<LogoTimeline />}
            className="lg:col-span-3 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Enterprise Architecture"
            title="Business-IT Alignment"
            description="We support and accompany you in establishing the enterprise architecture in your company in order to optimize the collaboration between business and IT."
            graphic={<LinkedAvatars />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Cloud Journey"
            title="Smooth Migration"
            description="We accompany you on your journey to the cloud. With careful planning and implementation, we ensure a smooth migration. Through customized solutions and modern technologies, we maximize the efficiency, security, and flexibility of your IT infrastructure."
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
      </main>
      {testimonials.data && testimonials.data.length > 0 && (
        <Testimonials testimonials={testimonials.data} />
      )}
      <Footer />
    </div>
  )
}
