const baseSteps = {
  noInternet: {
    problemLabel: 'Kein Internet',
    title: 'X500: Internetpfad (Basisvorlage)',
    objective: 'Vorlage für spätere X500-spezifische Uplink-Diagnose.',
    steps: [
      {
        title: 'Grundprüfung',
        info: ['X500-spezifische LED-/Port-Bezeichnungen hier ergänzen.'],
        check: ['Strom, Link und Verkabelung prüfen.'],
        action: ['Servicezugang für X500 nachtragen und Netzstatus prüfen.'],
      },
    ],
    checklist: ['X500 Internet-Runbook ergänzen'],
  },
  noCloud: {
    problemLabel: 'Keine Cloud-Verbindung',
    title: 'X500: Cloud-Verbindung (Basisvorlage)',
    objective: 'Vorlage für spätere Cloud-/Registrierungsdiagnose am X500.',
    steps: [
      {
        title: 'Diagnosebasis',
        info: ['Zeit, DNS, Gateway und Registrierung als Standardpunkte übernehmen.'],
        check: ['Gerätespezifische Menüpunkte für Cloudstatus ergänzen.'],
        action: ['Fehlercodes und Eskalationsdaten im finalen Runbook definieren.'],
      },
    ],
    checklist: ['X500 Cloud-Runbook ergänzen'],
  },
  noLocalAccess: {
    problemLabel: 'Kein lokaler Zugriff',
    title: 'X500: Lokaler Zugriff (Basisvorlage)',
    objective: 'Vorlage für X500-Servicezugang und Login-Prozess.',
    steps: [
      {
        title: 'Servicezugang',
        info: ['X500-spezifischen lokalen Zugriffsweg ergänzen.'],
        check: ['Service-IP, Port und Aktivierungsroutine nachtragen.'],
        action: ['Standard-Login und Passwortregeln ergänzen.'],
      },
    ],
    checklist: ['X500 Local-Access-Runbook ergänzen'],
  },
  webUiDown: {
    problemLabel: 'Weboberfläche nicht erreichbar',
    title: 'X500: WebUI-Zugriff (Basisvorlage)',
    objective: 'Vorlage für Browser-, IP- und Zertifikats-Fallback am X500.',
    steps: [
      {
        title: 'Fallback-Logik',
        info: ['Manuelle PC-IP und HTTPS-Hinweis als Grundmuster übernehmen.'],
        check: ['X500-spezifische Service-IP ergänzen.'],
        action: ['Zusätzliche Browser- und Netzadapter-Checks hinterlegen.'],
      },
    ],
    checklist: ['X500 WebUI-Runbook ergänzen'],
  },
  statusUnknown: {
    problemLabel: 'Status unklar / Erstprüfung',
    title: 'X500: Erstprüfung (Basisvorlage)',
    objective: 'Vorlage für einen schnellen Erstprüfungsablauf für X500.',
    steps: [
      {
        title: 'Schnellstart',
        info: ['Fakten am Gerät erfassen und Symptom klar benennen.'],
        check: ['LEDs, Verkabelung und Erreichbarkeit prüfen.'],
        action: ['Auf passenden Spezialpfad wechseln.'],
      },
    ],
    checklist: ['X500 Erstprüfungs-Runbook ergänzen'],
  },
};

export default baseSteps;