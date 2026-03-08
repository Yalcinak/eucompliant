'use client'
import Link from 'next/link'
import { useState } from 'react'

const verticals = [
  {
    id: 'hr', icon: '👥', title: 'HR & Recruiting',
    desc: 'Automate candidate screening, CV parsing, and scoring. Reduce time-to-hire by 60%.',
    automations: ['CV parsing & structured extraction', 'Candidate scoring (bias-checked)', 'Interview question generation', 'Job description optimization'],
  },
  {
    id: 'property', icon: '🏠', title: 'Property Management',
    desc: 'Automate tenant documents, lease reviews, and maintenance request routing.',
    automations: ['Tenant document processing', 'Lease agreement summarization', 'Maintenance ticket classification', 'Rent reminder automation'],
  },
  {
    id: 'ecommerce', icon: '🛒', title: 'E-Commerce',
    desc: 'Automate customer support, refund decisions, and product descriptions at scale.',
    automations: ['Refund request automation', 'Support ticket classification', 'Product description generation', 'Review sentiment analysis'],
  },
  {
    id: 'legal', icon: '⚖️', title: 'Legal & Compliance',
    desc: 'Contract review, GDPR compliance checks, and regulatory document summarization.',
    automations: ['Contract clause extraction', 'GDPR data mapping', 'Regulatory change monitoring', 'NDA comparison'],
  },
  {
    id: 'healthcare', icon: '💊', title: 'Healthcare Admin',
    desc: 'Automate medical document processing, appointment scheduling, and triage notes.',
    automations: ['Patient intake summarization', 'Medical document classification', 'Appointment note generation'],
  },
  {
    id: 'fintech', icon: '🏦', title: 'FinTech',
    desc: 'Automate KYC document review, transaction categorization, and compliance reports.',
    automations: ['KYC document extraction', 'Transaction categorization', 'Fraud alert summarization'],
  },
]

const candidates = [
  { name: 'Anna Müller', score: 92, status: 'Strong match' },
  { name: 'Thomas Berger', score: 87, status: 'Strong match' },
  { name: 'Sarah K.', score: 79, status: 'Good match' },
  { name: 'Candidate D', score: 71, status: 'Good match' },
  { name: 'Candidate E', score: 58, status: 'Partial match' },
  { name: 'Candidate F', score: 44, status: 'Low match' },
]

