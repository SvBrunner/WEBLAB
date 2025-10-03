# WEBLAB

Dies ist das WEBLAB Projekt von Sven Brunner für die Blockwoche.
Dabei wird die
Aufgabenstellung [Technologieradar](https://github.com/web-programming-lab/web-programming-lab-projekt/blob/95134d1041bce5140a3e29f034154216fcffd7ff/Technologie-Radar.md)
umgesetzt. An dem Umfang gibt es keine Anpassungen.

## Technologiestack

Ich habe mich für folgenden Stack entschieden :

- Angular (Frontend)
- Nest.js (Backend)
- MySql Datenbank

## Starten der Applikation

Das Starten der Applikation ist sehr einfach. Im apps-Verzeichnis befindet sich das docker-compose.yml.
Daher ist die ANleitung wie folgt:

```
git clone REPO_URL

cd apps
 
docker-compose up
```
Anschliessend kann man sich auf localhost:8080 den Techradar anschauen.

Folgende Useraccounts bestehen :
- admin/admin
- user/user

Dabei darf der Administrator Technologien verwalten, der User nur den Radar ansehen und die Detail-View aufrufen.


## Dokumentation

Die Dokumentation sowie das Arbeitsjournal sind in diesem Repository ebenfalls enthalten:

- [Dokumentation](./documentation/index.md)
- [Arbeitsjournal](./journal/index.md)


