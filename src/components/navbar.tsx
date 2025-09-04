'use client'

import { getIconComponent } from '@/lib/icon-mapping'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface ServiceCategory {
  _id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  order: number
}

interface NavbarProps {
  initialServiceCategories: ServiceCategory[]
}

import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PhoneIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'

const companyLinks = [
  { name: 'Über uns', href: '/company', icon: BuildingOfficeIcon },
  { name: 'Team', href: '/team', icon: UserGroupIcon },
  { name: 'Karriere', href: '/careers', icon: BriefcaseIcon },
  { name: 'Partner', href: '/partners', icon: GlobeAltIcon },
  { name: 'Blog', href: '/blog', icon: DocumentTextIcon },
]

const defaultServiceCategories = [
  {
    _id: 'default-1',
    name: 'IT-Beratung',
    slug: 'it-beratung',
    description: 'Professionelle Beratung für Ihre IT-Infrastruktur',
    icon: 'ComputerDesktopIcon',
    color: 'bg-blue-100 text-blue-800',
    order: 1,
  },
  {
    _id: 'default-2',
    name: 'Cloud-Lösungen',
    slug: 'cloud-loesungen',
    description: 'Moderne Cloud-Infrastruktur und Migration',
    icon: 'CloudIcon',
    color: 'bg-green-100 text-green-800',
    order: 2,
  },
  {
    _id: 'default-3',
    name: 'Cybersicherheit',
    slug: 'cybersicherheit',
    description: 'Umfassender Schutz für Ihre digitalen Assets',
    icon: 'ShieldCheckIcon',
    color: 'bg-red-100 text-red-800',
    order: 3,
  },
  {
    _id: 'default-4',
    name: 'Digitale Transformation',
    slug: 'digitale-transformation',
    description: 'Strategische Begleitung bei der digitalen Transformation',
    icon: 'RocketLaunchIcon',
    color: 'bg-purple-100 text-purple-800',
    order: 4,
  },
]

