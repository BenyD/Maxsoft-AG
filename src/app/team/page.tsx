import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { LinkedInIcon } from '@/components/linkedin-icon'
import { NavbarServer } from '@/components/navbar-server'
import { Heading, Lead, Subheading } from '@/components/text'
import { image } from '@/sanity/image'
import { getTeamMembers } from '@/sanity/queries'
import type { TeamMember } from '@/sanity/types/teamMember'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Unser Team - Maxsoft AG',
  description:
    'Lerne unser Team von IT-Experten kennen. Erfahrene Fachkräfte, die sich deinem Erfolg widmen und innovative IT-Lösungen entwickeln.',
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
          <h3 className="text-lg/[1.6] font-semibold text-gray-900 transition-colors group-hover:text-[#01A2EE]">
            {name}
          </h3>
          <p className="mt-2 text-lg/[1.6] font-medium text-[#01A2EE]">
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
                <span className="text-lg/[1.6]">LinkedIn</span>
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
        Lass uns zusammenarbeiten!
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Kompetent, neugierig, lösungsorientiert – und immer auf deiner Seite.
        Wir sind ein interdisziplinäres Team aus Technik-, Architektur- und
        Beratungsexperten. Gemeinsam entwickeln wir Lösungen, die nicht nur
        technisch funktionieren, sondern im Alltag wirklich weiterhelfen.
      </Lead>
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="max-w-lg">
          <p className="mt-6 text-lg/[1.6] text-gray-600">
            Vor Jahren, während sie als IT-Berater bei führenden
            Technologieunternehmen arbeiteten, erkannten unsere Gründer eine
            gemeinsame Herausforderung: Unternehmen kämpften darum, mit der
            technologischen Innovation Schritt zu halten und dabei die
            betriebliche Effizienz zu erhalten.
          </p>
          <p className="mt-8 text-lg/[1.6] text-gray-600">
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
          <div className="mt-32">
            <Subheading as="h3">Lerne unser Team kennen</Subheading>
            <Heading as="h3" className="mt-2 max-w-3xl">
              Erfahrene Fachkräfte, die sich deinem Erfolg widmen
            </Heading>
            <Lead className="mt-6 max-w-2xl">
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

export default function TeamPage() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <NavbarServer />
      </Container>
      <Team />
      <Footer />
    </main>
  )
}
