BookDragons – Nettbutikk for bruktbøker

BookDragons er en nettbutikk bygget med Next.js og Payload CMS.
Kunder kan se og filtrere bøker, legge dem i handlekurven og sende inn en bestilling.
Ansatte bruker Payloads adminpanel for å administrere bøker, forfattere, sjangere, media og bestillinger.

Teknologier:

1. Next.js 14 (App Router)

2. React med TypeScript

3. Payload CMS

4. SQLite database

5. Egen CSS-styling for frontend

6. React Context for handlekurv

Installasjon
1. Klon prosjektet
git clone <repo-url>
cd <prosjektmappe>

2. Installer avhengigheter
npm install

3. Opprett .env-fil

Opprett en fil i rotmappen med navnet .env og legg inn:

PAYLOAD_SECRET=secret
DATABASE_URI=sqlite:./eksam3n.db
NEXT_PUBLIC_CMS_URL=http://localhost:3000

4. Start utviklingsserver
npm run dev


Frontend og adminpanel åpnes på:

http://localhost:3000

http://localhost:3000/admin


Funksjonalitet


Frontend

Vise alle bøker

Filtrering etter forfatter og sjanger

Vise lagerstatus og aldergruppe

Handlekurv med lagring i localStorage

Innsending av bestillinger til Payload API

Egen side for forfattere og sjangere


Backend (Payload CMS)

Administrasjon av bøker

Opplasting av omslagsbilder

Registrering av forfattere og sjangere

Oversikt over bestillinger fra kunder

Håndtering av mediafiler

Adminbrukere

Bygg prosjektet

For å bygge applikasjonen for produksjon:

npm run build
npm start

Videre utvikling

Alle Payload-collections ligger i src/collections/

Payload-konfigurasjonen ligger i src/payload.config.ts

Frontend-sider ligger i src/app/(frontend)/

Handlekurv-logikk ligger i src/app/(frontend)/cartComponents/

Passord og epost brukt: 

bob@gmail.com
passord: 123456

Video besvarelse:
https://youtu.be/9MGYpMU7CEs
