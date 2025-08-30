'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageLoader } from './page-loader'

/**
 * PageTransition - Provides smooth transitions between page navigation
 *
 * @example
 * // In layout.tsx - wraps all pages
 * <PageTransition type="slideUp">
 *   {children}
 * </PageTransition>
 *
 * @example
 * // Different transition types
 * <PageTransition type="fade">     // Simple fade
 * <PageTransition type="slide">    // Horizontal slide
 * <PageTransition type="scale">    // Scale with fade
 * <PageTransition type="slideUp">  // Vertical slide (default)
 */
interface PageTransitionProps {
  children: React.ReactNode
  type?: 'fade' | 'slide' | 'scale' | 'slideUp'
}

export function PageTransition({
  children,
  type = 'fade',
}: PageTransitionProps) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    // Check if this is a new browser session
    const hasVisitedThisSession = sessionStorage.getItem(
      'maxsoft-session-visited',
    )

    if (!hasVisitedThisSession) {
      // New session - show splash screen
      setShowSplash(true)
      sessionStorage.setItem('maxsoft-session-visited', 'true')

      const timer = setTimeout(() => {
        setShowSplash(false)
        setIsFirstMount(false)
      }, 2500) // Show splash for 2.5 seconds on initial load

      return () => clearTimeout(timer)
    } else {
      // Same session - skip splash screen
      setIsFirstMount(false)
    }
  }, [])

  // Show splash screen on initial load
  if (showSplash) {
    return <PageLoader />
  }

  // Smooth transition from splash to main content
  if (isFirstMount) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    )
  }

  const transitions = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
  }

  const selectedTransition = transitions[type]

  return (
    <motion.div
      key={pathname}
      initial={selectedTransition.initial}
      animate={selectedTransition.animate}
      exit={selectedTransition.exit}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
