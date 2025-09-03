import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'

import { Heading, Lead, Subheading } from '@/components/text'
import { Icon } from '@/components/ui/icon'
import { getService, getServicesByCategory } from '@/sanity/queries'

import { image } from '@/sanity/image'
import type { Service } from '@/sanity/types/service'
import type { Metadata } from 'next'
import { PortableText } from 'next-sanity'
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
        <div className="lg:flex lg:gap-12">
          <div className="lg:flex-1">
            <div className="mb-6 flex items-center gap-3">
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${service.category.color}`}
              >
                <Icon
                  name={service.category.icon || ''}
                  className="h-5 w-5"
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

            {/* Separator */}
            <div className="my-8 border-t border-gray-200"></div>

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

            {/* Full Description */}
            {service.fullDescription && (
              <div className="prose prose-gray mt-8 max-w-none">
                <PortableText
                  value={service.fullDescription}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="my-6 text-base leading-relaxed text-gray-700 first:mt-0 last:mb-0">
                          {children}
                        </p>
                      ),
                      h1: ({ children }) => (
                        <h1 className="mt-8 mb-6 text-3xl font-bold tracking-tight text-gray-900 first:mt-0 last:mb-0">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mt-8 mb-6 text-2xl font-semibold tracking-tight text-gray-900 first:mt-0 last:mb-0">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mt-6 mb-4 text-xl font-semibold tracking-tight text-gray-900 first:mt-0 last:mb-0">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="mt-6 mb-4 text-lg font-semibold tracking-tight text-gray-900 first:mt-0 last:mb-0">
                          {children}
                        </h4>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="my-6 border-l-4 border-blue-500 pl-6 text-base leading-relaxed text-gray-700 italic first:mt-0 last:mb-0">
                          {children}
                        </blockquote>
                      ),
                    },
                    types: {
                      image: ({ value }) => (
                        <img
                          alt={value.alt || ''}
                          src={image(value).width(800).url()}
                          className="my-6 w-full rounded-lg shadow-md"
                        />
                      ),
                      separator: ({ value }) => {
                        switch (value.separatorType) {
                          case 'line':
                            return (
                              <hr className="my-8 border-t border-gray-200" />
                            )
                          case 'dots':
                            return (
                              <div className="my-8 flex justify-center">
                                <div className="flex space-x-2">
                                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                </div>
                              </div>
                            )
                          case 'arrow':
                            return (
                              <div className="my-8 flex justify-center">
                                <svg
                                  className="h-6 w-6 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                  />
                                </svg>
                              </div>
                            )
                          default:
                            return (
                              <hr className="my-8 border-t border-gray-200" />
                            )
                        }
                      },
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="my-6 list-disc pl-6 text-base leading-relaxed text-gray-700 marker:text-gray-400">
                          {children}
                        </ul>
                      ),
                      number: ({ children }) => (
                        <ol className="my-6 list-decimal pl-6 text-base leading-relaxed text-gray-700 marker:text-gray-400">
                          {children}
                        </ol>
                      ),
                    },
                    listItem: {
                      bullet: ({ children }) => (
                        <li className="my-2 pl-2">{children}</li>
                      ),
                      number: ({ children }) => (
                        <li className="my-2 pl-2">{children}</li>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-semibold text-gray-900">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="text-gray-800 italic">{children}</em>
                      ),
                      code: ({ children }) => (
                        <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800">
                          {children}
                        </code>
                      ),
                      link: ({ value, children }) => {
                        return (
                          <a
                            href={value.href}
                            className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-800 hover:decoration-blue-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        )
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>

          {/* Service Details Sidebar */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Only show Service Details card if any of the details exist */}
              {(service.duration ||
                service.deliveryMethod ||
                service.pricing) && (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Dienstleistungs-Details
                  </h3>
                  <dl className="space-y-3">
                    {service.duration && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Dauer
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {service.duration}
                        </dd>
                      </div>
                    )}
                    {service.deliveryMethod && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Durchführungsart
                        </dt>
                        <dd className="text-sm text-gray-900 capitalize">
                          {service.deliveryMethod === 'on-site' && 'Vor Ort'}
                          {service.deliveryMethod === 'remote' && 'Remote'}
                          {service.deliveryMethod === 'hybrid' && 'Hybrid'}
                          {service.deliveryMethod === 'online' && 'Online'}
                        </dd>
                      </div>
                    )}
                    {service.pricing && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Preis
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
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
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

      {/* Key Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <Container className="mt-16">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-12 lg:col-span-2">
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

              {/* Target Audience & Prerequisites */}
              <div className="grid gap-8 sm:grid-cols-2">
                {service.targetAudience && (
                  <div>
                    <Subheading>Zielgruppe</Subheading>
                    <p className="mt-4 text-gray-700">
                      {service.targetAudience}
                    </p>
                  </div>
                )}

                {service.prerequisites && (
                  <div>
                    <Subheading>Voraussetzungen</Subheading>
                    <p className="mt-4 text-gray-700">
                      {service.prerequisites}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      )}

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

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  )
}
