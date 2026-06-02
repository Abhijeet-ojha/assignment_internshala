"use client"

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md p-6 bg-panel rounded-lg" role="alert" aria-live="assertive">
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-sm text-gray-300 mb-4">An unexpected error occurred while loading the dashboard.</p>
        <div className="flex gap-2">
          <button onClick={() => reset()} className="px-4 py-2 bg-accent rounded">Retry</button>
          <button onClick={() => { window.location.reload() }} className="px-4 py-2 bg-white/5 rounded">Hard reload</button>
        </div>
      </div>
    </div>
  )
}
