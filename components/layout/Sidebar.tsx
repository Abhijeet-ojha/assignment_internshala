"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  GraduationCap,
  LineChart,
  Settings,
  HelpCircle,
  LogOut,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { signOut } from '../../app/auth/actions'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Courses',   icon: GraduationCap,   href: '/courses'   },
  { label: 'Analytics', icon: LineChart,        href: '/analytics' },
  { label: 'Settings',  icon: Settings,         href: '/settings'  },
]

export default function Sidebar() {
  const pathname  = usePathname()
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      {/* Desktop — click-to-expand sidebar */}
      <aside
        aria-label="Primary navigation"
        className={`hidden md:flex fixed left-0 top-0 h-screen transition-all duration-300 z-50 border-r border-outline-variant bg-surface-dim flex-col py-md overflow-hidden ${
          expanded ? 'w-60' : 'w-16'
        }`}
      >
        {/* Brand + toggle row */}
        <div className="flex items-center gap-4 px-4 mb-xl min-w-[240px]">
          <Link href="/dashboard" className="flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap size={16} className="text-on-primary" aria-hidden />
            </div>
          </Link>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
              >
                <div className="text-[18px] font-bold text-on-surface leading-tight whitespace-nowrap">Lumina</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-primary">Pro Learner</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav links with Framer Motion layoutId active pill */}
        <nav className="flex-1 flex flex-col px-2 min-w-[240px]" role="navigation">
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + '/')
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className="relative flex items-center gap-4 px-3 py-3 transition-colors duration-150"
                  >
                    {/* layoutId pill — slides between active items */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-pill"
                        className="absolute inset-0 bg-surface-container-high border-l-2 border-primary"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        aria-hidden
                      />
                    )}

                    <Icon
                      size={20}
                      className={`relative z-10 flex-shrink-0 transition-colors ${
                        isActive ? 'text-primary' : 'text-on-surface-variant'
                      }`}
                      aria-hidden
                      strokeWidth={isActive ? 2.5 : 1.75}
                    />
                    <AnimatePresence>
                      {expanded && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                          className={`relative z-10 font-mono text-[12px] tracking-widest whitespace-nowrap uppercase ${
                            isActive ? 'text-primary' : 'text-on-surface-variant'
                          }`}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom links */}
        <div className="flex flex-col gap-0.5 px-2 min-w-[240px]">
          {/* Support */}
          <a
            href="#"
            className="flex items-center gap-4 px-3 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <HelpCircle size={20} className="flex-shrink-0" aria-hidden strokeWidth={1.75} />
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="font-mono text-[12px] tracking-widest whitespace-nowrap uppercase"
                >
                  Support
                </motion.span>
              )}
            </AnimatePresence>
          </a>

          {/* Logout — server action via form */}
          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-4 px-3 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-error transition-colors"
            >
              <LogOut size={20} className="flex-shrink-0" aria-hidden strokeWidth={1.75} />
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="font-mono text-[12px] tracking-widest whitespace-nowrap uppercase"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>

          {/* Collapse / Expand toggle */}
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
            className="flex items-center gap-4 px-3 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <ChevronRight size={20} aria-hidden strokeWidth={1.75} />
            </motion.div>
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="font-mono text-[12px] tracking-widest whitespace-nowrap uppercase"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </aside>

      {/* Mobile pill nav */}
      <nav
        aria-label="Bottom navigation"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] md:hidden z-50"
      >
        <div className="bg-surface-container-high border border-outline-variant rounded-full px-3 py-2 flex justify-around">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.label}
                className={`relative p-2 rounded-full transition-colors ${
                  isActive ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-pill"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    aria-hidden
                  />
                )}
                <Icon
                  size={22}
                  className="relative z-10"
                  aria-hidden
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
                <span className="sr-only">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
