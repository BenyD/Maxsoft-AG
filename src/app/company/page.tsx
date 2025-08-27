import { AnimatedNumber } from '@/components/animated-number'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { LinkedInIcon } from '@/components/linkedin-icon'
import { NavbarServer } from '@/components/navbar-server'
import { NoPositionsIcon } from '@/components/no-positions-icon'
import { Heading, Lead, Subheading } from '@/components/text'
import { image } from '@/sanity/image'
import {
  getIndustryPartners,
  getJobCategories,
  getJobListings,
  getTeamMembers,
  getTechnologyPartners,
} from '@/sanity/queries'
import type { IndustryPartner } from '@/sanity/types/industryPartner'
import type { JobCategory } from '@/sanity/types/jobCategory'
import type { JobListingExpanded } from '@/sanity/types/jobListing'
import type { TeamMember } from '@/sanity/types/teamMember'
import type { TechnologyPartner } from '@/sanity/types/technologyPartner'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Über uns - Maxsoft AG',
  description:
    'Maxsoft AG ist eine führende Schweizer IT-Beratung mit über 20 Jahren Erfahrung, mit Sitz in Rotkreuz, Kanton Zug. Wir bieten maßgeschneiderte IT-Lösungen für Unternehmen aller Größen und Branchen.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">
        Maxsoft – Dein zuverlässiger IT-Partner seit über 20 Jahren
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Maxsoft ist ein Schweizer IT-Unternehmen mit Sitz in Rotkreuz ZG. Wir
        bieten massgeschneiderte IT-Lösungen für Unternehmen jeder Grösse und
        Branche. Unser Team aus erfahrenen IT-Architekten und Ingenieuren hilft
        dir, deine IT-Prozesse zu optimieren und deine IT-Abteilung zu einem
        echten Business-Partner zu machen. Dank unserer langjährigen Expertise
        verstehen wir deine Herausforderungen und begleiten dich bei der
        Umsetzung zukunftsfähiger IT-Lösungen.
      </Lead>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          <h2 className="text-2xl font-medium tracking-tight">
            Warum Maxsoft?
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Maxsoft unterscheidet sich durch unseren ganzheitlichen Ansatz. Wir
            navigieren dich durch alle Phasen der IT-Modernisierung – von der
            Analyse über das Design bis hin zur Implementierung und dem
            laufenden Betrieb. Mit unserer Erfahrung in verschiedenen Branchen
            bieten wir dir Lösungen, die perfekt zu deinen spezifischen
            Anforderungen passen.
          </p>
        </div>
        <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <img
                alt="Professional working"
                src="/company/1.jpg"
                className="block size-full object-cover"
              />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <img
                alt="Team discussion"
                src="/company/2.jpg"
                className="block size-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <img
                alt="Working in office"
                src="/company/3.jpg"
                className="block size-full object-cover"
              />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <img
                alt="Team collaboration"
                src="/company/4.jpg"
                className="block size-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="max-lg:mt-16 lg:col-span-1">
          <Subheading>Unser Weg</Subheading>
          <hr className="mt-6 border-t border-gray-200" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Gründung</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                2020
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Mitarbeiter</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={1} end={3} />+
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Neue Kunden</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={8} end={10} />+
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">
                Projekte abgeschlossen
              </dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={12} end={15} />+
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </Container>
  )
}

function MissionSection() {
  return (
    <Container className="mt-32">
      <div className="max-w-3xl">
        <Subheading>Unsere Mission</Subheading>
        <Heading as="h5" className="mt-2">
          Wir unterstützen Unternehmen dabei, ihre IT zu modernisieren, die
          Effizienz zu steigern und das Wachstum zu fördern – mit innovativen
          und praktischen Lösungen.
        </Heading>
      </div>
    </Container>
  )
}

