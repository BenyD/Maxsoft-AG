'use client'

import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface MobileNavButtonProps {
  isOpen: boolean
  onClick: () => void
}

export function MobileNavButton({ isOpen, onClick }: MobileNavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mobile-nav-button flex size-14 items-center justify-center self-center rounded-xl transition-all duration-200 hover:scale-105"
      aria-label={isOpen ? "Hauptmenü schließen" : "Hauptmenü öffnen"}
    >
      <Bars2Icon className={`size-6 text-gray-700 transition-all duration-200 ${isOpen ? 'hidden' : 'block'}`} />
      <XMarkIcon className={`size-6 text-gray-700 transition-all duration-200 ${isOpen ? 'block' : 'hidden'}`} />
    </button>
  )
}
