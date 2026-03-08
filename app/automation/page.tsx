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

const demoResults = [
  {
    name: 'Kandidat 1',
    score: 92,
    status: 'Sehr gute Übereinstimmung',
    erfahrung: '7 Jahre',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    ausbildung: 'M.Sc. Informatik — TU Berlin',
    empfehlung: 'Zum Gespräch einladen',
    empfehlungColor: 'text-green-700',
    bias: '✓ Bias-geprüft',
  },
  {
    name: 'Kandidat 2',
    score: 87,
    status: 'Sehr gute Übereinstimmung',
    erfahrung: '5 Jahre',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    ausbildung: 'B.Sc. Wirtschaftsinformatik — Uni Köln',
    empfehlung: 'Zum Gespräch einladen',
    empfehlungColor: 'text-green-700',
    bias: '✓ Bias-geprüft',
  },
  {
    name: 'Kandidat 3',
    score: 74,
    status: 'Gute Übereinstimmung',
    erfahrung: '3 Jahre',
    skills: ['JavaScript', 'Vue.js', 'MySQL'],
    ausbildung: 'B.Sc. Informatik — FH Düsseldorf',
    empfehlung: 'Auf Warteliste setzen',
    empfehlungColor: 'text-orange-600',
    bias: '✓ Bias-geprüft',
  },
  {
    name: 'Kandidat 4',
    score: 61,
    status: 'Teilweise Übereinstimmung',
    erfahrung: '2 Jahre',
    skills: ['HTML', 'CSS', 'JavaScript'],
    ausbildung: 'Bootcamp — Web Development',
    empfehlung: 'Auf Warteliste setzen',
    empfehlungColor: 'text-orange-600',
    bias: '✓ Bias-geprüft',
  },
  {
    name: 'Kandidat 5',
    score: 38,
    status: 'Geringe Übereinstimmung',
    erfahrung: '1 Jahr',
    skills: ['Excel', 'Word'],
    ausbildung: 'B.A. BWL — Uni Bonn',
    empfehlung: 'Nicht weiterverfolgen',
    empfehlungColor: 'text-red-600',
    bias: '✓ Bias-geprüft',
  },
]

