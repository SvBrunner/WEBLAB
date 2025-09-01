# 

**Über arc42**

arc42, das Template zur Dokumentation von Software- und
Systemarchitekturen.

Template Version 8.2 DE. (basiert auf AsciiDoc Version), Januar 2023

Created, maintained and © by Dr. Peter Hruschka, Dr. Gernot Starke and
contributors. Siehe <https://arc42.org>.

# 1. Einführung und Ziele

## 1.1 Aufgabenstellung
Im Rahmen des Moduls *Web Programming Lab* soll ein individuelles Softwareprojekt umgesetzt werden.  
Der geplante Aufwand beträgt ca. **60 Stunden** und umfasst Implementierung, Dokumentation und Präsentation.  

Es gibt zwei mögliche Projektvarianten:

- **Technologie-Radar (vorgegebenes Thema, empfohlen)**  
  Ein webbasiertes Tool zur Erfassung, Visualisierung und Bewertung von Technologien in Form eines Radars (Quadranten, Ringe, Bewegungen über die Zeit).  

- **Eigenes Projektthema (Alternative, nach Absprache)**  
  Dazu wäre eine einseitige Projektskizze einzureichen mit  
  - **Kontextbeschreibung** (3–5 Sätze)  
  - **User Stories** (MoSCoW-Priorisierung)  
  - **geplanter Tech-Stack**

### Abgabevorbereitung (bei Projektwahl)
- Bei Wahl *Technologie-Radar*: Einreichung des geplanten **Tech-Stacks** sowie evtl. **Scope-Anpassungen**.  
- Bei Wahl *eigenes Projekt*: Abgabe einer Projektskizze (s. o.).

---

## 1.2 Ziele
- Umsetzung einer lauffähigen Webanwendung, die die Projektanforderungen erfüllt  
- Dokumentation der Softwarearchitektur (empfohlen: arc42, Fokus auf Kapitel 4–10)  
- Reflexion über Vorgehen, Herausforderungen und Lernerfahrungen  
- Erstellung eines Arbeitsprotokolls (Datum, Stunden, Tätigkeiten)  
- Durchführung einer 5-minütigen Projektpräsentation (inkl. Folien oder vergleichbarer Artefakte)

---

## 1.3 Nicht-Ziele
- Entwicklung einer vollständigen, produktionsreifen Plattform  
- Abdeckung aller möglichen Features eines Technologie-Radars  
- Einsatz komplexer Infrastruktur (z. B. Kubernetes, Multi-Cloud-Deployments), sofern nicht notwendig für den Projektrahmen  

---

## 1.4 Stakeholder
- **Dominik Witschard**  
  Erwartet nachvollziehbare Ergebnisse, eine saubere Dokumentation sowie eine kurze, prägnante Präsentation  

- **Sven Brunner**  
  Verantwortlich für Planung, Umsetzung, Dokumentation und Präsentation des Projekts  

- **Fiktive Endnutzer:innen (nur konzeptionell)**  
  Sollten das Technologie-Radar intuitiv bedienen können, um Technologien zu erfassen und deren Entwicklung im Zeitverlauf nachzuvollziehen


# 2. Randbedingungen

## 2.1 Fachliche Randbedingungen
- **Einzelarbeit:** Das Projekt wird von einer einzelnen Person (Sven Brunner) umgesetzt.  
- **Zeitbudget:** ca. 60 Stunden inkl. Implementierung, Dokumentation und Präsentation.  
- **Projektwahl:** Umsetzung eines **Technologie-Radars** mit Angular-Frontend.  
- **Abgabeformate:** Architekturdokumentation (arc42), Reflexion & Arbeitsprotokoll, Software-Artefakte (Git-Repository), Präsentationsartefakte.

## 2.2 Organisatorische Randbedingungen
- **Betreuung:** durch den Dozenten Dominik Witschard.  
- **Arbeitsweise:** Entwicklung, Tests und Betrieb erfolgen lokal (Entwickler-Notebook) in Docker-Containern.  
- **Keine Cloud-Abhängigkeit:** Keine PaaS/IaaS, keine externen Managed Services.

## 2.3 Technische Randbedingungen
- **Programmiersprache:** TypeScript (JS/TS).  
- **Frontend:** Angular (Material, Tailwind, ngx-echarts).  
- **Backend:** NestJS (Node 20+), REST-API.  
- **Persistenz:** PostgreSQL (Prisma ORM).  
- **Authentifizierung:** lokal optional (JWT) oder OIDC gegen lokalen/externen Provider; Cloud-Auth (z. B. Auth0) ist **nicht erforderlich**.  
- **Laufzeit/Infra:** **Docker** (lokal), Orchestrierung via **docker compose**.  
- **Artefakte/Binaries:** Container-Images für `web` (Angular/NGINX), `api` (NestJS), `db` (Postgres), `adminer` (DB-UI).  
- **Ports (default):** Web `:8080`, API `:3000`, Adminer `:8081`, Postgres `:5432`.

## 2.4 Qualitäts- und Prozessrandbedingungen
- **Dokumentation:** arc42-Template.  
- **Versionskontrolle:** GitHub (öffentlich).  
- **Build & Tests:** lokal per npm-Scripts (Jest, Angular Testing Library); optional lokale Git-Hooks.  
- **Reproduzierbarkeit:** `docker compose up` bringt das System lokal lauffähig hoch (inkl. DB-Schema-Migration).

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
