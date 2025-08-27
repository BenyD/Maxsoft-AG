import { Button } from '@/components/button'
import { ContactForm } from '@/components/contact-form'
import { ContactIcon } from '@/components/contact-icons'
import { Container } from '@/components/container'
import { EmbeddedContent } from '@/components/embedded-content'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import {
  getContactInfo,
  getExternalLinks,
  getServiceCategories,
} from '@/sanity/queries'
import type { Contact } from '@/sanity/types/contact'
import type { ExternalLink } from '@/sanity/types/externalLink'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt - Maxsoft AG',
  description:
    'Kontaktieren Sie Maxsoft AG für maßgeschneiderte IT-Lösungen. Unser Team von Experten steht bereit, um Ihre IT-Herausforderungen zu besprechen und innovative Lösungen anzubieten.',
}

export default async function ContactPage() {
  const [contactInfo, serviceCategories] = await Promise.all([
    getContactInfo(),
    getServiceCategories(),
  ])

  if (!contactInfo) {
    return (
      <div className="overflow-hidden">
        <GradientBackground />
        <Navbar />
        <main>
          <Container className="pb-24">
            <Subheading>Kontaktinformationen</Subheading>
            <Heading as="h3" className="mt-2">
              Bürodetails
            </Heading>
            <Lead className="mt-6 max-w-3xl">
              Kontaktinformationen werden bald verfügbar sein. Bitte schauen Sie später wieder vorbei.
            </Lead>
          </Container>
        </main>
        <Footer />
      </div>
    )
  }

  // Get the main contact info (first active one)
  const mainContact = contactInfo.data as Contact

  return (
    <div className="overflow-hidden">
      <GradientBackground />
      <Navbar />
      <main>
        <ContactHero />
        <ContactForm serviceCategories={serviceCategories.data || []} />
        <ContactInformation mainContact={mainContact} />
        <BookingSection />
        <ExternalLinksSection />
      </main>
      <Footer />
    </div>
  )
}

async function ContactHero() {
  return (
    <div className="overflow-hidden">
      <Container className="pt-16 pb-16">
        <div className="max-w-3xl">
          <Subheading>Kontakt</Subheading>
          <Heading as="h1" className="mt-2">
            Kontaktieren Sie unser Team
          </Heading>
          <Lead className="mt-6">
            Bereit, Ihr Unternehmen mit modernsten IT-Lösungen zu transformieren?
            Kontaktieren Sie uns heute, um Ihre Bedürfnisse zu besprechen und zu entdecken, wie wir Ihnen helfen können,
            Ihre Ziele zu erreichen.
          </Lead>
        </div>
      </Container>
    </div>
  )
}

