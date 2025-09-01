import { AnimationWrapper } from '@/components/animation-wrapper'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
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
  title: 'Karriere - Maxsoft AG',
  description:
    'Werden Sie Teil unseres innovativen Teams bei Maxsoft AG. Entdecken Sie spannende Karrieremöglichkeiten in der IT-Beratung, im Engineering und in der digitalen Transformation.',
}

export default async function CareersPage() {
  const jobCategories = await getJobCategories()
  const jobListings = await getJobListings()

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container className="mt-16">
        <AnimationWrapper animation="slideUp" delay={0.2}>
          <Heading as="h1">Karriere bei Maxsoft AG</Heading>
        </AnimationWrapper>
        <AnimationWrapper animation="slideUp" delay={0.4}>
          <Lead className="mt-6 max-w-3xl">
            Werde Teil unseres innovativen Teams und hilf dabei, Unternehmen
            durch modernste Technologielösungen zu transformieren. Gemeinsam
            arbeiten wir von unseren Büros in der Schweiz aus sowie remote und
            fördern eine kollaborative Umgebung, die Innovation und Exzellenz
            schätzt.
          </Lead>
        </AnimationWrapper>
      </Container>

      <Container className="mt-24">
        {jobListings.data && jobListings.data.length > 0 && (
          <AnimationWrapper animation="slideUp" delay={0.6}>
            <Subheading>Offene Stellen</Subheading>
          </AnimationWrapper>
        )}
        <div className="mt-12 pb-8">
          {jobListings.data && jobListings.data.length > 0 ? (
            <div className="space-y-16">
              {jobCategories.data?.map((category: JobCategory) => (
                <div key={category._id} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div
                      className={`inline-flex items-center rounded-lg px-4 py-2 text-lg/[1.6] font-semibold text-gray-900 shadow-sm ${category.color}`}
                    >
                      {category.name
                        .split(' ')
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase(),
                        )
                        .join(' ')}
                    </div>
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-lg/[1.6] text-gray-500">
                      {jobListings.data?.filter(
                        (job: JobListingExpanded) =>
                          job.category._id === category._id,
                      ).length || 0}{' '}
                      Stelle
                      {jobListings.data?.filter(
                        (job: JobListingExpanded) =>
                          job.category._id === category._id,
                      ).length === 1
                        ? ''
                        : 'n'}
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
                                <h3 className="text-lg/[1.6] font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                                  {job.title}
                                </h3>
                                <p className="mt-1 text-lg/[1.6] text-gray-600">
                                  {job.shortDescription}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-4 text-lg/[1.6] text-gray-500">
                                <span className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                                  <MapPinIcon className="h-4 w-4 text-blue-500" />
                                  {job.location
                                    .split(' ')
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase(),
                                    )
                                    .join(' ')}
                                </span>
                                <span className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                                  <BriefcaseIcon className="h-4 w-4 text-green-500" />
                                  {job.employmentType
                                    .split(' ')
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase(),
                                    )
                                    .join(' ')}
                                </span>
                                {job.salary && (
                                  <span className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                                    <CurrencyDollarIcon className="h-4 w-4 text-yellow-500" />
                                    {job.salary
                                      .split(' ')
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1).toLowerCase(),
                                      )
                                      .join(' ')}
                                  </span>
                                )}
                              </div>
                            </div>

                            <Button
                              href={`/careers/${job.slug}`}
                              className="whitespace-nowrap transition-transform group-hover:scale-105"
                            >
                              Details anzeigen
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimationWrapper animation="scaleIn" delay={0.8}>
              <div className="py-20 text-center">
                <div className="mx-auto max-w-md">
                  <NoPositionsIcon className="mx-auto mb-8 h-24 w-24 text-gray-300" />
                  <h2 className="mb-4 text-lg/[1.6] font-semibold text-gray-900">
                    Keine offenen Stellen
                  </h2>
                  <p className="mb-8 text-lg/[1.6] text-gray-600">
                    Wir haben derzeit keine offenen Stellen, aber wir suchen
                    immer nach talentierten Menschen, die unserem Team beitreten
                    möchten. Kontaktieren Sie uns gerne und stellen Sie sich
                    vor!
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button href="/contact" className="px-8 py-3">
                      Kontakt aufnehmen
                    </Button>
                    <Button
                      href="/company"
                      variant="outline"
                      className="px-8 py-3"
                    >
                      Über uns erfahren
                    </Button>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          )}
        </div>
      </Container>

      <Footer />
    </main>
  )
}
