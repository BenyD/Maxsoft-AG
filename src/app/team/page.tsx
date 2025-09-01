import { AnimationWrapper } from '@/components/animation-wrapper'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { LinkedInIcon } from '@/components/linkedin-icon'
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
  }
  linkedinUrl?: string
  department?: string
}) {
  return (
    <li className="group">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#01A2EE]/0 via-[#01A2EE]/0 to-[#01A2EE]/0 transition-all duration-500 group-hover:from-[#01A2EE]/5 group-hover:via-[#01A2EE]/10 group-hover:to-[#01A2EE]/15" />

        {/* Photo Section with Enhanced Styling */}
        <div className="relative w-full overflow-hidden">
          <img
            alt={name}
            src={image(photo).url()}
            className="h-80 w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />

          {/* Department Badge with Enhanced Styling */}
          {department && (
            <div className="absolute top-4 right-4 z-20">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#01A2EE] to-[#01A2EE]/80 px-4 py-2 text-xs font-semibold text-white shadow-lg ring-1 ring-white/30 backdrop-blur-sm">
                {department}
              </span>
            </div>
          )}

          {/* LinkedIn Icon Overlay */}
          {linkedinUrl && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
              <div className="translate-y-4 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-[#01A2EE]"
                  aria-label={`View ${name}'s LinkedIn profile`}
                >
                  <LinkedInIcon className="size-5 text-gray-700 transition-colors duration-300 group-hover:text-white" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Content Section with Enhanced Typography */}
        <div className="relative z-20 p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#01A2EE]">
              {name}
            </h3>
            <p className="mt-3 text-base leading-relaxed font-medium text-[#01A2EE]">
              {title}
            </p>
          </div>

          {/* Enhanced LinkedIn Button */}
          {linkedinUrl && (
            <div className="mt-6 flex justify-center">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:scale-105 hover:border-[#01A2EE]/20 hover:from-[#01A2EE] hover:to-[#01A2EE]/90 hover:text-white hover:shadow-lg"
                aria-label={`View ${name}'s LinkedIn profile`}
              >
                <LinkedInIcon className="size-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          )}
        </div>

        {/* Subtle Border Accent */}
        <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#01A2EE]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </li>
  )
}

async function Team() {
  const teamMembers = await getTeamMembers()

  return (
    <Container className="mt-32 scroll-mt-20" id="team">
      {teamMembers.data && teamMembers.data.length > 0 && (
        <React.Fragment key="team-section">
          <AnimationWrapper animation="slideUp" delay={0.2}>
            <div>
              <Subheading as="h3">Unser Team</Subheading>
            </div>
          </AnimationWrapper>
          <AnimationWrapper animation="slideUp" delay={0.4}>
            <div>
              <Heading as="h3" className="mt-2 max-w-3xl">
                Kompetent, neugierig, lösungsorientiert – und immer auf deiner
                Seite.
              </Heading>
            </div>
          </AnimationWrapper>
          <AnimationWrapper animation="slideUp" delay={0.6}>
            <div>
              <Lead className="mt-6 max-w-2xl">
                Wir sind ein interdisziplinäres Team aus Technik-, Architektur-
                und Beratungsexperten. Gemeinsam entwickeln wir Lösungen, die
                nicht nur technisch funktionieren, sondern im Alltag wirklich
                weiterhelfen.
              </Lead>
            </div>
          </AnimationWrapper>

          {/* Team Members Grid */}
          <div className="relative mt-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 -m-8 rounded-3xl bg-gradient-to-br from-gray-50/50 to-white" />

            <ul
              role="list"
              className="relative grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {teamMembers.data.map((member: TeamMember, index: number) => (
                <AnimationWrapper
                  key={member._id}
                  animation="scaleIn"
                  delay={0.8 + index * 0.1}
                >
                  <Person
                    name={member.name}
                    title={member.title}
                    photo={member.photo}
                    linkedinUrl={member.linkedinUrl}
                    department={member.department}
                  />
                </AnimationWrapper>
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

      <Team />
      <Footer />
    </main>
  )
}
