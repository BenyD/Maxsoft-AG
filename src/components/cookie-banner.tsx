'use client'

import { Button } from '@/components/button'
import { useEffect, useState } from 'react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    try {
      const hasConsent = localStorage.getItem('cookieConsent')
      if (!hasConsent) {
        // Show banner after a short delay for better UX
        const timer = setTimeout(() => {
          setShowBanner(true)
        }, 1000)
        return () => clearTimeout(timer)
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
      // If localStorage is not available, show banner anyway
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }

    try {
      localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted))
      localStorage.setItem('cookieConsent', 'true')

      console.log('✅ All cookies accepted and saved:', allAccepted)

      // Dispatch event to notify other components
      window.dispatchEvent(
        new CustomEvent('cookiePreferencesUpdated', {
          detail: allAccepted,
        }),
      )

      setShowBanner(false)
    } catch (error) {
      console.error('❌ Error saving cookie preferences:', error)
      // Still hide banner even if localStorage fails
      setShowBanner(false)
    }
  }

  const rejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }

    try {
      localStorage.setItem('cookiePreferences', JSON.stringify(onlyNecessary))
      localStorage.setItem('cookieConsent', 'true')

      console.log('✅ Only necessary cookies accepted:', onlyNecessary)

      window.dispatchEvent(
        new CustomEvent('cookiePreferencesUpdated', {
          detail: onlyNecessary,
        }),
      )

      setShowBanner(false)
    } catch (error) {
      console.error('❌ Error saving cookie preferences:', error)
      // Still hide banner even if localStorage fails
      setShowBanner(false)
    }
  }

  const openCookieSettings = () => {
    window.open('/cookies', '_blank')
  }

  if (!showBanner) return null

  return (
    <>
      {/* Banner */}
      <div className="fixed right-0 bottom-0 left-0 z-50 p-4 sm:p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-xl backdrop-blur-md transition-all duration-300 ease-out sm:p-8">
            <div className="flex items-start gap-4">
              {/* Cookie Icon */}
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  We use cookies to enhance your experience
                </h3>

                {!showDetails ? (
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    We use cookies to provide you with the best possible
                    experience on our website. These include essential cookies
                    for functionality and optional cookies for analytics and
                    marketing purposes.
                  </p>
                ) : (
                  <div className="mb-4 space-y-2 text-sm text-gray-600">
                    <p className="leading-relaxed">
                      <strong>Essential cookies:</strong> Required for basic
                      website functionality (always active)
                    </p>
                    <p className="leading-relaxed">
                      <strong>Analytics cookies:</strong> Help us understand how
                      you use our website
                    </p>
                    <p className="leading-relaxed">
                      <strong>Marketing cookies:</strong> Used to deliver
                      relevant advertisements
                    </p>
                    <p className="leading-relaxed">
                      <strong>Functional cookies:</strong> Enable enhanced
                      features and personalization
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                    <Button onClick={acceptAll} className="px-4 py-2 text-sm">
                      Accept All
                    </Button>
                    <Button
                      onClick={rejectAll}
                      variant="outline"
                      className="px-4 py-2 text-sm"
                    >
                      Reject All
                    </Button>
                    <button
                      onClick={openCookieSettings}
                      className="text-sm text-blue-600 underline hover:text-blue-700"
                    >
                      Customize Settings
                    </button>
                  </div>

                  <div className="sm:ml-auto">
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {showDetails ? 'Show Less' : 'Learn More'}
                      <svg
                        className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Privacy Policy Link */}
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-500">
                    By continuing to use our website, you agree to our use of
                    cookies. Read our{' '}
                    <a
                      href="/cookies"
                      className="text-blue-600 underline hover:text-blue-700"
                    >
                      Cookie Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href="/terms"
                      className="text-blue-600 underline hover:text-blue-700"
                    >
                      Terms of Service
                    </a>{' '}
                    for more information.
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
                aria-label="Close cookie banner"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
