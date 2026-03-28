const baseSteps = {
  noInternet: {
    problemLabel: 'Kein Internet',
    title: 'X500: Internetpfad prüfen',
    objective: 'Erst lokalen Zugriff sauber herstellen, dann Uplink und Kundennetz eingrenzen.',
    steps: [
      {
        title: 'X500 für Servicezugriff vorbereiten',
        info: [
          'PC direkt an LAN-Port 1A oder 1B vom X500 anschließen.',
          'Gerät muss eingeschaltet sein, APPS-LED dauerhaft grün.',
        ],
        check: ['Direktverbindung an 1A oder 1B aktiv.', 'APPS-LED grün bestätigt.'],
        action: ['SVC-Taste zweimal kurz drücken und direkt weitermachen.'],
        warning: 'Langes Drücken der SVC-Taste löst beim X500 einen Factory Reset aus.',
      },
      {
        title: 'Lokale Service-IP nutzen',
        info: ['Nach SVC 2x kurz wird für 15 Minuten die Service-IP 169.254.169.254 auf den LAN-Port gelegt.'],
        check: ['SVC-LED leuchtet rot.', 'Browseraufruf https://169.254.169.254 startet.'],
        action: ['Login-Seite öffnen und anmelden.'],
        outcome: 'Lokale Diagnoseoberfläche ist erreichbar.',
      },
      {
        title: 'Fallback wenn Seite nicht aufgeht',
        info: ['Laptop testweise manuell auf 169.254.169.200 / 255.255.255.0 setzen.'],
        check: ['Manuelle IP 169.254.169.200 gesetzt.', 'Subnetzmaske 255.255.255.0 gesetzt.'],
        action: ['Danach erneut https://169.254.169.254 aufrufen.'],
      },
      {
        title: 'Login und Internetpfad prüfen',
        info: ['Standard-Login beim Erstzugriff: Benutzer admin, Passwort admin.'],
        check: [
          'Beim ersten Login Passwortänderung durchgeführt.',
          'Passwortregel: mindestens 8 Zeichen mit Groß-/Kleinbuchstaben, Zahl und Sonderzeichen.',
          'Gateway, DNS und Uplink erreichbar.',
        ],
        action: ['Bei weiterem Internetausfall Kundennetz (Firewall, Proxy, VLAN) prüfen.'],
      },
    ],
    checklist: [
      'Laptop an 1A oder 1B angeschlossen',
      'APPS-LED grün geprüft',
      'SVC zweimal kurz gedrückt',
      'SVC-LED rot bestätigt',
      'https://169.254.169.254 getestet',
      'Fallback-IP 169.254.169.200/24 geprüft',
      'admin/admin und Passwortregel geprüft',
      'Internetpfad im Kundennetz eingegrenzt',
    ],
  },
  noCloud: {
    problemLabel: 'Keine Cloud Verbindung',
    title: 'X500: Cloud Verbindung wiederherstellen',
    objective: 'Servicezugriff aktivieren und Cloud-Ausfall auf DNS, Zeit, Registrierung oder Netzregeln zurückführen.',
    steps: [
      {
        title: 'Lokalen Zugriff aktivieren',
        info: [
          'Laptop an 1A oder 1B anschließen, APPS-LED muss grün sein.',
          'SVC-Taste zweimal kurz drücken, Zugriff für 15 Minuten aktiv.',
        ],
        check: ['SVC-LED leuchtet rot.', 'https://169.254.169.254 erreichbar.'],
        action: ['Bei Nichterreichbarkeit Laptop-IP auf 169.254.169.200/24 setzen und erneut testen.'],
        warning: 'SVC niemals lange drücken, sonst Factory Reset.',
      },
      {
        title: 'Cloud-Basis im Gerät prüfen',
        info: ['Cloud benötigt korrekte Zeit, DNS und Route.'],
        check: ['IP/Gateway korrekt.', 'DNS korrekt.', 'Zeit synchronisiert.'],
        action: ['Cloudstatus neu testen und Fehlercode notieren.'],
      },
      {
        title: 'Registrierung und Eskalation vorbereiten',
        info: ['Für Eskalation werden Statuswerte und Meldungen benötigt.'],
        check: ['Tenant-/Portalzuordnung korrekt.', 'Fehlermeldung dokumentiert.'],
        action: ['Wenn weiter offline: ausgehende Freigaben mit Kunden-IT prüfen.'],
      },
    ],
    checklist: [
      'Servicezugang X500 aktiv',
      'Fallback-IP bei Bedarf gesetzt',
      'Zeit, DNS und Gateway geprüft',
      'Cloudstatus dokumentiert',
      'Kunden-IT abgestimmt',
    ],
  },
  webUiDown: {
    problemLabel: 'Weboberfläche nicht erreichbar',
    title: 'X500: Weboberfläche erreichbar machen',
    objective: 'Lokalen Servicezugang reproduzierbar herstellen und Browserzugriff stabil öffnen.',
    steps: [
      {
        title: 'Servicepfad sauber starten',
        info: ['Laptop direkt an 1A oder 1B, APPS-LED grün, dann SVC zweimal kurz.'],
        check: ['SVC-LED leuchtet rot.', 'Servicefenster 15 Minuten aktiv.'],
        action: ['Browser auf https://169.254.169.254 öffnen.'],
        warning: 'Nur zweimal kurz drücken, langes Drücken führt zu Factory Reset.',
      },
      {
        title: 'Wenn Seite nicht öffnet',
        info: ['Laptop testweise statisch konfigurieren: 169.254.169.200 / 255.255.255.0.'],
        check: ['Manuelle IP gesetzt.', 'Subnetzmaske gesetzt.', 'WLAN/VPN deaktiviert.'],
        action: ['Erneut https://169.254.169.254 aufrufen.'],
      },
      {
        title: 'Loginregel prüfen',
        info: ['Standard-Login beim Erstzugriff: admin / admin.'],
        check: [
          'Login erfolgreich.',
          'Beim ersten Login Passwort mit Siemens-Regel geändert (min. 8 Zeichen, Groß/Klein, Zahl, Sonderzeichen).',
        ],
        action: ['Wenn weiterhin kein Zugriff möglich: Browser-/Clientpolicy prüfen und Ergebnis dokumentieren.'],
      },
      {
        title: 'Ultrakurze Vor-Ort-Version',
        info: ['Laptop an 1A/1B -> SVC 2x kurz -> Browser auf https://169.254.169.254 -> ggf. Laptop-IP manuell auf 169.254.169.200/24.'],
        check: ['Kurzablauf vollständig durchgeführt.'],
        action: ['Bei Misserfolg Ergebnis mit Uhrzeit und LED-Zustand eskalieren.'],
      },
    ],
    checklist: [
      'Laptop an 1A oder 1B',
      'SVC 2x kurz, SVC-LED rot',
      'https://169.254.169.254 getestet',
      'Laptop-IP 169.254.169.200/24 getestet',
      'admin/admin geprüft',
      'Passwortregel beim Erstlogin erfüllt',
    ],
  },
  statusUnknown: {
    problemLabel: 'Status unklar / Erstprüfung',
    title: 'X500: Erstprüfung in 5 Minuten',
    objective: 'Mit minimalen Schritten sofort zu einem klaren nächsten Diagnosepfad kommen.',
    steps: [
      {
        title: 'Sichtprüfung am Gerät',
        info: ['Nur harte Fakten aufnehmen.'],
        check: ['Stromversorgung stabil.', 'APPS-LED grün.', 'Hauptsymptom benannt.'],
        action: ['Direktservice vorbereiten: Laptop an 1A/1B.'],
      },
      {
        title: 'Lokaler Schnellzugriff',
        info: ['SVC zweimal kurz drücken, dann 15 Minuten Zugriff über 169.254.169.254.'],
        check: ['SVC-LED rot.', 'Service-IP erreichbar oder Fallback-IP gesetzt.'],
        action: ['Danach den passenden Pfad starten: Kein Internet, Keine Cloud Verbindung oder Weboberfläche nicht erreichbar.'],
        warning: 'SVC-Taste nicht lang drücken (Factory-Reset-Risiko).',
      },
    ],
    checklist: [
      'APPS-LED und Basisstatus geprüft',
      'Direktverbindung 1A/1B hergestellt',
      'SVC 2x kurz ausgeführt',
      'Service-IP oder Fallback-IP getestet',
      'Folgepfad klar festgelegt',
    ],
  },
};

export default baseSteps;