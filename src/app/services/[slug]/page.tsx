import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'

import { Heading, Lead, Subheading } from '@/components/text'
import { Icon } from '@/components/ui/icon'
import { getService, getServicesByCategory } from '@/sanity/queries'

import { image } from '@/sanity/image'
import type { Service } from '@/sanity/types/service'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    return {
      title: 'Service Not Found - Maxsoft AG',
    }
  }

  return {
    title: service.seo?.metaTitle || `${service.title} - Maxsoft AG`,
    description: service.seo?.metaDescription || service.shortDescription,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  const relatedServices = await getServicesByCategory(service.category.slug)
  const otherServices =
    relatedServices?.filter((s: Service) => s._id !== service._id) || []

  return (
    <main className="overflow-hidden">
      <GradientBackground />

      <Container className="mt-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/services" className="hover:text-gray-700">
            Dienstleistungen
          </Link>
          <span>/</span>
          <Link
            href={`/services/category/${service.category.slug}`}
            className="hover:text-gray-700"
          >
            {service.category.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{service.title}</span>
        </nav>

        {/* Service Header */}
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${service.category.color}`}
              >
                <Icon
                  name={service.category.icon || ''}
                  className="h-6 w-6"
                  fallback={service.category.name.charAt(0)}
                />
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${service.category.color}`}
              >
                {service.category.name}
              </span>
            </div>

            <Heading as="h1">{service.title}</Heading>
            <Lead className="mt-6">{service.shortDescription}</Lead>

            {/* Service Image */}
            {service.featuredImage && (
              <div className="mt-8 overflow-hidden rounded-xl">
                <img
                  src={image(service.featuredImage)
                    .width(800)
                    .height(400)
                    .url()}
                  alt={service.featuredImage.alt || service.title}
                  className="h-64 w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Service Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Only show Service Details card if any of the details exist */}
              {(service.duration ||
                service.deliveryMethod ||
                service.pricing) && (
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-4 font-semibold text-gray-900">
                    Dienstleistungs-Details
                  </h3>
                  <dl className="space-y-3">
                    {service.duration && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Duration
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {service.duration}
                        </dd>
                      </div>
                    )}
                    {service.deliveryMethod && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Delivery Method
                        </dt>
                        <dd className="text-sm text-gray-900 capitalize">
                          {service.deliveryMethod}
                        </dd>
                      </div>
                    )}
                    {service.pricing && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Pricing
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {service.pricing}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {/* Action Buttons */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <Button href="/contact#beratung-buchen" className="mb-3 w-full">
                  Beratung buchen
                </Button>
                <Button href="/contact" variant="outline" className="w-full">
                  Angebot anfordern
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Service Content */}
      <Container className="mt-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {/* Full Description */}
            {service.fullDescription && (
              <div className="prose prose-gray max-w-none">
                <PortableText value={service.fullDescription} />
              </div>
            )}

            {/* Key Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div>
                <Subheading>Hauptvorteile</Subheading>
                <ul className="mt-6 space-y-3">
                  {service.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <svg
                          className="h-3 w-3 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Target Audience & Prerequisites */}
            <div className="grid gap-8 sm:grid-cols-2">
              {service.targetAudience && (
                <div>
                  <Subheading>Zielgruppe</Subheading>
                  <p className="mt-4 text-gray-700">{service.targetAudience}</p>
                </div>
              )}

              {service.prerequisites && (
                <div>
                  <Subheading>Voraussetzungen</Subheading>
                  <p className="mt-4 text-gray-700">{service.prerequisites}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Related Services */}
      {otherServices.length > 0 && (
        <Container className="mt-24">
          <Subheading>Ähnliche Dienstleistungen</Subheading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.slice(0, 3).map((relatedService: Service) => (
              <Link
                key={relatedService._id}
                href={`/services/${relatedService.slug}`}
                className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                  {relatedService.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {relatedService.shortDescription}
                </p>
                <div className="flex items-center text-sm font-medium text-blue-600">
                  Mehr erfahren
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      )}

      <Footer />
    </main>
  )
}
