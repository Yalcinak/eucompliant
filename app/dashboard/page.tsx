'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        setLoading(false)
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center">
      <div className="text-sm text-[#8a8780] font-mono">Wird geladen...</div>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-sm border-b border-[#e0ddd6] h-[60px] flex items-center justify-between px-10">
        <Link href="/" className="font-bold text-lg tracking-tight">
          EUCompliant<span className="text-[#2d7a4a]">.de</span>
        </Link>
        <div className="flex gap-1 items-center">
          <Link href="/governance" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">KI-Governance</Link>
          <Link href="/gateway" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">KI-Gateway</Link>
          <Link href="/automation" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">Automatisierung</Link>
          <button onClick={handleLogout} className="ml-2 px-4 py-2 text-sm border border-[#e0ddd6] rounded-md hover:bg-[#efefeb] text-[#8a8780]">
            Abmelden
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-10 pt-28 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-[#0f0e0c] mb-1">
            Willkommen zurück 👋
          </h1>
          <p className="text-sm text-[#8a8780]">{user?.email} · {user?.user_metadata?.company_name || 'Ihr Unternehmen'}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: '🛡️', title: 'KI-Governance', desc: 'Inventar, Checkliste, Prüfbericht', href: '/governance', color: 'border-[#2d7a4a]', status: 'Handlungsbedarf', statusColor: 'text-orange-600' },
            { icon: '⚡', title: 'KI-Gateway', desc: 'Live-Protokoll, Kosten, Routing', href: '/gateway', color: 'border-[#1a3a5c]', status: 'Aktiv', statusColor: 'text-green-700' },
            { icon: '🔄', title: 'Automatisierung', desc: 'CV-Analyse, HR, Immobilien', href: '/automation', color: 'border-[#c85a00]', status: 'Bereit', statusColor: 'text-green-700' },
          ].map(m => (
            <Link key={m.title} href={m.href}
              className={`bg-white border border-[#e0ddd6] border-t-4 ${m.color} rounded-xl p-6 hover:-translate-y-1 transition-transform`}>
              <div className="text-3xl mb-3">{m.icon}</div>
              <div className="font-bold text-sm mb-1">{m.title}</div>
              <div className="text-xs text-[#8a8780] mb-3">{m.desc}</div>
              <div className={`text-xs font-mono font-semibold ${m.statusColor}`}>{m.status}</div>
            </Link>
          ))}
        </div>

        <div className="bg-white border border-[#e0ddd6] rounded-xl p-6">
          <div className="font-bold text-sm mb-4">Schnellübersicht</div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'KI-Tools erfasst', value: '4' },
              { label: 'Compliance-Score', value: '62%' },
              { label: 'Hochrisiko-Systeme', value: '1' },
              { label: 'Offene Aufgaben', value: '7' },
            ].map(s => (
              <div key={s.label} className="bg-[#f7f6f2] rounded-lg p-4 border border-[#e0ddd6]">
                <div className="font-mono text-xs text-[#8a8780] uppercase tracking-wider mb-2">{s.label}</div>
                <div className="text-2xl font-black tracking-tight text-[#0f0e0c]">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}