import { Button } from '@/components/button'
import { ContactIcon } from '@/components/contact-icons'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import {
  getContactInfo,
  getExternalLinks,
  getOfficeLocations,
} from '@/sanity/queries'
import type { ContactInfo } from '@/sanity/types/contact'
import type { ExternalLink } from '@/sanity/types/externalLink'
import type { OfficeLocation } from '@/sanity/types/officeLocation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Maxsoft AG. Visit our offices in Switzerland or book a consultation online.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Get in touch</Heading>
      <Lead className="mt-6 max-w-3xl">
        Ready to transform your business with innovative IT solutions? Contact
        us today to discuss your needs and discover how we can help you achieve
        your technology goals.
      </Lead>
    </Container>
  )
}

async function ContactInfo() {
  const { data: contactInfo } = await getContactInfo()

  if (!contactInfo || contactInfo.length === 0) {
    return (
      <div className="mt-32 overflow-hidden">
        <Container className="pb-24">
          <Subheading>Contact Information</Subheading>
          <Heading as="h3" className="mt-2">
            Reach out to our team
          </Heading>
          <Lead className="mt-6 max-w-3xl">
            Contact information will be available soon. Please check back later.
          </Lead>
        </Container>
      </div>
    )
  }

  return (
    <div className="mt-32 overflow-hidden">
      <Container className="pb-24">
        <Subheading>Contact Information</Subheading>
        <Heading as="h3" className="mt-2">
          Reach out to our team
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Whether you prefer to visit us in person, call, or book online,
          we&apos;re here to help you navigate your technology journey.
        </Lead>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(contactInfo as ContactInfo[]).map(
            (contact: ContactInfo, index: number) => (
              <div
                key={contact._id || index}
                className="rounded-xl border border-gray-200 p-6 sm:col-span-2 sm:p-8 lg:col-span-1"
              >
                <ContactIcon
                  iconName={contact.icon}
                  className="h-8 w-8 text-[#01A2EE]"
                />
                <h4 className="mt-4 text-lg font-semibold">{contact.title}</h4>

                {contact.contactType === 'main-office' ||
                contact.contactType === 'regional-office' ? (
                  <p className="mt-2 text-sm/6 text-gray-600">
                    {contact.address}
                  </p>
                ) : contact.contactType === 'phone' ? (
                  <p className="mt-2 text-sm/6 text-gray-600">
                    {contact.phone}
                  </p>
                ) : contact.contactType === 'email' ? (
                  <p className="mt-2 text-sm/6 text-gray-600">
                    {contact.email}
                  </p>
                ) : null}

                {contact.description && (
                  <p className="mt-2 text-sm/6 text-gray-500">
                    {contact.description}
                  </p>
                )}
              </div>
            ),
          )}
        </div>
      </Container>
    </div>
  )
}

async function OfficeLocations() {
  const { data: officeLocations } = await getOfficeLocations()

  if (!officeLocations || officeLocations.length === 0) {
    return (
      <div className="overflow-hidden">
        <Container className="pb-24">
          <Subheading>Our Locations</Subheading>
          <Heading as="h3" className="mt-2">
            Visit our offices
          </Heading>
          <Lead className="mt-6 max-w-3xl">
            Office location information will be available soon. Please check
            back later.
          </Lead>
        </Container>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Subheading>Our Locations</Subheading>
        <Heading as="h3" className="mt-2">
          Visit our offices
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          We have offices in key locations across Switzerland to serve our
          clients better.
        </Lead>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {(officeLocations as OfficeLocation[]).map(
            (office: OfficeLocation, index: number) => (
              <div key={office._id || index} className="max-w-lg">
                <h4 className="text-lg font-semibold">{office.title}</h4>
                <p className="mt-2 text-sm/6 text-gray-600">
                  {office.address}
                  <br />
                  {office.city}, {office.country}
                  {office.description && (
                    <>
                      <br />
                      <span className="font-medium">{office.description}</span>
                    </>
                  )}
                </p>
              </div>
            ),
          )}
        </div>
      </Container>
    </div>
  )
}

async function MapSection() {
  const { data: officeLocations } = await getOfficeLocations()

  // Use the first active office location for the map, or fallback to default
  const mainOffice =
    officeLocations && officeLocations.length > 0
      ? (officeLocations as OfficeLocation[])[0]
      : null

  if (!mainOffice || !mainOffice.googleMapsEmbed) {
    return (
      <div className="overflow-hidden">
        <Container className="pb-24">
          <Subheading>Find Us</Subheading>
          <Heading as="h3" className="mt-2">
            Visit our main office
          </Heading>
          <Lead className="mt-6 max-w-3xl">
            Map integration will be available soon. Please check back later.
          </Lead>
        </Container>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Subheading>Find Us</Subheading>
        <Heading as="h3" className="mt-2">
          Visit our main office
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Located in the heart of {mainOffice.city}, our main office is easily
          accessible by public transport and car.
        </Lead>

        <div className="mt-16 overflow-hidden rounded-xl border border-gray-200">
          <iframe
            src={mainOffice.googleMapsEmbed}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${mainOffice.title} Location`}
            className="h-[300px] w-full sm:h-[400px] lg:h-[450px]"
          />
        </div>
      </Container>
    </div>
  )
}

async function BookingSection() {
  const { data: externalLinks } = await getExternalLinks()

  // Find the first active booking link
  const bookingLink =
    externalLinks && externalLinks.length > 0
      ? (externalLinks as ExternalLink[]).find(
          (link) => link.linkType === 'booking' && link.isActive,
        )
      : null

  if (!bookingLink) {
    return (
      <div className="overflow-hidden">
        <Container className="pb-24">
          <Subheading>Book a Consultation</Subheading>
          <Heading as="h3" className="mt-2">
            Schedule your free consultation
          </Heading>
          <Lead className="mt-6 max-w-3xl">
            Booking system will be available soon. Please check back later.
          </Lead>
        </Container>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Subheading>Book a Consultation</Subheading>
        <Heading as="h3" className="mt-2">
          Schedule your free consultation
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Ready to get started? Book a consultation with our experts to discuss
          your IT needs and discover tailored solutions for your business.
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
                'Use our integrated booking system to schedule a consultation at your convenience.'}
            </p>
            <div className="mt-6">
              <Button
                href={bookingLink.url}
                target="_blank"
                className="w-full sm:w-auto"
              >
                {bookingLink.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function Contact() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <ContactInfo />
      <OfficeLocations />
      <MapSection />
      <BookingSection />
      <Footer />
    </main>
  )
}
