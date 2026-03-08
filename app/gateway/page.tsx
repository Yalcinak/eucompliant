'use client'
import Link from 'next/link'
import { useState } from 'react'

const logs = [
  { time: '14:32:01', model: 'gpt-4o', prompt: 'Summarize customer complaint #4821...', cost: '€0.003', status: 'ok' },
  { time: '14:31:47', model: 'claude-3-5', prompt: 'Translate document to German: "Dear...', cost: '€0.002', status: 'ok' },
  { time: '14:31:22', model: 'mistral-7b', prompt: 'Classify support ticket priority...', cost: '€0.001', status: 'ok' },
  { time: '14:30:58', model: 'gpt-4o', prompt: 'Generate invoice summary for Q1 2026', cost: '€0.004', status: 'ok' },
  { time: '14:29:44', model: 'gpt-4o', prompt: 'Analyze sentiment of product reviews...', cost: '€0.005', status: 'rate_limit' },
  { time: '14:28:11', model: 'mistral-7b', prompt: 'Extract key data from contract PDF...', cost: '€0.001', status: 'ok' },
  { time: '14:27:03', model: 'claude-3-5', prompt: 'Write product description for item...', cost: '€0.003', status: 'ok' },
]

const teamSpend = [
  { team: 'Engineering', amount: 51.40, pct: 61, color: 'bg-[#2d7a4a]' },
  { team: 'Marketing', amount: 19.60, pct: 23, color: 'bg-[#1a3a5c]' },
  { team: 'Support', amount: 13.20, pct: 16, color: 'bg-[#c85a00]' },
]

const routing = [
  { task: 'Simple classification tasks', detail: 'Low complexity, high volume', model: 'mistral-7b', note: 'saves ~70% cost', noteColor: 'text-[#2d7a4a]' },
  { task: 'Complex reasoning & analysis', detail: 'High accuracy required', model: 'gpt-4o', note: 'best accuracy', noteColor: 'text-[#1a3a5c]' },
  { task: 'Long document processing', detail: '200K+ token context', model: 'claude-3-5', note: 'large context', noteColor: 'text-[#c85a00]' },
]

