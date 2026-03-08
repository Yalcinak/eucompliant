'use client'
import Link from 'next/link'
import { useState } from 'react'

const verticals = [
  {
    id: 'hr', icon: '👥', title: 'HR & Recruiting',
    desc: 'Automatisieren Sie Kandidatenscreening, CV-Parsing und Bewertung. Reduzieren Sie die Time-to-Hire um 60%.',
    automations: ['CV-Parsing & strukturierte Extraktion', 'Kandidatenbewertung (Bias-geprüft)', 'Interview-Fragengenerierung', 'Stellenbeschreibungsoptimierung'],
  },
  {
    id: 'property', icon: '🏠', title: 'Immobilienverwaltung',
    desc: 'Automatisieren Sie Mieterdokumente, Mietvertragsprüfungen und Wartungsanfragen.',
    automations: ['Mieterdokument-Verarbeitung', 'Mietvertrag-Zusammenfassung', 'Wartungsticket-Klassifizierung', 'Mieterinnerungs-Automatisierung'],
  },
  {
    id: 'ecommerce', icon: '🛒', title: 'E-Commerce',
    desc: 'Automatisieren Sie Kundensupport, Rückerstattungsentscheidungen und Produktbeschreibungen.',
    automations: ['Rückerstattungsanfragen-Automatisierung', 'Support-Ticket-Klassifizierung', 'Produktbeschreibungsgenerierung', 'Bewertungs-Sentiment-Analyse'],
  },
  {
    id: 'legal', icon: '⚖️', title: 'Recht & Compliance',
    desc: 'Vertragsprüfung, DSGVO-Compliance-Checks und regulatorische Dokumentenzusammenfassung.',
    automations: ['Vertragsklausel-Extraktion', 'DSGVO-Datenmapping', 'Regulatorisches Änderungs-Monitoring', 'NDA-Vergleich'],
  },
  {
    id: 'healthcare', icon: '💊', title: 'Gesundheitswesen',
    desc: 'Automatisieren Sie medizinische Dokumentenverarbeitung und Terminplanung.',
    automations: ['Patientenaufnahme-Zusammenfassung', 'Medizinische Dokumentenklassifizierung', 'Terminnotiz-Generierung'],
  },
  {
    id: 'fintech', icon: '🏦', title: 'FinTech',
    desc: 'Automatisieren Sie KYC-Dokumentenprüfung, Transaktionskategorisierung und Compliance-Berichte.',
    automations: ['KYC-Dokumentenextraktion', 'Transaktionskategorisierung', 'Betrugsmeldungs-Zusammenfassung'],
  },
]

const candidates = [
  { name: 'Anna Müller', score: 92, status: 'Sehr gute Übereinstimmung' },
  { name: 'Thomas Berger', score: 87, status: 'Sehr gute Übereinstimmung' },
  { name: 'Sarah K.', score: 79, status: 'Gute Übereinstimmung' },
  { name: 'Kandidat D', score: 71, status: 'Gute Übereinstimmung' },
  { name: 'Kandidat E', score: 58, status: 'Teilweise Übereinstimmung' },
  { name: 'Kandidat F', score: 44, status: 'Geringe Übereinstimmung' },
]

