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
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import React from 'react'
import { Link } from './link'
import { Logo } from './logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from './plus-grid'

const links = [
  { href: '/company', label: 'Über uns' },
  { href: '/#technologies', label: 'Technologien' },
  { href: '/#competencies', label: 'Kompetenzen' },
  { href: '/careers', label: 'Karriere' },
  { href: '/contact', label: 'Kontakt' },
  { href: '/blog', label: 'Blog' },
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
          {serviceCategories.length > 0 && (
            <React.Fragment key="service-categories">
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
            </React.Fragment>
          )}
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
      className="flex size-12 items-center justify-center self-center rounded-xl bg-gray-50 transition-all duration-200 hover:scale-105 data-hover:bg-gray-100 lg:hidden"
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
    <DisclosurePanel className="lg:hidden">
      <div className="mx-4 rounded-2xl border border-gray-200 bg-white shadow-lg">
        <div className="flex flex-col gap-1 p-4">
          {/* About Us Section */}
          {links.slice(0, 1).map(({ href, label }, linkIndex) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
                delay: linkIndex * 0.1,
              }}
              key={href}
            >
              <Link
                href={href}
                className="group flex items-center rounded-xl px-4 py-3 text-base font-semibold text-gray-900 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-200">
                  <UserGroupIcon className="h-4 w-4 text-blue-600" />
                </div>
                {label}
              </Link>
            </motion.div>
          ))}

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
              delay: 0.1,
            }}
          >
            <div className="space-y-1">
              <Link
                href="/services"
                className="group flex items-center rounded-xl px-4 py-3 text-base font-semibold text-gray-900 transition-all duration-200 hover:bg-purple-50 hover:text-purple-700"
              >
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 transition-colors group-hover:bg-purple-200">
                  <WrenchScrewdriverIcon className="h-4 w-4 text-purple-600" />
                </div>
                Services
              </Link>
              {serviceCategories.length > 0 && (
                <div className="ml-8 space-y-1">
                  {serviceCategories.map((category, index) => {
                    const IconComponent = getIconComponent(category.icon || '')
                    return (
                      <motion.div
                        key={category._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: 'easeOut',
                          delay: 0.15 + index * 0.05,
                        }}
                      >
                        <Link
                          href={`/services/category/${category.slug}`}
                          className="group flex items-center rounded-lg px-4 py-2 text-sm text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                        >
                          <div
                            className={`h-3 w-3 rounded-full ${category.color} mr-3 flex items-center justify-center transition-transform group-hover:scale-110`}
                          >
                            <IconComponent className="h-2 w-2" />
                          </div>
                          {category.name}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>

          {/* Other Navigation Links */}
          {links.slice(1).map(({ href, label }, linkIndex) => {
            const icons = {
              '/#technologies': CpuChipIcon,
              '/#competencies': LightBulbIcon,
              '/careers': BriefcaseIcon,
              '/contact': EnvelopeIcon,
              '/blog': DocumentTextIcon,
            }
            const IconComponent =
              icons[href as keyof typeof icons] || ArrowRightIcon
            const colors = {
              '/#technologies': 'bg-green-100 text-green-600',
              '/#competencies': 'bg-yellow-100 text-yellow-600',
              '/careers': 'bg-orange-100 text-orange-600',
              '/contact': 'bg-blue-100 text-blue-600',
              '/blog': 'bg-indigo-100 text-indigo-600',
            }
            const colorClass =
              colors[href as keyof typeof colors] || 'bg-gray-100 text-gray-600'

            return (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  ease: 'easeOut',
                  delay: (linkIndex + 2) * 0.1,
                }}
                key={href}
              >
                <Link
                  href={href}
                  className="group flex items-center rounded-xl px-4 py-3 text-base font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-50"
                >
                  <div
                    className={`h-8 w-8 rounded-lg ${colorClass} mr-3 flex items-center justify-center transition-transform group-hover:scale-110`}
                  >
                    <IconComponent className="h-4 w-4" />
                  </div>
                  {label}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Section with Contact Info */}
        <div className="border-t border-gray-100 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
              delay: 0.4,
            }}
            className="text-center"
          >
            <p className="mb-2 text-sm text-gray-500">
              Brauchen Sie Hilfe? Kontaktieren Sie uns
            </p>
            <a
              href="mailto:info@maxsoft.ch"
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <EnvelopeIcon className="mr-2 h-4 w-4" />
              Kontakt aufnehmen
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-gray-200" />
        <div className="absolute inset-x-0 top-2 border-t border-gray-200" />
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
