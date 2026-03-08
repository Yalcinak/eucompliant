'use client'
import Link from 'next/link'
import { useState } from 'react'

const initialTools = [
  { id: 1, name: 'OpenAI GPT-4o', vendor: 'OpenAI', useCase: 'Kunden-Support Chatbot', risk: 'limited', status: 'documented' },
  { id: 2, name: 'Midjourney', vendor: 'Midjourney Inc.', useCase: 'Marketing Bildgenerierung', risk: 'minimal', status: 'documented' },
  { id: 3, name: 'Internes ML-Modell', vendor: 'Intern', useCase: 'Kreditbewertung', risk: 'high', status: 'action' },
  { id: 4, name: 'HubSpot KI', vendor: 'HubSpot', useCase: 'Lead-Bewertung', risk: 'limited', status: 'documented' },
]

const riskStyle: Record<string, string> = {
  minimal: 'bg-green-50 text-green-700',
  limited: 'bg-orange-50 text-orange-600',
  high: 'bg-red-50 text-red-600',
}

const riskLabel: Record<string, string> = {
  minimal: 'Minimal',
  limited: 'Begrenzt',
  high: 'Hohes Risiko',
}

const statusStyle: Record<string, string> = {
  documented: 'bg-green-50 text-green-700',
  action: 'bg-orange-50 text-orange-600',
  pending: 'bg-gray-100 text-gray-500',
}

const statusLabel: Record<string, string> = {
  documented: 'Dokumentiert',
  action: 'Handlungsbedarf',
  pending: 'Ausstehend',
}

const checklistItems = [
  { id: 1, category: 'Dokumentation', text: 'Technische Dokumentation (Art. 11)', done: true },
  { id: 2, category: 'Dokumentation', text: 'Aufzeichnungssystem eingerichtet (Art. 12)', done: true },
  { id: 3, category: 'Dokumentation', text: 'Datenverwaltungsrichtlinie dokumentiert (Art. 10)', done: false },
  { id: 4, category: 'Dokumentation', text: 'Gebrauchsanweisung erstellt (Art. 13)', done: false },
  { id: 5, category: 'Transparenz', text: 'Nutzer über KI-Interaktion informiert (Art. 52)', done: true },
  { id: 6, category: 'Transparenz', text: 'Fähigkeiten und Grenzen offengelegt', done: false },
  { id: 7, category: 'Transparenz', text: 'KI-generierte Inhalte gekennzeichnet', done: false },
  { id: 8, category: 'Menschliche Aufsicht', text: 'Eingriffsmechanismen dokumentiert (Art. 14)', done: true },
  { id: 9, category: 'Menschliche Aufsicht', text: 'Menschliche Prüfung bei Hochrisiko-Ausgaben', done: false },
  { id: 10, category: 'Menschliche Aufsicht', text: 'KI-Beauftragter benannt', done: false },
  { id: 11, category: 'Risikomanagement', text: 'Risikobewertung abgeschlossen (Art. 9)', done: true },
  { id: 12, category: 'Risikomanagement', text: 'Bias-Tests durchgeführt', done: true },
  { id: 13, category: 'Risikomanagement', text: 'Konformitätsbewertung registriert', done: false },
]

