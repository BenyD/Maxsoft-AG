import { AnimationWrapper } from '@/components/animation-wrapper'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { NavbarServer } from '@/components/navbar-server'
import { Heading, Lead, Subheading } from '@/components/text'
import { Icon } from '@/components/ui/icon'
import { getServiceCategories, getServices } from '@/sanity/queries'
import type { ServiceExpanded } from '@/sanity/types/service'
import type { ServiceCategory } from '@/sanity/types/serviceCategory'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dienstleistungen - Maxsoft AG',
  description:
    'Entdecken Sie unser umfassendes Angebot an IT-Dienstleistungen einschließlich Schulungsworkshops, Beratungsdienstleistungen und Unternehmenslösungen, die darauf ausgerichtet sind, Ihr Unternehmen zu transformieren.',
}

function ServiceCategoryCard({
  category,
  services,
}: {
  category: ServiceCategory
  services: ServiceExpanded[]
}) {
  const categoryServices = services.filter((service) => {
    const matches = service.category?._id === category._id
    return matches
  })

  if (categoryServices.length === 0) return null

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md">
      <div className="mb-6 flex items-center gap-4">
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}
        >
          <Icon
            name={category.icon || ''}
            className="h-6 w-6"
            fallback={category.name.charAt(0)}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
            {category.name}
          </h3>
          {category.description && (
            <p className="mt-1 text-sm text-gray-600">{category.description}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {categoryServices.map((service) => {
          return (
            <Link
              key={service._id}
              href={`/services/${service.slug}`}
              className="block rounded-lg border border-gray-100 p-4 transition-colors hover:border-gray-200 hover:bg-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 font-medium text-gray-900">
                    {service.title}
                  </h4>
                  <p className="mb-2 text-sm text-gray-600">
                    {service.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {service.duration && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-blue-800">
                        ⏱️ {service.duration}
                      </span>
                    )}
                    {service.deliveryMethod && (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-green-800">
                        📍 {service.deliveryMethod}
                      </span>
                    )}
                    {service.pricing && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-yellow-800">
                        💰 {service.pricing}
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
          )
        })}
      </div>

      <div className="mt-6 border-t border-gray-100 pt-6">
        {/* Only show View All button if category has a valid slug */}
        {category.slug ? (
          <Button
            href={`/services/category/${category.slug}`}
            variant="outline"
            className="w-full"
          >
            Alle {category.name} anzeigen
          </Button>
        ) : (
          <div className="py-2 text-center text-sm text-gray-500">
            Kategorie-Slug fehlt - Link kann nicht generiert werden
          </div>
        )}
      </div>
    </div>
  )
}

export default async function ServicesPage() {
  const serviceCategories = await getServiceCategories()
  const services = await getServices()

  const featuredServices =
    services.data?.filter((service: ServiceExpanded) => service.isFeatured) ||
    []
  const hasServices = services.data && services.data.length > 0
  const hasCategories =
    serviceCategories.data && serviceCategories.data.length > 0

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container className="relative z-20">
        <NavbarServer />
      </Container>

      <Container className="mt-16">
        <AnimationWrapper animation="slideUp" delay={0.2}>
          <Heading as="h1">Unsere Dienstleistungen</Heading>
        </AnimationWrapper>
        <AnimationWrapper animation="slideUp" delay={0.4}>
          <Lead className="mt-6 max-w-3xl">
            Entdecke unser umfassendes Angebot an IT-Dienstleistungen, die
            darauf ausgerichtet sind, Dein Unternehmen zu transformieren. Von
            praktischen Schulungsworkshops bis hin zu strategischer Beratung
            bieten wir die Expertise, die Du benötigst, um in der heutigen
            digitalen Landschaft erfolgreich zu sein.
          </Lead>
        </AnimationWrapper>
      </Container>

      {/* No Services State */}
      {!hasServices && !hasCategories && (
        <Container className="mt-24">
          <div className="py-16 text-center">
            <div className="mx-auto max-w-md">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-10 w-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                Dienstleistungen kommen bald
              </h2>
              <p className="mb-8 leading-relaxed text-gray-600">
                Wir entwickeln derzeit unser Dienstleistungsangebot.
                Kontaktieren Sie uns in der Zwischenzeit, um Ihre spezifischen
                IT-Bedürfnisse und maßgeschneiderte Lösungen zu besprechen.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button href="/contact">Kontakt aufnehmen</Button>
                <Button href="/company" variant="outline">
                  Über uns erfahren
                </Button>
              </div>
            </div>
          </div>
        </Container>
      )}

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <Container className="mt-24">
          <AnimationWrapper animation="slideUp" delay={0.6}>
            <Subheading>Empfohlene Dienstleistungen</Subheading>
          </AnimationWrapper>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service: ServiceExpanded, index: number) => (
              <AnimationWrapper
                key={service._id}
                animation="scaleIn"
                delay={0.8 + index * 0.2}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
                >
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${service.category.color} mb-4`}
                  >
                    <Icon
                      name={service.category.icon || ''}
                      className="h-5 w-5"
                      fallback={service.category.name.charAt(0)}
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {service.shortDescription}
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
              </AnimationWrapper>
            ))}
          </div>
        </Container>
      )}

      {/* Service Categories */}
      {hasCategories && (
        <Container className="mt-24 mb-16">
          <AnimationWrapper animation="slideUp" delay={1.0}>
            <Subheading>Alle Dienstleistungen</Subheading>
          </AnimationWrapper>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {serviceCategories.data?.map(
              (category: ServiceCategory, index: number) => {
                return (
                  <AnimationWrapper
                    key={category._id}
                    animation="scaleIn"
                    delay={1.2 + index * 0.2}
                  >
                    <ServiceCategoryCard
                      category={category}
                      services={services.data || []}
                    />
                  </AnimationWrapper>
                )
              },
            )}
          </div>
        </Container>
      )}

      <Footer />
    </main>
  )
}
