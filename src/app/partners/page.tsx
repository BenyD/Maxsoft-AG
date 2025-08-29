import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { NavbarServer } from '@/components/navbar-server'
import { Heading, Lead, Subheading } from '@/components/text'
import { image } from '@/sanity/image'
import { getIndustryPartners, getTechnologyPartners } from '@/sanity/queries'
import type { IndustryPartner } from '@/sanity/types/industryPartner'
import type { TechnologyPartner } from '@/sanity/types/technologyPartner'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Partner - Maxsoft AG',
  description:
    'Entdecken Sie unsere strategischen Technologiepartnerschaften und Branchenpartner. Wir arbeiten mit führenden Anbietern zusammen, um die besten IT-Lösungen zu liefern.',
}

function TechnologyPartnerCard({
  companyName,
  description,
  logo,
  websiteUrl,
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
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
        {/* Image Section */}
        <div className="mb-4 h-56 w-full flex-shrink-0 overflow-hidden rounded-lg">
          <img
            alt={companyName}
            src={image(logo).url()}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {companyName}
          </h3>
          <p className="flex-1 text-base text-gray-600">{description}</p>

          {/* Website Button */}
          {websiteUrl && (
            <div className="mt-4">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-green-600 hover:text-white hover:shadow-sm"
                aria-label={`${companyName} Website aufrufen`}
              >
                <span className="text-lg/[1.6]">Website aufrufen</span>
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
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300">
        {/* Image Section */}
        <div className="mb-4 h-56 w-full flex-shrink-0 overflow-hidden rounded-lg">
          <img
            alt={companyName}
            src={image(logo).url()}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
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

        {/* Content Section */}
        <div className="flex flex-1 flex-col">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {companyName}
          </h3>
          <p className="flex-1 text-base text-gray-600">{description}</p>

          {/* Website Button */}
          {websiteUrl && (
            <div className="mt-4">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-sm"
                aria-label={`${companyName} Website aufrufen`}
              >
                <span className="text-lg/[1.6]">Website aufrufen</span>
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

async function Partners() {
  const technologyPartners = await getTechnologyPartners()
  const industryPartners = await getIndustryPartners()

  return (
    <Container className="mt-32 mb-16 scroll-mt-20" id="partners">
      {(technologyPartners.data && technologyPartners.data.length > 0) ||
      (industryPartners.data && industryPartners.data.length > 0) ? (
        <React.Fragment key="partners-section">
          <Subheading>Partner</Subheading>
          <Heading as="h3" className="mt-2">
            Strategische Technologiepartnerschaften
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

export default function PartnersPage() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <NavbarServer />
      </Container>
      <Partners />
      <Footer />
    </main>
  )
}
