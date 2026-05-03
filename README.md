# Math-Task-Generator

Ein leichtgewichtiges, client-seitiges Tool zum Erzeugen von Mathematik-Aufgaben (Training, Quiz und Arbeitsblätter).
https://bckr357.github.io/Math-Task-Generator/

## Features
- Generiert Aufgaben aus vielen Themenbereichen: Arithmetik, Brüche, Geometrie, Wahrscheinlichkeiten, Funktionen, Statistik u.v.m.
- Ausgabe im Browser mit LaTeX-Formeln und einfachen SVG-Grafiken.
- Druckfreundliche Darstellung für Arbeitsblätter.
- Konfigurierbare Aufgabentypen und Klassenstufen (siehe `js/tasks.js`).

## Schnellstart
1. Repository klonen oder als ZIP herunterladen.
2. Datei `index.html` im Browser öffnen.
3. Aufgaben über die UI generieren; Druckansicht zum Ausdrucken verwenden.

## Dateien (wichtig)
- `index.html` — Hauptseite / UI
- `js/` — JavaScript-Quellcode
	- `js/tasks.js` — Aufgaben-Generator (Kernlogik)
	- `js/app.js` — App-Initialisierung und UI-Integration
	- `js/utils.js` — Hilfsfunktionen
- `css/` — Stile
- `img/` — Bilder und Icons

## Entwicklung
- Lokales Editieren: Änderungen im Projektordner vornehmen und `index.html` im Browser neu laden.
- Tests: keine speziellen Test-Skripte vorhanden; einfache manuelle Tests im Browser.
- Beiträge: Fork → Branch → Pull Request.

## Lizenz
Dieses Projekt ist lizenziert unter der MIT License. Siehe die Datei [LICENSE](LICENSE) für den vollständigen Lizenztext.

Kurzfassung: Du darfst das Projekt benutzen, kopieren, ändern und weiterverbreiten. Der obenstehende Urheberrechtshinweis und die Lizenz müssen in Kopien des Projekts enthalten bleiben.

## Mitwirken
- Issues erstellen für Bugs oder Feature-Requests.
- Pull Requests willkommen — bitte beschreibe Änderungen im PR-Text.

## Qualitätssicherung

### Automatisierte Prüfungen (PowerShell)

```powershell
# Prüfen: Kein target="_blank" ohne rel="noopener noreferrer"
Get-ChildItem -Path . -Filter *.html -Recurse |
	Select-String -Pattern 'target="_blank"' |
  Where-Object { $_.Line -notmatch 'rel="noopener noreferrer"' }

# Prüfen: Keine alten ASCII-ARIA-Labels mehr
Get-ChildItem -Path . -Filter *.html -Recurse |
	Select-String -Pattern 'Hauptmenue|schliessen|oeffnen'

# Prüfen: Keine alten Quiz-Button-Klassen (btn-start/score/plus/minus)
Select-String -Path "css/quiz.css","quiz.html" -Pattern '\bbtn-(start|score|plus|minus)\b'

# Prüfen: Keine Inline-Stile in quiz.html
Select-String -Path "quiz.html" -Pattern ' style='
```

### Manueller Smoke-Test

| # | Schritt | Erwartetes Ergebnis |
|---|---------|---------------------|
| 1 | `index.html` öffnen | Startseite lädt ohne Konsolenfehler |
| 2 | Aufgabentyp wählen, „Aufgaben generieren" klicken | Aufgaben erscheinen mit korrekt gerendertem MathJax |
| 3 | „Arbeitsblatt"-Ansicht öffnen und drucken | Layout ohne Überlappungen, Lösungen trennbar |
| 4 | Kompetenzraster → Klasse 6 öffnen | Kompetenzen und Buttons sichtbar, Fachbegriffe ein-/ausklappbar |
| 5 | Video-Link in Kompetenzraster anklicken | Öffnet YouTube in neuem Tab ohne `window.opener` (rel=noreferrer) |
| 6 | JSON-Export erstellen, JSON-Import testen | Aufgaben werden korrekt wiederhergestellt |
| 7 | Quiz-Modus starten (quiz.html) | Punktebuttons (+/–) funktionieren, Karten wechseln |
| 8 | DevTools → Console | Keine Fehler, höchstens harmlose Warnungen |
