import Link from 'next/link'

export default function NutzungsbedingungenPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f2]/90 backdrop-blur-sm border-b border-[#e0ddd6] h-[60px] flex items-center justify-between px-10">
        <Link href="/" className="font-bold text-lg tracking-tight">
          EUCompliant<span className="text-[#2d7a4a]">.de</span>
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-10 pt-28 pb-20">
        <h1 className="text-3xl font-black tracking-tighter mb-2">Nutzungsbedingungen</h1>
        <p className="text-sm text-[#8a8780] mb-10">Allgemeine Geschäftsbedingungen (AGB) · Stand: März 2026</p>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-6 flex gap-3">
          <span className="text-2xl">⚠️</span>
          <div className="text-sm text-orange-800 leading-relaxed">
            <strong>Wichtiger Hinweis:</strong> EUCompliant.de ist ein Software-as-a-Service-Tool zur Unterstützung bei der Compliance-Dokumentation. Die Plattform ersetzt <strong>keine Rechtsberatung</strong> und stellt <strong>kein Rechtsgutachten</strong> dar. Alle Angaben sind unverbindlich. Für rechtsverbindliche Compliance-Bewertungen ist stets ein qualifizierter Rechtsanwalt oder zertifizierter Compliance-Experte hinzuzuziehen.
          </div>
        </div>

        <div className="bg-white border border-[#e0ddd6] rounded-xl divide-y divide-[#e0ddd6]">
          {[
            {
              title: '§ 1 Geltungsbereich und Anbieter',
              content: `Diese Nutzungsbedingungen gelten für die Nutzung der Plattform EUCompliant.de (nachfolgend "Plattform"), betrieben von Yalcin Ak, Memelerstr. 6 51145 Köln, Deutschland (nachfolgend "Anbieter"). Mit der Registrierung oder Nutzung der Plattform akzeptiert der Nutzer diese Bedingungen vollständig. Abweichende Bedingungen des Nutzers werden nicht anerkannt.`
            },
            {
              title: '§ 2 Leistungsbeschreibung',
              content: `Die Plattform stellt folgende Funktionen bereit: (1) KI-Inventarverwaltung zur Erfassung eingesetzter KI-Systeme, (2) Risikoklassifizierungshinweise basierend auf eingegebenen Informationen, (3) Compliance-Checklisten als Orientierungshilfe, (4) Berichtsgenerierung zur internen Dokumentation, (5) KI-Gateway zur Verwaltung von LLM-Anfragen, (6) Automatisierungsworkflows für verschiedene Branchen. Alle Funktionen dienen ausschließlich der Unterstützung interner Prozesse und ersetzen keine professionelle Rechts- oder Fachberatung.`
            },
            {
              title: '§ 3 Ausdrücklicher Haftungsausschluss — Keine Rechtsberatung',
              content: `3.1 Die durch die Plattform generierten Risikoklassifizierungen, Compliance-Scores, Checklisten und Berichte stellen ausdrücklich keine Rechtsberatung, kein Rechtsgutachten und keine verbindliche Compliance-Bewertung dar.\n\n3.2 Der Anbieter übernimmt keine Haftung dafür, dass die von der Plattform generierten Einschätzungen den tatsächlichen rechtlichen Anforderungen des EU KI-Acts oder anderer Rechtsvorschriften entsprechen.\n\n3.3 Der Nutzer ist allein verantwortlich für die Einhaltung aller anwendbaren Gesetze und Vorschriften, einschließlich des EU KI-Acts. Die Nutzung der Plattform befreit den Nutzer nicht von dieser Verantwortung.\n\n3.4 Für rechtsverbindliche Compliance-Bewertungen empfehlen wir ausdrücklich die Hinzuziehung eines qualifizierten Rechtsanwalts oder zertifizierten KI-Compliance-Experten.`
            },
            {
              title: '§ 4 Haftungsbeschränkung',
              content: `4.1 Der Anbieter haftet unbeschränkt nur bei Vorsatz und grober Fahrlässigkeit sowie bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.\n\n4.2 Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). In diesen Fällen ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt.\n\n4.3 Die Haftung für mittelbare Schäden, Folgeschäden, entgangenen Gewinn, Bußgelder oder Sanktionen durch Behörden — insbesondere im Zusammenhang mit dem EU KI-Act — ist ausgeschlossen, soweit gesetzlich zulässig.\n\n4.4 Die Gesamthaftung des Anbieters ist auf den vom Nutzer in den letzten 12 Monaten gezahlten Betrag begrenzt.`
            },
            {
              title: '§ 5 Pflichten des Nutzers',
              content: `5.1 Der Nutzer verpflichtet sich, die Plattform ausschließlich für legale Zwecke zu nutzen.\n\n5.2 Der Nutzer ist verantwortlich für die Richtigkeit der eingegebenen Daten. Fehlerhafte Eingaben führen zu fehlerhaften Ergebnissen, für die der Anbieter keine Haftung übernimmt.\n\n5.3 Der Nutzer verpflichtet sich, die generierten Berichte und Klassifizierungen nicht als verbindliche Rechtsgutachten gegenüber Behörden, Investoren oder Geschäftspartnern darzustellen.\n\n5.4 Der Nutzer ist verpflichtet, Zugangsdaten sicher aufzubewahren und unbefugten Zugriff unverzüglich zu melden.`
            },
            {
              title: '§ 6 Verfügbarkeit und Wartung',
              content: `Der Anbieter strebt eine Verfügbarkeit von 99% an, übernimmt jedoch keine Garantie für die ununterbrochene Verfügbarkeit der Plattform. Geplante Wartungsarbeiten werden nach Möglichkeit angekündigt. Ansprüche wegen Nichtverfügbarkeit sind auf den Umfang des vereinbarten SLA (bei Enterprise-Tarifen) begrenzt.`
            },
            {
              title: '§ 7 Kündigung und Datenlöschung',
              content: `7.1 Abonnements können monatlich gekündigt werden. Nach Kündigung werden alle Nutzerdaten nach 30 Tagen unwiderruflich gelöscht.\n\n7.2 Der Anbieter behält sich das Recht vor, Konten bei Verstoß gegen diese Nutzungsbedingungen fristlos zu sperren.\n\n7.3 Der Nutzer kann jederzeit die sofortige Löschung seiner Daten beantragen (Art. 17 DSGVO).`
            },
            {
              title: '§ 8 Änderungen der Nutzungsbedingungen',
              content: `Der Anbieter behält sich vor, diese Nutzungsbedingungen jederzeit mit Wirkung für die Zukunft zu ändern. Änderungen werden dem Nutzer per E-Mail mitgeteilt. Widerspricht der Nutzer nicht innerhalb von 30 Tagen, gelten die neuen Bedingungen als akzeptiert.`
            },
            {
              title: '§ 9 Anwendbares Recht und Gerichtsstand',
              content: `Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesen Nutzungsbedingungen ist Köln, Deutschland, soweit der Nutzer Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.`
            },
            {
              title: '§ 10 Salvatorische Klausel',
              content: `Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam oder undurchführbar sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An die Stelle der unwirksamen Bestimmung tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.`
            },
          ].map(section => (
            <div key={section.title} className="p-6">
              <h2 className="font-bold text-sm text-[#0f0e0c] mb-3">{section.title}</h2>
              <p className="text-sm text-[#8a8780] leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-[#8a8780]">
          <Link href="/" className="hover:text-[#0f0e0c]">← Zurück zur Startseite</Link>
          {' · '}
          <Link href="/impressum" className="hover:text-[#0f0e0c]">Impressum</Link>
          {' · '}
          <Link href="/datenschutz" className="hover:text-[#0f0e0c]">Datenschutzerklärung</Link>
        </div>
      </div>
    </main>
  )
}