'use client'

import type { Post } from '@/sanity/types'
import type { ServiceCategory } from '@/sanity/types/serviceCategory'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  ArrowRightIcon,
  Bars2Icon,
  BriefcaseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CpuChipIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  LightBulbIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Link } from './link'
import { Logo } from './logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from './plus-grid'

function ServicesDropdown({
  serviceCategories,
  isActive,
}: {
  serviceCategories: ServiceCategory[]
  isActive: (path: string) => boolean
}) {
  // Map icon names to Heroicon components
  const getIconComponent = (iconName: string) => {
    const iconMap: {
      [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>
    } = {
      UserGroupIcon: UserGroupIcon,
      WrenchScrewdriverIcon: WrenchScrewdriverIcon,
      CpuChipIcon: CpuChipIcon,
      LightBulbIcon: LightBulbIcon,
      BriefcaseIcon: BriefcaseIcon,
      EnvelopeIcon: EnvelopeIcon,
      DocumentTextIcon: DocumentTextIcon,
      ArrowRightIcon: ArrowRightIcon,
      Bars2Icon: Bars2Icon,
      ChevronDownIcon: ChevronDownIcon,
    }
    return iconMap[iconName] || UserGroupIcon
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton
        className={`flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply transition-colors hover:bg-black/2.5 hover:text-black ${
          isActive('/services') ? 'bg-black/5 text-black' : ''
        }`}
      >
        Dienstleistungen
        <ChevronDownIcon className="ml-1 h-4 w-4" />
      </MenuButton>
      <MenuItems className="absolute left-0 z-50 mt-2 w-64 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="p-2">
          <MenuItem>
            <Link
              href="/services"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Alle Dienstleistungen
            </Link>
          </MenuItem>

          {/* Service Categories - Always show if they exist */}
          {serviceCategories && serviceCategories.length > 0 && (
            <>
              <div className="my-2 border-t border-gray-100" />
              {serviceCategories.map((category) => {
                const IconComponent = getIconComponent(category.icon || '')
                return (
                  <MenuItem key={category._id}>
                    <Link
                      href={`/services/category/${category.slug}`}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-6 w-6 rounded ${category.color} mr-3 flex items-center justify-center`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        {category.name}
                      </div>
                    </Link>
                  </MenuItem>
                )
              })}
            </>
          )}

          {/* Fallback if no service categories */}
          {(!serviceCategories || serviceCategories.length === 0) && (
            <>
              <div className="my-2 border-t border-gray-100" />
              <div className="px-3 py-2 text-sm text-gray-500">
                Keine Kategorien verfügbar
              </div>
            </>
          )}
        </div>
      </MenuItems>
    </Menu>
  )
}

function CompanyDropdown({
  isActive,
}: {
  isActive: (path: string) => boolean
}) {
  return (
    <Menu as="div" className="relative">
      <MenuButton
        className={`flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply transition-colors hover:bg-black/2.5 hover:text-black ${
          isActive('/company') ||
          isActive('/team') ||
          isActive('/careers') ||
          isActive('/partners') ||
          isActive('/blog')
            ? 'bg-black/5 text-black'
            : ''
        }`}
      >
        Unternehmen
        <ChevronDownIcon className="ml-1 h-4 w-4" />
      </MenuButton>
      <MenuItems className="absolute left-0 z-50 mt-2 w-64 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="p-2">
          <MenuItem>
            <Link
              href="/company"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Über uns
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/team"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Team
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/careers"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Karriere
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/partners"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Partner
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/blog"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Blog
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}

function DesktopNav({
  serviceCategories,
}: {
  serviceCategories: ServiceCategory[]
}) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <nav className="3xl:flex relative mr-2 hidden items-center space-x-2 lg:flex xl:flex 2xl:flex">
      {/* Dienstleistungen (Services) */}
      <PlusGridItem className="relative flex">
        <ServicesDropdown
          serviceCategories={serviceCategories}
          isActive={isActive}
        />
      </PlusGridItem>

      {/* Kompetenzen */}
      <PlusGridItem className="relative flex">
        <Link
          href="/competencies"
          className={`flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply transition-colors hover:bg-black/2.5 hover:text-black ${
            isActive('/competencies') ? 'bg-black/5 text-black' : ''
          }`}
        >
          Kompetenzen
        </Link>
      </PlusGridItem>

      {/* Technologien */}
      <PlusGridItem className="relative flex">
        <Link
          href="/technologies"
          className={`flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply transition-colors hover:bg-black/2.5 hover:text-black ${
            isActive('/technologies') ? 'bg-black/5 text-black' : ''
          }`}
        >
          Technologien
        </Link>
      </PlusGridItem>

      {/* Unternehmen */}
      <PlusGridItem className="relative flex">
        <CompanyDropdown isActive={isActive} />
      </PlusGridItem>

      {/* Kontakt */}
      <PlusGridItem className="relative flex">
        <Link
          href="/contact"
          className={`flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply transition-colors hover:bg-black/2.5 hover:text-black ${
            isActive('/contact') ? 'bg-black/5 text-black' : ''
          }`}
        >
          Kontakt
        </Link>
      </PlusGridItem>
    </nav>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-xl transition-all duration-200 hover:scale-105"
      aria-label="Hauptmenü öffnen"
    >
      <Bars2Icon className="size-6 text-gray-700" />
    </DisclosureButton>
  )
}

function MobileNav({
  serviceCategories,
  scrollProgress,
}: {
  serviceCategories: ServiceCategory[]
  scrollProgress: number
}) {
  // Note: Scroll locking is handled by the parent Disclosure component
  // This component only renders when mobile nav is open

  return (
    <DisclosurePanel className="fixed inset-0 top-0 right-0 bottom-0 left-0 isolate z-[9999] transform-none bg-white shadow-2xl will-change-transform">
      {/* Header with close button */}
      <div className="relative flex items-center justify-between border-b border-gray-200 bg-white px-6 py-6">
        {/* Mobile Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-500 shadow-sm transition-all duration-500 ease-in-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <Link href="/" title="Home" className="flex items-center">
          <Logo className="h-8 w-auto transition-transform hover:scale-105" />
        </Link>
        <DisclosureButton className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
          <XMarkIcon className="h-6 w-6" />
        </DisclosureButton>
      </div>

      {/* Navigation Content - Fixed height with proper scrolling */}
      <div className="h-[calc(100vh-88px)] touch-pan-y overflow-y-auto overscroll-contain bg-white px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {/* Dienstleistungen (Services) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.05,
              }}
              className="space-y-4"
            >
              <Disclosure as="div" className="space-y-4">
                <DisclosureButton className="flex w-full items-center justify-between rounded-2xl px-6 py-4 text-2xl font-bold text-gray-900 transition-all duration-300 hover:bg-purple-50 hover:text-purple-700">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                      <span className="text-purple-600">-</span>
                    </div>
                    Dienstleistungen
                  </div>
                  <ChevronDownIcon className="ui-open:hidden h-6 w-6 transition-all duration-300 ease-in-out" />
                  <ChevronUpIcon className="ui-open:block hidden h-6 w-6 transition-all duration-300 ease-in-out" />
                </DisclosureButton>

                {/* Service Categories Sub-links */}
                {serviceCategories && serviceCategories.length > 0 && (
                  <DisclosurePanel className="ml-8 space-y-3 border-l-2 border-gray-200 pl-6 transition-all duration-300 ease-in-out">
                    <Link
                      href="/services"
                      className="flex items-center rounded-xl px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                        <span className="text-sm text-gray-500">•</span>
                      </div>
                      Alle Dienstleistungen
                    </Link>
                    {serviceCategories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/services/category/${category.slug}`}
                        className="flex items-center rounded-xl px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
                      >
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                          <span className="text-sm text-gray-500">•</span>
                        </div>
                        {category.name}
                      </Link>
                    ))}
                  </DisclosurePanel>
                )}
              </Disclosure>
            </motion.div>

            {/* Kompetenzen */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1,
              }}
            >
              <Link
                href="/competencies"
                className="flex w-full items-center rounded-2xl px-6 py-4 text-2xl font-bold text-gray-900 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700"
              >
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <span className="text-blue-600">-</span>
                </div>
                Kompetenzen
              </Link>
            </motion.div>

            {/* Technologien */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.15,
              }}
            >
              <Link
                href="/technologies"
                className="flex w-full items-center rounded-2xl px-6 py-4 text-2xl font-bold text-gray-900 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700"
              >
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <span className="text-blue-600">-</span>
                </div>
                Technologien
              </Link>
            </motion.div>

            {/* Unternehmen */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2,
              }}
              className="space-y-4"
            >
              <Disclosure as="div" className="space-y-4">
                <DisclosureButton className="flex w-full items-center justify-between rounded-2xl px-6 py-4 text-2xl font-bold text-gray-900 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                      <span className="text-blue-600">-</span>
                    </div>
                    Unternehmen
                  </div>
                  <ChevronDownIcon className="ui-open:hidden h-6 w-6 transition-all duration-300 ease-in-out" />
                  <ChevronUpIcon className="ui-open:block hidden h-6 w-6 transition-all duration-300 ease-in-out" />
                </DisclosureButton>

                {/* Company Sub-links */}
                <DisclosurePanel className="ml-8 space-y-3 border-l-2 border-gray-200 pl-6 transition-all duration-300 ease-in-out">
                  <Link
                    href="/company"
                    className="flex items-center rounded-xl px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                      <span className="text-sm text-gray-500">•</span>
                    </div>
                    Über uns
                  </Link>
                  <Link
                    href="/team"
                    className="flex items-center rounded-xl px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                      <span className="text-sm text-gray-500">•</span>
                    </div>
                    Team
                  </Link>
                  <Link
                    href="/careers"
                    className="flex items-center rounded-xl px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                      <span className="text-sm text-gray-500">•</span>
                    </div>
                    Karriere
                  </Link>
                  <Link
                    href="/partners"
                    className="flex items-center rounded-xl px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                      <span className="text-sm text-gray-500">•</span>
                    </div>
                    Partner
                  </Link>
                  <Link
                    href="/blog"
                    className="flex items-center rounded-xl px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                      <span className="text-sm text-gray-500">•</span>
                    </div>
                    Blog
                  </Link>
                </DisclosurePanel>
              </Disclosure>
            </motion.div>

            {/* Kontakt */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.25,
              }}
            >
              <Link
                href="/contact"
                className="flex w-full items-center rounded-2xl px-6 py-4 text-2xl font-bold text-gray-900 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700"
              >
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <span className="text-blue-600">-</span>
                </div>
                Kontakt
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Section with Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.15,
          }}
          className="mt-16 border-t border-gray-200 pt-8"
        >
          <div className="space-y-6 text-center">
            <div>
              <p className="mb-4 text-lg font-medium text-gray-700">
                Brauchen Sie Hilfe? Kontaktieren Sie uns
              </p>
              <Link
                href="/contact"
                className="inline-block rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
              >
                Kontakt aufnehmen
              </Link>
            </div>

            {/* Company Info */}
            <div className="space-y-2 text-sm text-gray-500">
              <p>Maxsoft AG</p>
              <p>Birkenstrasse 49, 6343 Rotkreuz</p>
              <p>Schweiz</p>
              <p>+41 41 5111166</p>
            </div>
          </div>
        </motion.div>
      </div>
    </DisclosurePanel>
  )
}