export default function GovernancePage() {
  const [tab, setTab] = useState<'inventory' | 'checklist' | 'report'>('inventory')
  const [tools, setTools] = useState(initialTools)
  const [checklist, setChecklist] = useState(checklistItems)
  const [showForm, setShowForm] = useState(false)
  const [newTool, setNewTool] = useState({ name: '', vendor: '', useCase: '', risk: 'minimal' })

  const addTool = () => {
    if (!newTool.name) return
    setTools([...tools, { id: Date.now(), ...newTool, status: 'pending' }])
    setNewTool({ name: '', vendor: '', useCase: '', risk: 'minimal' })
    setShowForm(false)
  }

  const toggleCheck = (id: number) => {
    setChecklist(checklist.map(c => c.id === id ? { ...c, done: !c.done } : c))
  }

  const doneCount = checklist.filter(c => c.done).length
  const categories = [...new Set(checklistItems.map(c => c.category))]

  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-sm border-b border-[#e0ddd6] h-[60px] flex items-center justify-between px-10">
        <Link href="/" className="font-bold text-lg tracking-tight">
          EUCompliant<span className="text-[#2d7a4a]">.de</span>
        </Link>
        <div className="flex gap-1 items-center">
          <Link href="/governance" className="px-4 py-1.5 text-sm font-semibold text-[#0f0e0c] bg-[#efefeb] rounded-md">KI-Governance</Link>
          <Link href="/gateway" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">KI-Gateway</Link>
          <Link href="/automation" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">Automatisierung</Link>
        </div>
      </nav>

      <div className="pt-[60px]">
        <div className="bg-white border-b border-[#e0ddd6] flex px-10 h-[52px] items-center gap-0">
          {(['inventory', 'checklist', 'report'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 h-full text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-[#0f0e0c] text-[#0f0e0c] font-semibold' : 'border-transparent text-[#8a8780] hover:text-[#0f0e0c]'}`}>
              {t === 'inventory' ? '📦 KI-Inventar' : t === 'checklist' ? '✅ Compliance-Checkliste' : '📄 Prüfbericht'}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-10 py-10">

          {/* INVENTAR */}
          {tab === 'inventory' && (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">KI-Inventar</h2>
                  <p className="text-sm text-[#8a8780]">Erfassen Sie alle KI-Tools Ihres Unternehmens und deren Risikoniveau gemäß EU KI-Act.</p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 mb-6">
                <span className="text-xl">⚠️</span>
                <div>
                  <div className="font-semibold text-sm text-red-700 mb-1">Hochrisiko-System erkannt: Internes ML-Modell</div>
                  <div className="text-xs text-red-600">Erfordert Konformitätsbewertung, Dokumentation der menschlichen Aufsicht und EU KI-Act Registrierung.{' '}
                    <button onClick={() => setTab('checklist')} className="underline">Checkliste ansehen →</button>
                  </div>
                </div>
              </div>

              {showForm && (
                <div className="bg-white border border-[#e0ddd6] rounded-xl p-6 mb-4">
                  <div className="font-bold text-sm mb-4">KI-Tool hinzufügen</div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-mono text-[#8a8780] uppercase tracking-wider mb-1">Tool-Name</label>
                      <input value={newTool.name} onChange={e => setNewTool({...newTool, name: e.target.value})}
                        placeholder="z.B. OpenAI API" className="w-full bg-[#f7f6f2] border border-[#e0ddd6] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2d7a4a]" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#8a8780] uppercase tracking-wider mb-1">Anwendungsfall</label>
                      <input value={newTool.useCase} onChange={e => setNewTool({...newTool, useCase: e.target.value})}
                        placeholder="z.B. Kunden-Support" className="w-full bg-[#f7f6f2] border border-[#e0ddd6] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2d7a4a]" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#8a8780] uppercase tracking-wider mb-1">Risikoniveau</label>
                      <select value={newTool.risk} onChange={e => setNewTool({...newTool, risk: e.target.value})}
                        className="w-full bg-[#f7f6f2] border border-[#e0ddd6] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2d7a4a]">
                        <option value="minimal">Minimal</option>
                        <option value="limited">Begrenzt</option>
                        <option value="high">Hohes Risiko</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={addTool} className="px-4 py-2 bg-[#1a472a] text-white rounded-lg text-sm font-semibold hover:bg-[#2d7a4a]">Hinzufügen</button>
                    <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#e0ddd6] rounded-lg text-sm text-[#8a8780] hover:bg-[#f7f6f2]">Abbrechen</button>
                  </div>
                </div>
              )}

              <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 bg-[#f7f6f2] border-b border-[#e0ddd6]">
                  <h3 className="font-bold text-sm">KI-Tools Register</h3>
                  <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f0e0c] text-white rounded-lg text-xs font-semibold hover:bg-[#1a472a]">
                    + Tool hinzufügen
                  </button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f7f6f2] border-b border-[#e0ddd6]">
                      {['Tool', 'Anbieter', 'Anwendungsfall', 'Risikoniveau', 'Status'].map(h => (
                        <th key={h} className="px-4 py-3 text-left font-mono text-xs text-[#8a8780] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tools.map(tool => (
                      <tr key={tool.id} className="border-b border-[#e0ddd6] hover:bg-[#f7f6f2]/50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-sm">{tool.name}</td>
                        <td className="px-4 py-3 text-sm text-[#8a8780]">{tool.vendor || '—'}</td>
                        <td className="px-4 py-3 text-sm text-[#8a8780]">{tool.useCase || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-mono px-2 py-1 rounded-full ${riskStyle[tool.risk]}`}>
                            ● {riskLabel[tool.risk]}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-mono px-2 py-1 rounded-full ${statusStyle[tool.status]}`}>
                            {statusLabel[tool.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CHECKLISTE */}
          {tab === 'checklist' && (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">Compliance-Checkliste</h2>
                  <p className="text-sm text-[#8a8780]">KI-Act Artikel als umsetzbare Aufgaben. Verfolgen Sie Ihren Compliance-Fortschritt.</p>
                </div>
                <div className="font-mono text-sm text-[#8a8780]">
                  Fortschritt: <strong className="text-[#0f0e0c]">{doneCount}/{checklist.length}</strong>
                </div>
              </div>

              <div className="h-2 bg-[#e0ddd6] rounded-full mb-8 overflow-hidden">
                <div className="h-full bg-[#2d7a4a] rounded-full transition-all" style={{ width: `${(doneCount / checklist.length) * 100}%` }} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {categories.map(cat => (
                  <div key={cat} className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-[#e0ddd6] flex items-center justify-between bg-[#f7f6f2]">
                      <h4 className="font-bold text-sm">{cat}</h4>
                      <span className="font-mono text-xs text-[#2d7a4a]">
                        {checklist.filter(c => c.category === cat && c.done).length}/{checklist.filter(c => c.category === cat).length}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      {checklist.filter(c => c.category === cat).map(item => (
                        <label key={item.id} className={`flex items-start gap-3 text-sm cursor-pointer p-2 rounded-lg hover:bg-[#f7f6f2] ${item.done ? 'text-[#8a8780] line-through' : 'text-[#1a1916]'}`}>
                          <input type="checkbox" checked={item.done} onChange={() => toggleCheck(item.id)}
                            className="mt-0.5 accent-[#1a472a] w-4 h-4 flex-shrink-0 cursor-pointer" />
                          {item.text}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRÜFBERICHT */}
          {tab === 'report' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">Prüfbericht</h2>
                <p className="text-sm text-[#8a8780]">Erstellen Sie einen vollständigen EU KI-Act Compliance-Bericht für Prüfer oder internen Gebrauch.</p>
              </div>

              <div className="bg-white border border-[#e0ddd6] rounded-xl p-10 text-center mb-6">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-xl font-black tracking-tight mb-2">KI-Act Compliance-Bericht</h3>
                <p className="text-sm text-[#8a8780] max-w-sm mx-auto mb-6">Automatisch aus Ihrem Inventar und Ihrer Checkliste generiert. Bereit für Prüfer, Investoren oder Behörden.</p>
                <div className="flex gap-3 justify-center">
                  <button className="px-6 py-3 bg-[#0f0e0c] text-white font-semibold rounded-lg text-sm hover:bg-[#1a472a] transition-colors">
                    PDF-Bericht generieren
                  </button>
                  <button className="px-5 py-3 border border-[#e0ddd6] rounded-lg text-sm hover:bg-[#f7f6f2] transition-colors">
                    An Team senden
                  </button>
                </div>
              </div>

              <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#e0ddd6] font-bold text-sm bg-[#f7f6f2]">Berichtsvorschau</div>
                <div className="divide-y divide-[#e0ddd6]">
                  {[
                    { label: 'Unternehmen', value: 'Ihr Unternehmen GmbH' },
                    { label: 'Erfasste KI-Systeme', value: `${tools.length} Tools` },
                    { label: 'Hochrisiko-Systeme', value: `${tools.filter(t => t.risk === 'high').length} (Handlungsbedarf)`, red: true },
                    { label: 'Compliance-Score', value: `${Math.round((doneCount / checklist.length) * 100)}% — ${doneCount >= 10 ? 'Gut' : 'Handlungsbedarf'}`, green: doneCount >= 10 },
                    { label: 'Berichtsdatum', value: 'März 2026' },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between px-6 py-4 text-sm">
                      <span className="text-[#8a8780]">{row.label}</span>
                      <span className={`font-semibold ${row.red ? 'text-red-600' : row.green ? 'text-[#2d7a4a]' : 'text-[#0f0e0c]'}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}