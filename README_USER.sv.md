# Användarguide - Menighetsbladet

### 1. Navigering och flikar
- **Dashboard**: Översikt över totaler, tidningsbeställning och distribution.
- **Kjörere (Förare)**: Hantera förare och rutter, förhandsgranska och skriv ut körlistor.
- **Bladbærere (Utdelare)**: Hantera utdelare och rutter. Varnar om en aktiv utdelare saknar förare.
- **Adresser**: Adressöversikt med antal hushåll och undantag.
- **Rutter**: Ruttöversikt med utdelare, förare och tidningsantal.
- **Karta**: Interaktiv karta för att inspektera adresser, lägga till adresser och flytta adresser mellan rutter.

### 2. Redigering och sparande
1. Sök, filtrera eller sortera i tabellerna eller via kartan.
2. Redigera, lägg till eller ta bort rader vid behov.
3. Kontrollera summor och rutttilldelningar.
4. Klicka på **Spara ändringar** (uppe till höger) för att exportera uppdateringar till `data/source.json`.
*Obs: Ändringar sparas säkert lokalt i webbläsaren (IndexedDB) tills du sparar filen.*

### 3. Tidningsberäkning
- `Inkluderade hushåll = Hushåll - Exkluderade hushåll`
- `Tidningar att beställa = Inkluderade hushåll + Extra tidningar`

### 4. Export och körlistor
- **CSV och Excel (XLSX)**: Exportera tabeller eller sammanfattningar via exportknapparna.
- **Körlista**: Välj "Förhandsgranska och skriv ut körlista" i förartabellen för utskriftsvänlig lista.