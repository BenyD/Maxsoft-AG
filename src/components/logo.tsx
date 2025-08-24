'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function Logo({ className }: { className?: string }) {
  return (
    <motion.div
      variants={{ idle: {}, active: {} }}
      initial="idle"
      className={clsx(className, '-mt-2 overflow-visible')}
    >
      <motion.div
        variants={{
          idle: { scale: 1, opacity: 1 },
        }}
        className="relative"
      >
        <Image
          src="/logo.png"
          alt="Maxsoft AG"
          width={100}
          height={24}
          className="-mt-3 h-auto w-auto"
          priority
        />
      </motion.div>
    </motion.div>
  )
}

export function Mark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.png"
      alt="Maxsoft AG"
      width={24}
      height={24}
      className={clsx(className, '-mt-2 h-auto w-auto')}
    />
  )
}
