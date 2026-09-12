# Användarguide (User Guide) - Menighetsbladet Distributionspanel

Välkommen till distributionssystemet för Menighetsbladet. Denna guide ger en fullständig genomgång av alla funktioner, vyer, beräkningar och arbetsflöden.

---

## 1. Gränssnitt och navigering

### Huvudmeny och toppkontroller
- **Språkväljare**: Växla mellan norska bokmål (`nb`), norska nynorsk (`nn`), engelska (`en`) och svenska (`sv`). Alla texter och tabeller uppdateras direkt.
- **Inställningar (⚙)**: Öppnar inställningspanelen för att se vilken datafil som är aktiv, ladda in en annan fil via **Välj datafil**, eller öppna denna användarguide.
- **Spara ändringar**: Visas uppe till höger så fort du gjort ändringar. I fristående läge sparas ändringarna direkt till `data/source.json` på datorn och en tidsstämplad säkerhetskopia skapas automatiskt. I vanligt webbläsarläge laddas en uppdaterad `source.json`-fil ned.
- **Skydd mot förlorade ändringar (Close Guard)**: Om du försöker stänga eller ladda om webbläsarfliken med osparade ändringar visas en varning där du kan välja att spara, fortsätta arbeta eller förkasta ändringarna.

### Flikar
1. **Dashboard**: Huvudöversikt över nyckeltal, varningar om otilldelade rutter, tidningsbeställning och personalstatus.
2. **Förare (Drivers)**: Översikt över chaufförer, kontaktuppgifter, rutttilldelning och utskrift av körsedlar (*kjørelister*).
3. **Utdelare (Distributors)**: Översikt över tidningsutdelare (*bladbærere*), tilldelade rutter och varning om saknad chaufför.
4. **Adresser**: Komplett adressregister, hushållsantal, reservationer mot oadresserad post och massredigering.
5. **Rutter**: Ruttdefinitioner, tilldelad personal, extra buffertidningar, sammanslagning av rutter och gatuöversikter.
6. **Karta (Map)**: Interaktiv karta med färgkodade rutter, satellitvy och flytt/tillägg av adresser.

---

## 2. Beräkningsregler

Systemet säkerställer full överensstämmelse mellan alla tabeller, exporter och utskrifter:

1. **Inkluderade hushåll**:
   $$\text{Inkluderade hushåll} = \max(0, \text{Hushåll} - \text{Exkluderade hushåll})$$
   Adresser där alla hushåll är exkluderade räknas som exkluderade stopp.

2. **Tidningar att beställa**:
   $$\text{Tidningar att beställa} = \sum \text{Inkluderade hushåll} + \sum \text{Extra buffertidningar}$$
   Extra tidningar kan läggas till direkt på förare, utdelare och individuella rutter.

3. **Ansvarskedja och ruttkoppling**:
   - Adresser tillhör **Rutter**.
   - Rutter tilldelas **Utdelare**.
   - Utdelare tilldelas **Förare**.
   - Förarna levererar tidningsbuntarna till utdelarna, som delar ut tidningarna i brevlådorna.

---

## 3. Detaljerad genomgång av varje flik

### 1. Dashboard
Dashboard ger full överblick inför tryckning och utkörning:
- **Otilldelade rutter**: Varnar tydligt om aktiva rutter saknar utdelare eller förare, och visar exakt hur många adresser och hushåll som påverkas.
- **Adresser**: Totalt antal adresser, uppdelat på inkluderade (aktiva leveransstopp) och exkluderade.
- **Hushåll**: Totalt antal hushåll, inkluderade hushåll, exkluderade hushåll (*"Nej tack till reklam/oadresserat"*), samt otilldelade hushåll.
- **Rutter**: Totalt antal rutter, tilldelade, otilldelade, aktiva och inaktiva rutter.
- **Tidningar att beställa**: Det exakta antalet tidningar som ska beställas från tryckeriet, inklusive extra buffertidningar.
- **Personal**: Översikt över aktiva och inaktiva förare och utdelare. Om en aktiv utdelare saknar tilldelad förare visas en tydlig varningssymbol (⚠️).
- **Export**: Exportera sammanställningen till **CSV** eller **Excel (XLSX)** via Export-menyn.

---

### 2. Förare (Drivers)
Hanterar chaufförerna som kör ut tidningarna till utdelarna:
- **Sök och filtrering**:
  - Filtrera efter **Förarnamn**, **Status** (*Aktiv / Inaktiv*), **Postnr** eller **Rutt**.
  - Klicka på **Återställ filter** för att rensa sökfälten.