export default function GatewayPage() {
  const [tab, setTab] = useState<'logs' | 'cost' | 'routing'>('logs')

  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-sm border-b border-[#e0ddd6] h-[60px] flex items-center justify-between px-10">
        <Link href="/" className="font-bold text-lg tracking-tight">
          EUCompliant<span className="text-[#2d7a4a]">.de</span>
        </Link>
        <div className="flex gap-1 items-center">
          <Link href="/governance" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">AI Governance</Link>
          <Link href="/gateway" className="px-4 py-1.5 text-sm font-semibold text-[#0f0e0c] bg-[#efefeb] rounded-md">AI Gateway</Link>
          <Link href="/automation" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">Automation</Link>
        </div>
      </nav>

      <div className="pt-[60px]">
        {/* SUB NAV */}
        <div className="bg-white border-b border-[#e0ddd6] flex px-10 h-[52px] items-center">
          {(['logs', 'cost', 'routing'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 h-full text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-[#0f0e0c] text-[#0f0e0c] font-semibold' : 'border-transparent text-[#8a8780] hover:text-[#0f0e0c]'}`}>
              {t === 'logs' ? '📊 Live Logs' : t === 'cost' ? '💶 Cost Tracking' : '🔀 Model Routing'}
            </button>
          ))}
          <div className="ml-auto font-mono text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full">● EU-HOSTED · FRANKFURT</div>
        </div>

        <div className="max-w-5xl mx-auto px-10 py-10">

          {/* LOGS TAB */}
          {tab === 'logs' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">AI Gateway — Live Logs</h2>
                <p className="text-sm text-[#8a8780]">All LLM calls routed through your EU gateway. GDPR-compliant, AI Act audit-ready.</p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Calls Today', value: '1,247', trend: '↑ +12%', up: true },
                  { label: 'Cost Today', value: '€3.42', trend: '↓ -8%', up: false },
                  { label: 'Avg Latency', value: '342ms', trend: 'Stable', up: true },
                  { label: 'Success Rate', value: '99.8%', trend: '↑ SLA met', up: true },
                ].map(s => (
                  <div key={s.label} className="bg-white border border-[#e0ddd6] rounded-xl p-5">
                    <div className="font-mono text-xs text-[#8a8780] uppercase tracking-wider mb-2">{s.label}</div>
                    <div className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">{s.value}</div>
                    <div className={`text-xs font-mono ${s.up ? 'text-[#2d7a4a]' : 'text-[#c85a00]'}`}>{s.trend}</div>
                  </div>
                ))}
              </div>

              {/* LOG TABLE */}
              <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
                <div className="grid grid-cols-[120px_100px_1fr_80px_100px] gap-3 px-5 py-3 bg-[#f7f6f2] border-b border-[#e0ddd6]">
                  {['Time', 'Model', 'Prompt', 'Cost', 'Status'].map(h => (
                    <div key={h} className="font-mono text-xs text-[#8a8780] uppercase tracking-wider">{h}</div>
                  ))}
                </div>
                {logs.map((log, i) => (
                  <div key={i} className="grid grid-cols-[120px_100px_1fr_80px_100px] gap-3 px-5 py-3 border-b border-[#e0ddd6] last:border-0 hover:bg-[#f7f6f2]/50 text-sm items-center">
                    <div className="font-mono text-[#8a8780] text-xs">{log.time}</div>
                    <div className="font-mono text-xs bg-[#f7f6f2] px-2 py-1 rounded text-[#1a1916]">{log.model}</div>
                    <div className="text-[#8a8780] truncate">{log.prompt}</div>
                    <div className="font-mono text-xs text-right">{log.cost}</div>
                    <div>
                      <span className={`text-xs font-mono px-2 py-1 rounded-full ${log.status === 'ok' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-600'}`}>
                        {log.status === 'ok' ? '200 OK' : '429 Rate limit'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COST TAB */}
          {tab === 'cost' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">Cost Tracking</h2>
                <p className="text-sm text-[#8a8780]">Monitor AI spend per team, project, and model.</p>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'This Month', value: '€84.20', trend: '↑ +23%', warn: false },
                  { label: 'Budget Used', value: '42%', trend: '€200 monthly budget', warn: false },
                  { label: 'Top Model', value: 'GPT-4o', trend: '61% of spend', warn: false },
                  { label: 'Projected', value: '€170', trend: '↑ Watch budget', warn: true },
                ].map(s => (
                  <div key={s.label} className="bg-white border border-[#e0ddd6] rounded-xl p-5">
                    <div className="font-mono text-xs text-[#8a8780] uppercase tracking-wider mb-2">{s.label}</div>
                    <div className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">{s.value}</div>
                    <div className={`text-xs font-mono ${s.warn ? 'text-[#c85a00]' : 'text-[#2d7a4a]'}`}>{s.trend}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#e0ddd6] font-bold text-sm bg-[#f7f6f2]">Spend by Team</div>
                <div className="p-6 flex flex-col gap-4">
                  {teamSpend.map(t => (
                    <div key={t.team} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-[#8a8780]">{t.team}</div>
                      <div className="flex-1 h-2 bg-[#f7f6f2] rounded-full overflow-hidden border border-[#e0ddd6]">
                        <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                      </div>
                      <div className="w-16 text-right font-mono text-sm">€{t.amount.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ROUTING TAB */}
          {tab === 'routing' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">Model Routing</h2>
                <p className="text-sm text-[#8a8780]">Automatically route requests to the best model based on cost, speed, and task type.</p>
              </div>

              <div className="flex flex-col gap-3">
                {routing.map((r, i) => (
                  <div key={i} className="bg-white border border-[#e0ddd6] rounded-xl p-5 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-sm text-[#0f0e0c] mb-1">{r.task}</div>
                      <div className="text-xs text-[#8a8780]">{r.detail}</div>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-sm flex-shrink-0">
                      <span className="bg-[#f7f6f2] border border-[#e0ddd6] px-3 py-1.5 rounded-lg">→ {r.model}</span>
                      <span className={`text-xs ${r.noteColor}`}>{r.note}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-[#1a3a5c]/5 border border-[#1a3a5c]/15 rounded-xl p-5">
                <div className="font-mono text-xs text-[#1a3a5c] uppercase tracking-wider mb-2">Your Gateway Endpoint</div>
                <div className="font-mono text-sm bg-white border border-[#e0ddd6] rounded-lg px-4 py-3 text-[#0f0e0c]">
                  https://gateway.eucompliant.de/v1/chat/completions
                </div>
                <div className="text-xs text-[#8a8780] mt-2">Drop-in replacement for OpenAI API. All calls logged, routed, and compliance-tracked.</div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}