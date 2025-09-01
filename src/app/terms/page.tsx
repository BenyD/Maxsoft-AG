import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'

import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - Maxsoft AG',
  description:
    'Datenschutzerklärung und Datenschutzrichtlinien für Maxsoft AG IT-Beratungsdienstleistungen.',
}

export default function TermsPage() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container className="mt-16">
        <Heading as="h1">Datenschutzerklärung</Heading>
        <Lead className="mt-6 max-w-3xl">
          Bitte überprüfen Sie unsere Datenschutzerklärung und
          Datenschutzrichtlinien unten. Diese Richtlinien regeln die
          Verarbeitung Ihrer personenbezogenen Daten und stellen den rechtlichen
          Rahmen für den Datenschutz dar.
        </Lead>
      </Container>

      {/* Terms Content */}
      <Container className="mt-16 mb-16">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Datenschutzerklärung
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Zuletzt aktualisiert:{' '}
              {new Date().toLocaleDateString('de-CH', {
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
                title="Datenschutzerklärung"
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
                  Datenschutzerklärung Dokument
                </h3>
                <p className="mb-4 text-gray-600">
                  Falls die eingebettete Datenschutzerklärung nicht geladen
                  wird, können Sie unser vollständiges Datenschutzdokument
                  herunterladen.
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
                  Datenschutzerklärung herunterladen (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  )
}