export default function AutomationPage() {
  const [tab, setTab] = useState<'select' | 'run' | 'results'>('select')
  const [selected, setSelected] = useState('hr')

  const selectedVertical = verticals.find(v => v.id === selected)!

  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-sm border-b border-[#e0ddd6] h-[60px] flex items-center justify-between px-10">
        <Link href="/" className="font-bold text-lg tracking-tight">
          EUCompliant<span className="text-[#2d7a4a]">.de</span>
        </Link>
        <div className="flex gap-1 items-center">
          <Link href="/governance" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">KI-Governance</Link>
          <Link href="/gateway" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">KI-Gateway</Link>
          <Link href="/automation" className="px-4 py-1.5 text-sm font-semibold text-[#0f0e0c] bg-[#efefeb] rounded-md">Automatisierung</Link>
        </div>
      </nav>

      <div className="pt-[60px]">
        <div className="bg-white border-b border-[#e0ddd6] flex px-10 h-[52px] items-center">
          {(['select', 'run', 'results'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 h-full text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-[#0f0e0c] text-[#0f0e0c] font-semibold' : 'border-transparent text-[#8a8780] hover:text-[#0f0e0c]'}`}>
              {t === 'select' ? '🏢 Branche wählen' : t === 'run' ? '▶ Automatisierung starten' : '📊 Ergebnisse'}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-10 py-10">

          {/* BRANCHE WÄHLEN */}
          {tab === 'select' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">Vertikale Automatisierungen</h2>
                <p className="text-sm text-[#8a8780]">Vorgefertigte KI-Workflows für Ihre Branche. Standardmäßig KI-Act-konform.</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {verticals.map(v => (
                  <div key={v.id} onClick={() => setSelected(v.id)}
                    className={`bg-white border rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 ${selected === v.id ? 'border-[#1a472a] shadow-sm bg-green-50/30' : 'border-[#e0ddd6] hover:border-[#1a472a]/40'}`}>
                    <div className="text-3xl mb-3">{v.icon}</div>
                    <div className="font-bold text-sm text-[#0f0e0c] mb-2">{v.title}</div>
                    <div className="text-xs text-[#8a8780] leading-relaxed mb-3">{v.desc}</div>
                    <div className="flex flex-col gap-1.5">
                      {v.automations.slice(0, 3).map(a => (
                        <div key={a} className="text-xs text-[#1a1916] flex items-center gap-1.5">
                          <span className="text-[#2d7a4a] font-bold">→</span>{a}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setTab('run')}
                className="px-6 py-3 bg-[#0f0e0c] text-white font-semibold rounded-lg text-sm hover:bg-[#1a472a] transition-colors">
                {selectedVertical.title} konfigurieren →
              </button>
            </div>
          )}

          {/* AUTOMATISIERUNG STARTEN */}
          {tab === 'run' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">
                  {selectedVertical.icon} {selectedVertical.title}
                </h2>
                <p className="text-sm text-[#8a8780]">Dateien hochladen und KI-verarbeitete Ergebnisse erhalten. Standardmäßig KI-Act-konform.</p>
              </div>

              <div className="bg-white border-2 border-dashed border-[#e0ddd6] rounded-xl p-10 text-center mb-6 hover:border-[#1a472a] transition-colors cursor-pointer">
                <div className="text-4xl mb-3">📎</div>
                <div className="font-bold text-sm mb-1">Dateien hier ablegen</div>
                <div className="text-xs text-[#8a8780]">PDF, DOCX, TXT · Bis zu 50 Dateien · Daten werden in der EU verarbeitet</div>
              </div>

              <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-[#e0ddd6] bg-[#f7f6f2] flex items-center justify-between">
                  <h3 className="font-bold text-sm">Automatisierungs-Pipeline</h3>
                  <span className="text-xs font-mono bg-green-50 text-green-700 px-2 py-1 rounded-full">KI-Act: Begrenztes Risiko</span>
                </div>
                <div className="divide-y divide-[#e0ddd6]">
                  {[
                    { num: 1, title: 'Dokumenten-Parsing', desc: 'Strukturierte Daten extrahieren: Name, Kontakt, Berufserfahrung, Ausbildung, Fähigkeiten', done: true },
                    { num: 2, title: 'Bias-Prüfung', desc: 'Identifizierende Informationen entfernen (Geschlecht, Alter, Herkunft) — KI-Act Art. 10 konform', done: true },
                    { num: 3, title: 'Kandidatenbewertung', desc: 'Bewertung anhand der Stellenanforderungen. Erklärbare Bewertung — menschliche Überprüfung erforderlich', done: false },
                    { num: 4, title: 'Menschliche Prüfung', desc: 'Alle KI-Bewertungen erfordern menschliche Bestätigung vor Kandidatenkommunikation — Pflichtaufsicht', done: false },
                  ].map(step => (
                    <div key={step.num} className="flex items-start gap-4 px-6 py-4">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 ${step.done ? 'bg-green-100 text-green-700' : 'bg-[#f7f6f2] text-[#8a8780]'}`}>
                        {step.done ? '✓' : step.num}
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-0.5">{step.title}</div>
                        <div className="text-xs text-[#8a8780] leading-relaxed">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setTab('results')}
                  className="px-6 py-3 bg-[#0f0e0c] text-white font-semibold rounded-lg text-sm hover:bg-[#1a472a] transition-colors">
                  Mit Beispieldaten ausführen →
                </button>
                <button className="px-5 py-3 border border-[#e0ddd6] rounded-lg text-sm hover:bg-[#f7f6f2] transition-colors">
                  Prüfprotokoll herunterladen
                </button>
              </div>
            </div>
          )}

          {/* ERGEBNISSE */}
          {tab === 'results' && (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">Ergebnisse</h2>
                  <p className="text-sm text-[#8a8780]">{candidates.length} CVs verarbeitet · Menschliche Prüfung vor Maßnahmen erforderlich</p>
                </div>
                <button className="px-5 py-2.5 bg-[#0f0e0c] text-white font-semibold rounded-lg text-sm hover:bg-[#1a472a] transition-colors">
                  Export + Prüfprotokoll
                </button>
              </div>

              <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-[1fr_120px_180px_100px] gap-3 px-6 py-3 bg-[#f7f6f2] border-b border-[#e0ddd6]">
                  {['Kandidat', 'Übereinstimmung', 'Status', 'Aktion'].map(h => (
                    <div key={h} className="font-mono text-xs text-[#8a8780] uppercase tracking-wider">{h}</div>
                  ))}
                </div>
                {candidates.map((c, i) => (
                  <div key={i} className="grid grid-cols-[1fr_120px_180px_100px] gap-3 px-6 py-4 border-b border-[#e0ddd6] last:border-0 hover:bg-[#f7f6f2]/50 items-center">
                    <div className="font-semibold text-sm">{c.name}</div>
                    <div className={`font-mono font-bold text-sm ${c.score >= 80 ? 'text-[#2d7a4a]' : c.score >= 60 ? 'text-[#c85a00]' : 'text-[#8a8780]'}`}>
                      {c.score}%
                    </div>
                    <div>
                      <span className="text-xs bg-[#f7f6f2] text-[#8a8780] px-2 py-1 rounded-full font-mono">{c.status}</span>
                    </div>
                    <button className="text-xs border border-[#e0ddd6] px-3 py-1.5 rounded-lg hover:bg-[#f7f6f2] transition-colors">
                      Prüfen ↗
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-xs text-[#8a8780]">
                ⚖️ <strong className="text-[#0f0e0c]">KI-Act Compliance-Hinweis:</strong> Diese Bewertungen sind KI-generierte Vorschläge. Menschliche Prüfung ist erforderlich, bevor Kandidaten kontaktiert, abgelehnt oder weitergeleitet werden. Alle Entscheidungen werden für die Prüfung protokolliert.
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}