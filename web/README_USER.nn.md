# Brukarrettleiing - Menighetsbladet

### 1. Navigasjon og faner
- **Dashbord**: Oversikt over totaltal, bladbestilling og distribusjon.
- **Kjører**: Administrer sjåførar og ruter, og førehandsvis/skriv ut køyrelister.
- **Bladberar**: Administrer bladberarar og ruter. Varslar dersom ein aktiv bladberar manglar sjåfør.
- **Adresser**: Adresseoversikt med tal på husstandar og ekskluderingar.
- **Ruter**: Ruteoversikt med bladberar, sjåfør og tal på blad.
- **Kart**: Interaktivt kart for å inspisere adresser, leggje til adresser og flytte adresser mellom ruter.

### 2. Redigering og lagring
1. Søk, filtrer eller sorter i tabellane eller via kartet.
2. Rediger, legg til eller slett rader ved behov.
3. Kontroller summar og rutetildelingar.
4. Klikk **Lagre endringar** (oppe til høgre ved tittelen) for å eksportere oppdateringar til `data/source.json`.
*Merk: Endringar vert lagra trygt lokalt i nettlesaren (IndexedDB) til du lagrar fila.*

### 3. Bladrekning
- `Inkluderte husstandar = Husstandar - Ekskluderte husstandar`
- `Blad som skal bestillast = Inkluderte husstandar + Ekstra blad`

### 4. Eksport og køyrelister
- **CSV og Excel (XLSX)**: Eksporter tabellar eller samandrag ved hjelp av eksportknappane.
- **Køyreliste**: Vel "Førehandsvis og skriv ut køyreliste" i Kjører-tabellen for utskriftsvennleg liste.