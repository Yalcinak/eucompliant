'use client'
import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async () => {
    if (!email || !password) { setError('Bitte alle Felder ausfüllen.'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('E-Mail oder Passwort falsch.')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f6f2] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-bold text-xl tracking-tight">
            EUCompliant<span className="text-[#2d7a4a]">.de</span>
          </Link>
          <p className="text-sm text-[#8a8780] mt-2">Willkommen zurück</p>
        </div>

        <div className="bg-white border border-[#e0ddd6] rounded-2xl p-8 shadow-sm">
          <h1 className="text-xl font-black tracking-tight text-[#0f0e0c] mb-6">Anmelden</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-mono text-[#8a8780] uppercase tracking-wider mb-1.5">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ihre@email.de"
                className="w-full bg-[#f7f6f2] border border-[#e0ddd6] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2d7a4a] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#8a8780] uppercase tracking-wider mb-1.5">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full bg-[#f7f6f2] border border-[#e0ddd6] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2d7a4a] transition-colors"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 bg-[#1a472a] text-white font-semibold rounded-lg text-sm hover:bg-[#2d7a4a] transition-colors disabled:opacity-60 mt-1">
              {loading ? 'Wird angemeldet...' : 'Anmelden →'}
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-[#e0ddd6] text-center text-sm text-[#8a8780]">
            Noch kein Konto?{' '}
            <Link href="/register" className="text-[#1a472a] font-semibold hover:underline">
              Kostenlos registrieren
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-[#8a8780] mt-4">
          <Link href="/datenschutz" className="hover:underline">Datenschutz</Link>
          {' · '}
          <Link href="/impressum" className="hover:underline">Impressum</Link>
        </p>
      </div>
    </main>
  )
}