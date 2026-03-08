'use client'
import Link from 'next/link'
import { useState } from 'react'

const initialTools = [
  { id: 1, name: 'OpenAI GPT-4o', vendor: 'OpenAI', useCase: 'Customer support chatbot', risk: 'limited', status: 'documented' },
  { id: 2, name: 'Midjourney', vendor: 'Midjourney Inc.', useCase: 'Marketing image generation', risk: 'minimal', status: 'documented' },
  { id: 3, name: 'Internal ML Model', vendor: 'In-house', useCase: 'Credit scoring', risk: 'high', status: 'action' },
  { id: 4, name: 'HubSpot AI', vendor: 'HubSpot', useCase: 'Lead scoring', risk: 'limited', status: 'documented' },
]

const riskStyle: Record<string, string> = {
  minimal: 'bg-green-50 text-green-700',
  limited: 'bg-orange-50 text-orange-600',
  high: 'bg-red-50 text-red-600',
}

const statusStyle: Record<string, string> = {
  documented: 'bg-green-50 text-green-700',
  action: 'bg-orange-50 text-orange-600',
  pending: 'bg-gray-100 text-gray-500',
}

const checklistItems = [
  { id: 1, category: 'Documentation', text: 'Technical documentation (Art. 11)', done: true },
  { id: 2, category: 'Documentation', text: 'Record keeping system in place (Art. 12)', done: true },
  { id: 3, category: 'Documentation', text: 'Data governance policy documented (Art. 10)', done: false },
  { id: 4, category: 'Documentation', text: 'Instructions for use prepared (Art. 13)', done: false },
  { id: 5, category: 'Transparency', text: 'Users informed they interact with AI (Art. 52)', done: true },
  { id: 6, category: 'Transparency', text: 'Capability and limitations disclosed', done: false },
  { id: 7, category: 'Transparency', text: 'AI-generated content labeled', done: false },
  { id: 8, category: 'Human Oversight', text: 'Override mechanisms documented (Art. 14)', done: true },
  { id: 9, category: 'Human Oversight', text: 'Human review process for high-risk outputs', done: false },
  { id: 10, category: 'Human Oversight', text: 'Responsible AI officer designated', done: false },
  { id: 11, category: 'Risk Management', text: 'Risk assessment completed (Art. 9)', done: true },
  { id: 12, category: 'Risk Management', text: 'Bias testing performed', done: true },
  { id: 13, category: 'Risk Management', text: 'Conformity assessment registered', done: false },
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
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-sm border-b border-[#e0ddd6] h-[60px] flex items-center justify-between px-10">
        <Link href="/" className="font-bold text-lg tracking-tight">
          EUCompliant<span className="text-[#2d7a4a]">.de</span>
        </Link>
        <div className="flex gap-1 items-center">
          <Link href="/governance" className="px-4 py-1.5 text-sm font-semibold text-[#0f0e0c] bg-[#efefeb] rounded-md">AI Governance</Link>
          <Link href="/gateway" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">AI Gateway</Link>
          <Link href="/automation" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">Automation</Link>
        </div>
      </nav>

      <div className="pt-[60px]">
        {/* SUB NAV */}
        <div className="bg-white border-b border-[#e0ddd6] flex px-10 h-[52px] items-center gap-0">
          {(['inventory', 'checklist', 'report'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 h-full text-sm font-medium border-b-2 transition-colors capitalize ${tab === t ? 'border-[#0f0e0c] text-[#0f0e0c] font-semibold' : 'border-transparent text-[#8a8780] hover:text-[#0f0e0c]'}`}>
              {t === 'inventory' ? '📦 AI Inventory' : t === 'checklist' ? '✅ Compliance Checklist' : '📄 Audit Report'}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-10 py-10">

          {/* INVENTORY TAB */}
          {tab === 'inventory' && (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">AI Inventory</h2>
                  <p className="text-sm text-[#8a8780]">Track every AI tool your company uses and its risk level under the EU AI Act.</p>
                </div>
              </div>

              {/* HIGH RISK WARNING */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 mb-6">
                <span className="text-xl">⚠️</span>
                <div>
                  <div className="font-semibold text-sm text-red-700 mb-1">High-risk system detected: Internal ML Model</div>
                  <div className="text-xs text-red-600">Requires conformity assessment, human oversight documentation, and EU AI Act registration.
                    <button onClick={() => setTab('checklist')} className="ml-1 underline">View checklist →</button>
                  </div>
                </div>
              </div>

              {/* ADD FORM */}
              {showForm && (
                <div className="bg-white border border-[#e0ddd6] rounded-xl p-6 mb-4">
                  <div className="font-bold text-sm mb-4">Add AI Tool</div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-mono text-[#8a8780] uppercase tracking-wider mb-1">Tool Name</label>
                      <input value={newTool.name} onChange={e => setNewTool({...newTool, name: e.target.value})}
                        placeholder="e.g. OpenAI API" className="w-full bg-[#f7f6f2] border border-[#e0ddd6] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2d7a4a]" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#8a8780] uppercase tracking-wider mb-1">Use Case</label>
                      <input value={newTool.useCase} onChange={e => setNewTool({...newTool, useCase: e.target.value})}
                        placeholder="e.g. Customer support" className="w-full bg-[#f7f6f2] border border-[#e0ddd6] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2d7a4a]" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#8a8780] uppercase tracking-wider mb-1">Risk Level</label>
                      <select value={newTool.risk} onChange={e => setNewTool({...newTool, risk: e.target.value})}
                        className="w-full bg-[#f7f6f2] border border-[#e0ddd6] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2d7a4a]">
                        <option value="minimal">Minimal</option>
                        <option value="limited">Limited</option>
                        <option value="high">High Risk</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={addTool} className="px-4 py-2 bg-[#1a472a] text-white rounded-lg text-sm font-semibold hover:bg-[#2d7a4a]">Add Tool</button>
                    <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#e0ddd6] rounded-lg text-sm text-[#8a8780] hover:bg-[#f7f6f2]">Cancel</button>
                  </div>
                </div>
              )}

              {/* TABLE */}
              <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 bg-[#f7f6f2] border-b border-[#e0ddd6]">
                  <h3 className="font-bold text-sm">AI Tools Register</h3>
                  <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f0e0c] text-white rounded-lg text-xs font-semibold hover:bg-[#1a472a]">
                    + Add Tool
                  </button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f7f6f2] border-b border-[#e0ddd6]">
                      {['Tool', 'Vendor', 'Use Case', 'Risk Level', 'Status'].map(h => (
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
                            ● {tool.risk.charAt(0).toUpperCase() + tool.risk.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-mono px-2 py-1 rounded-full ${statusStyle[tool.status]}`}>
                            {tool.status === 'documented' ? 'Documented' : tool.status === 'action' ? 'Action needed' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CHECKLIST TAB */}
          {tab === 'checklist' && (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">Compliance Checklist</h2>
                  <p className="text-sm text-[#8a8780]">AI Act articles mapped to actionable tasks.</p>
                </div>
                <div className="font-mono text-sm text-[#8a8780]">
                  Progress: <strong className="text-[#0f0e0c]">{doneCount}/{checklist.length}</strong>
                </div>
              </div>

              {/* PROGRESS BAR */}
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

          {/* REPORT TAB */}
          {tab === 'report' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-[#0f0e0c] mb-1">Audit Report</h2>
                <p className="text-sm text-[#8a8780]">Generate a complete EU AI Act compliance report for auditors or internal use.</p>
              </div>

              <div className="bg-white border border-[#e0ddd6] rounded-xl p-10 text-center mb-6">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-xl font-black tracking-tight mb-2">AI Act Compliance Report</h3>
                <p className="text-sm text-[#8a8780] max-w-sm mx-auto mb-6">Automatically generated from your inventory and checklist. Ready to share with auditors, investors, or regulators.</p>
                <div className="flex gap-3 justify-center">
                  <button className="px-6 py-3 bg-[#0f0e0c] text-white font-semibold rounded-lg text-sm hover:bg-[#1a472a] transition-colors">
                    Generate PDF Report
                  </button>
                  <button className="px-5 py-3 border border-[#e0ddd6] rounded-lg text-sm hover:bg-[#f7f6f2] transition-colors">
                    Email to Team
                  </button>
                </div>
              </div>

              <div className="bg-white border border-[#e0ddd6] rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#e0ddd6] font-bold text-sm bg-[#f7f6f2]">Report Preview</div>
                <div className="divide-y divide-[#e0ddd6]">
                  {[
                    { label: 'Company', value: 'Your Company GmbH' },
                    { label: 'AI Systems Inventoried', value: `${tools.length} tools` },
                    { label: 'High-Risk Systems', value: `${tools.filter(t => t.risk === 'high').length} (action required)`, red: true },
                    { label: 'Compliance Score', value: `${Math.round((doneCount / checklist.length) * 100)}% — ${doneCount >= 10 ? 'Good' : 'Action needed'}`, green: doneCount >= 10 },
                    { label: 'Report Date', value: 'March 2026' },
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