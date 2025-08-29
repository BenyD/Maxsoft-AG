'use client'

import type { ExternalLink } from '@/sanity/types/externalLink'
import { useEffect, useState } from 'react'

interface EmbeddedContentProps {
  link: ExternalLink
}

export function EmbeddedContent({ link }: EmbeddedContentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
  }, [link.url])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError('Fehler beim Laden des eingebetteten Inhalts')
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg/[1.6] font-medium text-red-800">
              Fehler beim Laden des Inhalts
            </h3>
            <p className="mt-1 text-lg/[1.6] text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {link.embedTitle && (
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900">
            {link.embedTitle}
          </h4>
        </div>
      )}

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-50">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <span className="text-lg/[1.6] text-gray-600">
                Wird geladen...
              </span>
            </div>
          </div>
        )}

        <iframe
          src={link.url}
          className="w-full rounded-lg border border-gray-200 bg-white"
          style={{ height: link.embedHeight || '600px' }}
          onLoad={handleLoad}
          onError={handleError}
          title={link.title}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>

      <div className="text-center">
        <p className="text-lg/[1.6] text-gray-500">
          Haben Sie Probleme beim Anzeigen dieses Inhalts?{' '}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            In neuem Tab öffnen
          </a>
        </p>
      </div>
    </div>
  )
}
