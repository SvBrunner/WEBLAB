# 

**Über arc42**

arc42, das Template zur Dokumentation von Software- und
Systemarchitekturen.

Template Version 8.2 DE. (basiert auf AsciiDoc Version), Januar 2023

Created, maintained and © by Dr. Peter Hruschka, Dr. Gernot Starke and
contributors. Siehe <https://arc42.org>.

# 1. Einführung und Ziele

## 1.1 Aufgabenstellung
Im Rahmen des Moduls *Web Programming Lab* wird ein individuelles Softwareprojekt umgesetzt.  
Geplant ist die Realisierung eines **Technologie-Radars** als Webanwendung.

Der Radar dient dazu, Technologien zu erfassen, in Kategorien und Reifegrade einzuordnen und für Nutzer sichtbar zu machen.  
Es sollen zentrale Basisfunktionalitäten wie Verwaltung (Administration) und Anzeige (Viewer) realisiert werden.

## 1.2 Ziele
- Entwicklung einer lauffähigen Webanwendung (Radar-Administration und Radar-Viewer)
- Einfache, nachvollziehbare Architektur
- Dokumentation nach arc42 (Fokus auf Kapitel 4–10)
- Reflexion über Vorgehen und Lernerfahrungen
- Kurze Projektpräsentation

## 1.3 Nicht-Ziele
- Keine vollständige, produktionsreife Plattform
- Keine komplexe Infrastruktur (Cloud, Kubernetes etc.)
- Keine vollständige Abbildung aller möglichen Features eines Technologie-Radars

## 1.4 Stakeholder
- **Dozent (Betreuung)** – erwartet klare Ergebnisse, Dokumentation und Präsentation
- **Student (Umsetzung)** – verantwortlich für Planung, Implementierung und Reflexion
- **Endnutzer:innen (fiktiv)** – sollen den Radar intuitiv nutzen können

---

# 2. Randbedingungen

## 2.1 Fachliche Randbedingungen
- Projekt wird in **Einzelarbeit** durchgeführt
- Zeitbudget: ca. **60 Stunden** inkl. Implementierung, Dokumentation, Präsentation
- Umsetzung eines **Technologie-Radars**

## 2.2 Organisatorische Randbedingungen
- Betreuung durch Dozent im Modul *Web Programming Lab*
- Abgabe: Architekturdokumentation, Reflexion, Arbeitsjournal, Softwareartefakte, Präsentation

## 2.3 Technische Randbedingungen
- **Frontend:** Angular
- **Backend:** NestJS
- **Persistenz:** Datenbank noch offen
- **Entwicklung:** lokal, ggf. Container-basiert

## 2.4 Qualitäts- und Prozessrandbedingungen
- Strukturierte Dokumentation (arc42)
- Versionskontrolle via Git
- Lokale Builds & Tests
- Ergebnis muss reproduzierbar lauffähig sein

# Kontextabgrenzung

## Fachlicher Kontext

**\<Diagramm und/oder Tabelle>**

**\<optional: Erläuterung der externen fachlichen Schnittstellen>**

## Technischer Kontext

**\<Diagramm oder Tabelle>**

**\<optional: Erläuterung der externen technischen Schnittstellen>**

**\<Mapping fachliche auf technische Schnittstellen>**

# Lösungsstrategie

# Bausteinsicht

## Whitebox Gesamtsystem

***\<Übersichtsdiagramm>***

Begründung  
*\<Erläuternder Text>*

Enthaltene Bausteine  
*\<Beschreibung der enthaltenen Bausteine (Blackboxen)>*

Wichtige Schnittstellen  
*\<Beschreibung wichtiger Schnittstellen>*

### \<Name Blackbox 1>

*\<Zweck/Verantwortung>*

*\<Schnittstelle(n)>*

*\<(Optional) Qualitäts-/Leistungsmerkmale>*

*\<(Optional) Ablageort/Datei(en)>*

*\<(Optional) Erfüllte Anforderungen>*

*\<(optional) Offene Punkte/Probleme/Risiken>*

### \<Name Blackbox 2>

*\<Blackbox-Template>*

### \<Name Blackbox n>

*\<Blackbox-Template>*

### \<Name Schnittstelle 1>

…

### \<Name Schnittstelle m>

## Ebene 2

### Whitebox *\<Baustein 1>*

*\<Whitebox-Template>*

### Whitebox *\<Baustein 2>*

*\<Whitebox-Template>*

…

### Whitebox *\<Baustein m>*

*\<Whitebox-Template>*

## Ebene 3

### Whitebox \<\_Baustein x.1\_\>

*\<Whitebox-Template>*

### Whitebox \<\_Baustein x.2\_\>

*\<Whitebox-Template>*

### Whitebox \<\_Baustein y.1\_\>

*\<Whitebox-Template>*

# Laufzeitsicht

## *\<Bezeichnung Laufzeitszenario 1>*

-   \<hier Laufzeitdiagramm oder Ablaufbeschreibung einfügen>

-   \<hier Besonderheiten bei dem Zusammenspiel der Bausteine in diesem
    Szenario erläutern>

## *\<Bezeichnung Laufzeitszenario 2>*

…

## *\<Bezeichnung Laufzeitszenario n>*

…

# Verteilungssicht

## Infrastruktur Ebene 1

***\<Übersichtsdiagramm>***

Begründung  
*\<Erläuternder Text>*

Qualitäts- und/oder Leistungsmerkmale  
*\<Erläuternder Text>*

Zuordnung von Bausteinen zu Infrastruktur  
*\<Beschreibung der Zuordnung>*

## Infrastruktur Ebene 2

### *\<Infrastrukturelement 1>*

*\<Diagramm + Erläuterungen>*

### *\<Infrastrukturelement 2>*

*\<Diagramm + Erläuterungen>*

…

### *\<Infrastrukturelement n>*

*\<Diagramm + Erläuterungen>*

# Querschnittliche Konzepte

## *\<Konzept 1>*

*\<Erklärung>*

## *\<Konzept 2>*

*\<Erklärung>*

…

## *\<Konzept n>*

*\<Erklärung>*

# Architekturentscheidungen

# Qualitätsanforderungen

<div class="formalpara-title">

**Weiterführende Informationen**

</div>

Siehe [Qualitätsanforderungen](https://docs.arc42.org/section-10/) in
der online-Dokumentation (auf Englisch!).

## Qualitätsbaum

## Qualitätsszenarien

# Risiken und technische Schulden

# Glossar

| Begriff        | Definition        |
|----------------|-------------------|
| *\<Begriff-1>* | *\<Definition-1>* |
| *\<Begriff-2*  | *\<Definition-2>* |
