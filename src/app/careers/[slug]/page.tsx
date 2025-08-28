import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { JobPageClient } from '@/components/job-page-client'
import { NavbarServer } from '@/components/navbar-server'
import { getJobListing } from '@/sanity/queries'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface JobPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { slug } = await params
  const job = await getJobListing(slug)

  if (!job?.data) {
    return {
      title: 'Job Not Found - Maxsoft AG',
    }
  }

  return {
    title: `${job.data.title} - Maxsoft AG`,
    description: job.data.shortDescription,
  }
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params
  const job = await getJobListing(slug)

  if (!job?.data) {
    notFound()
  }

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container className="relative z-20">
        <NavbarServer />
      </Container>

      <Container className="mt-16 mb-16">
        <JobPageClient job={job.data} />
      </Container>

      <Footer />
    </main>
  )
}
