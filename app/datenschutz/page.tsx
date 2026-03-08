import Link from 'next/link'

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-sm border-b border-[#e0ddd6] h-[60px] flex items-center justify-between px-10">
        <Link href="/" className="font-bold text-lg tracking-tight">
          EUCompliant<span className="text-[#2d7a4a]">.de</span>
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-10 pt-28 pb-20">
        <h1 className="text-3xl font-black tracking-tighter mb-2">Datenschutzerklärung</h1>
        <p className="text-sm text-[#8a8780] mb-10">Gemäß DSGVO (EU) 2016/679 · Stand: März 2026</p>

        <div className="bg-white border border-[#e0ddd6] rounded-xl divide-y divide-[#e0ddd6]">
          {[
            {
              title: '1. Verantwortlicher',
              content: `Verantwortlicher im Sinne der DSGVO ist: Yalcin Ak, EUCompliant.de, Memelerstr.6 51145 Köln, Deutschland. E-Mail: support@eucompliant.de`
            },
            {
              title: '2. Erhebung und Speicherung personenbezogener Daten',
              content: `Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst (Server-Logfiles). Diese umfassen: IP-Adresse (anonymisiert), Datum und Uhrzeit des Zugriffs, Name und URL der abgerufenen Datei, Browsertyp und -version, Betriebssystem. Diese Daten sind nicht bestimmten Personen zuordenbar und werden nicht mit anderen Datenquellen zusammengeführt. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Bereitstellung des Dienstes).`
            },
            {
              title: '3. Zweck der Datenverarbeitung',
              content: `Wir verarbeiten personenbezogene Daten ausschließlich für folgende Zwecke: (1) Bereitstellung und Betrieb der Plattform, (2) Vertragserfüllung bei kostenpflichtigen Abonnements, (3) Kommunikation mit Nutzern, (4) Verbesserung unserer Dienste. Eine Weitergabe an Dritte erfolgt nicht, außer dies ist zur Vertragserfüllung erforderlich oder gesetzlich vorgeschrieben.`
            },
            {
              title: '4. Verarbeitung von Unternehmensdaten (B2B)',
              content: `Daten, die Nutzer in die Plattform eingeben (KI-Inventar, Compliance-Daten), werden ausschließlich zur Erbringung des Dienstes verarbeitet. Diese Daten werden auf Servern in Deutschland (Frankfurt) gespeichert. Eine Verarbeitung außerhalb der EU findet nicht statt. Wir sind nicht Eigentümer dieser Daten — sie verbleiben beim jeweiligen Nutzer (Datenhoheit beim Kunden).`
            },
            {
              title: '5. Ihre Rechte als betroffene Person',
              content: `Gemäß DSGVO haben Sie folgende Rechte: Auskunftsrecht (Art. 15), Recht auf Berichtigung (Art. 16), Recht auf Löschung (Art. 17), Recht auf Einschränkung der Verarbeitung (Art. 18), Recht auf Datenübertragbarkeit (Art. 20), Widerspruchsrecht (Art. 21). Zur Ausübung Ihrer Rechte wenden Sie sich an: info@eucompliant.de. Sie haben zudem das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren. In NRW: Landesbeauftragte für Datenschutz und Informationsfreiheit NRW, Postfach 20 04 44, 40102 Düsseldorf.`
            },
            {
              title: '6. Cookies',
              content: `Unsere Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Plattform erforderlich sind. Marketing- oder Tracking-Cookies werden nicht eingesetzt. Eine Einwilligung ist für technisch notwendige Cookies gemäß § 25 Abs. 2 TTDSG nicht erforderlich.`
            },
            {
              title: '7. Drittanbieter und KI-Dienste',
              content: `Die Plattform kann KI-Dienste Dritter (z.B. OpenAI, Anthropic) über einen EU-Gateway nutzen. In diesem Fall werden keine personenbezogenen Daten direkt an diese Anbieter weitergeleitet. Alle Anfragen werden anonymisiert und über unsere EU-gehostete Infrastruktur geleitet. Verarbeitungsverträge gemäß Art. 28 DSGVO sind mit allen Auftragsverarbeitern abgeschlossen.`
            },
            {
              title: '8. Datensicherheit',
              content: `Wir setzen technische und organisatorische Maßnahmen (TOMs) ein, um Ihre Daten gegen zufällige oder vorsätzliche Manipulation, Verlust oder unberechtigten Zugriff zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert. Die Datenübertragung erfolgt verschlüsselt über HTTPS/TLS.`
            },
            {
              title: '9. Aktualität und Änderung dieser Datenschutzerklärung',
              content: `Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher oder behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Version ist stets unter eucompliant.de/datenschutz abrufbar.`
            },
          ].map(section => (
            <div key={section.title} className="p-6">
              <h2 className="font-bold text-sm text-[#0f0e0c] mb-3">{section.title}</h2>
              <p className="text-sm text-[#8a8780] leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-[#8a8780]">
          <Link href="/" className="hover:text-[#0f0e0c]">← Zurück zur Startseite</Link>
          {' · '}
          <Link href="/impressum" className="hover:text-[#0f0e0c]">Impressum</Link>
          {' · '}
          <Link href="/nutzungsbedingungen" className="hover:text-[#0f0e0c]">Nutzungsbedingungen</Link>
        </div>
      </div>
    </main>
  )
}