- **Tabellkolumner**:
  - **Namn**: Förarens fullständiga namn.
  - **Status**: Aktiv eller Inaktiv.
  - **Förarnr**: Numeriskt ID.
  - **Telefon & E-post**: Klickbara länkar för snabbkontakt.
  - **Adress & Postnr**: Bostadsadress.
  - **Antal rutter**: Antal rutter knutna till föraren. Klicka på siffran för att filtrera Rutter-fliken.
  - **Antal tidningar**: Totalt antal tidningar som ska transporteras. Klicka på siffran för att se adresserna i Adresser-fliken.
  - **Åtgärder (dropdown)**:
    - **Redigera**: Uppdatera kontaktuppgifter, status eller extra tidningar.
    - **Ta bort**: Ta bort förare, med möjlighet att överföra rutterna till en annan förare eller lämna dem öppna.
    - **Exportera utdelare (CSV / XLSX)**: Skapar en kontaktlista över de utdelare som föraren kör ut till.
    - **Förhandsgranska och skriv ut körsedel**: Öppnar en utskriftsklar körsedel (*kjøreliste*) med rutter, utdelare, leveransplatser, tidningsantal och redigerbara anteckningar.
- **Knappar överst**:
  - **Lägg till rad**: Registrera en ny förare.
  - **Export ▾**: Exportera tabellen till CSV/XLSX, eller välj **Körsedlar (skriv ut alla)** för att skriva ut körsedlar för samtliga aktiva förare samtidigt.

---

### 3. Utdelare (Distributors)
Hanterar personerna som delar ut tidningarna lokalt:
- **Varning för saknad förare (⚠️)**: Aktiva utdelare som inte är kopplade till en förare markeras med röd färg och varning.
- **Sök och filtrering**: Filtrera efter **Utdelarnamn**, **Status**, **Rutt**, **Förarnamn** och **Postnr**.
- **Tabellkolumner**: Namn, Status, Rutter (klickbara länkar), Förare (klickbar länk), Telefon, E-post, Adress, Postnr, Extra tidningar, Totalt antal tidningar och Åtgärder.
- **Åtgärder**:
  - **Redigera**: Ändra uppgifter, tilldelad förare, rutter eller extra tidningar.
  - **Ta bort**: Ta bort utdelare och frigör rutterna på ett säkert sätt.
- **Knappar överst**:
  - **Lägg till rad**: Registrera ny utdelare.
  - **Export ▾**: Exportera till CSV eller XLSX.

---

### 4. Adresser
Huvudregister över alla leveransadresser:
- **Sök och filtrering**:
  - Sök i textfälten efter **Adress**, **Rutt**, **Utdelarnamn** eller **Postnr**.
  - **Visa bara exkluderade adresser**: Visar adresser där samtliga hushåll tackat nej.
  - **Visa bara adresser med exkluderade hushåll**: Visar adresser där minst ett hushåll tackat nej.
- **Massval och åtgärder**:
  - Markera kryssrutor för enskilda adresser, eller överst för att välja alla på sidan.
  - **Uppdatera rutt**: Flytta alla markerade adresser till en ny rutt i ett enda steg.
  - **Ta bort markerade**: Ta bort alla markerade adresser efter bekräftelse.
- **Tabellkolumner**: Kryssruta, Adress, Rutt, Utdelare, Hushåll, Exkluderade hushåll, Postnr, Anteckning och Åtgärder (Redigera / Ta bort).
- **Knappar överst**:
  - **Lägg till rad**: Lägg till adress manuellt med gatunamn, nummer, rutt, hushåll och anteckningar.
  - **Export ▾**: Exportera filtrerade adresser till CSV eller XLSX.

---

### 5. Rutter
Definierar de geografiska leveransområdena:
- **Kartknapp (🗺️)**: Klicka på kartikonen bredvid ruttnamnet för att hoppa direkt till kartan med rutten förvald.
- **Sök och filtrering**: Filtrera efter **Rutt**, **Utdelarnamn**, **Förarnamn**, **Postnr** och **Status**.
- **Massval och åtgärder**:
  - Välj flera rutter med hjälp av kryssrutorna.
  - **Uppdatera status**: Sätt status (*Aktiv / Inaktiv*) på alla markerade rutter samtidigt.
  - **Slå ihop rutter**: Slår samman två eller fler rutter till en rutt, flyttar alla adresser automatiskt och uppdaterar utdelarna.
- **Tabellkolumner**: Kryssruta, Rutt-ID, Status, Utdelare, Förare, Antal adresser, Extra tidningar, Totalt antal tidningar, Gatu-/husnummersammanfattning, Anteckningar och Åtgärder.
- **Åtgärder**: Redigera, Ta bort och **Visa ruttrapport**.
- **Knappar överst**:
  - **Lägg till rad**: Skapa ny rutt.
  - **Export ▾**: Exportera till CSV/XLSX, eller välj **Ruttrapporter (skriv ut alla)** för att skriva ut gatulistor för alla rutter.

---

### 6. Karta (Map)
Interaktivt kartverktyg baserat på Leaflet och Kartverkets/Geonorges adressdata:
- **Kartlager**: Växla mellan standard vägkarta (**Karta**) och flygbilder (**Satellit**).
- **Ruttfilter**: Använd rullgardinsmenyn överst för att isolera en specifik rutt eller visa alla.
- **Färgkodning**: Varje rutt visas med en unik, stabil färgton. Nålar klustras automatiskt vid utzoomning.
- **Enskilda adressåtgärder**:
  - **Inspektera och flytta**: Klicka på en adressnål för att se adress och hushåll. Välj ny rutt i listan för att flytta adressen direkt.
  - **Ta bort adress**: Klicka på papperskorgen för att radera adressen.
  - **Lägg till adress via kartklick**: Klicka på en byggnad i kartan för automatisk adresshämtning från Kartverket. Dialogen visar:
    - Gatunamn, husnummer och postnummer.
    - Direkt **Kirken.no-sökning** för att kontrollera församlingstillhörighet.
    - Ruttmeny och en liten översiktskarta som visar närliggande rutter.
