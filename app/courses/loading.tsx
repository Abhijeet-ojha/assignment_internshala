import Sidebar from '../../components/layout/Sidebar'

function Pulse({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-surface-container-high rounded-lg ${className}`} />
}

export default function CoursesLoading() {
  return (
    <main className="min-h-screen flex bg-[#0A0A0A]" aria-label="Loading courses">
      <Sidebar />
      <div className="flex-1 md:ml-16 min-w-0">
        {/* Top bar */}
        <header className="h-16 flex justify-between items-center px-margin border-b border-outline-variant">
          <Pulse className="h-8 w-64 rounded-lg" />
          <div className="flex items-center gap-3">
            <Pulse className="w-9 h-9 rounded-full" />
            <Pulse className="w-9 h-9 rounded-full" />
          </div>
        </header>

        <div className="p-margin flex flex-col gap-gutter max-w-7xl mx-auto">
          {/* Page header */}
          <div>
            <Pulse className="h-8 w-48 mb-2 rounded-full" />
            <Pulse className="h-3 w-72 rounded-full" />
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-gutter">
            {[1,2,3].map(i => (
              <div key={i} className="bento-card rounded-xl p-md animate-pulse flex flex-col gap-3">
                <Pulse className="w-6 h-6 rounded" />
                <Pulse className="h-6 w-16 rounded-full" />
                <Pulse className="h-2 w-24 rounded-full" />
              </div>
            ))}
          </div>

          {/* Sort row */}
          <div className="flex justify-between items-center">
            <Pulse className="h-3 w-20 rounded-full" />
            <Pulse className="h-8 w-56 rounded-lg" />
          </div>

          {/* Course cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bento-card rounded-xl p-md animate-pulse flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Pulse className="w-10 h-10 rounded-lg flex-shrink-0" />
                  <Pulse className="h-4 flex-1 rounded-full" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <Pulse className="h-2 w-24 rounded-full" />
                    <Pulse className="h-2 w-8 rounded-full" />
                  </div>
                  <Pulse className="h-1.5 w-full rounded-full" />
                </div>
                <div className="flex justify-between border-t border-outline-variant pt-3">
                  <Pulse className="h-2 w-20 rounded-full" />
                  <Pulse className="h-2 w-16 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