export default function AutomationPage() {
  const [tab, setTab] = useState<'select' | 'run' | 'results'>('select')
  const [selected, setSelected] = useState('hr')

  const selectedVertical = verticals.find(v => v.id === selected)!

  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-sm border-b border-[#e0ddd6] h-[60px] flex items-center justify-between px-10">
        <Link href="/" className="font-bold text-lg tracking-tight">
          EUCompliant<span className="text-[#2d7a4a]">.de</span>
        </Link>
        <div className="flex gap-1 items-center">
          <Link href="/governance" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">AI Governance</Link>
          <Link href="/gateway" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">AI Gateway</Link>
          <Link href="/automation" className="px-4 py-1.5 text-sm font-semibold text-[#0f0e0c] bg-[#efefeb] rounded-md">Automation</Link>
        </div>
      </nav>

      <div className="pt-[60px]">
        {/* SUB NAV */}
        <div className="bg-white border-b border-[#e0ddd6] flex px-10 h-[52px] items-center">
          {(['select', 'run', 'results'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 h-full text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-[#0f0e0c] text-[#0f0e0c] font-semibold' : 'border-transparent text-[#8a8780] hover:text-[#0f0e0c]'}`}>
              {t === 'select' ? '🏢 Select Vertical' : t === 'run' ? '▶ Run Automation' : '📊 Results'}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-10 py-10">

          {/* SELECT TAB */}
          {tab === 'select' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">Vertical Automations</h2>
                <p className="text-sm text-[#8a8780]">Pre-built AI workflows for your sector. Compliant with EU AI Act by default.</p>
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
                Configure {selectedVertical.title} →
              </button>
            </div>
          )}

          {/* RUN TAB */}
          {tab === 'run' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">
                  {selectedVertical.icon} {selectedVertical.title}
                </h2>
                <p className="text-sm text-[#8a8780]">Upload files and get AI-processed results. EU AI Act compliant by default.</p>
              </div>

              {/* UPLOAD ZONE */}
              <div className="bg-white border-2 border-dashed border-[#e0ddd6] rounded-xl p-10 text-center mb-6 hover:border-[#1a472a] transition-colors cursor-pointer">
                <div className="text-4xl mb-3">📎</div>
                <div className="font-bold text-sm mb-1">Drop files here</div>
                <div className="text-xs text-[#8a8780]">PDF, DOCX, TXT · Up to 50 files · Data processed in EU</div>
              </div>

              {/* PIPELINE */}
              <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-[#e0ddd6] bg-[#f7f6f2] flex items-center justify-between">
                  <h3 className="font-bold text-sm">Automation Pipeline</h3>
                  <span className="text-xs font-mono bg-green-50 text-green-700 px-2 py-1 rounded-full">AI Act: Limited Risk</span>
                </div>
                <div className="divide-y divide-[#e0ddd6]">
                  {[
                    { num: 1, title: 'Document Parsing', desc: 'Extract structured data: name, contact, work history, education, skills', done: true },
                    { num: 2, title: 'Bias Check', desc: 'Remove identifying info (gender, age, ethnicity) before scoring — AI Act Art. 10 compliant', done: true },
                    { num: 3, title: 'Candidate Scoring', desc: 'Score against job requirements. Explainable scoring — human review required for final decision', done: false },
                    { num: 4, title: 'Human Review Flag', desc: 'All AI scores require human confirmation before candidate communication — mandatory oversight', done: false },
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
                  Run on Sample Data →
                </button>
                <button className="px-5 py-3 border border-[#e0ddd6] rounded-lg text-sm hover:bg-[#f7f6f2] transition-colors">
                  Download Audit Log
                </button>
              </div>
            </div>
          )}

          {/* RESULTS TAB */}
          {tab === 'results' && (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">Results</h2>
                  <p className="text-sm text-[#8a8780]">{candidates.length} CVs processed · Human review required before action</p>
                </div>
                <button className="px-5 py-2.5 bg-[#0f0e0c] text-white font-semibold rounded-lg text-sm hover:bg-[#1a472a] transition-colors">
                  Export + Audit Log
                </button>
              </div>

              <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-[1fr_120px_120px_100px] gap-3 px-6 py-3 bg-[#f7f6f2] border-b border-[#e0ddd6]">
                  {['Candidate', 'Match Score', 'Status', 'Action'].map(h => (
                    <div key={h} className="font-mono text-xs text-[#8a8780] uppercase tracking-wider">{h}</div>
                  ))}
                </div>
                {candidates.map((c, i) => (
                  <div key={i} className="grid grid-cols-[1fr_120px_120px_100px] gap-3 px-6 py-4 border-b border-[#e0ddd6] last:border-0 hover:bg-[#f7f6f2]/50 items-center">
                    <div className="font-semibold text-sm">{c.name}</div>
                    <div className={`font-mono font-bold text-sm ${c.score >= 80 ? 'text-[#2d7a4a]' : c.score >= 60 ? 'text-[#c85a00]' : 'text-[#8a8780]'}`}>
                      {c.score}%
                    </div>
                    <div>
                      <span className="text-xs bg-[#f7f6f2] text-[#8a8780] px-2 py-1 rounded-full font-mono">{c.status}</span>
                    </div>
                    <button className="text-xs border border-[#e0ddd6] px-3 py-1.5 rounded-lg hover:bg-[#f7f6f2] transition-colors">
                      Review ↗
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-xs text-[#8a8780]">
                ⚖️ <strong className="text-[#0f0e0c]">AI Act compliance note:</strong> These scores are AI-generated suggestions. Human review is required before contacting, rejecting, or advancing any candidate. All decisions are logged for audit.
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}