export default function Navbar({ initialServiceCategories }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const servicesButtonRef = useRef<HTMLButtonElement>(null)
  const companyButtonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  // Use Sanity categories if available, otherwise use defaults
  const serviceCategories =
    initialServiceCategories.length > 0
      ? initialServiceCategories
      : defaultServiceCategories

  // Check if current page is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // Close dropdowns by clicking the button
  const closeDropdown = (
    buttonRef: React.RefObject<HTMLButtonElement | null>,
  ) => {
    if (buttonRef.current) {
      buttonRef.current.click()
    }
  }

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Don't show navbar on studio pages
  if (pathname.startsWith('/studio')) {
    return null
  }

  return (
    <header className="sticky top-0 isolate z-50 bg-white/95 backdrop-blur-sm dark:bg-gray-900/95">
      {/* Scroll Progress Indicator */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-[#09A7ED] transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex items-center lg:flex-1">
          <Link href="/" className="group -mt-3 flex items-center p-1.5">
            <span className="sr-only">Maxsoft IT Solutions</span>
            <Image
              src="/logo.png"
              alt="Maxsoft IT Solutions"
              width={130}
              height={35}
              className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 transition-colors duration-200 hover:text-[#09A7ED] dark:text-gray-400 dark:hover:text-[#09A7ED]"
          >
            <span className="sr-only">Menü öffnen</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover>
            <PopoverButton
              ref={servicesButtonRef}
              className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 transition-colors duration-200 hover:text-[#09A7ED] dark:text-white dark:hover:text-[#09A7ED]"
            >
              Dienstleistungen
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400 dark:text-gray-500"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute inset-x-0 top-20 border border-gray-200 bg-white/95 backdrop-blur-sm transition-all duration-300 data-closed:-translate-y-2 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:border-gray-700 dark:bg-gray-900/95"
            >
              {/* Presentational element */}
              <div
                aria-hidden="true"
                className="absolute inset-0 top-1/2 bg-white/95 backdrop-blur-sm dark:bg-gray-900/95"
              />
              <div className="relative bg-white/95 backdrop-blur-sm dark:bg-gray-900/95">
                <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 gap-y-6 px-6 py-10 lg:px-8 xl:gap-x-8">
                  {serviceCategories.map((category) => {
                    const IconComponent = getIconComponent(category.icon)
                    return (
                      <div
                        key={category._id}
                        className="group relative rounded-lg border border-gray-200/50 bg-white p-6 text-sm/6 transition-all duration-300 hover:-translate-y-1 hover:border-[#09A7ED]/30 hover:bg-gray-50 dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:bg-white/5"
                      >
                        <div className="flex size-11 items-center justify-center rounded-lg bg-gray-50 transition-colors duration-300 group-hover:bg-[#09A7ED]/10 dark:bg-gray-700/50 dark:group-hover:bg-[#09A7ED]/20">
                          <IconComponent className="size-6 text-gray-600 transition-colors duration-300 group-hover:text-[#09A7ED] dark:text-gray-400 dark:group-hover:text-[#09A7ED]" />
                        </div>
                        <Link
                          href={`/services/category/${category.slug}`}
                          onClick={() => closeDropdown(servicesButtonRef)}
                          className={`mt-6 block font-semibold transition-colors duration-300 group-hover:text-[#09A7ED] ${
                            isActive(`/services/category/${category.slug}`)
                              ? 'text-[#09A7ED]'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {category.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          {category.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 divide-y divide-gray-900/5 border-y border-gray-900/5 dark:divide-white/5 dark:border-white/10">
                      <Link
                        href="/services"
                        onClick={() => closeDropdown(servicesButtonRef)}
                        className={`flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                          isActive('/services')
                            ? 'bg-[#09A7ED]/10 text-[#09A7ED]'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        Alle Services anzeigen
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </Popover>

          <Link
            href="/competencies"
            className={`text-sm/6 font-semibold transition-colors duration-200 ${
              isActive('/competencies')
                ? 'text-[#09A7ED]'
                : 'text-gray-900 hover:text-[#09A7ED] dark:text-white dark:hover:text-[#09A7ED]'
            }`}
          >
            Kompetenzen
          </Link>
          <Link
            href="/technologies"
            className={`text-sm/6 font-semibold transition-colors duration-200 ${
              isActive('/technologies')
                ? 'text-[#09A7ED]'
                : 'text-gray-900 hover:text-[#09A7ED] dark:text-white dark:hover:text-[#09A7ED]'
            }`}
          >
            Technologien
          </Link>
          <Popover>
            <PopoverButton
              ref={companyButtonRef}
              className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 transition-colors duration-200 hover:text-[#09A7ED] dark:text-white dark:hover:text-[#09A7ED]"
            >
              Unternehmen
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400 dark:text-gray-500"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute inset-x-0 top-20 border border-gray-200 bg-white/95 backdrop-blur-sm transition-all duration-300 data-closed:-translate-y-2 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:border-gray-700 dark:bg-gray-900/95"
            >
              {/* Presentational element */}
              <div
                aria-hidden="true"
                className="absolute inset-0 top-1/2 bg-white/95 backdrop-blur-sm dark:bg-gray-900/95"
              />
              <div className="relative bg-white/95 backdrop-blur-sm dark:bg-gray-900/95">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-4 gap-y-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:gap-x-8">
                  {companyLinks.map((item) => (
                    <div
                      key={item.name}
                      className="group relative rounded-lg border border-gray-200/50 bg-white p-6 text-sm/6 transition-all duration-300 hover:-translate-y-1 hover:border-[#09A7ED]/30 hover:bg-gray-50 dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:bg-white/5"
                    >
                      <div className="flex size-11 items-center justify-center rounded-lg bg-gray-50 transition-colors duration-300 group-hover:bg-[#09A7ED]/10 dark:bg-gray-700/50 dark:group-hover:bg-[#09A7ED]/20">
                        <item.icon className="size-6 text-gray-600 transition-colors duration-300 group-hover:text-[#09A7ED] dark:text-gray-400 dark:group-hover:text-[#09A7ED]" />
                      </div>
                      <Link
                        href={item.href}
                        onClick={() => closeDropdown(companyButtonRef)}
                        className={`mt-6 block font-semibold transition-colors duration-300 group-hover:text-[#09A7ED] ${
                          isActive(item.href)
                            ? 'text-[#09A7ED]'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        {item.name === 'Über uns' &&
                          'Erfahren Sie mehr über unser Unternehmen und unsere Mission'}
                        {item.name === 'Team' &&
                          'Lernen Sie unser erfahrenes Team kennen'}
                        {item.name === 'Karriere' &&
                          'Werden Sie Teil unseres Teams'}
                        {item.name === 'Partner' &&
                          'Unsere vertrauensvollen Geschäftspartner'}
                        {item.name === 'Blog' &&
                          'Aktuelle Nachrichten und Insights'}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 divide-y divide-gray-900/5 border-y border-gray-900/5 dark:divide-white/5 dark:border-white/10">
                      <Link
                        href="/company"
                        onClick={() => closeDropdown(companyButtonRef)}
                        className={`flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                          isActive('/company')
                            ? 'bg-[#09A7ED]/10 text-[#09A7ED]'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        Mehr über uns erfahren
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </Popover>
          <Link
            href="/contact"
            className={`text-sm/6 font-semibold transition-colors duration-200 ${
              isActive('/contact')
                ? 'text-[#09A7ED]'
                : 'text-gray-900 hover:text-[#09A7ED] dark:text-white dark:hover:text-[#09A7ED]'
            }`}
          >
            Kontakt
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact#beratung-buchen"
            className="rounded-full bg-[#09A7ED] px-6 py-2.5 text-sm/6 font-semibold text-white transition-all duration-200 hover:bg-[#08A0E0] hover:shadow-md"
          >
            Termin Buchen
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-300" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 shadow-xl transition-transform duration-300 ease-out sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="group -mt-3 flex items-center p-1.5">
              <span className="sr-only">Maxsoft IT Solutions</span>
              <Image
                src="/logo.png"
                alt="Maxsoft IT Solutions"
                width={130}
                height={35}
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 transition-colors duration-200 hover:text-[#09A7ED] dark:text-gray-400 dark:hover:text-[#09A7ED]"
            >
              <span className="sr-only">Menü schließen</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5">
                    Dienstleistungen
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none transition-transform duration-200 group-data-open:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {serviceCategories.map((category) => {
                      const IconComponent = getIconComponent(category.icon)
                      return (
                        <Link
                          key={category._id}
                          href={`/services/category/${category.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/5 ${
                            isActive(`/services/category/${category.slug}`)
                              ? 'bg-[#09A7ED]/10 text-[#09A7ED]'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent
                              className={`size-4 transition-colors duration-200 ${
                                isActive(`/services/category/${category.slug}`)
                                  ? 'text-[#09A7ED]'
                                  : 'text-gray-400 group-hover:text-[#09A7ED] dark:text-gray-500 dark:group-hover:text-[#09A7ED]'
                              }`}
                            />
                            {category.name}
                          </div>
                        </Link>
                      )
                    })}
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/5 ${
                        isActive('/services')
                          ? 'bg-[#09A7ED]/10 text-[#09A7ED]'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      Alle Services
                    </Link>
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  href="/competencies"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold transition-colors duration-200 ${
                    isActive('/competencies')
                      ? 'bg-[#09A7ED]/10 text-[#09A7ED]'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-[#09A7ED] dark:text-white dark:hover:bg-white/5 dark:hover:text-[#09A7ED]'
                  }`}
                >
                  Kompetenzen
                </Link>
                <Link
                  href="/technologies"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold transition-colors duration-200 ${
                    isActive('/technologies')
                      ? 'bg-[#09A7ED]/10 text-[#09A7ED]'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-[#09A7ED] dark:text-white dark:hover:bg-white/5 dark:hover:text-[#09A7ED]'
                  }`}
                >
                  Technologien
                </Link>
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5">
                    Unternehmen
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none transition-transform duration-200 group-data-open:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {companyLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/5 ${
                          isActive(item.href)
                            ? 'bg-[#09A7ED]/10 text-[#09A7ED]'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon
                            className={`size-4 transition-colors duration-200 ${
                              isActive(item.href)
                                ? 'text-[#09A7ED]'
                                : 'text-gray-400 group-hover:text-[#09A7ED] dark:text-gray-500 dark:group-hover:text-[#09A7ED]'
                            }`}
                          />
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold transition-colors duration-200 ${
                    isActive('/contact')
                      ? 'bg-[#09A7ED]/10 text-[#09A7ED]'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-[#09A7ED] dark:text-white dark:hover:bg-white/5 dark:hover:text-[#09A7ED]'
                  }`}
                >
                  Kontakt
                </Link>
              </div>
              <div className="space-y-2 py-6">
                <Link
                  href="/contact#beratung-buchen"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg bg-[#09A7ED] px-6 py-3 text-base/7 font-semibold text-white transition-all duration-200 hover:bg-[#08A0E0]"
                >
                  Termin Buchen
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Footer */}
          <div className="mt-8 border-t border-gray-200/50 pt-6 dark:border-gray-700/50">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-6">
                <Link
                  href="tel:+41415111166"
                  className="flex items-center space-x-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#09A7ED] dark:text-gray-400 dark:hover:text-[#09A7ED]"
                >
                  <PhoneIcon className="size-4" />
                  <span>+41 41 511 11 66</span>
                </Link>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  |
                </span>
                <Link
                  href="mailto:info@maxsoft.ch"
                  className="flex items-center space-x-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#09A7ED] dark:text-gray-400 dark:hover:text-[#09A7ED]"
                >
                  <EnvelopeIcon className="size-4" />
                  <span>info@maxsoft.ch</span>
                </Link>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} Maxsoft AG. Alle Rechte
                  vorbehalten.
                </p>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
