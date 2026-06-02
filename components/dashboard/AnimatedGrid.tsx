"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 }
}

export default function AnimatedGrid({ children }: { children: ReactNode }) {
  return (
    <motion.div initial="hidden" animate="show" variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item} style={{ willChange: 'transform, opacity' }} role="listitem">
              {child}
            </motion.div>
          ))
        : <motion.div variants={item} role="listitem">{children}</motion.div>}
    </motion.div>
  )
}
