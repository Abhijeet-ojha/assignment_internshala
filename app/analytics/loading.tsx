import Sidebar from '../../components/layout/Sidebar'

function Pulse({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-surface-container-high rounded-lg ${className}`} />
}

export default function AnalyticsLoading() {
  return (
    <main className="min-h-screen flex bg-[#0A0A0A]" aria-label="Loading analytics">
      <Sidebar />
      <div className="flex-1 md:ml-16 min-w-0">
        {/* Top bar */}
        <header className="h-16 flex justify-between items-center px-margin border-b border-outline-variant">
          <Pulse className="h-8 w-36 rounded-full" />
          <div className="flex items-center gap-3">
            <Pulse className="w-9 h-9 rounded-full" />
            <Pulse className="w-9 h-9 rounded-full" />
          </div>
        </header>

        <div className="p-margin flex flex-col gap-gutter max-w-7xl mx-auto">
          {/* Page heading */}
          <div>
            <Pulse className="h-8 w-48 mb-2 rounded-full" />
            <Pulse className="h-3 w-80 rounded-full" />
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
            {[1,2,3,4].map(i => (
              <div key={i} className="bento-card rounded-xl p-md animate-pulse flex flex-col gap-3">
                <Pulse className="w-6 h-6 rounded" />
                <Pulse className="h-7 w-12 rounded-full" />
                <Pulse className="h-2 w-20 rounded-full" />
              </div>
            ))}
          </div>

          {/* Heatmap skeleton */}
          <div className="bento-card rounded-xl p-md animate-pulse">
            <Pulse className="h-3 w-1/6 mb-6 rounded-full" />
            <div className="flex gap-1 overflow-hidden">
              {Array.from({ length: 52 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <div key={j} className="w-3 h-3 rounded-sm bg-surface-container-high" />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Bar chart */}
            <div className="lg:col-span-5 bento-card rounded-xl p-md animate-pulse flex flex-col gap-6">
              <Pulse className="h-3 w-1/3 rounded-full" />
              <div className="flex items-end justify-between gap-2 h-24">
                {[60,30,90,50,100,20,0].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-surface-container-high rounded-t-sm" style={{ height: `${Math.max(h, 4)}%` }} />
                    <div className="h-2 w-4 bg-surface-container-high rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Course breakdown */}
            <div className="lg:col-span-7 bento-card rounded-xl p-md animate-pulse flex flex-col gap-4">
              <Pulse className="h-3 w-1/4 rounded-full" />
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <Pulse className="w-4 h-4 rounded flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <Pulse className="h-3 w-40 rounded-full" />
                      <Pulse className="h-3 w-8 rounded-full" />
                    </div>
                    <Pulse className="h-1.5 w-full rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
