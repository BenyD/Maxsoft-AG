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
  CpuChipIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  LightBulbIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Link } from './link'
import { Logo } from './logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from './plus-grid'

const links = [
  { href: '/#technologies', label: 'Technologien' },
  { href: '/#competencies', label: 'Kompetenzen' },
  { href: '/contact', label: 'Kontakt' },
]

function ServicesDropdown({
  serviceCategories,
}: {
  serviceCategories: ServiceCategory[]
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
      <MenuButton className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-hover:bg-black/2.5">
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

function CompanyDropdown() {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-hover:bg-black/2.5">
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
              href="/company#team"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Team
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/company#partners"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Partner
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
  return (
    <nav className="relative hidden lg:flex">
      {links.slice(0, 1).map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            href={href}
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-hover:bg-black/2.5"
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}

      <PlusGridItem className="relative flex">
        <ServicesDropdown serviceCategories={serviceCategories} />
      </PlusGridItem>

      <PlusGridItem className="relative flex">
        <CompanyDropdown />
      </PlusGridItem>

      {links.slice(1).map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            href={href}
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-hover:bg-black/2.5"
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}
    </nav>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-xl transition-all duration-200 hover:scale-105 lg:hidden"
      aria-label="Hauptmenü öffnen"
    >
      <Bars2Icon className="size-6 text-gray-700" />
    </DisclosureButton>
  )
}

function MobileNav({
  serviceCategories,
}: {
  serviceCategories: ServiceCategory[]
}) {
  return (
    <DisclosurePanel className="fixed inset-0 z-50 bg-white lg:hidden">
      {/* Header with close button */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-6">
        <Logo className="h-8 w-auto" />
        <DisclosureButton className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
          <XMarkIcon className="h-6 w-6" />
        </DisclosureButton>
      </div>

      {/* Navigation Content - Fixed height with proper scrolling */}
      <div className="h-[calc(100vh-88px)] overflow-y-auto px-6 py-8">
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
            {/* About Us Section */}
            {links.slice(0, 1).map(({ href, label }, linkIndex) => (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: linkIndex * 0.05,
                }}
                key={href}
              >
                <Link
                  href={href}
                  className="flex items-center rounded-2xl px-6 py-4 text-2xl font-bold text-gray-900 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <span className="text-blue-600">-</span>
                  </div>
                  {label}
                </Link>
              </motion.div>
            ))}

            {/* Services Section with Categories */}
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
              <Link
                href="/services"
                className="flex items-center rounded-2xl px-6 py-4 text-2xl font-bold text-gray-900 transition-all duration-300 hover:bg-purple-50 hover:text-purple-700"
              >
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                  <span className="text-purple-600">-</span>
                </div>
                Dienstleistungen
              </Link>

              {/* Service Categories Sub-links */}
              {serviceCategories && serviceCategories.length > 0 && (
                <div className="ml-8 space-y-3 border-l-2 border-gray-200 pl-6">
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
                </div>
              )}
            </motion.div>

            {/* Company Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1,
              }}
              className="space-y-4"
            >
              <Link
                href="/company"
                className="flex items-center rounded-2xl px-6 py-4 text-2xl font-bold text-gray-900 transition-all duration-300 hover:bg-green-50 hover:text-green-700"
              >
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                  <span className="text-green-600">-</span>
                </div>
                Unternehmen
              </Link>

              {/* Company Sub-links */}
              <div className="ml-8 space-y-3 border-l-2 border-gray-200 pl-6">
                <Link
                  href="/company#team"
                  className="flex items-center rounded-xl px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                    <span className="text-sm text-gray-500">•</span>
                  </div>
                  Team
                </Link>
                <Link
                  href="/company#partners"
                  className="flex items-center rounded-xl px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                    <span className="text-sm text-gray-500">•</span>
                  </div>
                  Partner
                </Link>
                <Link
                  href="/careers"
                  className="flex items-center rounded-xl px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                    <span className="text-sm text-gray-500">•</span>
                  </div>
                  Karriere
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
              </div>
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
  return (
    <Disclosure as="header" className="pt-12 sm:pt-16">
      <PlusGrid>
        <PlusGridRow className="relative flex items-center justify-between">
          <div className="relative flex items-center gap-6">
            <PlusGridItem className="-mt-2 px-3 py-3">
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
              <div className="relative hidden items-center py-1 lg:flex">
                {banner}
              </div>
            )}
          </div>
          <DesktopNav serviceCategories={serviceCategories} />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
      <MobileNav serviceCategories={serviceCategories} />
    </Disclosure>
  )
}
