import { AnimatedNumber } from '@/components/animated-number'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { LinkedInIcon } from '@/components/linkedin-icon'
import { Navbar } from '@/components/navbar'
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
  title: 'About Us - Maxsoft AG',
  description:
    'Maxsoft AG is a leading Swiss IT consultancy with over 20 years of experience, based in Rotkreuz, Canton of Zurich. We offer customized IT solutions for companies of all sizes and industries.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Your Reliable IT Partner for Over 20 Years</Heading>
      <Lead className="mt-6 max-w-3xl">
        Maxsoft is a Swiss IT company based in Rotkreuz, Canton of Zurich. We
        offer customized IT solutions for companies of all sizes and across all
        industries. Our team of experienced IT architects and engineers will
        help you optimize your IT processes and transform your IT department
        into a true business partner.
      </Lead>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          <h2 className="text-2xl font-medium tracking-tight">Our Mission</h2>
          <p className="mt-6 text-sm/6 text-gray-600">
            We help companies modernize their IT, increase efficiency, and drive
            growth with innovative and practical solutions. Thanks to our many
            years of expertise, we understand your challenges and support you in
            implementing future-proof IT solutions.
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            Maxsoft differentiates itself through our holistic approach. We
            guide you through all phases of IT modernization – from analysis and
            design to implementation and ongoing operations. With our experience
            across various industries, we offer solutions that perfectly match
            your specific requirements.
          </p>
        </div>
        <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <img
                alt="Professional working environment"
                src="/company/1.jpg"
                className="block size-full object-cover"
              />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <img
                alt="Team discussion and collaboration"
                src="/company/2.jpg"
                className="block size-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <img
                alt="Working in office environment"
                src="/company/3.jpg"
                className="block size-full object-cover"
              />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <img
                alt="Team collaboration and success"
                src="/company/4.jpg"
                className="block size-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="max-lg:mt-16 lg:col-span-1">
          <Subheading>Our Journey</Subheading>
          <hr className="mt-6 border-t border-gray-200" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Founding</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                2018
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Employees</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={1} end={1} />+
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">New Customers</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={8} end={10} />+
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Projects Done</dt>
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

function VisionValues() {
  return (
    <Container className="mt-32">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <Subheading>Our Vision</Subheading>
          <Heading as="h3" className="mt-2">
            Creating a Future of Informed Decisions
          </Heading>
          <p className="mt-6 text-sm/6 text-gray-600">
            We want to create a future where companies leverage their IT to make
            informed decisions and turn challenges into opportunities. Our
            forward-thinking approach ensures your business stays ahead of
            technological advancements.
          </p>
        </div>
        <div>
          <Subheading>Our Values</Subheading>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-[#01A2EE]"></div>
              <div>
                <h4 className="font-medium text-gray-900">Transparency</h4>
                <p className="text-sm text-gray-600">
                  We communicate openly and honestly in all our interactions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-[#7FBA02]"></div>
              <div>
                <h4 className="font-medium text-gray-900">Partnership</h4>
                <p className="text-sm text-gray-600">
                  We work closely with you and are always at your side
                  throughout the journey.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-[#FDB800]"></div>
              <div>
                <h4 className="font-medium text-gray-900">Sustainability</h4>
                <p className="text-sm text-gray-600">
                  We think long-term and sustainably in all our solutions and
                  recommendations.
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

async function Team() {
  const teamMembers = await getTeamMembers()

  return (
    <Container className="mt-32">
      <Subheading>Meet the team</Subheading>
      <Heading as="h3" className="mt-2">
        Founded by technology experts.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Maxsoft AG is founded by experienced IT professionals who understand the
        challenges businesses face in today&apos;s rapidly evolving technology
        landscape.
      </Lead>
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="max-w-lg">
          <p className="mt-6 text-sm/6 text-gray-600">
            Years ago, while working as IT consultants at leading technology
            companies, our founders recognized a common challenge: businesses
            were struggling to keep pace with technological innovation while
            maintaining operational efficiency.
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            Today, Maxsoft AG transforms businesses through innovative
            technology solutions, helping organizations navigate digital
            transformation, enhance cybersecurity, and optimize their IT
            infrastructure. More than 200 companies trust us to deliver
            reliable, scalable technology solutions.
          </p>
          <div className="mt-6">
            <Button className="w-full sm:w-auto" href="/contact">
              Get in touch
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
            <Subheading as="h3">Meet Our Team</Subheading>
            <Heading as="h3" className="mx-auto mt-2 max-w-3xl">
              Experienced professionals dedicated to your success
            </Heading>
            <Lead className="mx-auto mt-6 max-w-2xl">
              Our team of IT experts brings together decades of experience in
              technology consulting, digital transformation, and enterprise
              solutions.
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
    <Container className="mt-32">
      {(technologyPartners.data && technologyPartners.data.length > 0) ||
      (industryPartners.data && industryPartners.data.length > 0) ? (
        <React.Fragment key="partners-section">
          <Subheading>Partners</Subheading>
          <Heading as="h3" className="mt-2">
            Strategic technology partnerships.
          </Heading>
          <Lead className="mt-6 max-w-3xl">
            We collaborate with leading technology providers to deliver the best
            solutions for our clients, ensuring access to cutting-edge tools and
            platforms.
          </Lead>

          {technologyPartners.data && technologyPartners.data.length > 0 && (
            <React.Fragment key="technology-partners">
              <Subheading as="h3" className="mt-24">
                Technology Partners
              </Subheading>
              <hr className="mt-6 border-t border-gray-200" />
              <ul
                role="list"
                className="mx-auto mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2"
              >
                {technologyPartners.data.map((partner: TechnologyPartner) => (
                  <li key={partner._id}>
                    <img
                      alt={partner.companyName}
                      src={image(partner.logo).width(56).height(56).url()}
                      className="h-14 object-contain"
                    />
                    <p className="mt-6 max-w-lg text-sm/6 text-gray-500">
                      {partner.description}
                    </p>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          )}

          {industryPartners.data && industryPartners.data.length > 0 && (
            <React.Fragment key="industry-partners">
              <Subheading as="h3" className="mt-24">
                Industry partners
              </Subheading>
              <hr className="mt-6 border-t border-gray-200" />
              <ul
                role="list"
                className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {industryPartners.data.map((partner: IndustryPartner) => (
                  <Person
                    key={partner._id}
                    name={partner.companyName}
                    title={partner.description}
                    photo={partner.logo}
                    linkedinUrl={partner.websiteUrl}
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
    <Container className="my-32">
      <Subheading>Careers</Subheading>
      <Heading as="h3" className="mt-2">
        Join our innovative team.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        We work together from our offices in Switzerland and remotely, fostering
        a collaborative environment that values innovation and excellence.
      </Lead>
      <div className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_24rem]">
        <div className="lg:max-w-2xl">
          {jobListings.data && jobListings.data.length > 0 && (
            <Subheading as="h3">Open positions</Subheading>
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
                    <th scope="col">Title</th>
                    <th scope="col">Location</th>
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
                                View listing
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
                    No Open Positions
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    We don&apos;t have any open positions at the moment, but
                    we&apos;re always looking for talented people to join our
                    team.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button
                      href="/contact"
                      variant="outline"
                      className="px-6 py-2"
                    >
                      Get in Touch
                    </Button>
                    <Button
                      href="/careers"
                      variant="outline"
                      className="px-6 py-2"
                    >
                      View All Careers
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
        <Navbar />
      </Container>
      <Header />
      <VisionValues />
      <Team />
      <Partners />
      <Careers />
      <Footer />
    </main>
  )
}
