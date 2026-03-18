"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "blur"

type ScrollRevealProps = {
  children: ReactNode
  direction?: RevealDirection
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  as?: "div" | "section" | "article" | "li"
}

const directionClasses: Record<RevealDirection, { hidden: string; visible: string }> = {
  up: {
    hidden: "translate-y-8 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  down: {
    hidden: "-translate-y-8 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  left: {
    hidden: "translate-x-8 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  right: {
    hidden: "-translate-x-8 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  scale: {
    hidden: "scale-95 opacity-0",
    visible: "scale-100 opacity-100",
  },
  blur: {
    hidden: "opacity-0 blur-sm",
    visible: "opacity-100 blur-0",
  },
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  const classes = directionClasses[direction]

  return (
    <Tag
      ref={ref as any}
      className={cn(
        "transition-all will-change-[transform,opacity]",
        isVisible ? classes.visible : classes.hidden,
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}

type StaggerRevealProps = {
  children: ReactNode[]
  direction?: RevealDirection
  staggerDelay?: number
  duration?: number
  threshold?: number
  className?: string
  itemClassName?: string
}

export function StaggerReveal({
  children,
  direction = "up",
  staggerDelay = 80,
  duration = 600,
  threshold = 0.1,
  className,
  itemClassName,
}: StaggerRevealProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          direction={direction}
          delay={index * staggerDelay}
          duration={duration}
          threshold={threshold}
          className={itemClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}
