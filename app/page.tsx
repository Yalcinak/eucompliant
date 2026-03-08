import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-sm border-b border-[#e0ddd6] h-[60px] flex items-center justify-between px-10">
        <div className="font-bold text-lg tracking-tight">
          EUCompliant<span className="text-[#2d7a4a]">.de</span>
        </div>
        <div className="flex gap-1 items-center">
          <Link href="/governance" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">AI Governance</Link>
          <Link href="/gateway" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">AI Gateway</Link>
          <Link href="/automation" className="px-4 py-1.5 text-sm text-[#8a8780] rounded-md hover:bg-[#efefeb]">Automation</Link>
          <button className="ml-2 px-4 py-2 text-sm font-semibold bg-[#1a472a] text-white rounded-md hover:bg-[#2d7a4a]">
            Start Free Trial →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-10 pt-32 pb-20 grid grid-cols-2 gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#1a472a]/10 border border-[#1a472a]/20 rounded-full px-4 py-1.5 text-xs text-[#2d7a4a] font-mono uppercase tracking-wider mb-6">
            <span className="bg-[#2d7a4a] text-white rounded-full px-2 py-0.5">New</span>
            AI Act 2026 Ready Platform
          </div>
          <h1 className="text-5xl font-black tracking-tighter leading-none mb-5 text-[#0f0e0c]">
            EU AI Compliance<br />in <span className="text-[#2d7a4a]">one platform</span>
          </h1>
          <p className="text-[#8a8780] text-base leading-relaxed mb-8 max-w-md">
            AI Governance, Infrastructure monitoring, and Vertical Automation — everything your European business needs to stay compliant and move fast.
          </p>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-[#0f0e0c] text-white font-semibold rounded-lg hover:bg-[#1a472a] transition-colors">
              Start Free Trial →
            </button>
            <button className="px-5 py-3 border border-[#e0ddd6] text-[#1a1916] rounded-lg hover:bg-[#efefeb] transition-colors">
              See Modules ↓
            </button>
          </div>
        </div>

        {/* MINI DASHBOARD */}
        <div className="bg-white border border-[#e0ddd6] rounded-2xl p-7 shadow-sm">
          <div className="font-mono text-xs text-[#8a8780] uppercase tracking-widest mb-4">Live Dashboard Preview</div>
          <div className="flex flex-col gap-3">
            {[
              { icon: '🛡️', title: 'AI Governance', sub: '4 tools · 2 high-risk', status: 'Action needed', color: 'bg-orange-50 text-orange-600' },
              { icon: '⚡', title: 'AI Gateway', sub: 'EU-hosted · 1,247 calls today', status: 'Operational', color: 'bg-green-50 text-green-700' },
              { icon: '🔄', title: 'HR Automation', sub: 'CV parsing · 23 processed', status: 'Running', color: 'bg-green-50 text-green-700' },
              { icon: '📋', title: 'Audit Report', sub: 'Last generated: today', status: 'Ready', color: 'bg-blue-50 text-blue-700' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 p-3 bg-[#f7f6f2] border border-[#e0ddd6] rounded-lg">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-lg border border-[#e0ddd6]">{item.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-[#0f0e0c]">{item.title}</div>
                  <div className="text-xs text-[#8a8780] font-mono">{item.sub}</div>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="bg-white border-t border-[#e0ddd6] py-20 px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-mono text-xs text-[#8a8780] uppercase tracking-widest mb-3">Three Modules · One Platform</div>
            <h2 className="text-4xl font-black tracking-tighter text-[#0f0e0c] mb-3">Everything EU companies need</h2>
            <p className="text-[#8a8780] max-w-md mx-auto">From regulatory compliance to automation — no consulting firm needed.</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {[
              {
                href: '/governance',
                icon: '🛡️', tag: 'AI Act Compliance', title: 'AI Governance', color: 'border-[#2d7a4a]', tagColor: 'bg-green-50 text-green-700',
                desc: 'Automate your AI Act compliance. Know your risk level, generate audit reports.',
                features: ['AI Inventory — track every AI tool', 'Risk Classification (minimal/limited/high)', 'Compliance checklist with AI Act articles', 'One-click PDF audit report'],
                btnColor: 'border-[#1a472a] text-[#1a472a] hover:bg-[#1a472a] hover:text-white'
              },
              {
                href: '/gateway',
                icon: '⚡', tag: 'EU AI Gateway', title: 'AI Infrastructure', color: 'border-[#1a3a5c]', tagColor: 'bg-blue-50 text-blue-700',
                desc: 'Route all your LLM calls through a compliant EU gateway. Full logging, cost tracking.',
                features: ['Multi-LLM routing (OpenAI, Anthropic, Mistral)', 'Real-time cost tracking per team', 'Prompt & response logging (GDPR-safe)', 'Data stays in EU at all times'],
                btnColor: 'border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white'
              },
              {
                href: '/automation',
                icon: '🔄', tag: 'Vertical Automation', title: 'Automation', color: 'border-[#c85a00]', tagColor: 'bg-orange-50 text-orange-700',
                desc: 'Pre-built AI automations for your specific sector. HR, property, recruiting.',
                features: ['CV parsing & candidate scoring', 'Tenant document automation', 'Refund & support automation', 'Compliant with AI Act by default'],
                btnColor: 'border-[#c85a00] text-[#c85a00] hover:bg-[#c85a00] hover:text-white'
              },
            ].map((m) => (
              <div key={m.title} className={`bg-[#f7f6f2] border border-[#e0ddd6] border-t-4 ${m.color} rounded-xl overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer`}>
                <div className="p-6 border-b border-[#e0ddd6] flex items-start justify-between">
                  <div className="text-3xl">{m.icon}</div>
                  <span className={`text-xs font-mono px-2 py-1 rounded ${m.tagColor}`}>{m.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0f0e0c] mb-2">{m.title}</h3>
                  <p className="text-sm text-[#8a8780] leading-relaxed mb-4">{m.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {m.features.map(f => (
                      <li key={f} className="text-sm text-[#1a1916] flex items-center gap-2">
                        <span className="text-[#2d7a4a] text-xs font-bold">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <Link href={m.href} className={`block w-full py-2.5 border rounded-lg text-sm font-semibold text-center transition-colors ${m.btnColor}`}>
                    Open {m.title} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-10 bg-[#f7f6f2] border-t border-[#e0ddd6]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-xs text-[#8a8780] uppercase tracking-widest mb-3">Simple Pricing</div>
            <h2 className="text-4xl font-black tracking-tighter text-[#0f0e0c] mb-3">No consulting fees.</h2>
            <p className="text-[#8a8780]">Replace €20K–200K consulting costs with a subscription.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { tier: 'Starter', price: '79', desc: 'For small SaaS companies just getting started.', features: ['Up to 10 AI tools', 'Risk classification', 'Basic checklist', '1 audit report/month', 'AI Gateway 10K calls'], popular: false },
              { tier: 'Growth', price: '199', desc: 'Full compliance coverage and automation.', features: ['Unlimited AI inventory', 'Full AI Act mapping', 'Unlimited audit reports', 'AI Gateway 100K calls', '3 Vertical Automations'], popular: true },
              { tier: 'Enterprise', price: '999', desc: 'Dedicated support, SLA, custom integrations.', features: ['Everything in Growth', 'Dedicated manager', 'Unlimited Gateway calls', 'Unlimited Automations', 'German-language support'], popular: false },
            ].map((p) => (
              <div key={p.tier} className={`bg-white rounded-xl p-7 relative ${p.popular ? 'border-2 border-[#1a472a] shadow-md' : 'border border-[#e0ddd6]'}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a472a] text-white text-xs font-mono px-3 py-1 rounded-full">Most Popular</div>}
                <div className="font-mono text-xs text-[#8a8780] uppercase tracking-widest mb-3">{p.tier}</div>
                <div className="text-4xl font-black tracking-tighter text-[#0f0e0c] mb-1">€{p.price}<span className="text-base font-normal text-[#8a8780]">/mo</span></div>
                <div className="text-xs text-[#8a8780] mb-5 pb-5 border-b border-[#e0ddd6]">{p.desc}</div>
                <ul className="space-y-2 mb-6">
                  {p.features.map(f => <li key={f} className="text-sm flex gap-2"><span className="text-[#2d7a4a] font-bold text-xs mt-0.5">✓</span>{f}</li>)}
                </ul>
                <button className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${p.popular ? 'bg-[#1a472a] text-white hover:bg-[#2d7a4a]' : 'border border-[#e0ddd6] hover:bg-[#0f0e0c] hover:text-white'}`}>
                  {p.tier === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e0ddd6] py-8 px-10 flex justify-between items-center text-xs text-[#8a8780] font-mono">
        <span>EUCompliant.de — AI Act Compliance Platform</span>
        <span>© 2026 · Köln, Deutschland</span>
      </footer>
    </main>
  )
}