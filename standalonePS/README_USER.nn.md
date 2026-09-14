# Brukarrettleiing - Menighetsbladet Distribusjonskontrollpanel

Velkomen til distribusjonssystemet for Menighetsbladet. Løysinga er drifta på nett via **GitHub Pages** ([https://hermanissimo.github.io/menighetsbladet/](https://hermanissimo.github.io/menighetsbladet/)), og er tilgjengeleg direkte i alle moderne nettlesarar på PC, nettbrett og mobil utan behov for lokal installasjon eller oppsett av tenarar.

### Personvern og «Ta med eigne data»-arkitektur
- **Berre rammeverk på GitHub**: Det offentlege GitHub-repositoriet og nettsida på GitHub Pages inneheld **berre sjølve rammeverket og programkoden** — det er fullstendig reinsa for personopplysningar, adresser, lister over frivillige og kontaktinfo.
- **100 % lokalt og konfidensielt**: Ingen menighetsdata eller personopplysningar blir sende til eller lagra på GitHub eller eksterne tenarar. All databehandling skjer berre lokalt i nettlesaren på di eiga maskin.
- **Laste inn data**: Når du opnar nettsida, lastar du inn den lokale datafila til soknet (`source.json`) ved å trykkje på **Vel datafil** (eller via **Innstillingar ⚙**).
- **Lagre arbeidet**: Ved å trykkje på **Lagre endringar** blir ei oppdatert `source.json`-fil (eller ein kopi med tidsstempel `source_YYYYMMDD_HHmm.json`) lasta ned til maskina di for det lokale soknearkivet.

---

## 1. Brukargrensesnitt og navigasjon

### Hovudmeny og toppkontrollar
- **Språkveljar**: Byt mellom norsk bokmål (`nb`), norsk nynorsk (`nn`), engelsk (`en`) og svensk (`sv`). Alle tekstar, tabellar og feilmeldingar blir oppdaterte straks.
- **Innstillingar (⚙)**: Opnar innstillingspanelet for å sjå kva for datafil som er aktiv, laste inn eit eige datasett via **Vel datafil**, eller opne denne rettleiinga.
- **Lagre endringar**: Viser seg oppe til høgre så snart du har gjort endringar i dataa (lagra mellombels i nettlesaren sin IndexedDB). Ved å klikke her blir ei oppdatert `source.json`-fil eksportert og lasta ned til maskina di. Du kan også lagre tryggingskopiar med tidsstempel (t.d. `source_YYYYMMDD_HHmm.json`) via «Lagre som kopi» for arkivering av distribusjonsrundar. I nettlesarar med støtte for File System Access API der du opna ei lokal fil via fillasteren, kan endringane også lagrast direkte til fila på disken.
- **Sikring mot tap av endringar (Close Guard)**: Dersom du freistar å lukke eller laste inn nettlesarfanen på nytt medan det finst ulagra endringar, kjem det opp eit varsel der du kan velje å lagre, halde fram eller forkaste endringane.

### Faner
1. **Dashbord**: Hovudoversyn over nøkkeltal, varsel om ufylte ruter, bladbestilling og personellstatus.
2. **Køyrarar**: Oversyn over sjåførar, kontaktinfo, rutetildeling og utskrift av køyrelister.
3. **Bladberarar**: Oversyn over bladberarar, tildelte ruter og varsel om manglande sjåfør.
4. **Adresser**: Komplett adresseregister, husstandstal, reservasjonar mot uadressert post og masseredigering.
5. **Ruter**: Rutedefinisjonar, tildelt personell, ekstra bufferblad, samanslåing av ruter og gatelister.
6. **Kart**: Interaktivt kart med fargekoda ruter, satellittvising og flytting/tillegging av adresser.

---

## 2. Utrekningsreglar

Systemet syter for samsvar på tvers av alle tabellar, eksportar og utskrifter:

1. **Inkluderte husstandar**:
   $$\text{Inkluderte husstandar} = \max(0, \text{Husstandar} - \text{Ekskluderte husstandar})$$
   Adresser der alle husstandar er ekskluderte blir rekna som ekskluderte stopp.

2. **Blad som skal bestillast**:
   $$\text{Blad som skal bestillast} = \sum \text{Inkluderte husstandar} + \sum \text{Ekstra bufferblad}$$
   Ekstra blad kan leggjast til direkte på sjåførar, bladberarar og einskildruter.

3. **Ansvarsrekkje og rutekopling**:
   - Adresser høyrer til **Ruter**.
   - Ruter blir tildelte **Bladberarar**.
   - Bladberarar blir tildelte **Køyrarar**.
   - Køyrarane fraktar bladpakkane ut til bladberarane, som leverer blada i postkassene.

---

## 3. Detaljert gjennomgang av kvar fane

### 1. Dashbord
Dashbordet gjev full oversikt før trykking og utkøyring:
- **Ufordelte ruter-kortet**: Varslar tydeleg dersom aktive ruter manglar bladberar eller sjåfør, og viser nøyaktig kor mange adresser og husstandar som er råka.
- **Adresser-kortet**: Totalt tal på adresser, fordelt på inkluderte (aktive leveringsstopp) og ekskluderte.
- **Husstandar-kortet**: Totalt tal på husstandar, inkluderte husstandar, ekskluderte husstandar (*"Nei takk til uadressert post"*), og ufordelte husstandar.
- **Ruter-kortet**: Totalt tal på ruter, fordelte, ufordelte, aktive og inaktive ruter.
- **Blad som skal bestillast-kortet**: Det nøyaktige talet på blad som må bestillast frå trykkeriet, medrekna ekstra bufferblad.
- **Personell-kortet**: Oversyn over aktive og inaktive sjåførar og bladberarar. Dersom ein aktiv bladberar manglar sjåfør, kjem det opp eit tydeleg advarselssymbol (⚠️).
- **Eksport**: Eksporter samandraget til **CSV** eller **Excel (XLSX)** via Eksport-menyen.

---

### 2. Køyrarar (*Sjåførar*)
Styring av sjåførane som fraktar blada ut:
- **Søk og filtrering**:
  - Filtrer etter **Køyrarnamn**, **Status** (*Aktiv / Inaktiv*), **Postnr** eller **Rute**.
  - Klikk **Nullstill filter** for å tømma søkefelta.
- **Tabellkolonnar**:
  - **Namn**: Køyrarens fulle namn.
  - **Status**: Aktiv eller Inaktiv.
  - **Køyrarnr**: Numerisk ID.
  - **Telefon og e-post**: Klikkbare lenkjer.
  - **Adresse og Postnr**: Bustadadresse.
  - **Antall ruter**: Talet på ruter for denne køyraran. Klikk på talet for å opne Ruter-fana filtrert på køyraran.
  - **Antall blad**: Samla tal på blad som skal køyrast ut. Klikk på talet for å sjå adressene i Adresser-fana.
  - **Handlingar (nedtrekk)**:
    - **Rediger**: Oppdater kontaktdata, status eller ekstra blad.
    - **Slett**: Slett køyrar, med høve til å føra rutene over til ein annan køyrar eller la dei stå opne.
    - **Eksporter bladberarar (CSV / XLSX)**: Lagar ei eiga kontaktliste over bladberarane denne køyraran køyrer ut til.
    - **Førehandsvis og skriv ut køyrelisete**: Opnar ei utskriftsklar køyrelisete med ruter, bladberarar, leveringsstader, bladantall og redigerbare merknader.
- **Knappar øvst**:
  - **Legg til rad**: Registrer ny sjåfør.
  - **Eksport ▾**: Eksporter tabellen til CSV/XLSX, eller vel **Køyrelister (skriv ut alle)** for å skriva ut lister for samtlige aktive sjåførar samla.

---

### 3. Bladberarar
Styring av personane som går med blada lokalt:
- **Varsel om manglande sjåfør (⚠️)**: Aktive bladberarar som ikkje er kopla til ein sjåfør blir merka med raud bakgrunn og advarsel.
- **Søk og filtrering**: Filtrer etter **Bladberarnamn**, **Status**, **Rute**, **Køyrarnamn** og **Postnr**.
- **Tabellkolonnar**: Namn, Status, Ruter (klikkbare lenkjer), Køyrar (klikkbar lenkje), Telefon, E-post, Adresse, Postnr, Ekstra blad, Blad totalt og Handlingar.
- **Handlingar**:
  - **Rediger**: Endre opplysningar, tildelt sjåfør, ruter eller ekstra blad.
  - **Slett**: Fjern bladberar og frigjør rutene trygt.
- **Knappar øvst**:
  - **Legg til rad**: Registrer ny bladberar.
  - **Eksport ▾**: Eksporter bladberaroversynet til CSV eller XLSX.

---

### 4. Adresser
Mesterregister over alle leveringsadresser:
- **Søk og filtrering**:
  - Søk i tekstfelta etter **Adresse**, **Rute**, **Bladberarnamn** eller **Postnr**.
  - **Vis berre ekskluderte adresser**: Viser adresser der alle husstandar har reservert seg.
  - **Vis berre adresser med ekskluderte husstandar**: Viser adresser der minst éin husstand er reservert.
- **Masseval og handlingar**:
  - Huk av boksar for enkeltadresser, eller øvst for å velje alle på sida.
  - **Oppdater rute**: Flytt alle valde adresser til ei ny rute i éi handling.
  - **Slett valde**: Slett alle valde adresser samla etter stadfesting.
- **Tabellkolonnar**: Avkryssing, Adresse, Rute, Bladberar, Husstandar, Ekskluderte husstandar, Postnr, Merknad og Handlingar (Rediger / Slett).
- **Knappar øvst**:
  - **Legg til rad**: Legg til ei adresse manuelt med gatenamn, nummer, rute, husstandar og merknader.
  - **Eksport ▾**: Eksporter filtrerte adresser til CSV eller XLSX.

---

### 5. Ruter
Definerer dei geografiske leveringsområda:
- **Kartknapp (🗺️)**: Klikk på kartikonet ved rutenamnet for å hoppe rett til kartet med rutevising.
- **Søk og filtrering**: Filtrer etter **Rute**, **Bladberarnamn**, **Køyrarnamn**, **Postnr** og **Status**.
- **Masseval og handlingar**:
  - Vel fleire ruter ved hjelp av avkryssingsboksane.
  - **Oppdater status**: Set status (*Aktiv / Inaktiv*) på alle valde ruter samstundes.
  - **Slå saman ruter**: Slår saman to eller fleire ruter til éi rute, flyttar alle adresser automatisk og oppdaterer bladberarane.
- **Tabellkolonnar**: Avkryssing, Rute-ID, Status, Bladberarar, Køyrar, Talet på adresser, Ekstra blad, Blad totalt, Gate/husnummersamandrag, Merknader og Handlingar.
- **Handlingar**: Rediger, Slett og **Vis ruterapport**.
- **Knappar øvst**:
  - **Legg til rad**: Opprett ei ny rute.
  - **Eksport ▾**: Eksporter til CSV/XLSX, eller vel **Ruterapportar (skriv ut alle)** for å skriva ut gatelister for alle rutene.

---

### 6. Kart
Interaktivt kartverktøy basert på Leaflet og Kartverkets/Geonorges adressedata:
- **Kartlag**: Byt mellom standard vegkart (**Kart**) og detaljerte flybilete (**Satellitt**).
- **Rutefilter**: Bruk menyen øvst for å sjå éi rute eller alle under eitt.
- **Fargekoding**: Kvar rute har sin eigen fargetone. Nåler blir samla automatisk ved utzooming.
- **Enkeltadresse-handlingar**:
  - **Inspiser og flytt**: Klikk på ei farga nål for å sjå adresse og husstandar. Vel ny rute i lista for å flytte ho straks.
  - **Slett adresse**: Klikk på søppeldunken for å fjerne adressa.
  - **Legg til adresse ved kartklikk**: Klikk på eit bygg i kartet for automatisk oppslag mot Kartverket. Dialogen viser:
    - Gatenamn, husnummer og postnummer.
    - Direkte **Kirken.no-søk** for å stadfesta soknegrensa.
    - Rutemeny og eit lite oversynskart med naborutene.
- **Massehandlingar (hald Ctrl nede)**:
  - **Legg til fleire adresser**: Hald **Ctrl** nede og klikk på fleire bygg etter kvarandre. Raude merke kjem til syne. Slepp **Ctrl** for å tildele alle samla til ei rute.
  - **Flytt fleire adresser**: Hald **Ctrl** nede og klikk på eksisterande nåler (dei blir raude). Slepp **Ctrl** for å velje ny rute for alle saman.

---

## 4. Trinn-for-trinn arbeidsprosessar

### Arbeidsprosess 1: Førebuing til ny bladutgåve og bestilling
1. Opna fana **Dashbord** og kontroller nøkkeltala.
2. Sjekk kortet **Ufordelte ruter**:
   - Dersom det finst ufordelte ruter, klikk på kortet eller gå til **Ruter**-fana.
   - Finn rutene og tildel ein aktiv bladberar.
3. Kontroller kortet **Personell**:
   - Dersom varselet om manglande sjåfør kjem opp (⚠️), gå til **Bladberarar**, finn dei merka radene og tildel ein sjåfør.
4. Les av talet på kortet **Blad som skal bestillast**.
5. Eksporter samandraget til Excel eller CSV til trykkeriet.

### Arbeidsprosess 2: Utskrift av køyrelister og gatelister
1. **Køyrelister for sjåførane**:
   - Gå til **Køyrarar**-fana.
   - For å skriva ut for alle sjåførar samstundes: Klikk **Eksport ▾** -> **Køyrelister (skriv ut alle)**.
   - For ein einskild sjåfør: Vel **Handlingar** -> **Førehandsvis og skriv ut køyrelisete** på sjåførens rad.
   - Kontroller oppmøtestader, bladberarar og bladantall. Merknader kan redigerast direkte i førehandsvisinga.
   - Klikk **Skriv ut** (tilpassa A4-format).
2. **Gatelister for bladberarane**:
   - Gå til **Ruter**-fana.
   - Klikk **Eksport ▾** -> **Ruterapportar (skriv ut alle)** eller vel **Vis ruterapport** på ei einskildrute.
   - Adressene blir sorterte etter gatenamn, delt i partal og oddetal, med tydeleg merking av reserverte husstandar.
   - Klikk **Skriv ut** for å gje bladberaren ei ferdig utskrift.

### Arbeidsprosess 3: Registrere nye bustader eller justere rutegrenser på kartet
1. Opna **Kart**-fana.
2. Vel ruta du skal kontrollere i menyen **Filtrer etter rute**.
3. For å leggja til ein ny bustad:
   - Finn bygget i kartet og klikk på det.
   - Sjekk Kirken.no-lenkja dersom du vil kontrollere soknegrensa.
   - Vel rett rute og klikk **Stadfest**.
4. For å justera grensa mellom to ruter:
   - Hald **Ctrl** inne og klikk på husa langs grensa som skal flyttast.
   - Slepp **Ctrl**.
   - Vel den nye ruta i dialogen og stadfest.

### Arbeidsprosess 4: Handsama reservasjonar ("Nei takk til menighetsblad")
1. Når ein bebuar melder frå om at dei ikkje ønskjer bladet:
   - Gå til **Adresser**-fana.
   - Søk opp adressa.
   - Vel **Handlingar** -> **Rediger**.
   - Auk talet under **Ekskluderte husstandar** (t.d. frå `0` til `1`).
   - Skriv eventuelt ei kort forklaring i **Merknad** (t.d. `"Leil. H0201 ønskjer ikkje blad"`).
   - Klikk **Lagre**.
2. Samla tal på Dashbordet går straks ned med 1 blad.

### Arbeidsprosess 5: Samanslåing av to ruter
1. Gå til **Ruter**-fana.
2. Huk av i avmerkingsboksen for rutene som skal slåast saman (t.d. `B 3` og `B 4`).
3. Klikk på knappen **Slå saman ruter (2)** over tabellen.
4. I dialogboksen:
   - Vel ei av rutene som målrute, eller oppgje eit nytt rutenamn.
   - Vel kven som skal vera bladberar og sjåfør for den samanslåtte ruta.
5. Klikk **Slå saman**. Rutene blir oppdaterte og adressene flytta automatisk.

### Arbeidsprosess 6: Lagring og tryggingskopiering
Sidan applikasjonen køyrer lokalt i nettlesaren din via GitHub Pages og det ikkje blir lagra data på vevtenaren, er alle endringar fullt ut lokale:
1. Når du gjer endringar i adresser, ruter, bladberarar eller sjåførar, blir endringane haldne i minnet og lagra i det lokale snøgglageret til nettlesaren (IndexedDB). Knappen **Lagre endringar** oppe til høgre kjem til syne med ein indikator for ulagra endringar.
2. Klikk på **Lagre endringar**:
   - **Last ned oppdatert datasett**: Applikasjonen eksporterer og lastar ned datasettet som `source.json`. Ta vare på fila på maskina di eller soknet sitt fellesområde.
   - **Lagre arkivkopi med tidsstempel**: Bruk valet «Lagre som kopi» for å laste ned ein kopi med dato og klokkeslett (t.d. `source_YYYYMMDD_HHmm.json`) for historisk oversikt over tidlegare utdelingsrundar.
   - **Direkte fillagring**: I nettlesarar med støtte for File System Access API der du opna ei lokal fil via fillasteren, kan du lagre oppdateringane direkte attende til fila på disken.
3. **Datasikkerheit**: Hugs at nettsida på GitHub Pages ikkje lagrar dataa dine på nettet. Last difor alltid ned ei oppdatert `source.json`-fil når du er ferdig med ei arbeidsøkt.