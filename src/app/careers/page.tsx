import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { NoPositionsIcon } from '@/components/no-positions-icon'
import { Heading, Lead, Subheading } from '@/components/text'
import { getJobCategories, getJobListings } from '@/sanity/queries'
import type { JobCategory } from '@/sanity/types/jobCategory'
import type { JobListingExpanded } from '@/sanity/types/jobListing'
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers - Maxsoft AG',
  description:
    'Join our innovative team at Maxsoft AG. Explore exciting career opportunities in IT consulting, engineering, and digital transformation.',
}

export default async function CareersPage() {
  const jobCategories = await getJobCategories()
  const jobListings = await getJobListings()

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>

      <Container className="mt-16">
        <Heading as="h1">Careers at Maxsoft AG</Heading>
        <Lead className="mt-6 max-w-3xl">
          Join our innovative team and help transform businesses through
          cutting-edge technology solutions. We work together from our offices
          in Switzerland and remotely, fostering a collaborative environment
          that values innovation and excellence.
        </Lead>
      </Container>

      <Container className="mt-24">
        {jobListings.data && jobListings.data.length > 0 && (
          <Subheading>Open Positions</Subheading>
        )}
        <div className="mt-12 pb-8">
          {jobListings.data && jobListings.data.length > 0 ? (
            <div className="space-y-16">
              {jobCategories.data?.map((category: JobCategory) => (
                <div key={category._id} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div
                      className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ${category.color}`}
                    >
                      {category.name}
                    </div>
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-500">
                      {jobListings.data?.filter(
                        (job: JobListingExpanded) =>
                          job.category._id === category._id,
                      ).length || 0}{' '}
                      position
                      {jobListings.data?.filter(
                        (job: JobListingExpanded) =>
                          job.category._id === category._id,
                      ).length === 1
                        ? ''
                        : 's'}
                    </span>
                  </div>

                  <div className="grid gap-6">
                    {jobListings.data
                      ?.filter(
                        (job: JobListingExpanded) =>
                          job.category._id === category._id,
                      )
                      .map((job: JobListingExpanded) => (
                        <div
                          key={job._id}
                          className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex-1 space-y-3">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                                  {job.title}
                                </h3>
                                <p className="mt-1 leading-relaxed text-gray-600">
                                  {job.shortDescription}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                                  <MapPinIcon className="h-4 w-4 text-blue-500" />
                                  {job.location}
                                </span>
                                <span className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                                  <BriefcaseIcon className="h-4 w-4 text-green-500" />
                                  {job.employmentType}
                                </span>
                                {job.salary && (
                                  <span className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                                    <CurrencyDollarIcon className="h-4 w-4 text-yellow-500" />
                                    {job.salary}
                                  </span>
                                )}
                              </div>
                            </div>

                            <Button
                              href={`/careers/${job.slug}`}
                              className="whitespace-nowrap transition-transform group-hover:scale-105"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto max-w-md">
                <NoPositionsIcon className="mx-auto mb-8 h-24 w-24 text-gray-300" />
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  No Open Positions
                </h2>
                <p className="mb-8 leading-relaxed text-gray-600">
                  We don&apos;t have any open positions at the moment, but
                  we&apos;re always looking for talented people to join our
                  team. Feel free to reach out and introduce yourself!
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button href="/contact" className="px-8 py-3">
                    Get in Touch
                  </Button>
                  <Button
                    href="/company"
                    variant="outline"
                    className="px-8 py-3"
                  >
                    Learn About Us
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>

      <Footer />
    </main>
  )
}
