'use client'

import type { ServiceCategory } from '@/sanity/types/serviceCategory'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Link } from './link'

interface MobileNavProps {
  serviceCategories: ServiceCategory[]
  isOpen: boolean
  onToggle: () => void
}

export function MobileNav({
  serviceCategories,
  isOpen,
  onToggle,
}: MobileNavProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  // Prevent body scroll when mobile nav is open
  React.useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.touchAction = 'none'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      document.documentElement.style.overflow = ''
      document.documentElement.style.touchAction = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      document.documentElement.style.overflow = ''
      document.documentElement.style.touchAction = ''
    }
  }, [isOpen])

  // Prevent all scroll events when mobile nav is open
  React.useEffect(() => {
    const preventScroll = (e: Event) => {
      if (isOpen) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    if (isOpen) {
      document.addEventListener('wheel', preventScroll, { passive: false })
      document.addEventListener('touchmove', preventScroll, { passive: false })
      document.addEventListener('keydown', (e) => {
        if (
          e.key === 'ArrowUp' ||
          e.key === 'ArrowDown' ||
          e.key === 'PageUp' ||
          e.key === 'PageDown' ||
          e.key === 'Home' ||
          e.key === 'End'
        ) {
          if (isOpen) {
            e.preventDefault()
            return false
          }
        }
      })
    }

    return () => {
      document.removeEventListener('wheel', preventScroll)
      document.removeEventListener('touchmove', preventScroll)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 top-20 right-0 bottom-0 left-0 z-[9999] bg-black/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onToggle}
    >
      {/* Navigation Container - Slides in from right */}
      <motion.div
        className="fixed top-20 right-0 bottom-0 left-0 border-l border-gray-200/50 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200,
        }}
        onClick={(e) => e.stopPropagation()}
        style={{
          overscrollBehavior: 'none',
          touchAction: 'pan-y',
        }}
      >
        {/* Navigation Content */}
        <div
          className="h-full overflow-y-auto overscroll-contain px-6 py-8 pb-32"
          style={{ overscrollBehavior: 'contain' }}
        >
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
                  <DisclosureButton
                    className={`flex w-full items-center justify-between rounded-2xl px-6 py-4 text-2xl font-bold transition-all duration-300 ${
                      isActive('/services')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-900 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`mr-4 flex h-8 w-8 items-center justify-center rounded-lg ${
                          isActive('/services') ? 'bg-blue-200' : 'bg-blue-100'
                        }`}
                      >
                        <span className="text-blue-600">-</span>
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
                        className={`flex items-center rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                          isActive('/services') &&
                          !serviceCategories.some((cat) =>
                            isActive(`/services/category/${cat.slug}`),
                          )
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <div
                          className={`mr-3 flex h-6 w-6 items-center justify-center rounded-md ${
                            isActive('/services') &&
                            !serviceCategories.some((cat) =>
                              isActive(`/services/category/${cat.slug}`),
                            )
                              ? 'bg-blue-200'
                              : 'bg-gray-100'
                          }`}
                        >
                          <span
                            className={`text-sm ${
                              isActive('/services') &&
                              !serviceCategories.some((cat) =>
                                isActive(`/services/category/${cat.slug}`),
                              )
                                ? 'text-blue-600'
                                : 'text-gray-500'
                            }`}
                          >
                            •
                          </span>
                        </div>
                        Alle Dienstleistungen
                      </Link>
                      {serviceCategories.map((category) => (
                        <Link
                          key={category._id}
                          href={`/services/category/${category.slug}`}
                          className={`flex items-center rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                            isActive(`/services/category/${category.slug}`)
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <div
                            className={`mr-3 flex h-6 w-6 items-center justify-center rounded-md ${
                              isActive(`/services/category/${category.slug}`)
                                ? 'bg-blue-200'
                                : 'bg-gray-100'
                            }`}
                          >
                            <span
                              className={`text-sm ${
                                isActive(`/services/category/${category.slug}`)
                                  ? 'text-blue-600'
                                  : 'text-gray-500'
                              }`}
                            >
                              •
                            </span>
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
                  className={`flex w-full items-center rounded-2xl px-6 py-4 text-2xl font-bold transition-all duration-300 ${
                    isActive('/competencies')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-900 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <div
                    className={`mr-4 flex h-8 w-8 items-center justify-center rounded-lg ${
                      isActive('/competencies') ? 'bg-blue-200' : 'bg-blue-100'
                    }`}
                  >
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
                  className={`flex w-full items-center rounded-2xl px-6 py-4 text-2xl font-bold transition-all duration-300 ${
                    isActive('/technologies')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-900 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <div
                    className={`mr-4 flex h-8 w-8 items-center justify-center rounded-lg ${
                      isActive('/technologies') ? 'bg-blue-200' : 'bg-blue-100'
                    }`}
                  >
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
                  <DisclosureButton
                    className={`flex w-full items-center justify-between rounded-2xl px-6 py-4 text-2xl font-bold transition-all duration-300 ${
                      isActive('/company') ||
                      isActive('/team') ||
                      isActive('/careers') ||
                      isActive('/partners') ||
                      isActive('/blog')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-900 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`mr-4 flex h-8 w-8 items-center justify-center rounded-lg ${
                          isActive('/company') ||
                          isActive('/team') ||
                          isActive('/careers') ||
                          isActive('/partners') ||
                          isActive('/blog')
                            ? 'bg-blue-200'
                            : 'bg-blue-100'
                        }`}
                      >
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
                      className={`flex items-center rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                        isActive('/company')
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div
                        className={`mr-3 flex h-6 w-6 items-center justify-center rounded-md ${
                          isActive('/company') ? 'bg-blue-200' : 'bg-gray-100'
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            isActive('/company')
                              ? 'text-blue-600'
                              : 'text-gray-500'
                          }`}
                        >
                          •
                        </span>
                      </div>
                      Über uns
                    </Link>
                    <Link
                      href="/team"
                      className={`flex items-center rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                        isActive('/team')
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div
                        className={`mr-3 flex h-6 w-6 items-center justify-center rounded-md ${
                          isActive('/team') ? 'bg-blue-200' : 'bg-gray-100'
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            isActive('/team')
                              ? 'text-blue-600'
                              : 'text-gray-500'
                          }`}
                        >
                          •
                        </span>
                      </div>
                      Team
                    </Link>
                    <Link
                      href="/careers"
                      className={`flex items-center rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                        isActive('/careers')
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div
                        className={`mr-3 flex h-6 w-6 items-center justify-center rounded-md ${
                          isActive('/careers') ? 'bg-blue-200' : 'bg-gray-100'
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            isActive('/careers')
                              ? 'text-blue-600'
                              : 'text-gray-500'
                          }`}
                        >
                          •
                        </span>
                      </div>
                      Karriere
                    </Link>
                    <Link
                      href="/partners"
                      className={`flex items-center rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                        isActive('/partners')
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div
                        className={`mr-3 flex h-6 w-6 items-center justify-center rounded-md ${
                          isActive('/partners') ? 'bg-blue-200' : 'bg-gray-100'
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            isActive('/partners')
                              ? 'text-blue-600'
                              : 'text-gray-500'
                          }`}
                        >
                          •
                        </span>
                      </div>
                      Partner
                    </Link>
                    <Link
                      href="/blog"
                      className={`flex items-center rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                        isActive('/blog')
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div
                        className={`mr-3 flex h-6 w-6 items-center justify-center rounded-md ${
                          isActive('/blog') ? 'bg-blue-200' : 'bg-gray-100'
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            isActive('/blog')
                              ? 'text-blue-600'
                              : 'text-gray-500'
                          }`}
                        >
                          •
                        </span>
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
                  className={`flex w-full items-center rounded-2xl px-6 py-4 text-2xl font-bold transition-all duration-300 ${
                    isActive('/contact')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-900 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <div
                    className={`mr-4 flex h-8 w-8 items-center justify-center rounded-lg ${
                      isActive('/contact') ? 'bg-blue-200' : 'bg-blue-100'
                    }`}
                  >
                    <span className="text-blue-600">-</span>
                  </div>
                  Kontakt
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fixed Footer */}
        <div className="fixed right-0 bottom-0 left-0 z-[10000] border-t border-gray-200/50 bg-white/95 px-6 py-4 backdrop-blur-md">
          {/* Contact Buttons */}
          <div className="mb-4 flex gap-3">
            <Link
              href="/contact"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Kontakt
            </Link>
            <Link
              href="/contact#beratung-buchen"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-200"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Termin buchen
            </Link>
          </div>

          {/* Separator */}
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200"></div>
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            © 2024 Maxsoft AG. Alle Rechte vorbehalten.
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
