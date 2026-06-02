"use client"

import { useEffect, useRef } from 'react'

const COLS = 52  // weeks
const ROWS = 7   // days

// Deterministic level from seed data (0-4) — safe for SSR
function getLevel(value: number): 0 | 1 | 2 | 3 | 4 {
  if (value <= 0)  return 0
  if (value <= 25) return 1
  if (value <= 50) return 2
  if (value <= 75) return 3
  return 4
}

export default function ActivityCard({ data: propData }: { data?: number[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Build deterministic data if none provided
  const rawData: number[] = propData ?? Array.from({ length: COLS * ROWS }, (_, i) =>
    (12345 + i * 17) % 100
  )

  // Summary stats
  const activeDays     = rawData.filter((v) => v > 0).length
  const consistency    = Math.round((activeDays / rawData.length) * 100)
  const sessionsThisWk = rawData.slice(-7).filter((v) => v > 0).length

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.innerHTML = ''

    for (let c = 0; c < COLS; c++) {
      const col = document.createElement('div')
      col.className = 'flex flex-col gap-1'

      for (let r = 0; r < ROWS; r++) {
        const val   = rawData[c * ROWS + r] ?? 0
        const level = getLevel(val)
        const cell  = document.createElement('div')
        cell.className = 'heatmap-cell'
        cell.setAttribute('data-level', String(level))
        col.appendChild(cell)
      }
      el.appendChild(col)
    }
    // Scroll to end so most-recent weeks are visible
    el.parentElement?.scrollTo({ left: el.scrollWidth, behavior: 'instant' })
  }, []) // intentionally run once — data is deterministic

  return (
    <section
      className="bento-card rounded-xl p-md flex flex-col gap-6"
      aria-label="Learning activity"
    >
      {/* Header + legend */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase">
          Activity History
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-on-surface-variant">Less</span>
          <div className="flex gap-1">
            {([0, 1, 2, 3, 4] as const).map((lvl) => (
              <div key={lvl} className="heatmap-cell" data-level={lvl} />
            ))}
          </div>
          <span className="font-mono text-[11px] text-on-surface-variant">More</span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="w-full overflow-x-auto pb-1">
        <div
          ref={containerRef}
          className="flex gap-1"
          style={{ minWidth: 'max-content' }}
          aria-hidden
        />
      </div>

      {/* Summary row */}
      <div className="flex items-center divide-x divide-outline-variant border-t border-outline-variant pt-4">
        <div className="flex flex-col gap-0.5 pr-6">
          <span className="text-base font-semibold text-on-surface">{activeDays}</span>
          <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase">Learning Days</span>
        </div>
        <div className="flex flex-col gap-0.5 px-6">
          <span className="text-base font-semibold text-on-surface">{consistency}%</span>
          <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase">Consistency</span>
        </div>
        <div className="flex flex-col gap-0.5 pl-6">
          <span className="text-base font-semibold text-on-surface">{sessionsThisWk}</span>
          <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase">Sessions This Week</span>
        </div>
      </div>
    </section>
  )
}
