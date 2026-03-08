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

// KI-gestützte Risikoklassifizierung
function autoClassifyRisk(name: string, useCase: string): { risk: string; reason: string } {
  const text = (name + ' ' + useCase).toLowerCase()
  if (
    text.includes('kredit') || text.includes('scoring') || text.includes('bewerbung') ||
    text.includes('recruitment') || text.includes('gesundheit') || text.includes('medizin') ||
    text.includes('biometri') || text.includes('justiz') || text.includes('polizei') ||
    text.includes('versicherung') || text.includes('personalentscheidung')
  ) {
    return { risk: 'high', reason: 'Hochrisiko: Betrifft kritische Entscheidungen über Personen (Art. 6 KI-Act)' }
  }
  if (
    text.includes('chatbot') || text.includes('support') || text.includes('empfehlung') ||
    text.includes('marketing') || text.includes('text') || text.includes('übersetzung') ||
    text.includes('zusammenfassung') || text.includes('klassifizierung')
  ) {
    return { risk: 'limited', reason: 'Begrenztes Risiko: Interagiert mit Nutzern, Transparenzpflicht (Art. 52)' }
  }
  return { risk: 'minimal', reason: 'Minimales Risiko: Kein direkter Personenbezug erkannt' }
}

export default function GovernancePage() {
  const [tab, setTab] = useState<'inventory' | 'checklist' | 'report'>('inventory')
  const [tools, setTools] = useState(initialTools)
  const [checklist, setChecklist] = useState(checklistItems)
  const [showForm, setShowForm] = useState(false)
  const [newTool, setNewTool] = useState({ name: '', vendor: '', useCase: '', risk: 'minimal' })
  const [autoRisk, setAutoRisk] = useState<{ risk: string; reason: string } | null>(null)
  const [generatingPdf, setGeneratingPdf] = useState(false)

  const handleUseCaseChange = (val: string) => {
    setNewTool(t => ({ ...t, useCase: val }))
    if (val.length > 3 || newTool.name.length > 3) {
      const result = autoClassifyRisk(newTool.name, val)
      setAutoRisk(result)
      setNewTool(t => ({ ...t, useCase: val, risk: result.risk }))
    }
  }

  const handleNameChange = (val: string) => {
    setNewTool(t => ({ ...t, name: val }))
    if (val.length > 3 || newTool.useCase.length > 3) {
      const result = autoClassifyRisk(val, newTool.useCase)
      setAutoRisk(result)
      setNewTool(t => ({ ...t, name: val, risk: result.risk }))
    }
  }

  const addTool = () => {
    if (!newTool.name) return
    setTools([...tools, { id: Date.now(), ...newTool, status: 'pending' }])
    setNewTool({ name: '', vendor: '', useCase: '', risk: 'minimal' })
    setAutoRisk(null)
    setShowForm(false)
  }

  const toggleCheck = (id: number) => {
    setChecklist(checklist.map(c => c.id === id ? { ...c, done: !c.done } : c))
  }

  const doneCount = checklist.filter(c => c.done).length
  const categories = [...new Set(checklistItems.map(c => c.category))]
  const complianceScore = Math.round((doneCount / checklist.length) * 100)
  const highRiskCount = tools.filter(t => t.risk === 'high').length

  const downloadPdf = async () => {
    setGeneratingPdf(true)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF()

      // Header
      doc.setFillColor(26, 71, 42)
      doc.rect(0, 0, 210, 30, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.text('EUCompliant.de', 14, 14)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.text('KI-Act Compliance Prüfbericht', 14, 22)
      doc.text(`Erstellt: ${new Date().toLocaleDateString('de-DE')}`, 150, 22)

      // Score Box
      doc.setTextColor(0, 0, 0)
      doc.setFillColor(247, 246, 242)
      doc.rect(14, 38, 182, 28, 'F')
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('Compliance-Score', 20, 50)
      doc.setFontSize(22)
      doc.setTextColor(complianceScore >= 70 ? 45 : 200, complianceScore >= 70 ? 122 : 50, complianceScore >= 70 ? 74 : 0)
      doc.text(`${complianceScore}%`, 20, 62)
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(`${doneCount} von ${checklist.length} Anforderungen erfüllt`, 60, 62)
      doc.setTextColor(200, 50, 50)
      doc.text(`${highRiskCount} Hochrisiko-System(e) erfordern Maßnahmen`, 120, 50)

      // KI Inventar
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(13)
      doc.setFont('helvetica', 'bold')
      doc.text('KI-Inventar', 14, 82)
      doc.setDrawColor(224, 221, 214)
      doc.line(14, 85, 196, 85)

      const headers = ['Tool', 'Anbieter', 'Anwendungsfall', 'Risiko', 'Status']
      const colWidths = [45, 35, 55, 25, 30]
      let x = 14
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.setFillColor(240, 240, 238)
      doc.rect(14, 87, 182, 8, 'F')
      headers.forEach((h, i) => {
        doc.text(h, x + 2, 93)
        x += colWidths[i]
      })

      let y = 103
      doc.setFont('helvetica', 'normal')
      tools.forEach((tool) => {
        if (y > 260) { doc.addPage(); y = 20 }
        x = 14
        const row = [tool.name, tool.vendor || '—', tool.useCase || '—', riskLabel[tool.risk], statusLabel[tool.status]]
        row.forEach((cell, i) => {
          const maxWidth = colWidths[i] - 3
          const truncated = doc.getTextWidth(cell) > maxWidth ? cell.substring(0, Math.floor(maxWidth / 2)) + '…' : cell
          if (i === 3) {
            doc.setTextColor(tool.risk === 'high' ? 180 : tool.risk === 'limited' ? 180 : 45, tool.risk === 'high' ? 50 : tool.risk === 'limited' ? 100 : 122, tool.risk === 'high' ? 50 : 74)
          } else {
            doc.setTextColor(0, 0, 0)
          }
          doc.text(truncated, x + 2, y)
          x += colWidths[i]
        })
        doc.setDrawColor(240, 238, 234)
        doc.line(14, y + 3, 196, y + 3)
        y += 10
      })

      // Checkliste
      y += 8
      if (y > 240) { doc.addPage(); y = 20 }
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(13)
      doc.setFont('helvetica', 'bold')
      doc.text('Compliance-Checkliste', 14, y)
      y += 5
      doc.setDrawColor(224, 221, 214)
      doc.line(14, y, 196, y)
      y += 10

      categories.forEach(cat => {
        if (y > 260) { doc.addPage(); y = 20 }
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(26, 71, 42)
        doc.text(cat, 14, y)
        y += 7
        checklist.filter(c => c.category === cat).forEach(item => {
          if (y > 265) { doc.addPage(); y = 20 }
          doc.setFontSize(9)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(item.done ? 100 : 0, item.done ? 100 : 0, item.done ? 100 : 0)
          doc.text(`${item.done ? '✓' : '○'} ${item.text}`, 20, y)
          y += 6
        })
        y += 3
      })

      // Footer
      doc.setFillColor(26, 71, 42)
      doc.rect(0, 285, 210, 12, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(8)
      doc.text('EUCompliant.de — KI-Act Compliance Plattform · Köln, Deutschland', 14, 293)
      doc.text(`Seite 1`, 190, 293)

      doc.save(`KI-Compliance-Bericht-${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (e) {
      console.error(e)
    }
    setGeneratingPdf(false)
  }

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
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">KI-Inventar</h2>
                <p className="text-sm text-[#8a8780]">Erfassen Sie alle KI-Tools Ihres Unternehmens. Risikoniveau wird automatisch klassifiziert.</p>
              </div>

              {highRiskCount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 mb-6">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <div className="font-semibold text-sm text-red-700 mb-1">
                      {highRiskCount} Hochrisiko-System{highRiskCount > 1 ? 'e' : ''} erkannt
                    </div>
                    <div className="text-xs text-red-600">
                      Erfordert Konformitätsbewertung und EU KI-Act Registrierung.{' '}
                      <button onClick={() => setTab('checklist')} className="underline">Checkliste ansehen →</button>
                    </div>
                  </div>
                </div>
              )}

              {showForm && (
                <div className="bg-white border border-[#e0ddd6] rounded-xl p-6 mb-4">
                  <div className="font-bold text-sm mb-4">KI-Tool hinzufügen</div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-mono text-[#8a8780] uppercase tracking-wider mb-1">Tool-Name</label>
                      <input value={newTool.name} onChange={e => handleNameChange(e.target.value)}
                        placeholder="z.B. OpenAI API"
                        className="w-full bg-[#f7f6f2] border border-[#e0ddd6] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2d7a4a]" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#8a8780] uppercase tracking-wider mb-1">Anwendungsfall</label>
                      <input value={newTool.useCase} onChange={e => handleUseCaseChange(e.target.value)}
                        placeholder="z.B. Kreditbewertung"
                        className="w-full bg-[#f7f6f2] border border-[#e0ddd6] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2d7a4a]" />
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

                  {/* AUTO RISK BADGE */}
                  {autoRisk && (
                    <div className={`flex items-start gap-2 p-3 rounded-lg mb-3 text-xs ${autoRisk.risk === 'high' ? 'bg-red-50 border border-red-200 text-red-700' : autoRisk.risk === 'limited' ? 'bg-orange-50 border border-orange-200 text-orange-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>
                      <span className="text-base">🤖</span>
                      <div>
                        <strong>KI-Klassifizierung: {riskLabel[autoRisk.risk]}</strong>
                        <div className="mt-0.5 opacity-80">{autoRisk.reason}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button onClick={addTool} className="px-4 py-2 bg-[#1a472a] text-white rounded-lg text-sm font-semibold hover:bg-[#2d7a4a]">Hinzufügen</button>
                    <button onClick={() => { setShowForm(false); setAutoRisk(null) }} className="px-4 py-2 border border-[#e0ddd6] rounded-lg text-sm text-[#8a8780] hover:bg-[#f7f6f2]">Abbrechen</button>
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
                  <p className="text-sm text-[#8a8780]">KI-Act Artikel als umsetzbare Aufgaben.</p>
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
                <p className="text-sm text-[#8a8780]">Vollständiger EU KI-Act Compliance-Bericht — automatisch generiert.</p>
              </div>

              <div className="bg-white border border-[#e0ddd6] rounded-xl p-10 text-center mb-6">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-xl font-black tracking-tight mb-2">KI-Act Compliance-Bericht</h3>
                <p className="text-sm text-[#8a8780] max-w-sm mx-auto mb-6">
                  Enthält KI-Inventar, Risikoklassifizierung, Checkliste und Compliance-Score. Bereit für Prüfer, Investoren oder Behörden.
                </p>
                <div className="flex gap-3 justify-center">
                  <button onClick={downloadPdf} disabled={generatingPdf}
                    className="px-6 py-3 bg-[#0f0e0c] text-white font-semibold rounded-lg text-sm hover:bg-[#1a472a] transition-colors disabled:opacity-60 flex items-center gap-2">
                    {generatingPdf ? '⏳ Wird generiert...' : '⬇ PDF herunterladen'}
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
                    { label: 'Hochrisiko-Systeme', value: `${highRiskCount} (Handlungsbedarf)`, red: highRiskCount > 0 },
                    { label: 'Compliance-Score', value: `${complianceScore}% — ${complianceScore >= 70 ? 'Gut' : 'Handlungsbedarf'}`, green: complianceScore >= 70 },
                    { label: 'Berichtsdatum', value: new Date().toLocaleDateString('de-DE') },
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