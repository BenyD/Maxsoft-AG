'use client'

import { AnimationWrapper } from '@/components/animation-wrapper'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Heading, Subheading } from '@/components/text'
import {
  ArrowLeftIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Seite nicht gefunden - Maxsoft IT Solutions'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Die angeforderte Seite konnte nicht gefunden werden.',
      )
    }

    // Hide navbar by adding class to body
    document.body.classList.add('hide-navbar')

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('hide-navbar')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Container className="flex min-h-screen items-center justify-center py-24">
        <div className="mx-auto max-w-2xl text-center">
          {/* 404 Number */}
          <AnimationWrapper animation="scaleIn" delay={0.2}>
            <div className="mb-8">
              <h1 className="font-display text-8xl font-bold tracking-tight text-[#09A7ED] sm:text-9xl">
                404
              </h1>
            </div>
          </AnimationWrapper>

          {/* Subheading */}
          <AnimationWrapper animation="slideUp" delay={0.4}>
            <Subheading className="mb-4">Fehler</Subheading>
          </AnimationWrapper>

          {/* Main Heading */}
          <AnimationWrapper animation="slideUp" delay={0.6}>
            <Heading as="h2" className="mb-6 text-3xl sm:text-4xl">
              Seite nicht gefunden
            </Heading>
          </AnimationWrapper>

          {/* Description */}
          <AnimationWrapper animation="slideUp" delay={0.8}>
            <p className="mb-8 text-lg text-gray-600">
              Entschuldigung, die Seite, nach der Sie suchen, existiert nicht
              oder wurde verschoben. Lassen Sie uns Ihnen helfen, das zu finden,
              was Sie brauchen.
            </p>
          </AnimationWrapper>

          {/* Action Buttons */}
          <AnimationWrapper animation="slideUp" delay={1.0}>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button href="/" className="inline-flex items-center gap-2">
                <HomeIcon className="h-5 w-5" />
                Zur Startseite
              </Button>
              <Button
                variant="secondary"
                href="/services"
                className="inline-flex items-center gap-2"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                Unsere Services
              </Button>
            </div>
          </AnimationWrapper>

          {/* Helpful Links */}
          <AnimationWrapper animation="fadeIn" delay={1.2}>
            <div className="mt-12">
              <p className="mb-6 text-sm font-medium tracking-wider text-gray-500 uppercase">
                Beliebte Seiten
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/services"
                  className="group rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#09A7ED]/30 hover:shadow-md"
                >
                  <div className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#09A7ED]">
                    Dienstleistungen
                  </div>
                </Link>
                <Link
                  href="/company"
                  className="group rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#09A7ED]/30 hover:shadow-md"
                >
                  <div className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#09A7ED]">
                    Über uns
                  </div>
                </Link>
                <Link
                  href="/contact"
                  className="group rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#09A7ED]/30 hover:shadow-md"
                >
                  <div className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#09A7ED]">
                    Kontakt
                  </div>
                </Link>
                <Link
                  href="/careers"
                  className="group rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#09A7ED]/30 hover:shadow-md"
                >
                  <div className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#09A7ED]">
                    Karriere
                  </div>
                </Link>
              </div>
            </div>
          </AnimationWrapper>

          {/* Back Button */}
          <AnimationWrapper animation="fadeIn" delay={1.4}>
            <div className="mt-8">
              <Link
                href="javascript:history.back()"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#09A7ED]"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Zurück zur vorherigen Seite
              </Link>
            </div>
          </AnimationWrapper>
        </div>
      </Container>
    </div>
  )
}
