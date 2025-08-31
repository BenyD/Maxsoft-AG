'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function AnchorNavigation() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if there's a hash in the URL
    if (typeof window !== 'undefined') {
      const hash = window.location.hash

      if (hash === '#beratung-buchen') {
        // Wait for the page to fully render
        const timer = setTimeout(() => {
          const element = document.getElementById('beratung-buchen')
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        }, 100)

        return () => clearTimeout(timer)
      }
    }
  }, [searchParams])

  return null
}
