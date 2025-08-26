import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { NavbarServer } from '@/components/navbar-server'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Maxsoft AG',
  description:
    'Terms of Service and General Terms and Conditions for Maxsoft AG IT consulting services.',
}

export default function TermsPage() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <NavbarServer />
      </Container>

      <Container className="mt-16">
        <Heading as="h1">Terms of Service</Heading>
        <Lead className="mt-6 max-w-3xl">
          Please review our Terms of Service and General Terms and Conditions
          below. These terms govern your use of our services and establish the
          legal framework for our business relationship.
        </Lead>
      </Container>

      {/* Terms Content */}
      <Container className="mt-16">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              General Terms and Conditions (AGB)
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Embed Container */}
          <div className="relative">
            <div className="aspect-[4/3] w-full">
              <iframe
                src="https://app.privacybee.io/v/cm6sbsjhk0075125yaeol1nz1?lang=de&type=dsg"
                className="h-full w-full border-0"
                title="Terms of Service"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>

            {/* Fallback Content */}
            <div className="border-t border-gray-200 bg-gray-50 p-8 text-center">
              <div className="mx-auto max-w-md">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Terms Document
                </h3>
                <p className="mb-4 text-gray-600">
                  If the embedded terms are not loading, you can download our
                  complete Terms of Service and AGB document.
                </p>
                <a
                  href="/downloads/maxsoft-agb.pdf"
                  download
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Terms (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Contact Section */}
      <Container className="mt-16">
        <div className="rounded-2xl bg-gray-50 px-6 py-12 text-center">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Questions About Our Terms?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-600">
            If you have any questions about our Terms of Service or need
            clarification on any points, please don&apos;t hesitate to contact
            us.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:info@maxsoft.ch"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Contact Us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Visit Contact Page
            </a>
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  )
}
