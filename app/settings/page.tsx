"use client"

import { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import { Bell, User } from 'lucide-react'
import DeleteAccountButton from '../../components/layout/DeleteAccountButton'

type Toggle = { label: string; sub: string; on: boolean }

export default function SettingsPage() {
  const [saved,        setSaved]        = useState(false)
  const [weeklyHours,  setWeeklyHours]  = useState(5)
  const [reminderTime, setReminderTime] = useState('09:00')
  const [toggles, setToggles] = useState<Toggle[]>([
    { label: 'Email Notifications', sub: 'Get weekly progress reports via email',    on: true  },
    { label: 'Push Notifications',  sub: 'Daily study reminders and course updates', on: false },
    { label: 'Streak Reminders',    sub: 'Alert me before I break my streak',        on: true  },
  ])

  const flip = (i: number) =>
    setToggles((prev) => prev.map((t, idx) => idx === i ? { ...t, on: !t.on } : t))

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <main id="content" className="min-h-screen flex bg-[#0A0A0A]">
      <Sidebar />
      <div className="flex-1 md:ml-16 min-w-0">

        {/* Top bar */}
        <header className="h-16 flex justify-between items-center px-margin border-b border-outline-variant sticky top-0 bg-[#0A0A0A] z-40">
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Settings</h1>
          <div className="flex items-center gap-3">
            <button aria-label="Notifications" className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full">
              <Bell size={20} aria-hidden />
            </button>
            <div className="w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center">
              <User size={18} className="text-primary" aria-hidden />
            </div>
          </div>
        </header>

        <div className="p-margin flex flex-col gap-gutter max-w-3xl mx-auto">

          {/* ── Profile ─────────────────────────────────── */}
          <section className="bento-card rounded-xl p-md">
            <h2 className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase mb-6">Profile</h2>

            {/* Avatar row */}
            <div className="flex items-center gap-5 mb-6 pb-6 border-b border-outline-variant">
              <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <User size={28} className="text-primary" aria-hidden />
              </div>
              <div className="flex-1">
                <div className="text-on-surface font-semibold text-lg leading-tight">Student</div>
                <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Pro Learner · Joined 2024</div>
              </div>
              <button className="font-mono text-[11px] text-on-surface-variant hover:text-primary border border-outline-variant hover:border-primary px-4 py-2 rounded-lg transition-colors uppercase tracking-widest">
                Change Photo
              </button>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Full Name',  value: 'Student User',             type: 'text'  },
                { label: 'Email',      value: 'student@lumina.app',       type: 'email' },
                { label: 'Username',   value: 'pro-learner',              type: 'text'  },
                { label: 'Timezone',   value: 'Asia/Kolkata (UTC+5:30)',  type: 'text'  },
              ].map((f) => (
                <div key={f.label}>
                  <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    defaultValue={f.value}
                    className="w-full bg-surface-container-low border border-outline-variant text-on-surface text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ── Learning Goals ───────────────────────────── */}
          <section className="bento-card rounded-xl p-md">
            <h2 className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase mb-6">Learning Goals</h2>
            <div className="flex flex-col gap-6">

              {/* Weekly hours slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">
                    Weekly Goal
                  </label>
                  <span className="font-mono text-[11px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                    {weeklyHours}h / week
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none bg-surface-container-high cursor-pointer"
                  style={{ accentColor: '#4edea3' }}
                />
                <div className="flex justify-between mt-2">
                  <span className="font-mono text-[10px] text-on-surface-variant">1h</span>
                  <span className="font-mono text-[10px] text-on-surface-variant">20h</span>
                </div>
              </div>

              {/* Reminder time */}
              <div>
                <label className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">
                  Daily Reminder
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant text-on-surface text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary transition-colors"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>
          </section>

          {/* ── Notifications ────────────────────────────── */}
          <section className="bento-card rounded-xl p-md">
            <h2 className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase mb-6">Notifications</h2>
            <div className="flex flex-col">
              {toggles.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between py-4 ${i < toggles.length - 1 ? 'border-b border-outline-variant' : ''}`}
                >
                  <div>
                    <div className="text-on-surface text-sm font-medium">{item.label}</div>
                    <div className="font-mono text-[11px] text-on-surface-variant mt-0.5">{item.sub}</div>
                  </div>
                  <button
                    onClick={() => flip(i)}
                    role="switch"
                    aria-checked={item.on}
                    aria-label={item.label}
                    className={`relative ml-6 w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                      item.on ? 'bg-primary' : 'bg-surface-container-high border border-outline-variant'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${item.on ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    <span className="sr-only">{item.on ? 'On' : 'Off'}</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Save row ─────────────────────────────────── */}
          <div className="flex items-center justify-between pb-margin">
            <DeleteAccountButton />
            <button
              onClick={save}
              className={`px-8 py-3 rounded-xl font-mono text-[12px] uppercase tracking-widest font-bold transition-all ${
                saved
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'bg-primary text-on-primary hover:bg-primary-fixed'
              }`}
            >
              {saved ? '✓ Saved' : 'Save Changes'}
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}
