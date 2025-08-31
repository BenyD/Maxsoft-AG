'use client'

import type { Post } from '@/sanity/types'
import type { ServiceCategory } from '@/sanity/types/serviceCategory'
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  ArrowRightIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  CpuChipIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  LightBulbIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Link } from './link'
import { Logo } from './logo'

import { MobileNav } from './mobile-nav'
import { MobileNavButton } from './mobile-nav-button'
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
      ChevronDownIcon: ChevronDownIcon,
    }
    return iconMap[iconName] || UserGroupIcon
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton
        className={`flex items-center px-4 py-4 text-base font-medium text-gray-950 bg-blend-multiply transition-colors hover:bg-black/2.5 hover:text-black ${
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
        className={`flex items-center px-4 py-4 text-base font-medium text-gray-950 bg-blend-multiply transition-colors hover:bg-black/2.5 hover:text-black ${
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
          className={`flex items-center px-4 py-4 text-base font-medium text-gray-950 bg-blend-multiply transition-colors hover:bg-black/2.5 hover:text-black ${
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
          className={`flex items-center px-4 py-4 text-base font-medium text-gray-950 bg-blend-multiply transition-colors hover:bg-black/2.5 hover:text-black ${
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
          className={`flex items-center px-4 py-4 text-base font-medium text-gray-950 bg-blend-multiply transition-colors hover:bg-black/2.5 hover:text-black ${
            isActive('/contact') ? 'bg-black/5 text-black' : ''
          }`}
        >
          Kontakt
        </Link>
      </PlusGridItem>
    </nav>
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
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false)

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen)
  }

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
      // Add some smoothing to the progress bar
      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 100))
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])

  return (
    <Disclosure
      as="header"
      className={`fixed top-0 right-0 left-0 z-[9999] w-full transition-all duration-300 ${
        isMobileNavOpen
          ? 'border-b border-gray-200/50 bg-white shadow-sm'
          : isScrolled
            ? 'border-b border-gray-200/50 bg-white/90 backdrop-blur-lg'
            : 'bg-transparent'
      }`}
    >
      {/* Enhanced Progress Bar - Visible on all breakpoints */}
      <div className="relative">
        {/* Background track */}
        <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-200/50" />
        {/* Main progress bar */}
        <div
          className={`absolute bottom-0 left-0 h-1 bg-blue-600 shadow-sm transition-all duration-300 ease-out ${
            scrollProgress >= 100 ? 'animate-pulse' : ''
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
        {/* Progress bar glow effect */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-blue-500/60 blur-sm transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        {/* Animated progress indicator */}
        <div
          className="absolute bottom-0 h-1 w-1 rounded-full bg-white shadow-md transition-all duration-300 ease-out"
          style={{
            left: `calc(${scrollProgress}% - 2px)`,
            opacity: scrollProgress > 0 ? 1 : 0,
            transform: `scale(${scrollProgress > 0 ? 1 : 0.5})`,
          }}
        />
      </div>
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled ? 'pt-3 sm:pt-4' : 'pt-4 sm:pt-5'
        }`}
      >
        {/* Centered container with max-width and horizontal spacing */}
        <div className="mx-auto max-w-6xl px-4 sm:px-4 lg:px-4 xl:px-6 2xl:px-8">
          <PlusGrid>
            <PlusGridRow className="relative flex items-center justify-between !pt-0 !pb-0">
              <div className="relative flex items-center gap-6">
                <PlusGridItem className="-mt-1 px-1 py-2">
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
                <MobileNavButton
                  isOpen={isMobileNavOpen}
                  onClick={toggleMobileNav}
                />
              </div>
            </PlusGridRow>
          </PlusGrid>
          {/* Mobile Navigation - Only render on mobile/tablet */}
          <div className="3xl:hidden lg:hidden xl:hidden 2xl:hidden">
            <MobileNav
              serviceCategories={serviceCategories}
              isOpen={isMobileNavOpen}
              onToggle={toggleMobileNav}
            />
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
