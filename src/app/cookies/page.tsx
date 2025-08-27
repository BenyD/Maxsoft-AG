'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { client } from '@/sanity/client'

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
  const [serviceCategories, setServiceCategories] = useState([])

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

    // Fetch service categories for navbar
    const fetchServiceCategories = async () => {
      try {
        const query = `*[_type == "serviceCategory" && isActive == true] | order(order asc) {
          _id,
          name,
          slug,
          icon,
          color
        }`
        const categories = await client.fetch(query)
        setServiceCategories(categories)
      } catch (error) {
        console.error('Error fetching service categories:', error)
      }
    }

    fetchServiceCategories()
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
    alert('Cookie-Einstellungen erfolgreich gespeichert!')
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

    alert('Alle Cookies akzeptiert!')
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

    alert('Nur notwendige Cookies werden verwendet!')
  }

  const clearAllCookies = () => {
    if (
      confirm(
        'Sind Sie sicher, dass Sie alle Cookies löschen möchten? Dies wird Ihre Einstellungen zurücksetzen und Sie möglicherweise aus Diensten abmelden.',
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

      alert('Alle Cookies wurden gelöscht!')
    }
  }

  if (!hasLoaded) {
    return (
      <main className="overflow-hidden">
        <GradientBackground />
        <Container>
          <Navbar serviceCategories={serviceCategories} />
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
        <Navbar serviceCategories={serviceCategories} />
      </Container>

      <Container className="mt-16">
        <Heading as="h1">Cookie-Einstellungen</Heading>
        <Lead className="mt-6 max-w-3xl">
          Verwalten Sie Ihre Cookie-Einstellungen und erfahren Sie, wie wir
          Cookies verwenden, um Ihr Erlebnis auf unserer Website zu verbessern.
          Sie können Ihre Einstellungen anpassen oder alle Cookies
          akzeptieren/ablehnen.
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
                  Notwendige Cookies
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Essentiell für die ordnungsgemäße Funktionalität der Website
                </p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="h-4 w-4 cursor-not-allowed rounded border-gray-300 text-blue-600 opacity-50"
                />
                <span className="ml-2 text-sm text-gray-500">Immer aktiv</span>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              Diese Cookies sind für die ordnungsgemäße Funktionalität unserer
              Website unerlässlich. Sie ermöglichen grundlegende Funktionen wie
              Seitennavigation und Zugang zu sicheren Bereichen. Die Website
              kann ohne diese Cookies nicht ordnungsgemäß funktionieren.
            </p>
          </div>

          {/* Analytics Cookies */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Analyse-Cookies
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Helfen uns zu verstehen, wie Besucher mit unserer Website
                  interagieren
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
              Diese Cookies sammeln Informationen darüber, wie Sie unsere
              Website nutzen, z.B. welche Seiten Sie am häufigsten besuchen.
              Diese Daten helfen uns, unsere Website und Benutzererfahrung zu
              verbessern. Alle Informationen sind aggregiert und anonym.
            </p>
          </div>

          {/* Marketing Cookies */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Marketing-Cookies
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Werden verwendet, um personalisierte Werbung zu liefern
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
              Diese Cookies werden verwendet, um Werbenachrichten für Sie
              relevanter zu machen. Sie erfüllen Funktionen wie die
              Verhinderung, dass dieselbe Anzeige kontinuierlich wieder
              erscheint, und stellen sicher, dass Anzeigen ordnungsgemäß
              angezeigt werden.
            </p>
          </div>

          {/* Functional Cookies */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Funktionale Cookies
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Ermöglichen erweiterte Funktionalität und Personalisierung
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
              Diese Cookies ermöglichen es der Website, erweiterte
              Funktionalität und Personalisierung zu bieten. Sie können von uns
              oder von Drittanbietern gesetzt werden, deren Dienste wir zu
              unseren Seiten hinzugefügt haben.
            </p>
          </div>
        </div>
      </Container>

      {/* Action Buttons */}
      <Container className="mt-16">
        <div className="rounded-2xl bg-gray-50 px-6 py-8">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Cookie-Einstellungen
            </h2>
            <p className="text-gray-600">
              Wählen Sie Ihre bevorzugten Cookie-Einstellungen oder verwenden
              Sie die schnellen Optionen unten.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={acceptAll}>Alle Cookies akzeptieren</Button>
            <Button onClick={savePreferences} variant="secondary">
              Meine Einstellungen speichern
            </Button>
            <Button onClick={rejectAll} variant="outline">
              Alle ablehnen (außer notwendige)
            </Button>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6 text-center">
            <button
              onClick={clearAllCookies}
              className="text-sm text-red-600 underline hover:text-red-700"
            >
              Alle Cookies löschen & Einstellungen zurücksetzen
            </button>
          </div>
        </div>
      </Container>

      {/* Cookie Information */}
      <Container className="mt-16 mb-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <Subheading>Über Cookies</Subheading>
          <div className="prose prose-gray mt-6 max-w-none">
            <p className="leading-relaxed text-gray-700">
              Cookies sind kleine Textdateien, die auf Ihrem Computer oder
              Mobilgerät gespeichert werden, wenn Sie unsere Website besuchen.
              Sie helfen uns, Ihnen eine bessere Erfahrung zu bieten, indem sie
              Ihre Präferenzen merken und verstehen, wie Sie unsere Website
              nutzen.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium text-gray-700">
                  Wofür wir Cookies verwenden
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Ihre Präferenzen und Einstellungen merken</li>
                  <li>• Website-Traffic und Nutzungsmuster analysieren</li>
                  <li>• Website-Funktionalität und -Leistung verbessern</li>
                  <li>
                    • Personalisierte Inhalte und Erfahrungen bereitstellen
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-medium text-gray-700">Ihre Rechte</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    • Sie können Cookie-Einstellungen jederzeit kontrollieren
                  </li>
                  <li>• Sie können Cookies aus Ihrem Browser löschen</li>
                  <li>• Sie können nicht-essentielle Cookies ablehnen</li>
                  <li>
                    • Sie können Informationen über gespeicherte Daten anfordern
                  </li>
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