export function Navbar({
  banner,
  serviceCategories = [],
  mostRecentPost,
}: {
  banner?: React.ReactNode
  serviceCategories?: ServiceCategory[]
  mostRecentPost?: Post
}) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [scrollProgress, setScrollProgress] = React.useState(0)

  // Global effect to handle dropdown scrollbar issues in Edge browser
  React.useEffect(() => {
    const handleDropdownStateChange = () => {
      // Check if any dropdown is open by looking for Menu components with open state
      const openDropdowns = document.querySelectorAll(
        '[data-headlessui-state="open"]',
      )

      // Check if we're in Edge browser (including Chromium-based Edge)
      const isEdge =
        navigator.userAgent.includes('Edge') ||
        navigator.userAgent.includes('Edg') ||
        navigator.userAgent.includes('MSIE') ||
        navigator.userAgent.includes('Trident/')

      if (openDropdowns.length > 0) {
        if (!isEdge) {
          // Only add dropdown-open class for non-Edge browsers
          document.body.classList.add('dropdown-open')
        }
      } else {
        document.body.classList.remove('dropdown-open')
      }
    }

    // Use MutationObserver to watch for dropdown state changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-headlessui-state'
        ) {
          handleDropdownStateChange()
        }
      })
    })

    // Observe the entire document for attribute changes
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-headlessui-state'],
      subtree: true,
    })

    return () => {
      observer.disconnect()
      document.body.classList.remove('dropdown-open')
    }
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      setIsScrolled(scrollTop > 10)
      setScrollProgress(Math.min(scrollPercent, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile nav is open using MutationObserver
  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-state'
        ) {
          const mobileNav = document.querySelector('[data-state="open"]')
          if (mobileNav) {
            document.body.style.overflow = 'hidden'
          } else {
            document.body.style.overflow = ''
          }
        }
      })
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-state'],
      subtree: true,
    })

    return () => {
      observer.disconnect()
      document.body.style.overflow = ''
      document.body.classList.remove('dropdown-open')
    }
  }, [])

  // Cleanup effect when component unmounts
  React.useEffect(() => {
    return () => {
      document.body.classList.remove('dropdown-open')
    }
  }, [])

  return (
    <Disclosure
      as="header"
      className={`fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b border-gray-200/50 bg-white/90 backdrop-blur-lg'
          : 'bg-transparent'
      }`}
    >
      {/* Progress Bar - Only for Mobile */}
      <div className="3xl:hidden lg:hidden xl:hidden 2xl:hidden">
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-500 shadow-sm transition-all duration-500 ease-in-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-6'
        }`}
      >
        {/* Centered container with max-width and horizontal spacing */}
        <div className="mx-auto max-w-6xl px-4 sm:px-4 lg:px-4 xl:px-6 2xl:px-8">
          <PlusGrid>
            <PlusGridRow className="relative flex items-center justify-between !pt-0 !pb-0">
              <div className="relative flex items-center gap-6">
                <PlusGridItem className="-mt-2 px-1 py-2">
                  <Menu as="div" className="relative">
                    <MenuButton className="group flex items-center">
                      <Link href="/" title="Home" className="flex items-center">
                        <Logo className="h-7 w-auto transition-transform group-hover:scale-105" />
                      </Link>
                    </MenuButton>
                    {mostRecentPost && (
                      <MenuItems className="absolute left-0 z-50 mt-2 w-80 origin-top-left rounded-lg border border-gray-100 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="p-4">
                          <div className="mb-3">
                            <h3 className="text-sm font-medium text-gray-900">
                              Neuester Blog-Beitrag
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                              {new Date(
                                mostRecentPost.publishedAt || '',
                              ).toLocaleDateString('de-CH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <MenuItem>
                            <Link
                              href={`/blog/${mostRecentPost.slug?.current}`}
                              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-blue-600"
                            >
                              {mostRecentPost.title}
                            </Link>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    )}
                  </Menu>
                </PlusGridItem>
                {banner && (
                  <div className="3xl:flex relative hidden items-center py-1 lg:flex xl:flex 2xl:flex">
                    {banner}
                  </div>
                )}
              </div>
              <DesktopNav serviceCategories={serviceCategories} />
              {/* Mobile Nav Button - Only render on mobile/tablet */}
              <div className="3xl:hidden lg:hidden xl:hidden 2xl:hidden">
                <MobileNavButton />
              </div>
            </PlusGridRow>
          </PlusGrid>
          {/* Mobile Navigation - Only render on mobile/tablet */}
          <div className="3xl:hidden lg:hidden xl:hidden 2xl:hidden">
            <MobileNav
              serviceCategories={serviceCategories}
              scrollProgress={scrollProgress}
            />
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
