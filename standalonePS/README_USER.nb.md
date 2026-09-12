# Brukerveiledning - Menighetsbladet

### 1. Navigasjon og faner
- **Dashbord**: Oversikt over totaltall, bladbestilling og distribusjon.
- **Kjører**: Administrer sjåfører og ruter, og forhåndsvis/skriv ut kjørelister.
- **Bladbærer**: Administrer bladbærere og ruter. Varsler dersom en aktiv bladbærer mangler sjåfør.
- **Adresser**: Adresseoversikt med antall husstander og ekskluderinger.
- **Ruter**: Ruteoversikt med bladbærer, sjåfør og antall blad.
- **Kart**: Interaktivt kart for å inspisere adresser, legge til adresser og flytte adresser mellom ruter.

### 2. Redigering og lagring
1. Søk, filtrer eller sorter i tabellene eller via kartet.
2. Rediger, legg til eller slett rader ved behov.
3. Kontroller summer og rutetildelinger.
4. Klikk **Lagre endringer** (oppe til høyre ved tittelen) for å eksportere oppdateringer til `data/source.json`.
*Merk: Endringer lagres trygt lokalt i nettleseren (IndexedDB) til du lagrer filen.*

### 3. Bladberegning
- `Inkluderte husstander = Husstander - Ekskluderte husstander`
- `Blad som skal bestilles = Inkluderte husstander + Ekstra blad`

### 4. Eksport og kjørelister
- **CSV og Excel (XLSX)**: Eksporter tabeller eller sammendrag ved hjelp av eksportknappene.
- **Kjøreliste**: Velg "Forhåndsvis og skriv ut kjøreliste" i Kjører-tabellens handlingsmeny for utskriftsvennlig liste.