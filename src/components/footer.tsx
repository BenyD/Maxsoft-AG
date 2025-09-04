import { PlusGrid, PlusGridItem, PlusGridRow } from '@/components/plus-grid'
import { Linkedin, Mail, Phone } from 'lucide-react'
import { Button } from './button'
import { Container } from './container'
import { Gradient } from './gradient'
import { Link } from './link'
import { Logo } from './logo'
import { Subheading } from './text'

function CallToAction() {
  return (
    <div className="relative pt-20 pb-16 text-center sm:py-24">
      <Subheading>Loslegen</Subheading>
      <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
        Starte noch heute deine digitale Reise mit Maxsoft.
      </p>
      <div className="mt-6">
        <Button className="w-full sm:w-auto" href="/contact#booking">
          Jetzt buchen
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
          <SitemapLink href="/team">Team</SitemapLink>
          <SitemapLink href="/partners">Partner</SitemapLink>
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
          <SitemapLink href="/technologies">Technologien</SitemapLink>
          <SitemapLink href="/competencies">Kompetenzen</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Rechtliches</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/terms">Datenschutz</SitemapLink>
          <SitemapLink href="/cookies">Cookie-Richtlinie</SitemapLink>
          <SitemapLink href="/impressum">Impressum</SitemapLink>
          <SitemapLink href="/downloads/maxsoft-agb.pdf" download>
            Download AGB
          </SitemapLink>
        </SitemapLinks>
      </div>
    </>
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
        <Linkedin className="size-4" />
      </Link>
      <Link
        href="tel:+41415111166"
        aria-label="Rufen Sie uns an"
        className="text-gray-950 data-hover:text-gray-950/75"
      >
        <Phone className="size-4" />
      </Link>
      <Link
        href="mailto:info@maxsoft.ch"
        aria-label="E-Mail an uns senden"
        className="text-gray-950 data-hover:text-gray-950/75"
      >
        <Mail className="size-4" />
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
                    <div className="mt-6 text-sm text-gray-600">
                      <div>Birkenstrasse 49</div>
                      <div>6343 Rotkreuz, Schweiz</div>
                      <div className="mt-4">
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
