# Brukerveiledning - Menighetsbladet Distribusjonskontrollpanel

Velkommen til distribusjonssystemet for Menighetsbladet. Løsningen er driftet på nett via **GitHub Pages** ([https://hermanissimo.github.io/menighetsbladet/](https://hermanissimo.github.io/menighetsbladet/)), og er tilgjengelig direkte i alle moderne nettlesere på PC, nettbrett og mobil uten behov for lokal installasjon eller oppsett av servere.

### Personvern og «Ta med egne data»-arkitektur
- **Kun applikasjonsrammeverk på GitHub**: Det offentlige GitHub-repositoriet og nettsiden på GitHub Pages inneholder **kun selve rammeverket og programkoden** — det er fullstendig renset for personopplysninger, adresser, lister over frivillige og kontaktinfo.
- **100 % lokalt og konfidensielt**: Ingen menighetsdata eller personopplysninger sendes til eller lagres på GitHub eller eksterne servere. All databehandling foregår utelukkende lokalt i nettleseren på din egen enhet.
- **Laste inn data**: Når du åpner nettsiden, laster du inn menighetens lokale datafil (`source.json`) ved å trykke på **Velg datafil** (eller via **Innstillinger ⚙**).
- **Lagre arbeidet**: Ved å trykke på **Lagre endringer** lastes en oppdatert `source.json`-fil (eller tidsstemplet kopi `source_YYYYMMDD_HHmm.json`) ned til din egen datamaskin for menighetens lokale arkiv.

---

## 1. Brukergrensesnitt og navigasjon

### Hovedmeny og toppkontroller
- **Språkvelger**: Bytt mellom norsk bokmål (`nb`), norsk nynorsk (`nn`), engelsk (`en`) og svensk (`sv`). Alle tekster, tabeller og feilmeldinger oppdateres umiddelbart.
- **Innstillinger (⚙)**: Åpner innstillingspanelet for å se hvilken datafil som er aktiv, laste inn et eget datasett via **Velg datafil**, eller åpne denne brukerveiledningen.
- **Lagre endringer**: Vises oppe til høyre så snart du har gjort endringer i dataene (lagret midlertidig i nettleserens IndexedDB). Ved å klikke her eksporteres og lastes det ned en oppdatert `source.json`-fil til datamaskinen din. Du kan også lagre tidsstemplede sikkerhetskopier (f.eks. `source_YYYYMMDD_HHmm.json`) via «Lagre som kopi» for arkivering av utdelingsrunder. I nettlesere med støtte for File System Access API der du åpnet en lokal fil via fillasteren, kan endringene også lagres direkte til filen på disken.
- **Sikring mot tap av endringer (Close Guard)**: Hvis du prøver å lukke eller laste inn nettleserfanen på nytt mens det finnes ulagrede endringer, varsles du med valg om å lagre, fortsette arbeidet eller forkaste endringene.

### Faner
1. **Dashbord**: Hovedoversikt over nøkkeltall, varsler om ufordelte ruter, bladbestilling og personellstatus.
2. **Kjørere**: Oversikt over sjåfører, kontaktopplysninger, rutetildeling og utskrift av kjørelister.
3. **Bladbærere**: Oversikt over bladbærere, tildelte ruter og varsling om manglende sjåfør.
4. **Adresser**: Komplett adresseregister, husstandstall, reservasjoner mot uadressert post og masseredigering.
5. **Ruter**: Rutedefinisjoner, tildelt personell, ekstra bufferblad, sammenslåing av ruter og gatelister.
6. **Kart**: Interaktivt kart med fargekodede ruter, satellittvisning og flytting/tillegging av adresser.

---

## 2. Beregningsregler

Systemet sikrer full overensstemmelse på tvers av alle tabeller, eksporter og utskrifter:

1. **Inkluderte husstander**:
   $$\text{Inkluderte husstander} = \max(0, \text{Husstander} - \text{Ekskluderte husstander})$$
   Adresser der alle husstander er ekskludert regnes som ekskluderte stopp.

2. **Blad som skal bestilles**:
   $$\text{Blad som skal bestilles} = \sum \text{Inkluderte husstander} + \sum \text{Ekstra bufferblad}$$
   Ekstra blad kan legges til direkte på sjåfører, bladbærere og individuelle ruter.

3. **Ansvarskjede og rutekobling**:
   - Adresser tilhører **Ruter**.
   - Ruter tildeles **Bladbærere**.
   - Bladbærere tildeles **Kjørere**.
   - Kjørerne frakter bladpakkene ut til bladbærerne, som leverer bladene i postkassene.

---

## 3. Detaljert gjennomgang av hver fane

### 1. Dashbord
Dashbordet gir full oversikt før trykking og utkjøring:
- **Ufordelte ruter-kortet**: Varsler tydelig i oransje/rødt dersom aktive ruter mangler bladbærer eller sjåfør, og viser nøyaktig hvor mange adresser og husstander som er berørt.
- **Adresser-kortet**: Totalt antall adresser, fordelt på inkluderte (aktive leveringsstopp) og ekskluderte.
- **Husstander-kortet**: Totalt antall husstander, inkluderte husstander, ekskluderte husstander (*"Nei takk til uadressert post"*), samt ufordelte husstander.
- **Ruter-kortet**: Totalt antall ruter, fordelte, ufordelte, aktive og inaktive ruter.
- **Blad som skal bestilles-kortet**: Det nøyaktige antallet blader som må bestilles fra trykkeriet, inkludert ekstra bufferblader.
- **Personell-kortet**: Oversikt over aktive og inaktive kjørere og bladbærere. Hvis en aktiv bladbærer mangler tildelt sjåfør, vises et tydelig advarselssymbol (⚠️).
- **Eksport**: Eksporter sammendraget til **CSV** eller **Excel (XLSX)** via Eksport-menyen.

---

### 2. Kjørere (*Sjåfører*)
Administrerer sjåførene som frakter bladene ut til bladbærerne:
- **Søk og filtrering**:
  - Filtrer etter **Kjørernavn**, **Status** (*Aktiv / Inaktiv*), **Postnr** eller **Rute**.
  - Klikk **Tilbakestill filtre** for å tømme søkefeltene.
- **Tabellkolonner**:
  - **Navn**: Kjørerens fulle navn.
  - **Status**: Aktiv eller Inaktiv.
  - **Kjørernr**: Numerisk ID.
  - **Telefon og e-post**: Klikkbare koblinger (f.eks. for å sende e-post direkte).
  - **Adresse og Postnr**: Bostedsadresse.
  - **Antall ruter**: Antall ruter tilknyttet denne kjøreren. Klikk på tallet for å åpne Ruter-fanen filtrert på kjøreren.
  - **Antall blad**: Totalt antall blader som skal fraktes. Klikk på tallet for å se adressene i Adresser-fanen.
  - **Handlinger (nedtrekk)**:
    - **Rediger**: Oppdater kontaktdata, status eller ekstra blader.
    - **Slett**: Slett kjører, med mulighet til å overføre rutene til en annen kjører eller la dem stå ufordelt.
    - **Eksporter bladbærere (CSV / XLSX)**: Lager en egen kontaktliste over bladbærerne denne kjøreren kjører ut til.
    - **Forhåndsvis og skriv ut kjøreliste**: Åpner en utskriftsklar kjøreliste med ruter, bladbærere, leveringssteder, bladantall og redigerbare merknader.
- **Knapper øverst**:
  - **Legg til rad**: Registrer en ny sjåfør.
  - **Eksport ▾**: Eksporter tabellen til CSV/XLSX, eller velg **Kjørelister (skriv ut alle)** for å generere kjørelister for samtlige aktive sjåfører i én samlet utskriftsjobb.

---

### 3. Bladbærere
Administrerer personene som går med bladene lokalt i gatene:
- **Varsel om manglende sjåfør (⚠️)**: Aktive bladbærere som ikke er koblet til en sjåfør merkes med rød bakgrunn og advarsel for å forhindre at blader blir liggende.
- **Søk og filtrering**: Filtrer etter **Bladbærernavn**, **Status**, **Rute**, **Kjørernavn** og **Postnr**.
- **Tabellkolonner**: Navn, Status, Ruter (klikkbare lenker), Kjører (klikkbar lenke), Telefon, E-post, Adresse, Postnr, Ekstra blad, Blad totalt og Handlinger.
- **Handlinger**:
  - **Rediger**: Endre opplysninger, tildelt sjåfør, ruter eller ekstra blader.
  - **Slett**: Fjern bladbærer og frigjør rutene trygt.
- **Knapper øverst**:
  - **Legg til rad**: Registrer ny bladbærer.
  - **Eksport ▾**: Eksporter bladbæreroversikten til CSV eller XLSX.

---

### 4. Adresser
Mesterregister over alle leveringsadresser i menigheten:
- **Søk og filtrering**:
  - Søk i tekstfeltene etter **Adresse**, **Rute**, **Bladbærernavn** eller **Postnr**.
  - **Vis bare ekskluderte adresser**: Viser adresser der alle husstander er reservert mot blad.
  - **Vis bare adresser med ekskluderte husstander**: Viser adresser der minst én husstand er reservert.
- **Massevalg og operasjoner**:
  - Huk av avmerkingsbokser for enkeltadresser, eller øverst for å velge alle på siden.
  - **Oppdater rute**: Flytt alle valgte adresser til en ny rute i én enkelt operasjon.
  - **Slett valgte**: Slett alle valgte adresser samlet etter bekreftelse.
- **Tabellkolonner**: Avkryssing, Adresse, Rute, Bladbærer (beregnes automatisk), Husstander, Ekskluderte husstander, Postnr, Merknad og Handlinger (Rediger / Slett).
- **Knapper øverst**:
  - **Legg til rad**: Legg til en adresse manuelt med gatenavn, nummer, rute, husstander og merknader.
  - **Eksport ▾**: Eksporter filtrerte adresser til CSV eller XLSX.

---

### 5. Ruter
Definerer de geografiske leveringsområdene:
- **Kartknapp (🗺️)**: Klikk på kartikonet ved siden av rutenavnet for å hoppe rett til kartet med ruten ferdig filtrert.
- **Søk og filtrering**: Filtrer etter **Rute**, **Bladbærernavn**, **Kjørernavn**, **Postnr** og **Status**.
- **Massevalg og operasjoner**:
  - Velg flere ruter ved hjelp av avmerkingsboksene.
  - **Oppdater status**: Sett status (*Aktiv / Inaktiv*) på alle valgte ruter samtidig.
  - **Slå sammen ruter**: Slår sammen to eller flere ruter til én felles rute, flytter alle adresser automatisk og oppdaterer bladbærerne.
- **Tabellkolonner**: Avkryssing, Rute-ID, Status, Bladbærere, Kjører, Antall adresser, Ekstra blad, Blad totalt, Gater/husnummersammendrag, Merknader og Handlinger.
- **Handlinger**: Rediger, Slett og **Vis ruterapport**.
- **Knapper øverst**:
  - **Legg til rad**: Opprett en ny rute.
  - **Eksport ▾**: Eksporter til CSV/XLSX, eller velg **Ruterapporter (skriv ut alle)** for å skrive ut gatelister for samtlige ruter.

---

### 6. Kart
Interaktivt kartverktøy basert på Leaflet og Kartverkets/Geonorges adressedata:
- **Kartlag**: Veksle mellom standard veikart (**Kart**) og detaljerte flybilder (**Satellitt**).
- **Rutefilter**: Bruk nedtrekksmenyen øverst for å isolere én enkelt rute eller se alle under ett.
- **Fargekoding**: Hver rute vises med en unik, stabil fargetone. Nåler grupperes automatisk ved utzooming.
- **Enkeltadresse-operasjoner**:
  - **Inspiser og flytt**: Klikk på en farget adressenål for å se adresse, husstander og merknader. Velg en ny rute i nedtrekkslisten for å flytte adressen umiddelbart.
  - **Slett adresse**: Klikk på søppelkasseikonet for å fjerne adressen.
  - **Legg til adresse ved kartklikk**: Klikk på et bygg i kartet. Systemet henter offisiell adresse fra Kartverket automatisk. Dialogen viser:
    - Gatenavn, husnummer og postnummer.
    - Direkte **Kirken.no-søk** for å verifisere at eiendommen tilhører soknet.
    - Rutemeny og et lite oversiktskart som viser naborutene.
- **Masseoperasjoner (hold Ctrl nede)**:
  - **Legg til flere adresser**: Hold **Ctrl** nede og klikk på flere bygg etter hverandre. Røde midlertidige merker settes ut. Slipp **Ctrl** for å åpne tildelingsdialogen og legge til alle samlet på en rute.
  - **Flytt flere adresser**: Hold **Ctrl** nede og klikk på eksisterende fargede adressenåler. De valgte nålene blir røde. Slipp **Ctrl** for å velge ny rute og flytte alle samlet.

---

## 4. Trinn-for-trinn arbeidsprosesser

### Arbeidsprosess 1: Forberedelse til ny bladutgivelse og bestilling
1. Åpne fanen **Dashbord** og kontroller nøkkeltallene.
2. Sjekk kortet **Ufordelte ruter**:
   - Dersom det finnes ufordelte ruter, klikk på kortet eller gå til **Ruter**-fanen.
   - Finn rutene og tildel en aktiv bladbærer.
3. Kontroller kortet **Personell**:
   - Dersom advarselen om manglende sjåfør vises (⚠️), gå til **Bladbærere**, finn de merkede radene og tildel en sjåfør.
4. Les av tallet på kortet **Blad som skal bestilles**.
5. Eksporter sammendraget til Excel eller CSV for dokumentasjon til trykkeriet.

### Arbeidsprosess 2: Utskrift av kjørelister og gatelister
1. **Kjørelister for sjåførene**:
   - Gå til **Kjørere**-fanen.
   - For å skrive ut for alle sjåfører samtidig: Klikk **Eksport ▾** -> **Kjørelister (skriv ut alle)**.
   - For en enkelt sjåfør: Velg **Handlinger** -> **Forhåndsvis og skriv ut kjøreliste** på sjåførens rad.
   - Kontroller oppmøtesteder, bladbærere og bladantall. Merknader kan redigeres direkte i forhåndsvisningen.
   - Klikk **Skriv ut** (tilpasset A4-format).
2. **Gatelister for bladbærerne**:
   - Gå til **Ruter**-fanen.
   - Klikk **Eksport ▾** -> **Ruterapporter (skriv ut alle)** eller velg **Vis ruterapport** på en enkeltrute.
   - Adressene sorteres oversiktlig etter gatenavn, delt inn i partall og oddetall, med tydelig markering av reserverte husstander.
   - Klikk **Skriv ut** for å gi bladbæreren en ferdig ruteoversikt.

### Arbeidsprosess 3: Registrere nye boliger eller justere rutegrenser på kartet
1. Åpne **Kart**-fanen.
2. Velg ruten du skal kontrollere i nedtrekkslisten **Filtrer etter rute**.
3. For å legge til en ny bolig:
   - Finn bygget i kartet og klikk på det.
   - Klikk på Kirken.no-lenken dersom du vil dobbeltsjekke soknegrensen.
   - Velg riktig rute og klikk **Bekreft**.
4. For å justere grensen mellom to ruter:
   - Hold **Ctrl** inne og klikk på husene langs grensen som skal flyttes.
   - Slipp **Ctrl**.
   - Velg den nye ruten i dialogen og bekreft. Tallene oppdateres umiddelbart.

### Arbeidsprosess 4: Håndtere reservasjoner ("Nei takk til menighetsblad")
1. Når en beboer melder fra at de ikke ønsker bladet:
   - Gå til **Adresser**-fanen.
   - Søk opp adressen.
   - Velg **Handlinger** -> **Rediger**.
   - Øk antallet under **Ekskluderte husstander** (f.eks. fra `0` til `1`).
   - Skriv eventuelt en kort forklaring i **Merknad** (f.eks. `"Leil. H0201 ønsker ikke blad"`).
   - Klikk **Lagre**.
2. Totalantallet på Dashbordet justeres umiddelbart ned med 1 blad.

### Arbeidsprosess 5: Sammenslåing av to ruter
1. Gå til **Ruter**-fanen.
2. Huk av i avmerkingsboksen for rutene som skal slås sammen (f.eks. `B 3` og `B 4`).
3. Klikk på knappen **Slå sammen ruter (2)** over tabellen.
4. I dialogboksen:
   - Velg en av rutene som målrute, eller angi et nytt rutenavn.
   - Velg hvem som skal være bladbærer og sjåfør for den sammenslåtte ruten.
5. Klikk **Slå sammen**. De gamle rutene erstattes, adressene flyttes automatisk, og bladantallet summeres opp.

### Arbeidsprosess 6: Lagring og sikkerhetskopiering
Siden applikasjonen kjører lokalt i nettleseren din via GitHub Pages og det ikke lagres data på webserveren, forblir alle endringer fullt ut lokale:
1. Når du gjør endringer i adresser, ruter, bladbærere eller sjåfører, holdes endringene i minnet og sikkerhetslagres i nettleserens lokale hurtiglager (IndexedDB). Knappen **Lagre endringer** oppe til høyre lyser opp med en indikator på ulagrede endringer.
2. Klikk på **Lagre endringer**:
   - **Last ned oppdatert datasett**: Applikasjonen eksporterer og laster ned datasettet som `source.json`. Ta vare på filen på din lokale maskin eller menighetens fellesområde.
   - **Lagre tidsstemplet arkivkopi**: Benytt valget «Lagre som kopi» for å laste ned en kopi med dato og klokkeslett i filnavnet (f.eks. `source_YYYYMMDD_HHmm.json`), som gir en ryddig historikk over tidligere utdelingsrunder.
   - **Direkte fillagring**: I nettlesere med støtte for File System Access API der du åpnet en lokal fil via fillasteren, kan du lagre oppdateringene direkte tilbake til filen på disken.
3. **Datasikkerhet**: Husk at nettsiden på GitHub Pages ikke lagrer dataene dine på nett. Last derfor alltid ned en oppdatert `source.json` når du er ferdig med en arbeidsøkt.