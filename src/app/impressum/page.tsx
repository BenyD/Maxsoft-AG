import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { NavbarServer } from '@/components/navbar-server'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Notice - Maxsoft AG',
  description:
    'Legal notice and company information for Maxsoft AG, Swiss IT consulting company.',
}

export default function ImpressumPage() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <NavbarServer />
      </Container>

      <Container className="mt-16">
        <Heading as="h1">Legal Notice</Heading>
        <Lead className="mt-6 max-w-3xl">
          Legal information and company details in accordance with Swiss law and
          European regulations for transparency and legal compliance.
        </Lead>
      </Container>

      {/* Company Information */}
      <Container className="mt-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Main Company Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <Subheading>Company Information</Subheading>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Maxsoft AG
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      Birkenstrasse 49
                      <br />
                      6343 Rotkreuz
                      <br />
                      Switzerland
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium text-gray-900">
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <p className="flex items-center gap-3 text-gray-700">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href="mailto:info@maxsoft.ch"
                      className="hover:text-blue-600"
                    >
                      info@maxsoft.ch
                    </a>
                  </p>
                  <p className="flex items-center gap-3 text-gray-700">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a href="tel:+41415111166" className="hover:text-blue-600">
                      +41 41 511 11 66
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Representatives */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <Subheading>Authorized Representatives</Subheading>
            <div className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <svg
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Janar Thiyagarajah
                  </h4>
                  <p className="text-sm text-gray-600">Managing Director</p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Nisanth M. Rajah
                  </h4>
                  <p className="text-sm text-gray-600">Managing Director</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="mb-2 font-medium text-gray-900">
                  Commercial Register
                </h4>
                <p className="text-gray-700">
                  <span className="font-medium">UID:</span> CHE-396.015.553
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Legal Information */}
      <Container className="mt-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <Subheading>Legal Information</Subheading>
          <div className="prose prose-gray mt-6 max-w-none">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="mb-3 font-medium text-gray-900">
                  Liability Disclaimer
                </h4>
                <p className="text-sm leading-relaxed text-gray-700">
                  The information on this website has been compiled with care.
                  However, we cannot guarantee the accuracy, completeness, or
                  timeliness of the information. We reserve the right to make
                  changes to the content at any time.
                </p>
              </div>

              <div>
                <h4 className="mb-3 font-medium text-gray-900">Copyright</h4>
                <p className="text-sm leading-relaxed text-gray-700">
                  All content on this website, including text, images, graphics,
                  and code, is protected by copyright law. Reproduction or
                  distribution without written permission is prohibited.
                </p>
              </div>

              <div>
                <h4 className="mb-3 font-medium text-gray-900">
                  Data Protection
                </h4>
                <p className="text-sm leading-relaxed text-gray-700">
                  We take data protection seriously. Personal data is processed
                  in accordance with Swiss data protection law and the EU GDPR.
                  For details, see our Privacy Policy.
                </p>
              </div>

              <div>
                <h4 className="mb-3 font-medium text-gray-900">
                  Applicable Law
                </h4>
                <p className="text-sm leading-relaxed text-gray-700">
                  This website and all legal relationships arising from it are
                  subject to Swiss law. The place of jurisdiction is Rotkreuz,
                  Switzerland.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Contact CTA */}
      <Container className="mt-16">
        <div className="rounded-2xl bg-gray-50 px-6 py-12 text-center">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Questions or Legal Inquiries?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-600">
            For legal questions, business inquiries, or general information,
            please contact us using the information provided above.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:info@maxsoft.ch"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Email Us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Contact Page
            </a>
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  )
}
