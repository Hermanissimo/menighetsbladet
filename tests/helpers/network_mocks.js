// 1x1 transparent PNG image buffer
const TRANSPARENT_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64'
);

async function setupNetworkMocks(page, options = {}) {
  // 1. Mock Geonorge Address Search API
  await page.route(/ws\.geonorge\.no\/adresser\/v1\/(sok|punktsok)/, async (route) => {
    const url = new URL(route.request().url());
    const query = url.searchParams.get('sok') || 'Testveien 1';

    const mockResponse = {
      totaltAntallTreff: 1,
      adresser: [
        {
          adressenavn: 'Testveien',
          nummer: 1,
          bokstav: '',
          postnummer: '1150',
          poststed: 'OSLO',
          representasjonspunkt: {
            lat: 59.8624,
            lon: 10.7960
          },
          bruksenhetsnummer: ['H0101', 'H0102', 'H0103']
        }
      ]
    };

    if (options.geonorgeFails) {
      return route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Geonorge Error' })
      });
    }

    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse)
    });
  });

  // 2. Mock Map Tiles (OSM, ESRI, Kartverket)
  await page.route(/tile\.openstreetmap\.org|arcgisonline\.com|cache\.kartverket\.no/, async (route) => {
    if (options.tilesBlocked) {
      return route.abort('blockedbyclient');
    }
    return route.fulfill({
      status: 200,
      contentType: 'image/png',
      body: TRANSPARENT_PNG
    });
  });
}

module.exports = { setupNetworkMocks, TRANSPARENT_PNG };
