import Link from 'next/link'

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-sm border-b border-[#e0ddd6] h-[60px] flex items-center justify-between px-10">
        <Link href="/" className="font-bold text-lg tracking-tight">
          EUCompliant<span className="text-[#2d7a4a]">.de</span>
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-10 pt-28 pb-20">
        <h1 className="text-3xl font-black tracking-tighter mb-2">Impressum</h1>
        <p className="text-sm text-[#8a8780] mb-10">Angaben gemäß § 5 TMG</p>

        <div className="bg-white border border-[#e0ddd6] rounded-xl divide-y divide-[#e0ddd6]">
          {[
            {
              title: 'Anbieter',
              content: (
                <div className="text-sm text-[#1a1916] space-y-1">
                  <p className="font-semibold">Yalcin Ak</p>
                  <p>EUCompliant.de</p>
                  <p>Memelerstr.6</p>
                  <p>51145 Köln, Deutschland</p>
                </div>
              )
            },
            {
              title: 'Kontakt',
              content: (
                <div className="text-sm text-[#1a1916] space-y-1">
                  <p>E-Mail: support@eucompliant.de</p>
                  <p>Web: www.eucompliant.de</p>
                </div>
              )
            },
            {
              title: 'Umsatzsteuer-Identifikationsnummer',
              content: (
                <div className="text-sm text-[#1a1916]">
                  <p>Gemäß § 27a UStG: [USt-IdNr. nach Beantragung eintragen]</p>
                </div>
              )
            },
            {
              title: 'Verantwortlich für den Inhalt gemäß § 55 Abs. 2 RStV',
              content: (
                <div className="text-sm text-[#1a1916]">
                  <p className="font-semibold">Yalcin Ak</p>
                  <p>Anschrift wie oben</p>
                </div>
              )
            },
            {
              title: 'Haftungsausschluss',
              content: (
                <div className="text-sm text-[#8a8780] space-y-3 leading-relaxed">
                  <p><strong className="text-[#1a1916]">Haftung für Inhalte:</strong> Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
                  <p><strong className="text-[#1a1916]">Keine Rechtsberatung:</strong> Die auf dieser Plattform bereitgestellten Informationen, Analysen, Klassifizierungen und Berichte stellen ausdrücklich keine Rechtsberatung dar und ersetzen diese nicht. Sie dienen ausschließlich der allgemeinen Information und Orientierung. Für rechtlich verbindliche Einschätzungen zur Konformität mit dem EU KI-Act oder anderen Rechtsvorschriften ist die Hinzuziehung eines qualifizierten Rechtsanwalts oder Compliance-Experten erforderlich.</p>
                  <p><strong className="text-[#1a1916]">Haftung für Links:</strong> Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
                </div>
              )
            },
            {
              title: 'Streitschlichtung',
              content: (
                <div className="text-sm text-[#8a8780] leading-relaxed">
                  <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" className="text-[#2d7a4a] underline" target="_blank">https://ec.europa.eu/consumers/odr</a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                </div>
              )
            },
          ].map(section => (
            <div key={section.title} className="p-6">
              <h2 className="font-bold text-sm text-[#0f0e0c] mb-3">{section.title}</h2>
              {section.content}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-[#8a8780]">
          <Link href="/" className="hover:text-[#0f0e0c]">← Zurück zur Startseite</Link>
          {' · '}
          <Link href="/datenschutz" className="hover:text-[#0f0e0c]">Datenschutzerklärung</Link>
          {' · '}
          <Link href="/nutzungsbedingungen" className="hover:text-[#0f0e0c]">Nutzungsbedingungen</Link>
        </div>
      </div>
    </main>
  )
}