export default function AutomationPage() {
  const [tab, setTab] = useState<'select' | 'run' | 'results'>('select')
  const [selected, setSelected] = useState('hr')
  const [files, setFiles] = useState<string[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const selectedVertical = verticals.find(v => v.id === selected)!

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = Array.from(e.dataTransfer.files).map(f => f.name)
    setFiles(prev => [...prev, ...dropped])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).map(f => f.name)
      setFiles(prev => [...prev, ...selected])
    }
  }

  const startAnalysis = () => {
    if (files.length === 0) return
    setAnalyzing(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setAnalyzing(false)
          setTab('results')
          return 100
        }
        return prev + 8
      })
    }, 200)
  }

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

          {/* BRANCHE */}
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

          {/* UPLOAD + ANALYSE */}
          {tab === 'run' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">
                  {selectedVertical.icon} {selectedVertical.title}
                </h2>
                <p className="text-sm text-[#8a8780]">CVs hochladen und KI-Analyse starten. Bias-geprüft, KI-Act-konform.</p>
              </div>

              {/* UPLOAD ZONE */}
              <div
                onDrop={handleDrop}
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => document.getElementById('fileInput')?.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center mb-4 cursor-pointer transition-all ${dragOver ? 'border-[#1a472a] bg-green-50/30' : 'border-[#e0ddd6] hover:border-[#1a472a] hover:bg-green-50/10'}`}>
                <input id="fileInput" type="file" multiple accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileInput} />
                <div className="text-4xl mb-3">📎</div>
                <div className="font-bold text-sm mb-1">CVs hier ablegen oder klicken zum Auswählen</div>
                <div className="text-xs text-[#8a8780]">PDF, DOCX, TXT · Bis zu 50 Dateien · Daten werden in der EU verarbeitet</div>
              </div>

              {/* FILE LIST */}
              {files.length > 0 && (
                <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden mb-4">
                  <div className="flex justify-between items-center px-5 py-3 bg-[#f7f6f2] border-b border-[#e0ddd6]">
                    <span className="font-bold text-sm">{files.length} Datei(en) ausgewählt</span>
                    <button onClick={() => setFiles([])} className="text-xs text-[#8a8780] hover:text-red-500">Alle entfernen</button>
                  </div>
                  <div className="max-h-36 overflow-y-auto divide-y divide-[#e0ddd6]">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center justify-between px-5 py-2.5 text-sm">
                        <span className="flex items-center gap-2"><span>📄</span>{f}</span>
                        <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-xs text-[#8a8780] hover:text-red-500">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ANALYZING PROGRESS */}
              {analyzing && (
                <div className="bg-white border border-[#e0ddd6] rounded-xl p-6 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm">KI-Analyse läuft...</span>
                    <span className="font-mono text-sm text-[#2d7a4a]">{progress}%</span>
                  </div>
                  <div className="h-2 bg-[#f7f6f2] rounded-full overflow-hidden border border-[#e0ddd6] mb-3">
                    <div className="h-full bg-[#2d7a4a] rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="text-xs text-[#8a8780] font-mono">
                    {progress < 30 ? '⏳ Dokumente werden eingelesen...' :
                     progress < 60 ? '🔍 Bias-Prüfung läuft...' :
                     progress < 85 ? '🤖 KI-Bewertung wird durchgeführt...' :
                     '✅ Ergebnisse werden aufbereitet...'}
                  </div>
                </div>
              )}

              {/* PIPELINE */}
              <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-[#e0ddd6] bg-[#f7f6f2] flex items-center justify-between">
                  <h3 className="font-bold text-sm">Automatisierungs-Pipeline</h3>
                  <span className="text-xs font-mono bg-green-50 text-green-700 px-2 py-1 rounded-full">KI-Act: Begrenztes Risiko</span>
                </div>
                <div className="divide-y divide-[#e0ddd6]">
                  {[
                    { num: 1, title: 'Dokumenten-Parsing', desc: 'Strukturierte Daten extrahieren: Name, Kontakt, Berufserfahrung, Ausbildung, Fähigkeiten', done: true },
                    { num: 2, title: 'Bias-Prüfung', desc: 'Identifizierende Informationen entfernen — KI-Act Art. 10 konform', done: true },
                    { num: 3, title: 'Kandidatenbewertung', desc: 'Bewertung anhand der Stellenanforderungen. Erklärbare Bewertung', done: false },
                    { num: 4, title: 'Menschliche Prüfung', desc: 'Alle KI-Bewertungen erfordern menschliche Bestätigung — Pflichtaufsicht', done: false },
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
                <button onClick={startAnalysis} disabled={analyzing}
                  className="px-6 py-3 bg-[#0f0e0c] text-white font-semibold rounded-lg text-sm hover:bg-[#1a472a] transition-colors disabled:opacity-50">
                  {files.length > 0 ? `${files.length} CV(s) analysieren →` : 'Demo-Analyse starten →'}
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
                  <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">Analyse-Ergebnisse</h2>
                  <p className="text-sm text-[#8a8780]">{demoResults.length} CVs analysiert · Menschliche Prüfung vor Maßnahmen erforderlich</p>
                </div>
                <button className="px-5 py-2.5 bg-[#0f0e0c] text-white font-semibold rounded-lg text-sm hover:bg-[#1a472a] transition-colors">
                  Export + Prüfprotokoll
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {demoResults.map((c, i) => (
                  <div key={i} className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-[#f7f6f2]/50"
                      onClick={() => setExpandedCard(expandedCard === i ? null : i)}>
                      <div className={`text-2xl font-black tracking-tight w-14 ${c.score >= 80 ? 'text-[#2d7a4a]' : c.score >= 60 ? 'text-[#c85a00]' : 'text-red-500'}`}>
                        {c.score}%
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{c.name}</div>
                        <div className="text-xs text-[#8a8780]">{c.status} · {c.erfahrung} Erfahrung</div>
                      </div>
                      <span className={`text-xs font-semibold ${c.empfehlungColor}`}>{c.empfehlung}</span>
                      <span className="text-xs text-[#8a8780]">{expandedCard === i ? '▲' : '▼'}</span>
                    </div>

                    {expandedCard === i && (
                      <div className="px-6 pb-5 border-t border-[#e0ddd6] pt-4 grid grid-cols-3 gap-4">
                        <div>
                          <div className="font-mono text-xs text-[#8a8780] uppercase tracking-wider mb-2">Fähigkeiten</div>
                          <div className="flex flex-wrap gap-1">
                            {c.skills.map(s => (
                              <span key={s} className="bg-[#f7f6f2] border border-[#e0ddd6] px-2 py-1 rounded text-xs font-mono">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-xs text-[#8a8780] uppercase tracking-wider mb-2">Ausbildung</div>
                          <div className="text-sm text-[#1a1916]">{c.ausbildung}</div>
                        </div>
                        <div>
                          <div className="font-mono text-xs text-[#8a8780] uppercase tracking-wider mb-2">Compliance</div>
                          <div className="text-xs text-green-700 font-mono">{c.bias}</div>
                          <div className="text-xs text-[#8a8780] mt-1">KI-Act Art. 10 konform</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-xs text-[#8a8780]">
                ⚖️ <strong className="text-[#0f0e0c]">KI-Act Compliance-Hinweis:</strong> Diese Bewertungen sind KI-generierte Vorschläge. Menschliche Prüfung ist erforderlich, bevor Kandidaten kontaktiert, abgelehnt oder weitergeleitet werden.
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}