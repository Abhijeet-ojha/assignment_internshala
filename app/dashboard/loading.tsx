import Sidebar from '../../components/layout/Sidebar'

function Pulse({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-surface-container-high rounded-lg ${className}`} />
}

function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bento-card rounded-xl p-md ${className}`}>
      <Pulse className="h-3 w-1/4 mb-4 rounded-full" />
      <Pulse className="h-6 w-1/2 mb-2 rounded-full" />
      <Pulse className="h-3 w-2/3 rounded-full" />
    </div>
  )
}

export default function DashboardLoading() {
  return (
    <main className="min-h-screen flex bg-[#0A0A0A]" aria-label="Loading dashboard">
      <Sidebar />
      <div className="flex-1 md:ml-16 p-margin flex flex-col gap-gutter min-w-0">

        {/* Top bar skeleton */}
        <header className="flex justify-between items-center mb-sm">
          <Pulse className="h-8 w-48 rounded-full" />
          <div className="flex items-center gap-4">
            <Pulse className="w-9 h-9 rounded-full" />
            <Pulse className="w-9 h-9 rounded-full" />
          </div>
        </header>

        {/* Grid skeleton — mirrors real dashboard layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
          {/* Hero */}
          <div className="lg:col-span-8">
            <div className="bento-card rounded-xl p-md min-h-[300px] flex flex-col gap-4 animate-pulse">
              <Pulse className="h-6 w-2/3" />
              <Pulse className="h-3 w-1/4" />
              <div className="grid grid-cols-3 gap-4 my-4">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-surface-container-low rounded-xl p-4">
                    <Pulse className="h-2 w-1/2 mb-3 rounded-full" />
                    <Pulse className="h-5 w-2/3 rounded-full" />
                  </div>
                ))}
              </div>
              <div className="mt-auto border-t border-outline-variant pt-4 flex justify-between items-center">
                <Pulse className="h-4 w-1/3" />
                <Pulse className="h-8 w-20 rounded" />
              </div>
            </div>
          </div>

          {/* Featured */}
          <div className="lg:col-span-4">
            <div className="bento-card rounded-xl p-md min-h-[300px] flex flex-col items-center justify-center gap-4 animate-pulse">
              <Pulse className="w-40 h-40 rounded-full" />
              <Pulse className="h-4 w-1/2" />
              <Pulse className="h-3 w-1/3" />
            </div>
          </div>

          {/* Activity */}
          <div className="lg:col-span-12">
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
          </div>

          {/* Course cards */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[1,2,3].map(i => (
              <div key={i} className="bento-card rounded-xl p-6 flex flex-col animate-pulse gap-4">
                <Pulse className="w-10 h-10 rounded-lg" />
                <Pulse className="h-4 w-3/4" />
                <div className="mt-auto h-1 w-full rounded-full bg-surface-container-high" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