async function ContactInformation({ mainContact }: { mainContact: Contact }) {
  const hasContactInfo = mainContact.phone || mainContact.email
  const hasAddress =
    mainContact.address &&
    (mainContact.address.streetLine1 ||
      mainContact.address.city ||
      mainContact.address.canton)
  const hasOpeningHours =
    mainContact.openingHours && mainContact.openingHours.length > 0
  const hasMap = mainContact.googleMapsEmbed

  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Subheading>Kontaktinformationen</Subheading>
        <Heading as="h3" className="mt-2">
          Besuchen Sie unser Büro
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          {mainContact.address?.city
            ? `Im Herzen von ${mainContact.address.city} gelegen, ist unser Büro leicht mit öffentlichen Verkehrsmitteln und dem Auto erreichbar.`
            : 'Unser Büro ist leicht mit öffentlichen Verkehrsmitteln und dem Auto erreichbar.'}
        </Lead>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Details */}
          <div className="space-y-8">
            {/* Company Header */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900">
                {mainContact.companyName}
              </h4>
              {mainContact.officeTitle && (
                <p className="mt-2 text-lg text-gray-600">
                  {mainContact.officeTitle}
                </p>
              )}
              {mainContact.description && (
                <p className="mt-4 text-gray-600">{mainContact.description}</p>
              )}
            </div>

            {/* Address Section */}
            {hasAddress && (
              <div>
                <div className="flex items-start space-x-3">
                  <ContactIcon
                    iconName="MapPinIcon"
                    className="mt-1 h-5 w-5 text-[#01A2EE]"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <div className="mt-1 space-y-1 text-gray-600">
                      {mainContact.address?.streetLine1 && (
                        <p>{mainContact.address.streetLine1}</p>
                      )}
                      {mainContact.address?.streetLine2 && (
                        <p>{mainContact.address.streetLine2}</p>
                      )}
                      {mainContact.address?.doorNumber && (
                        <p>{mainContact.address.doorNumber}</p>
                      )}
                      <p>
                        {[
                          mainContact.address?.postalCode,
                          mainContact.address?.city,
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      </p>
                      {mainContact.address?.canton && (
                        <p>{mainContact.address.canton}</p>
                      )}
                      {mainContact.address?.country && (
                        <p className="font-medium text-gray-900">
                          {mainContact.address.country}
                        </p>
                      )}
                    </div>
                    {mainContact.googleMapsDirections && (
                      <div className="mt-4">
                        <Button
                          href={mainContact.googleMapsDirections}
                          target="_blank"
                          className="w-full sm:w-auto"
                        >
                          Route abrufen
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Contact Methods */}
            {hasContactInfo && (
              <div>
                <div className="flex items-start space-x-3">
                  <ContactIcon
                    iconName="PhoneIcon"
                    className="mt-1 h-5 w-5 text-[#01A2EE]"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Telefon</p>
                    <p className="text-gray-600">{mainContact.phone}</p>
                  </div>
                </div>
                {mainContact.email && (
                  <div className="mt-4 flex items-start space-x-3">
                    <ContactIcon
                      iconName="EnvelopeIcon"
                      className="mt-1 h-5 w-5 text-[#01A2EE]"
                    />
                    <div>
                      <p className="font-medium text-gray-900">E-Mail</p>
                      <p className="text-gray-600">{mainContact.email}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Opening Hours */}
            {hasOpeningHours && (
              <div>
                <h5 className="mb-3 font-medium text-gray-900">
                  Öffnungszeiten
                </h5>
                <div className="space-y-2">
                  {mainContact.openingHours?.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-600">
                        {schedule.day}
                      </span>
                      <span
                        className={`text-sm ${schedule.isOpen ? 'text-gray-900' : 'text-red-600'}`}
                      >
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div>
            {hasMap ? (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <div className="mb-4 flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                      <ContactIcon
                        iconName="MapPinIcon"
                        className="h-5 w-5 text-red-600"
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-lg font-semibold text-gray-900">
                      Finden Sie uns
                    </h5>
                    <p className="mt-1 text-sm text-gray-600">
                      Interaktive Karte mit unserem Standort
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <iframe
                    src={mainContact.googleMapsEmbed}
                    className="h-80 w-full rounded-lg border border-gray-200"
                    title={`Karte mit dem Standort von ${mainContact.companyName}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <div className="flex h-80 items-center justify-center">
                  <div className="text-center">
                    <ContactIcon
                      iconName="MapPinIcon"
                      className="mx-auto h-12 w-12 text-gray-400"
                    />
                    <p className="mt-2 text-gray-500">Karte nicht verfügbar</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

async function BookingSection() {
  const result = await getExternalLinks()
  const externalLinks = 'error' in result ? [] : result.data

  // Find the first active booking link
  const bookingLink = externalLinks.find(
    (link: ExternalLink) => link.linkType === 'booking',
  )

  if (!bookingLink) {
    return (
      <div className="overflow-hidden">
        <Container className="pb-24">
          <Subheading>Beratung buchen</Subheading>
          <Heading as="h3" className="mt-2">
            Ihre kostenlose Beratung planen
          </Heading>
          <Lead className="mt-6 max-w-3xl">
            {externalLinks && externalLinks.length > 0 ? (
              <>
                Keine aktiven Buchungslinks gefunden. Bitte überprüfen Sie Ihr Sanity CMS, um sicherzustellen, dass mindestens ein Buchungslink als aktiv markiert ist.
              </>
            ) : (
              'Keine externen Links gefunden. Bitte überprüfen Sie Ihre Sanity CMS-Konfiguration.'
            )}
          </Lead>
        </Container>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Subheading>Beratung buchen</Subheading>
        <Heading as="h3" className="mt-2">
          Ihre kostenlose Beratung planen
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Bereit loszulegen? Buchen Sie eine Beratung mit unseren Experten, um Ihre
          IT-Bedürfnisse zu besprechen und maßgeschneiderte Lösungen für Ihr Unternehmen zu entdecken.
        </Lead>

        <div className="mt-16 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <div className="text-center">
            <ContactIcon
              iconName={bookingLink.icon}
              className="mx-auto h-12 w-12 text-[#01A2EE]"
            />
            <h4 className="mt-4 text-xl font-semibold">{bookingLink.title}</h4>
            <p className="mt-2 text-sm/6 text-gray-600">
              {bookingLink.description ||
                'Nutzen Sie unser integriertes Buchungssystem, um eine Beratung nach Ihren Wünschen zu planen.'}
            </p>

            {bookingLink.embedContent ? (
              <div className="mt-6">
                <EmbeddedContent link={bookingLink} />
              </div>
            ) : (
              <div className="mt-6">
                <Button
                  href={bookingLink.url}
                  target="_blank"
                  className="w-full sm:w-auto"
                >
                  {bookingLink.buttonText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

async function ExternalLinksSection() {
  const result = await getExternalLinks()
  const externalLinks = 'error' in result ? [] : result.data

  // Filter out booking links since they're handled separately
  const nonBookingLinks = externalLinks.filter(
    (link: ExternalLink) => link.linkType !== 'booking',
  )

  if (!nonBookingLinks || nonBookingLinks.length === 0) {
    return null // Don't show this section if there are no non-booking links
  }

  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Subheading>Zusätzliche Dienstleistungen</Subheading>
        <Heading as="h3" className="mt-2">
          Greifen Sie auf unsere Plattformen zu
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Verbinden Sie sich direkt von dieser Seite aus mit unseren verschiedenen
          Dienstleistungen und Plattformen.
        </Lead>

        <div className="mt-16 space-y-8">
          {nonBookingLinks.map((link: ExternalLink) => (
            <div
              key={link._id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8"
            >
              <div className="text-center">
                <ContactIcon
                  iconName={link.icon}
                  className="mx-auto h-12 w-12 text-[#01A2EE]"
                />
                <h4 className="mt-4 text-xl font-semibold">{link.title}</h4>
                <p className="mt-2 text-sm/6 text-gray-600">
                  {link.description ||
                    'Greifen Sie direkt von unserer Website aus auf diesen Dienst zu.'}
                </p>

                {link.embedContent ? (
                  <div className="mt-6">
                    <EmbeddedContent link={link} />
                  </div>
                ) : (
                  <div className="mt-6">
                    <Button
                      href={link.url}
                      target="_blank"
                      className="w-full sm:w-auto"
                    >
                      {link.buttonText}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
