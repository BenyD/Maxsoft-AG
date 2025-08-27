import { PlusGrid, PlusGridItem, PlusGridRow } from '@/components/plus-grid'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid'
import { Button } from './button'
import { Container } from './container'
import { Gradient } from './gradient'
import { Link } from './link'
import { Logo } from './logo'
import { Subheading } from './text'

function CallToAction() {
  return (
    <div className="relative pt-20 pb-16 text-center sm:py-24">
      <hgroup>
        <Subheading>Loslegen</Subheading>
        <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
          Bereit, Ihr Unternehmen zu transformieren?
          <br />
          Lassen Sie uns über Ihre IT-Bedürfnisse sprechen.
        </p>
      </hgroup>
      <p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500">
        Arbeiten Sie mit Maxsoft AG zusammen, um Ihr Geschäftspotenzial durch
        innovative Technologielösungen freizusetzen.
      </p>
      <div className="mt-6">
        <Button className="w-full sm:w-auto" href="/contact">
          Loslegen
        </Button>
      </div>
    </div>
  )
}

function SitemapHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm/6 font-medium text-gray-950/50">{children}</h3>
}

function SitemapLinks({ children }: { children: React.ReactNode }) {
  return <ul className="mt-6 space-y-4 text-sm/6">{children}</ul>
}

function SitemapLink(props: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <li>
      <Link
        {...props}
        className="font-medium text-gray-950 data-hover:text-gray-950/75"
      />
    </li>
  )
}

function Sitemap() {
  return (
    <>
      <div>
        <SitemapHeading>Unternehmen</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/company">Über uns</SitemapLink>
          <SitemapLink href="/careers">Karriere</SitemapLink>
          <SitemapLink href="/contact">Kontakt</SitemapLink>
          <SitemapLink href="/blog">Blog</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Dienstleistungen</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/services">Alle Dienstleistungen</SitemapLink>
          <SitemapLink href="/#branchen">Branchen</SitemapLink>
          <SitemapLink href="/#technologies">Technologien</SitemapLink>
          <SitemapLink href="/#competencies">Kompetenzen</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Rechtliches</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/terms">Datenschutz</SitemapLink>
          <SitemapLink href="/cookies">Cookie-Richtlinie</SitemapLink>
          <SitemapLink href="/impressum">Impressum</SitemapLink>
          <SitemapLink href="/downloads/maxsoft-agb.pdf" download>
            AGB herunterladen
          </SitemapLink>
        </SitemapLinks>
      </div>
    </>
  )
}

// LinkedIn icon component since it's not in Heroicons
function SocialIconLinkedIn(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function SocialLinks() {
  return (
    <>
      <Link
        href="https://linkedin.com/company/maxsoft-ag"
        target="_blank"
        aria-label="Besuchen Sie uns auf LinkedIn"
        className="text-gray-950 data-hover:text-gray-950/75"
      >
        <SocialIconLinkedIn className="size-4" />
      </Link>
      <Link
        href="tel:+41415111166"
        aria-label="Rufen Sie uns an"
        className="text-gray-950 data-hover:text-gray-950/75"
      >
        <PhoneIcon className="size-4" />
      </Link>
      <Link
        href="mailto:info@maxsoft.ch"
        aria-label="E-Mail an uns senden"
        className="text-gray-950 data-hover:text-gray-950/75"
      >
        <EnvelopeIcon className="size-4" />
      </Link>
    </>
  )
}

function Copyright() {
  return (
    <div className="text-sm/6 text-gray-950">
      &copy; {new Date().getFullYear()} Maxsoft AG. Alle Rechte vorbehalten.
    </div>
  )
}

export function Footer() {
  return (
    <footer>
      <Gradient className="relative">
        <div className="absolute inset-2 rounded-4xl bg-white/80" />
        <Container>
          <CallToAction />
          <PlusGrid className="pb-16">
            <PlusGridRow>
              <div className="grid grid-cols-2 gap-y-10 pb-6 lg:grid-cols-6 lg:gap-8">
                <div className="col-span-2 flex flex-col">
                  <PlusGridItem className="pt-6 lg:pb-6">
                    <Logo className="h-9" />
                    <div className="mt-6 space-y-2 text-sm text-gray-600">
                      <div>Birkenstrasse 49</div>
                      <div>6343 Rotkreuz, Schweiz</div>
                      <div className="mt-4 space-y-1">
                        <div>
                          <a
                            href="mailto:info@maxsoft.ch"
                            className="transition-colors hover:text-gray-900"
                          >
                            info@maxsoft.ch
                          </a>
                        </div>
                        <div>
                          <a
                            href="tel:+41415111166"
                            className="transition-colors hover:text-gray-900"
                          >
                            +41 41 511 11 66
                          </a>
                        </div>
                      </div>
                    </div>
                  </PlusGridItem>
                </div>
                <div className="col-span-2 grid grid-cols-3 gap-x-8 gap-y-12 lg:col-span-4 lg:grid-cols-subgrid lg:pt-6">
                  <Sitemap />
                </div>
              </div>
            </PlusGridRow>
            <PlusGridRow className="flex justify-between">
              <div>
                <PlusGridItem className="py-3">
                  <Copyright />
                </PlusGridItem>
              </div>
              <div className="flex">
                <PlusGridItem className="flex items-center gap-8 py-3">
                  <SocialLinks />
                </PlusGridItem>
              </div>
            </PlusGridRow>
          </PlusGrid>
        </Container>
      </Gradient>
    </footer>
  )
}