- **Massåtgärder (håll ned Ctrl)**:
  - **Lägg till flera adresser**: Håll **Ctrl** nedtryckt och klicka på flera byggnader. Röda tillfälliga markörer visas. Släpp **Ctrl** för att tilldela alla samtidigt till en rutt.
  - **Flytta flera adresser**: Håll **Ctrl** nedtryckt och klicka på befintliga nålar (de blir röda). Släpp **Ctrl** för att välja ny rutt för samtliga.

---

## 4. Steg-för-steg arbetsflöden

### Arbetsflöde 1: Förberedelse inför nytt nummer och beställning
1. Öppna fliken **Dashboard** och kontrollera nyckeltalen.
2. Kontrollera kortet **Otilldelade rutter**:
   - Om det finns otilldelade rutter, klicka på kortet eller gå till fliken **Rutter**.
   - Leta upp rutterna och tilldela en aktiv utdelare.
3. Kontrollera kortet **Personal**:
   - Om varningen om saknad förare visas (⚠️), gå till **Utdelare**, hitta de markerade raderna och tilldela en förare.
4. Läs av antalet på kortet **Tidningar att beställa**.
5. Exportera sammanställningen till Excel eller CSV för beställning hos tryckeriet.

### Arbetsflöde 2: Utskrift av körsedlar och gatulistor
1. **Körsedlar för förarna**:
   - Gå till fliken **Förare**.
   - För att skriva ut för alla förare samtidigt: Klicka på **Export ▾** -> **Körsedlar (skriv ut alla)**.
   - För en enskild förare: Välj **Åtgärder** -> **Förhandsgranska och skriv ut körsedel** på förarens rad.
   - Kontrollera utdelningsplatser, utdelare och tidningsantal. Anteckningar kan redigeras direkt i förhandsgranskningen.
   - Klicka på **Skriv ut** (anpassad för A4).
2. **Gatulistor för utdelarna**:
   - Gå till fliken **Rutter**.
   - Klicka på **Export ▾** -> **Ruttrapporter (skriv ut alla)** eller välj **Visa ruttrapport** på en enskild rutt.
   - Adresserna sorteras överskådligt efter gatunamn, uppdelat i jämna och udda nummer, med tydlig markering för reserverade hushåll.
   - Klicka på **Skriv ut** för att ge utdelaren en färdig ruttlista.

### Arbetsflöde 3: Registrera nya byggnader eller justera ruttgränser på kartan
1. Öppna fliken **Karta**.
2. Välj rutten du ska kontrollera i menyn **Filtrera efter rutt**.
3. För att lägga till ett nytt hus:
   - Hitta byggnaden på kartan och klicka på den.
   - Kontrollera eventuellt Kirken.no-länken för församlingsgränsen.
   - Välj rätt rutt och klicka på **Bekräfta**.
4. För att justera gränsen mellan två rutter:
   - Håll **Ctrl** nedtryckt och klicka på husen längs gränsen som ska flyttas.
   - Släpp **Ctrl**.
   - Välj den nya rutten i dialogen och bekräfta.

### Arbetsflöde 4: Hantera reservationer ("Nej tack till tidning")
1. När en boende anmäler att de inte önskar tidningen:
   - Gå till fliken **Adresser**.
   - Sök upp adressen.
   - Välj **Åtgärder** -> **Redigera**.
   - Öka antalet under **Exkluderade hushåll** (t.ex. från `0` till `1`).
   - Skriv eventuellt en kort förklaring i **Anteckning** (t.ex. `"Lgh H0201 vill ej ha tidning"`).
   - Klicka på **Spara**.
2. Totalantalet på Dashboard justeras omedelbart ned med 1 tidning.

### Arbetsflöde 5: Sammanslagning av två rutter
1. Gå till fliken **Rutter**.
2. Markera kryssrutan för de rutter som ska slås samman (t.ex. `B 3` och `B 4`).
3. Klicka på knappen **Slå ihop rutter (2)** ovanför tabellen.
4. I dialogrutan:
   - Välj en av rutterna som målrutt, eller ange ett nytt ruttnamn.
   - Välj vem som ska vara utdelare och förare för den sammanslagna rutten.
5. Klicka på **Slå ihop**. Rutterna uppdateras och adresserna flyttas automatiskt.

### Arbetsflöde 6: Spara och säkerhetskopiera
1. När du gjort ändringar tänds knappen **Spara ändringar** uppe till höger.
2. Klicka på **Spara ändringar**.
3. I fristående läge sparas filen direkt till `data/source.json`, och en säkerhetskopia skapas automatiskt i mappen `data/`.
4. I webbläsarläge laddas en uppdaterad `source.json` ned som du placerar i projektets `data/`-mapp.