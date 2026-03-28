export default {
  noInternet: {
    title: "X200 – Kein Internet",
    summary: "Prüfe zuerst Strom, Verkabelung, Link-Status und den lokalen Service-Zugang. Danach Router, Firewall und DNS eingrenzen.",
    steps: [
      {
        title: "Vor-Ort-Sichtprüfung",
        bullets: [
          "Leuchtet das Gerät normal und ist es vollständig hochgefahren?",
          "APPS-LED prüfen: für den lokalen Service-Zugang sollte sie grün sein.",
          "LAN-Kabel fest eingesteckt? Testweise anderes Kabel oder anderen Switch-Port verwenden.",
          "Link-LED am Port oder Switch prüfen."
        ],
        hint: "Ohne saubere physische Verbindung lohnt die tiefe Analyse meist noch nicht."
      },
      {
        title: "Lokalen Service-Zugang am X200 aktivieren",
        bullets: [
          "Notebook direkt an LAN-Port 1A oder 1B vom X200 anschließen.",
          "SVC-Taste zweimal kurz drücken.",
          "Danach bekommt der LAN-Port für 15 Minuten die Adresse 169.254.169.254.",
          "Die SVC-LED leuchtet dabei rot."
        ],
        hint: "Nicht lange auf der SVC-Taste bleiben: langes Drücken kann einen Factory Reset auslösen."
      },
      {
        title: "Weboberfläche lokal öffnen",
        bullets: [
          "Im Browser https://169.254.169.254 öffnen.",
          "Falls eine HTTPS- oder Zertifikatswarnung erscheint, lokal bestätigen.",
          "Wenn das Passwort nie geändert wurde: Benutzer admin / Passwort admin.",
          "Beim ersten Login muss das Passwort geändert werden."
        ],
        hint: "Wenn die Oberfläche lokal erreichbar ist, liegt das Problem oft außerhalb des Geräts."
      },
      {
        title: "Falls die Seite nicht aufgeht",
        bullets: [
          "Dem Notebook manuell eine Adresse wie 169.254.169.200 geben.",
          "Subnetzmaske 255.255.255.0 setzen.",
          "WLAN am Notebook deaktivieren, damit du sicher im richtigen Netz bist.",
          "Danach erneut https://169.254.169.254 aufrufen."
        ],
        hint: "Wenn der lokale Service-Zugang klappt, kannst du danach Netzparameter und Internetpfad viel gezielter prüfen."
      },
      {
        title: "Netzwerkeinstellungen prüfen",
        bullets: [
          "IP-Konfiguration kontrollieren: statisch oder DHCP?",
          "Standard-Gateway korrekt eingetragen?",
          "DNS-Server plausibel?",
          "Datum und Uhrzeit korrekt?"
        ],
        hint: "Falsches Gateway oder DNS ist sehr oft die Ursache bei 'kein Internet'."
      },
      {
        title: "Externe Erreichbarkeit eingrenzen",
        bullets: [
          "Router oder Firewall prüfen: darf das Gerät ins Internet?",
          "Kundennetz auf Proxy, VLAN, MAC-Filter oder Port-Sperren prüfen.",
          "Wenn möglich: Test mit bekannt funktionierendem Netzwerk oder Hotspot."
        ],
        hint: "Mit einem alternativen Netz lässt sich schnell unterscheiden: Gerät oder Kundennetz?"
      }
    ],
    checklist: [
      "Versorgung ok",
      "APPS-LED geprüft",
      "SVC-Taste korrekt ausgelöst",
      "169.254.169.254 getestet",
      "Laptop-IP ggf. manuell gesetzt",
      "Gateway / DNS geprüft",
      "Kundennetz eingegrenzt"
    ]
  },
  noCloud: {
    title: "X200 – Keine Cloud-Verbindung",
    summary: "Das Gerät wirkt lokal erreichbar, aber die Anbindung an die Cloud klappt nicht oder ist instabil.",
    steps: [
      {
        title: "Lokalen Zugriff bestätigen",
        bullets: [
          "Notebook an LAN-Port 1A oder 1B anschließen.",
          "SVC-Taste zweimal kurz drücken.",
          "Danach https://169.254.169.254 im Browser öffnen.",
          "Prüfen, ob das Gerät normal läuft und keine lokalen Fehler meldet."
        ],
        hint: "Erst lokal bestätigen, dass das Gerät selbst grundsätzlich lebt."
      },
      {
        title: "Login und Grundcheck",
        bullets: [
          "HTTPS-Warnung lokal bestätigen, falls sie erscheint.",
          "Bei Erstlogin ggf. admin / admin verwenden, sofern das Passwort nie geändert wurde.",
          "Firmware- oder Systemstatus grob kontrollieren.",
          "Screenshots von Status und Fehlermeldungen machen."
        ],
        hint: "Dokumentierte Screenshots helfen später enorm bei Support oder Kunden-IT."
      },
      {
        title: "Internet am Gerät bestätigen",
        bullets: [
          "IP, Gateway und DNS prüfen.",
          "Falls Diagnosefunktionen vorhanden sind: Internet- oder DNS-Auflösung testen.",
          "Zeit oder Zeitsynchronisation prüfen."
        ],
        hint: "Für Cloud-Verbindungen sind korrekte Uhrzeit und DNS oft kritisch."
      },
      {
        title: "Cloud- oder Registrierungsstatus prüfen",
        bullets: [
          "In der Oberfläche nach Cloud-, Connectivity- oder Registration-Status suchen.",
          "Geräte-ID, Tenant-Zuordnung oder Aktivierungsstatus prüfen.",
          "Fehlermeldungen oder Statuscodes dokumentieren."
        ],
        hint: "Mach möglichst einen Screenshot, damit Support später schneller helfen kann."
      },
      {
        title: "Kundennetz und Security eingrenzen",
        bullets: [
          "Firewall-Regeln, Proxy, SSL-Inspection oder restriktive DNS-Server prüfen.",
          "Testweise anderes freigegebenes Netz verwenden, falls möglich.",
          "Mit Kunden-IT abstimmen, ob ausgehende Verbindungen erlaubt sind."
        ],
        hint: "Cloud-Probleme sind oft kein Gerätefehler, sondern Netz- oder Security-Thema."
      }
    ],
    checklist: [
      "Lokal erreichbar",
      "HTTPS-Zugriff getestet",
      "Zeit / DNS geprüft",
      "Cloud-Status dokumentiert",
      "Kunden-IT / Firewall eingegrenzt"
    ]
  },
  localAccess: {
    title: "X200 – Lokaler Zugriff auf die Weboberfläche",
    summary: "Geführter Service-Zugang direkt vor Ort über den lokalen Siemens-Weg auf https://169.254.169.254.",
    steps: [
      {
        title: "Direktverbindung vorbereiten",
        bullets: [
          "Notebook direkt an LAN-Port 1A oder 1B vom X200 anschließen.",
          "WLAN am Notebook deaktivieren, damit du nicht versehentlich im falschen Netz bist.",
          "Gateway muss laufen und die APPS-LED sollte grün sein."
        ],
        hint: "Am besten immer nur die Verbindung aktiv lassen, die du wirklich für die Diagnose nutzt."
      },
      {
        title: "Service-Zugang aktivieren",
        bullets: [
          "SVC-Taste zweimal kurz drücken.",
          "Der LAN-Port bekommt dann für 15 Minuten die Adresse 169.254.169.254.",
          "Die SVC-LED leuchtet rot, solange der Service-Zugang aktiv ist."
        ],
        hint: "Langes Drücken vermeiden: das kann beim X200 einen Factory Reset auslösen."
      },
      {
        title: "Browserzugriff testen",
        bullets: [
          "Im Browser https://169.254.169.254 öffnen.",
          "Bei Zertifikatswarnungen prüfen, ob die Verbindung lokal bestätigt werden muss.",
          "Wenn das Passwort nie geändert wurde: admin / admin.",
          "Beim ersten Login muss das Passwort geändert werden."
        ],
        hint: "Manchmal blockiert nur eine HTTPS-Warnung den schnellen Zugriff."
      },
      {
        title: "Wenn nichts aufgeht",
        bullets: [
          "Dem Notebook manuell z. B. 169.254.169.200 geben.",
          "Subnetzmaske 255.255.255.0 setzen.",
          "Dann erneut https://169.254.169.254 aufrufen.",
          "Alternatives Kabel oder anderen Port testen."
        ],
        hint: "Wenn dieser Weg nicht klappt, dann zusätzlich Verkabelung, Notebook-Netzprofil und Browser prüfen."
      },
      {
        title: "Alternative im lokalen Netz",
        bullets: [
          "Wenn PC und Gateway im gleichen lokalen Netz hängen, kann auch https://<hostname>.local funktionieren.",
          "Der Hostname ist typischerweise ConnectX200-Seriennummer.",
          "Unter Windows klappt das über lokale Namensauflösung, teils mit Zusatzsoftware wie Bonjour."
        ],
        hint: "Der Service-Weg über 169.254.169.254 ist vor Ort meist der direkteste Zugang."
      }
    ],
    checklist: [
      "An 1A oder 1B angeschlossen",
      "APPS-LED grün",
      "SVC zweimal kurz gedrückt",
      "169.254.169.254 geöffnet",
      "Laptop-IP ggf. gesetzt",
      "Login geprüft"
    ]
  },
  networkCheck: {
    title: "X200 – Netzwerk prüfen",
    summary: "Schnelle Grundprüfung für IP, DHCP, Router, Switch und Erreichbarkeit.",
    steps: [
      {
        title: "Physik und Port",
        bullets: [
          "Kabel, Link-LED, Switch-Port und Patchfeld prüfen.",
          "Wenn möglich: mit bekannt funktionierendem Port testen."
        ]
      },
      {
        title: "Adressierung",
        bullets: [
          "Hat das Gerät eine gültige IP?",
          "Passt die Subnetzmaske?",
          "Ist das Standard-Gateway korrekt?",
          "Wird DHCP erwartet oder statische Adressierung?"
        ]
      },
      {
        title: "Erreichbarkeit",
        bullets: [
          "Ping lokal testen.",
          "Gateway anpingen.",
          "Andere Teilnehmer im Netz erreichbar?"
        ]
      }
    ],
    checklist: ["Kabel ok", "Link ok", "IP ok", "Subnetz ok", "Gateway ok"]
  },
  statusUnknown: {
    title: "X200 – Geführte Erstprüfung",
    summary: "Ideal, wenn du vor Ort erstmal nur strukturiert anfangen willst.",
    steps: [
      {
        title: "1. Was sehe ich direkt am Gerät?",
        bullets: ["Versorgung vorhanden?", "APPS-LED normal?", "Steckt LAN sauber?"]
      },
      {
        title: "2. Was ist das eigentliche Symptom?",
        bullets: ["Gar kein Internet?", "Nur Cloud gestört?", "Nur lokaler Zugriff gestört?"]
      },
      {
        title: "3. Nächster sinnvoller Schritt",
        bullets: [
          "Für den lokalen Zugriff zuerst an 1A oder 1B anschließen.",
          "SVC zweimal kurz drücken und 169.254.169.254 testen.",
          "Dann Netzparameter prüfen.",
          "Danach Cloud, IT oder Firewall eingrenzen."
        ]
      }
    ],
    checklist: ["Gerät lebt", "LAN steckt", "Symptom eingegrenzt", "Lokaler Zugriff geplant"]
  }
};
