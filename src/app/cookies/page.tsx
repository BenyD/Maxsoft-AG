'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'

import { useEffect, useState } from 'react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
  functional: false,
}

export default function CookiesPage() {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    // Load saved preferences from localStorage
    const saved = localStorage.getItem('cookiePreferences')
    if (saved) {
      try {
        const parsedPreferences = JSON.parse(saved)
        setPreferences({ ...defaultPreferences, ...parsedPreferences })
      } catch (error) {
        console.error('Error parsing cookie preferences:', error)
      }
    }
    setHasLoaded(true)
  }, [])

  const handlePreferenceChange = (
    category: keyof CookiePreferences,
    value: boolean,
  ) => {
    if (category === 'necessary') return // Cannot disable necessary cookies

    const newPreferences = { ...preferences, [category]: value }
    setPreferences(newPreferences)
  }

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    localStorage.setItem('cookieConsent', 'true')

    // Dispatch custom event to notify other components
    window.dispatchEvent(
      new CustomEvent('cookiePreferencesUpdated', {
        detail: preferences,
      }),
    )

    // Show success message
    alert('Cookie preferences saved successfully!')
  }

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted))
    localStorage.setItem('cookieConsent', 'true')

    window.dispatchEvent(
      new CustomEvent('cookiePreferencesUpdated', {
        detail: allAccepted,
      }),
    )

    alert('All cookies accepted!')
  }

  const rejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setPreferences(onlyNecessary)
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyNecessary))
    localStorage.setItem('cookieConsent', 'true')

    window.dispatchEvent(
      new CustomEvent('cookiePreferencesUpdated', {
        detail: onlyNecessary,
      }),
    )

    alert('Only necessary cookies will be used!')
  }

  const clearAllCookies = () => {
    if (
      confirm(
        'Are you sure you want to clear all cookies? This will reset your preferences and may log you out of services.',
      )
    ) {
      // Clear all cookies
      document.cookie.split(';').forEach((c) => {
        const eqPos = c.indexOf('=')
        const name = eqPos > -1 ? c.substr(0, eqPos) : c
        document.cookie =
          name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
        document.cookie =
          name +
          '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' +
          window.location.hostname
      })

      // Clear localStorage
      localStorage.removeItem('cookiePreferences')
      localStorage.removeItem('cookieConsent')

      // Reset preferences
      setPreferences(defaultPreferences)

      alert('All cookies have been cleared!')
    }
  }

  if (!hasLoaded) {
    return (
      <main className="overflow-hidden">
        <GradientBackground />
        <Container>
          <Navbar />
        </Container>
        <Container className="mt-16">
          <div className="animate-pulse">
            <div className="mb-4 h-8 w-1/3 rounded bg-gray-200"></div>
            <div className="mb-8 h-4 w-2/3 rounded bg-gray-200"></div>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>

      <Container className="mt-16">
        <Heading as="h1">Cookie Settings</Heading>
        <Lead className="mt-6 max-w-3xl">
          Manage your cookie preferences and learn about how we use cookies to
          improve your experience on our website. You can customize your
          settings or accept/reject all cookies.
        </Lead>
      </Container>

      {/* Cookie Categories */}
      <Container className="mt-16">
        <div className="space-y-6">
          {/* Necessary Cookies */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Necessary Cookies
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Essential for the website to function properly
                </p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="h-4 w-4 cursor-not-allowed rounded border-gray-300 text-blue-600 opacity-50"
                />
                <span className="ml-2 text-sm text-gray-500">
                  Always Active
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              These cookies are essential for the proper functioning of our
              website. They enable basic functions like page navigation and
              access to secure areas. The website cannot function properly
              without these cookies.
            </p>
          </div>

          {/* Analytics Cookies */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Analytics Cookies
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Help us understand how visitors interact with our website
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    handlePreferenceChange('analytics', e.target.checked)
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
            <p className="text-sm text-gray-700">
              These cookies collect information about how you use our website,
              such as which pages you visit most often. This data helps us
              improve our website and user experience. All information is
              aggregated and anonymous.
            </p>
          </div>

          {/* Marketing Cookies */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Marketing Cookies
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Used to deliver personalized advertisements
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    handlePreferenceChange('marketing', e.target.checked)
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
            <p className="text-sm text-gray-700">
              These cookies are used to make advertising messages more relevant
              to you. They perform functions like preventing the same ad from
              continuously reappearing and ensuring ads are properly displayed.
            </p>
          </div>

          {/* Functional Cookies */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Functional Cookies
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Enable enhanced functionality and personalization
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) =>
                    handlePreferenceChange('functional', e.target.checked)
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
            <p className="text-sm text-gray-700">
              These cookies enable the website to provide enhanced functionality
              and personalization. They may be set by us or by third-party
              providers whose services we have added to our pages.
            </p>
          </div>
        </div>
      </Container>

      {/* Action Buttons */}
      <Container className="mt-16">
        <div className="rounded-2xl bg-gray-50 px-6 py-8">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Cookie Preferences
            </h2>
            <p className="text-gray-600">
              Choose your preferred cookie settings or use the quick options
              below.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={acceptAll}>Accept All Cookies</Button>
            <Button onClick={savePreferences} variant="secondary">
              Save My Preferences
            </Button>
            <Button onClick={rejectAll} variant="outline">
              Reject All (Except Necessary)
            </Button>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6 text-center">
            <button
              onClick={clearAllCookies}
              className="text-sm text-red-600 underline hover:text-red-700"
            >
              Clear All Cookies & Reset Preferences
            </button>
          </div>
        </div>
      </Container>

      {/* Cookie Information */}
      <Container className="mt-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <Subheading>About Cookies</Subheading>
          <div className="prose prose-gray mt-6 max-w-none">
            <p className="leading-relaxed text-gray-700">
              Cookies are small text files that are stored on your computer or
              mobile device when you visit our website. They help us provide you
              with a better experience by remembering your preferences and
              understanding how you use our site.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium text-gray-900">
                  What We Use Cookies For
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Remembering your preferences and settings</li>
                  <li>• Analyzing website traffic and usage patterns</li>
                  <li>• Improving website functionality and performance</li>
                  <li>• Providing personalized content and experiences</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-medium text-gray-900">Your Rights</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• You can control cookie settings at any time</li>
                  <li>• You can delete cookies from your browser</li>
                  <li>• You can opt out of non-essential cookies</li>
                  <li>• You can request information about stored data</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  )
}
