"use client"

import { motion } from 'framer-motion'
import type { ComponentType } from 'react'

export default function MobileNav({ items, active, setActive }: { items: { id: string; label: string; icon: ComponentType<any> }[]; active: string; setActive: (s: string) => void }) {
  return (
    <nav aria-label="Bottom navigation" className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[92%] md:hidden">
      <div className="bg-panel glass rounded-full p-2 flex justify-between px-3">
        {items.map((it) => {
          const Icon = it.icon
          return (
            <button key={it.id} onClick={() => setActive(it.id)} aria-current={active === it.id ? 'page' : undefined} aria-label={it.label} className="p-2 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent">
              <Icon className="w-5 h-5" />
              <span className="sr-only">{it.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