function VisionValues() {
  return (
    <Container className="mt-32">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <Subheading>Unsere Vision</Subheading>
          <Heading as="h3" className="mt-2 text-xl">
            Wir möchten eine Zukunft schaffen, in der Unternehmen ihre IT
            optimal nutzen, um fundierte Entscheidungen zu treffen und
            Herausforderungen in Chancen zu verwandeln.
          </Heading>
        </div>
        <div>
          <Subheading>Unsere Werte</Subheading>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-[#01A2EE]"></div>
              <div>
                <h4 className="font-medium text-gray-900">Transparenz</h4>
                <p className="text-sm text-gray-600">
                  Wir kommunizieren offen und ehrlich.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-[#7FBA02]"></div>
              <div>
                <h4 className="font-medium text-gray-900">Partnerschaft</h4>
                <p className="text-sm text-gray-600">
                  Wir arbeiten eng mit dir zusammen und sind immer an deiner
                  Seite.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-[#FDB800]"></div>
              <div>
                <h4 className="font-medium text-gray-900">Nachhaltigkeit</h4>
                <p className="text-sm text-gray-600">
                  Wir denken langfristig und nachhaltig in allen Lösungen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

function Person({
  name,
  title,
  photo,
  linkedinUrl,
  department,
}: {
  name: string
  title: string
  photo: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    _type: 'image'
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  linkedinUrl?: string
  department?: string
}) {
  return (
    <li className="group">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md">
        {/* Full-width Photo Section */}
        <div className="relative w-full overflow-hidden">
          <img
            alt={name}
            src={image(photo)
              .width(800)
              .height(800)
              .fit('crop')
              .crop('focalpoint')
              .focalPoint(photo.hotspot?.x || 0.5, photo.hotspot?.y || 0.5)
              .url()}
            className="h-auto w-full object-cover"
          />
          {/* Department Badge */}
          {department && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full bg-[#01A2EE]/90 px-3 py-1 text-xs font-medium text-white shadow-sm ring-1 ring-white/20 ring-inset">
                {department}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-[#01A2EE]">
            {name}
          </h3>
          <p className="mt-2 text-base leading-relaxed font-medium text-[#01A2EE]">
            {title}
          </p>

          {/* LinkedIn Button */}
          {linkedinUrl && (
            <div className="mt-4 flex justify-center">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-[#01A2EE] hover:text-white hover:shadow-sm"
                aria-label={`View ${name}'s LinkedIn profile`}
              >
                <LinkedInIcon className="size-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

function TechnologyPartnerCard({
  companyName,
  description,
  logo,
  websiteUrl,
  partnershipType,
}: {
  companyName: string
  description: string
  logo: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    _type: 'image'
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  websiteUrl?: string
  partnershipType?: string
}) {
  return (
    <li className="group">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md">
        {/* Large Rectangular/Square Image Section */}
        <div className="relative flex w-full items-center justify-center p-8">
          <img
            alt={companyName}
            src={image(logo)
              .width(600)
              .height(400)
              .fit('crop')
              .crop('focalpoint')
              .focalPoint(logo.hotspot?.x || 0.5, logo.hotspot?.y || 0.5)
              .url()}
            className="max-h-48 max-w-full object-contain"
          />
          {/* Partnership Type Badge */}
          {partnershipType && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full bg-green-600/90 px-3 py-1 text-xs font-medium text-white shadow-sm ring-1 ring-white/20 ring-inset">
                {partnershipType
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </span>
            </div>
          )}
        </div>

        {/* Content Section Below Image */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-green-600">
            {companyName}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-gray-700">
            {description}
          </p>

          {/* Website Button */}
          {websiteUrl && (
            <div className="mt-4 flex justify-center">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-green-600 hover:text-white hover:shadow-sm"
                aria-label={`Visit ${companyName} website`}
              >
                <span>Website besuchen</span>
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

function IndustryPartnerCard({
  companyName,
  description,
  logo,
  websiteUrl,
  industry,
}: {
  companyName: string
  description: string
  logo: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    _type: 'image'
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  websiteUrl?: string
  industry?: string
}) {
  return (
    <li className="group">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md">
        {/* Large Rectangular/Square Image Section */}
        <div className="relative flex w-full items-center justify-center p-8">
          <img
            alt={companyName}
            src={image(logo)
              .width(800)
              .height(400)
              .fit('crop')
              .crop('focalpoint')
              .focalPoint(logo.hotspot?.x || 0.5, logo.hotspot?.y || 0.5)
              .url()}
            className="max-h-48 max-w-full object-contain"
          />
          {/* Industry Badge */}
          {industry && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full bg-blue-600/90 px-3 py-1 text-xs font-medium text-white shadow-sm ring-1 ring-white/20 ring-inset">
                {industry}
              </span>
            </div>
          )}
        </div>

        {/* Content Section Below Image */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
            {companyName}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-gray-700">
            {description}
          </p>

          {/* Website Button */}
          {websiteUrl && (
            <div className="mt-4 flex justify-center">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-sm"
                aria-label={`Visit ${companyName} website`}
              >
                <span>Website besuchen</span>
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

async function Team() {
  const teamMembers = await getTeamMembers()

  return (
    <Container className="mt-32 scroll-mt-20" id="team">
      <Subheading>Unser Team</Subheading>
      <Heading as="h3" className="mt-2">
        Gegründet von Technologieexperten.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Maxsoft AG wurde von erfahrenen IT-Profis gegründet, die die
        Herausforderungen verstehen, vor denen Unternehmen in der heutigen sich
        schnell entwickelnden Technologielandschaft stehen.
      </Lead>
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="max-w-lg">
          <p className="mt-6 text-lg text-gray-600">
            Vor Jahren, während sie als IT-Berater bei führenden
            Technologieunternehmen arbeiteten, erkannten unsere Gründer eine
            gemeinsame Herausforderung: Unternehmen kämpften darum, mit der
            technologischen Innovation Schritt zu halten und dabei die
            betriebliche Effizienz zu erhalten.
          </p>
          <p className="mt-8 text-lg text-gray-600">
            Heute transformiert Maxsoft AG Unternehmen durch innovative
            Technologielösungen und hilft Organisationen dabei, die digitale
            Transformation zu bewältigen, die Cybersicherheit zu verbessern und
            ihre IT-Infrastruktur zu optimieren. Mehr als 200 Unternehmen
            vertrauen uns bei der Bereitstellung zuverlässiger, skalierbarer
            Technologielösungen.
          </p>
          <div className="mt-6">
            <Button className="w-full sm:w-auto" href="/contact">
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
        <div className="max-lg:order-first max-lg:max-w-lg">
          <div className="aspect-3/2 overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
            <img
              alt=""
              src="/company/5.jpg"
              className="block size-full object-cover"
            />
          </div>
        </div>
      </div>
      {teamMembers.data && teamMembers.data.length > 0 && (
        <React.Fragment key="team-section">
          <div className="mt-32 text-center">
            <Subheading as="h3">Lerne unser Team kennen</Subheading>
            <Heading as="h3" className="mx-auto mt-2 max-w-3xl">
              Erfahrene Fachkräfte, die sich deinem Erfolg widmen
            </Heading>
            <Lead className="mx-auto mt-6 max-w-2xl">
              Unser Team von IT-Experten bringt jahrzehntelange Erfahrung in der
              Technologieberatung, digitalen Transformation und
              Unternehmenslösungen zusammen.
            </Lead>
          </div>

          {/* Team Members Grid */}
          <div className="relative mt-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 -m-8 rounded-3xl bg-gradient-to-br from-gray-50/50 to-white" />

            <ul
              role="list"
              className="relative grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {teamMembers.data.map((member: TeamMember) => (
                <Person
                  key={member._id}
                  name={member.name}
                  title={member.title}
                  photo={member.photo}
                  linkedinUrl={member.linkedinUrl}
                  department={member.department}
                />
              ))}
            </ul>
          </div>
        </React.Fragment>
      )}
    </Container>
  )
}

async function Partners() {
  const technologyPartners = await getTechnologyPartners()
  const industryPartners = await getIndustryPartners()

  return (
    <Container className="mt-32 scroll-mt-20" id="partners">
      {(technologyPartners.data && technologyPartners.data.length > 0) ||
      (industryPartners.data && industryPartners.data.length > 0) ? (
        <React.Fragment key="partners-section">
          <Subheading>Partner</Subheading>
          <Heading as="h3" className="mt-2">
            Strategische Technologiepartnerschaften.
          </Heading>
          <Lead className="mt-6 max-w-3xl">
            Wir arbeiten mit führenden Technologieanbietern zusammen, um die
            besten Lösungen für unsere Kunden zu liefern und den Zugang zu
            modernsten Tools und Plattformen zu gewährleisten.
          </Lead>

          {technologyPartners.data && technologyPartners.data.length > 0 && (
            <React.Fragment key="technology-partners">
              <Subheading as="h3" className="mt-24">
                Technologiepartner
              </Subheading>
              <hr className="mt-6 border-t border-gray-200" />
              <ul
                role="list"
                className="mx-auto mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {technologyPartners.data.map((partner: TechnologyPartner) => (
                  <TechnologyPartnerCard
                    key={partner._id}
                    companyName={partner.companyName}
                    description={partner.description}
                    logo={partner.logo}
                    websiteUrl={partner.websiteUrl}
                    partnershipType={partner.partnershipType}
                  />
                ))}
              </ul>
            </React.Fragment>
          )}

          {industryPartners.data && industryPartners.data.length > 0 && (
            <React.Fragment key="industry-partners">
              <Subheading as="h3" className="mt-24">
                Branchenpartner
              </Subheading>
              <hr className="mt-6 border-t border-gray-200" />
              <ul
                role="list"
                className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {industryPartners.data.map((partner: IndustryPartner) => (
                  <IndustryPartnerCard
                    key={partner._id}
                    companyName={partner.companyName}
                    description={partner.description}
                    logo={partner.logo}
                    websiteUrl={partner.websiteUrl}
                    industry={partner.industry}
                  />
                ))}
              </ul>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : null}
    </Container>
  )
}

function Testimonial() {
  return (
    <div className="relative flex aspect-square flex-col justify-end overflow-hidden rounded-3xl sm:aspect-5/4 lg:aspect-3/4">
      <img
        alt=""
        src="/testimonials/janar.jpg"
        className="absolute inset-0 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-linear-to-t from-black from-10% to-75% ring-1 ring-gray-950/10 ring-inset lg:from-25%"
      />
      <figure className="relative p-10">
        <blockquote>
          <p className="relative text-xl/7 text-white before:absolute before:-translate-x-full before:content-['&quot;'] after:absolute after:content-['&quot;']">
            Maxsoft AG transformed our IT infrastructure, improving efficiency
            by 40% and reducing costs significantly.
          </p>
        </blockquote>
        <figcaption className="mt-6 border-t border-white/20 pt-6">
          <p className="text-sm/6 font-medium text-white">Janar Thiyagarajah</p>
          <p className="text-sm/6 font-medium">
            <span className="bg-linear-to-r from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] bg-clip-text text-transparent">
              Partner, Senior Business Advisor
            </span>
          </p>
        </figcaption>
      </figure>
    </div>
  )
}

async function Careers() {
  const jobCategories = await getJobCategories()
  const jobListings = await getJobListings()

  return (
    <Container className="my-32 scroll-mt-20" id="careers">
      <Subheading>Karriere</Subheading>
      <Heading as="h3" className="mt-2">
        Werde Teil unseres innovativen Teams.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Wir arbeiten zusammen von unseren Büros in der Schweiz und remote und
        fördern eine kollaborative Umgebung, die Innovation und Exzellenz
        schätzt.
      </Lead>
      <div className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_24rem]">
        <div className="lg:max-w-2xl">
          {jobListings.data && jobListings.data.length > 0 && (
            <Subheading as="h3">Offene Stellen</Subheading>
          )}
          <div className="pb-8">
            {jobListings.data && jobListings.data.length > 0 ? (
              <table className="w-full text-left">
                <colgroup>
                  <col className="w-2/3" />
                  <col className="w-1/3" />
                  <col className="w-0" />
                </colgroup>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Titel</th>
                    <th scope="col">Standort</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {jobCategories.data?.map((category: JobCategory) => (
                    <React.Fragment key={category._id}>
                      <tr>
                        <th
                          scope="colgroup"
                          colSpan={3}
                          className="px-0 pt-10 pb-0"
                        >
                          <div
                            className={`-mx-4 rounded-lg ${category.color} px-4 py-3 text-sm/6 font-semibold text-gray-900`}
                          >
                            {category.name}
                          </div>
                        </th>
                      </tr>
                      {jobListings.data
                        ?.filter(
                          (job: JobListingExpanded) =>
                            job.category._id === category._id,
                        )
                        .map((job: JobListingExpanded) => (
                          <tr
                            key={job._id}
                            className="border-b border-dotted border-gray-200 text-sm/6 font-normal"
                          >
                            <td className="px-0 py-4">{job.title}</td>
                            <td className="px-0 py-4 text-gray-600">
                              {job.location}
                            </td>
                            <td className="px-0 py-4 text-right">
                              <Button
                                variant="outline"
                                href={`/careers/${job.slug}`}
                              >
                                Stellenanzeige anzeigen
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto max-w-md">
                  <NoPositionsIcon className="mx-auto mb-6 h-16 w-16 text-gray-300" />
                  <h3 className="mb-3 text-lg font-medium text-gray-900">
                    Keine offenen Stellen
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    Wir haben derzeit keine offenen Stellen, aber wir suchen
                    immer nach talentierten Menschen, die unserem Team beitreten
                    möchten.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button
                      href="/contact"
                      variant="outline"
                      className="px-6 py-2"
                    >
                      Kontakt aufnehmen
                    </Button>
                    <Button
                      href="/careers"
                      variant="outline"
                      className="px-6 py-2"
                    >
                      Alle Karrieremöglichkeiten anzeigen
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Testimonial />
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
      <MissionSection />
      <VisionValues />
      <Team />
      <Partners />
      <Careers />
      <Footer />
    </main>
  )
}
