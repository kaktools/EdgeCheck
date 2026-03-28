export default {
  noInternet: {
    title: "X300 – Kein Internet",
    summary: "Prüfe zuerst Strom, Verkabelung und den lokalen Maintenance-Zugang. Danach IP, Gateway, DNS und Kundennetz eingrenzen.",
    steps: [
      {
        title: "Gerät und Verkabelung prüfen",
        bullets: [
          "Versorgung, LAN-Kabel, Link-LED und Switch-Port prüfen.",
          "Wenn möglich anderes Kabel oder anderen Port verwenden."
        ]
      },
      {
        title: "Lokalen Maintenance-Zugang am X300 aktivieren",
        bullets: [
          "Notebook an LAN-Port X1P1 anschließen.",
          "Gerät ausschalten.",
          "USB-Maus an einen USB-Port anschließen.",
          "Gerät wieder einschalten und warten, bis es hochgefahren ist.",
          "Dann linke Maustaste doppelklicken.",
          "Dadurch bekommt X1P1 für 15 Minuten die Adresse 169.254.169.254.",
          "Die MAINT-LED leuchtet rot."
        ],
        hint: "Keinen rechten Mausklick beim Booten auslösen: das kann einen Factory Reset auslösen."
      },
      {
        title: "Weboberfläche lokal öffnen",
        bullets: [
          "Im Browser https://169.254.169.254 öffnen.",
          "Falls eine HTTPS- oder Zertifikatswarnung erscheint, lokal bestätigen.",
          "Wenn das Passwort nie geändert wurde: Benutzer admin / Passwort admin.",
          "Beim ersten Login muss das Passwort geändert werden."
        ],
        hint: "Wenn der lokale Zugriff klappt, ist die Basisdiagnose deutlich einfacher."
      },
      {
        title: "Falls die Seite nicht aufgeht",
        bullets: [
          "Dem Notebook manuell eine Adresse wie 169.254.169.200 geben.",
          "Subnetzmaske 255.255.255.0 setzen.",
          "Danach erneut https://169.254.169.254 aufrufen.",
          "WLAN am Notebook deaktivieren und bei Bedarf anderes Kabel testen."
        ]
      },
      {
        title: "Netzparameter kontrollieren",
        bullets: [
          "IP-Adresse, Subnetz, Gateway und DNS prüfen.",
          "DHCP oder statische Konfiguration abgleichen.",
          "Zeit und Datum kontrollieren."
        ]
      },
      {
        title: "Internetpfad eingrenzen",
        bullets: [
          "Kundennetz, Router, Firewall und eventuelle Portfreigaben prüfen.",
          "Falls möglich mit Referenznetz testen."
        ]
      }
    ],
    checklist: [
      "Physik ok",
      "X1P1 verwendet",
      "Maus-Doppelklick korrekt ausgeführt",
      "169.254.169.254 getestet",
      "Laptop-IP ggf. gesetzt",
      "Gateway / DNS ok",
      "Kundennetz geprüft"
    ]
  },
  noCloud: {
    title: "X300 – Keine Cloud-Verbindung",
    summary: "Internet kann vorhanden sein, aber der Weg zur Cloud ist blockiert oder die Registrierung stimmt nicht.",
    steps: [
      {
        title: "Lokal einloggen",
        bullets: [
          "Notebook an X1P1 anschließen.",
          "X300 ausschalten, USB-Maus anschließen und wieder einschalten.",
          "Nach dem Hochfahren linke Maustaste doppelklicken.",
          "Dann https://169.254.169.254 im Browser öffnen."
        ]
      },
      {
        title: "Login und Grundcheck",
        bullets: [
          "HTTPS-Warnung lokal bestätigen, falls sie erscheint.",
          "Bei Erstlogin ggf. admin / admin verwenden, sofern das Passwort nie geändert wurde.",
          "Status- oder Diagnosebereiche prüfen.",
          "Screenshots von Meldungen und Status machen."
        ]
      },
      {
        title: "Cloud-relevante Basis prüfen",
        bullets: ["DNS prüfen.", "Gateway prüfen.", "Zeit oder Datum prüfen."]
      },
      {
        title: "Cloudstatus dokumentieren",
        bullets: [
          "Registrierung oder Gerätezuordnung prüfen.",
          "Fehlermeldungen, Hinweise oder Statuswerte notieren.",
          "Screenshots machen."
        ]
      }
    ],
    checklist: ["Lokal erreichbar", "HTTPS-Zugriff getestet", "Basis ok", "Cloudstatus notiert"]
  },
  localAccess: {
    title: "X300 – Lokal auf die Weboberfläche",
    summary: "Geführter Maintenance-Zugang direkt vor Ort über den lokalen Siemens-Weg auf https://169.254.169.254.",
    steps: [
      {
        title: "Netzverbindung herstellen",
        bullets: [
          "Notebook an LAN-Port X1P1 anschließen.",
          "Eigenes WLAN am Notebook bei Bedarf deaktivieren."
        ]
      },
      {
        title: "Maintenance-Zugang aktivieren",
        bullets: [
          "X300 ausschalten.",
          "USB-Maus an einen USB-Port anschließen.",
          "Gerät wieder einschalten und vollständig hochfahren lassen.",
          "Dann linke Maustaste doppelklicken.",
          "X1P1 bekommt dadurch für 15 Minuten die Adresse 169.254.169.254.",
          "Die MAINT-LED leuchtet rot."
        ],
        hint: "Keinen rechten Mausklick verwenden: das kann beim X300 einen Factory Reset auslösen."
      },
      {
        title: "Browserzugriff testen",
        bullets: [
          "Im Browser https://169.254.169.254 öffnen.",
          "Bei Zertifikatswarnungen Verbindung lokal bestätigen.",
          "Wenn das Passwort nie geändert wurde: admin / admin.",
          "Beim ersten Login Passwort ändern."
        ]
      },
      {
        title: "Wenn der Zugriff scheitert",
        bullets: [
          "Dem Notebook z. B. 169.254.169.200 geben.",
          "Subnetzmaske 255.255.255.0 setzen.",
          "Danach erneut https://169.254.169.254 testen.",
          "Anderes Kabel oder anderen Browser probieren."
        ]
      },
      {
        title: "Alternative im lokalen Netz",
        bullets: [
          "Wenn PC und Gateway im gleichen lokalen Netz hängen, kann auch https://<hostname>.local funktionieren.",
          "Der Hostname ist typischerweise ConnectX300-Seriennummer.",
          "Unter Windows klappt das über lokale Namensauflösung, teils mit Zusatzsoftware wie Bonjour."
        ]
      }
    ],
    checklist: [
      "An X1P1 angeschlossen",
      "Maus angeschlossen",
      "Linke Maustaste doppelt geklickt",
      "169.254.169.254 geöffnet",
      "Laptop-IP ggf. gesetzt",
      "Login geprüft"
    ]
  },
  networkCheck: {
    title: "X300 – Netzwerk prüfen",
    summary: "Schneller Netzcheck vor tieferer Analyse.",
    steps: [
      { title: "Grundlagen", bullets: ["Kabel", "Link", "Switch-Port", "Patchung prüfen"] },
      { title: "IP-Prüfung", bullets: ["IP", "Maske", "Gateway", "DNS", "DHCP / statisch"] }
    ],
    checklist: ["Link ok", "IP ok", "Gateway ok"]
  },
  statusUnknown: {
    title: "X300 – Geführte Erstprüfung",
    summary: "Für den schnellen Einstieg direkt am Gerät.",
    steps: [
      {
        title: "Vor Ort starten",
        bullets: ["Gerät lebt?", "LEDs auffällig?", "LAN verbunden?", "Was ist das Hauptsymptom?"]
      },
      {
        title: "Direkter lokaler Weg",
        bullets: [
          "Für den lokalen Zugriff an X1P1 anschließen.",
          "Gerät mit USB-Maus neu starten.",
          "Nach dem Hochfahren linke Maustaste doppelklicken.",
          "Danach 169.254.169.254 im Browser testen."
        ]
      }
    ],
    checklist: ["Gerät geprüft", "Symptom grob erkannt", "Lokaler Zugriff geplant"]
  }
};
