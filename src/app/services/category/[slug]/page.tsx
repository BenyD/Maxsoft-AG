import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { NavbarServer } from '@/components/navbar-server'
import { Heading, Lead, Subheading } from '@/components/text'
import { Icon } from '@/components/ui/icon'
import { getServiceCategories, getServicesByCategory } from '@/sanity/queries'
import type { ServiceExpanded } from '@/sanity/types/service'
import type { ServiceCategory } from '@/sanity/types/serviceCategory'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const categories = await getServiceCategories()
  const category = categories.data?.find(
    (cat: ServiceCategory) => cat.slug === slug,
  )

  if (!category) {
    return {
      title: 'Category Not Found - Maxsoft AG',
    }
  }

  return {
    title: `${category.name} Services - Maxsoft AG`,
    description:
      category.description ||
      `Explore our ${category.name.toLowerCase()} services designed to transform your business.`,
  }
}

export default async function ServiceCategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params
  const categories = await getServiceCategories()
  const category = categories.data?.find(
    (cat: ServiceCategory) => cat.slug === slug,
  )

  if (!category) {
    notFound()
  }

  const services = await getServicesByCategory(slug)

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container className="relative z-20">
        <NavbarServer />
      </Container>

      <Container className="mt-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/services" className="hover:text-gray-700">
            Dienstleistungen
          </Link>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-6 flex items-center gap-4">
          <div
            className={`inline-flex h-16 w-16 items-center justify-center rounded-xl ${category.color}`}
          >
            <Icon
              name={category.icon || ''}
              className="h-8 w-8"
              fallback={category.name.charAt(0)}
            />
          </div>
          <div>
            <Heading as="h1">{category.name}</Heading>
            {category.description && (
              <Lead className="mt-4">{category.description}</Lead>
            )}
          </div>
        </div>
      </Container>

      {/* Services Grid */}
      <Container className="mt-16 mb-16">
        {services.data && services.data.length > 0 ? (
          <React.Fragment key="services-list">
            <Subheading>Verfügbare Dienstleistungen</Subheading>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.data.map((service: ServiceExpanded) => (
                <Link
                  key={service._id}
                  href={`/services/${service.slug}`}
                  className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                      {service.title}
                    </h3>
                    {service.isFeatured && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {service.shortDescription}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {service.duration && (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
                        ⏱️ {service.duration}
                      </span>
                    )}
                    {service.deliveryMethod && (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        📍 {service.deliveryMethod}
                      </span>
                    )}
                    {service.pricing && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                        💰 {service.pricing}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
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
                  </div>
                </Link>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto max-w-md">
              <div
                className={`inline-flex h-16 w-16 items-center justify-center rounded-xl ${category.color} mb-6`}
              >
                <Icon
                  name={category.icon || ''}
                  className="h-8 w-8"
                  fallback={category.name.charAt(0)}
                />
              </div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                No Services Available
              </h2>
              <p className="mb-8 leading-relaxed text-gray-600">
                We&apos;re currently developing services in this category. Check
                back soon or contact us for custom solutions.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button href="/contact">Contact Us</Button>
                <Button href="/services" variant="outline">
                  Alle Dienstleistungen anzeigen
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>

      <Footer />
    </main>
  )
}
