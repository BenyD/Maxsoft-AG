'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface AnimationWrapperProps {
  children: React.ReactNode
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scaleIn' | 'stagger' | 'none'
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  threshold?: number
  once?: boolean
  margin?: string
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },
  slideIn: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  stagger: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
}

/**
 * AnimationWrapper - A component that provides scroll-triggered animations using Framer Motion
 *
 * @example
 * // Basic usage with scroll trigger
 * <AnimationWrapper animation="slideUp">
 *   <h1>This will animate when scrolled into view</h1>
 * </AnimationWrapper>
 *
 * @example
 * // With custom timing and threshold
 * <AnimationWrapper
 *   animation="scaleIn"
 *   delay={0.2}
 *   threshold={0.5}
 *   margin="-50px 0px -50px 0px"
 * >
 *   <Card>This animates when 50% visible</Card>
 * </AnimationWrapper>
 *
 * @example
 * // For lists that should animate sequentially
 * {items.map((item, index) => (
 *   <AnimationWrapper
 *     key={item.id}
 *     animation="stagger"
 *     delay={index * 0.1}
 *   >
 *     <ListItem>{item.name}</ListItem>
 *   </AnimationWrapper>
 * ))}
 */
export function AnimationWrapper({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  threshold = 0.1,
  once = true,
  margin = '-100px 0px -100px 0px',
}: AnimationWrapperProps) {
  const selectedAnimation = animations[animation]

  // Customize slide direction
  if (animation === 'slideIn') {
    const xOffset = direction === 'left' ? -30 : direction === 'right' ? 30 : 0
    const yOffset = direction === 'up' ? -30 : direction === 'down' ? 30 : 0

    selectedAnimation.initial = { opacity: 0, x: xOffset, y: yOffset }
    selectedAnimation.animate = { opacity: 1, x: 0, y: 0 }
    selectedAnimation.exit = { opacity: 0, x: xOffset, y: yOffset }
  }

  return (
    <motion.div
      className={className}
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.animate}
      viewport={{
        once,
        amount: threshold,
        margin,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
