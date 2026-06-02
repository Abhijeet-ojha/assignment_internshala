import Sidebar from '../../components/layout/Sidebar'

function Pulse({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-surface-container-high rounded-lg ${className}`} />
}

function SkeletonSection({ rows = 2 }: { rows?: number }) {
  return (
    <div className="bento-card rounded-xl p-md animate-pulse flex flex-col gap-4">
      <Pulse className="h-2 w-1/5 rounded-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Pulse className="h-2 w-1/4 rounded-full" />
          <Pulse className="h-10 w-full rounded-lg" />
        </div>
      ))}
    </div>
  )
}

export default function SettingsLoading() {
  return (
    <main className="min-h-screen flex bg-[#0A0A0A]" aria-label="Loading settings">
      <Sidebar />
      <div className="flex-1 md:ml-16 min-w-0">

        {/* Top bar */}
        <header className="h-16 flex justify-between items-center px-margin border-b border-outline-variant">
          <Pulse className="h-8 w-32 rounded-full" />
          <div className="flex items-center gap-3">
            <Pulse className="w-9 h-9 rounded-full" />
            <Pulse className="w-9 h-9 rounded-full" />
          </div>
        </header>

        <div className="p-margin flex flex-col gap-gutter max-w-3xl mx-auto">

          {/* Profile card */}
          <div className="bento-card rounded-xl p-md animate-pulse flex flex-col gap-6">
            <Pulse className="h-2 w-1/6 rounded-full" />
            {/* Avatar row */}
            <div className="flex items-center gap-5 pb-6 border-b border-outline-variant">
              <Pulse className="w-16 h-16 rounded-full flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <Pulse className="h-5 w-32 rounded-full" />
                <Pulse className="h-2 w-48 rounded-full" />
              </div>
              <Pulse className="h-9 w-28 rounded-lg" />
            </div>
            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Pulse className="h-2 w-1/3 rounded-full" />
                  <Pulse className="h-10 w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <SkeletonSection rows={2} />

          {/* Notifications */}
          <div className="bento-card rounded-xl p-md animate-pulse flex flex-col gap-4">
            <Pulse className="h-2 w-1/4 rounded-full" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-outline-variant last:border-0">
                <div className="flex flex-col gap-2">
                  <Pulse className="h-3 w-36 rounded-full" />
                  <Pulse className="h-2 w-56 rounded-full" />
                </div>
                <Pulse className="w-11 h-6 rounded-full flex-shrink-0" />
              </div>
            ))}
          </div>

          {/* Appearance */}
          <div className="bento-card rounded-xl p-md animate-pulse flex flex-col gap-4">
            <Pulse className="h-2 w-1/5 rounded-full" />
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border-2 border-outline-variant p-4 flex flex-col gap-3">
                  <Pulse className="w-full h-12 rounded-lg" />
                  <Pulse className="h-2 w-1/2 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Save row */}
          <div className="flex justify-between items-center pb-margin">
            <Pulse className="h-4 w-28 rounded-full" />
            <Pulse className="h-11 w-36 rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  )
}
