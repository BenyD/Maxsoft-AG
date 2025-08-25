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
import { Bars2Icon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import React from 'react'
import { Link } from './link'
import { Logo } from './logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from './plus-grid'
import { Icon } from './ui/icon'

const links = [
  { href: '/company', label: 'About Us' },
  { href: '/#technologies', label: 'Technologies' },
  { href: '/#competencies', label: 'Competencies' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
]

function ServicesDropdown({
  serviceCategories,
}: {
  serviceCategories: ServiceCategory[]
}) {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-hover:bg-black/2.5">
        Services
        <ChevronDownIcon className="ml-1 h-4 w-4" />
      </MenuButton>
      <MenuItems className="absolute left-0 z-50 mt-2 w-64 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="p-2">
          <MenuItem>
            <Link
              href="/services"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              All Services
            </Link>
          </MenuItem>
          {serviceCategories.length > 0 && (
            <React.Fragment key="service-categories">
              <div className="my-2 border-t border-gray-100" />
              {serviceCategories.map((category) => (
                <MenuItem key={category._id}>
                  <Link
                    href={`/services/category/${category.slug.current}`}
                    className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-6 w-6 rounded ${category.color} mr-3 flex items-center justify-center`}
                      >
                        <Icon
                          name={category.icon || ''}
                          className="h-4 w-4"
                          fallback={category.name.charAt(0)}
                        />
                      </div>
                      {category.name}
                    </div>
                  </Link>
                </MenuItem>
              ))}
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
      className="flex size-12 items-center justify-center self-center rounded-lg data-hover:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </DisclosureButton>
  )
}

function MobileNav({
  serviceCategories,
}: {
  serviceCategories: ServiceCategory[]
}) {
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {links.slice(0, 1).map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
              rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
            }}
            key={href}
          >
            <Link href={href} className="text-base font-medium text-gray-950">
              {label}
            </Link>
          </motion.div>
        ))}

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.15,
            ease: 'easeInOut',
            rotateX: { duration: 0.3, delay: 0.1 },
          }}
        >
          <div className="space-y-3">
            <Link
              href="/services"
              className="text-base font-medium text-gray-950"
            >
              Services
            </Link>
            {serviceCategories.length > 0 && (
              <div className="ml-4 space-y-2">
                {serviceCategories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/services/category/${category.slug.current}`}
                    className="block text-sm text-gray-600 hover:text-gray-900"
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-4 w-4 rounded ${category.color} mr-2 flex items-center justify-center`}
                      >
                        <Icon
                          name={category.icon || ''}
                          className="h-3 w-3"
                          fallback={category.name.charAt(0)}
                        />
                      </div>
                      {category.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {links.slice(1).map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
              rotateX: { duration: 0.3, delay: (linkIndex + 2) * 0.1 },
            }}
            key={href}
          >
            <Link href={href} className="text-base font-medium text-gray-950">
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-black/5" />
        <div className="absolute inset-x-0 top-2 border-t border-black/5" />
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
                          Latest Blog Post
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(
                            mostRecentPost.publishedAt || '',
                          ).toLocaleDateString('en-US', {
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
