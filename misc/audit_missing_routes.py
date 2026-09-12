import json
from pathlib import Path

root = Path(__file__).resolve().parent.parent
source = json.loads((root / 'data' / 'source.json').read_text(encoding='utf-8-sig'))
existing = {r.get('address') for r in source['addresses'] if r.get('address')}

requested = {
    'A1': ['Ekebergveien 230A', 'Ekebergveien 239A', 'Ekebergveien 239B', 'Poppelstien 1', 'Poppelstien 4', 'Nordstrandveien 53'],
    'A2/4': ['Ekebergveien 248', 'Ekebergveien 249A', 'Ekebergveien 250', 'Ekebergveien 252', 'Amund Hellands vei 2', 'Amund Hellands vei 5A', 'Amund Hellands vei 5B', 'Amund Hellands vei 5C', 'Amund Hellands vei 6', 'Amund Hellands vei 8'],
    'A5-6': ['Ekebergveien 256A', 'Ekebergveien 256B', 'Ekebergveien 258A', 'Ekebergveien 258B', 'Ekebergveien 269A', 'Ekebergveien 269B', 'Ekebergveien 271A', 'Ekebergveien 271B', 'Ekebergveien 273A', 'Ekebergveien 283A', 'Ekebergveien 285E', 'Ekebergveien 285F', 'Kransen 1A', 'Kransen 1E', 'Kransen 1F', 'Kransen 2', 'Kransen 3', 'Kransen 8A', 'Kransen 8B', 'Kransen 11A', 'Kransen 11B'],
    'A3-7-8': ['Ekebergveien 242', 'Ekebergveien 260', 'Ekebergveien 262', 'Breiens vei 2A', 'Breiens vei 2B', 'Breiens vei 2C', 'Breiens vei 4A', 'Breiens vei 4B', 'Breiens vei 4C', 'Breiens vei 5A', 'Breiens vei 5B', 'Breiens vei 5C', 'Breiens vei 6A', 'Breiens vei 6B', 'Breiens vei 6C', 'Ole Moes vei 1', 'Ole Moes vei 3C', 'Ole Moes vei 3D', 'Ole Moes vei 3E', 'Ole Moes vei 3F', 'Ole Moes vei 13A', 'Ole Moes vei 13B', 'Ole Moes vei 13C', 'Ole Moes vei 15A', 'Ole Moes vei 15B', 'Ole Moes vei 15C', 'Ole Moes vei 16A', 'Ole Moes vei 17A', 'Tungebråtveien 1', 'Tungebråtveien 3', 'Tungebråtveien 6', 'Tungebråtveien 7A', 'Tungebråtveien 7B', 'Tungebråtveien 8', 'Ostvollveien 1', 'Ostvollveien 2'],
    'A9': ['Ostvollveien 3', 'Ostvollveien 4', 'Ostvollveien 5', 'Ostvollveien 6', 'Ostvollveien 7', 'Ostvollveien 8', 'Ostvollveien 9', 'Ostvollveien 10', 'Ostvollveien 11', 'Ostvollveien 12', 'Ostvollveien 13', 'Ostvollveien 14', 'Ostvollveien 15', 'Ostvollveien 16', 'Ostvollveien 17', 'Ostvollveien 18', 'Ostvollveien 19', 'Ostvollveien 20', 'Bakketoppen 3', 'Bakketoppen 4', 'Bakketoppen 7A'],
    'A10': ['Ljabrubakken 2', 'Ljabrubakken 3', 'Ljabrubakken 4A', 'Ljabrubakken 4D', 'Ljabrubakken 4E', 'Ljabrubakken 4F', 'Ljabrubakken 4G', 'Ljabrubakken 4H', 'Ljabrubakken 4I', 'Ljabrubakken 4J', 'Ljabrubakken 6A', 'Ljabrubakken 7', 'Ljabrubakken 9'],
    'A11/12/13': ['Ole Moes vei 17B', 'Ole Moes vei 19A', 'Ole Moes vei 20A', 'Ole Moes vei 22A', 'Ole Moes vei 25A', 'Ole Moes vei 25B', 'Ole Moes vei 25D', 'Ole Moes vei 25E', 'Ole Moes vei 26A', 'Ole Moes vei 26B', 'Ole Moes vei 28', 'Ole Moes vei 30C', 'Vendomveien 9', 'Bakketoppen 7B', 'Bakketoppen 8', 'Bakketoppen 9C', 'Bakketoppen 9D', 'Bakketoppen 9E', 'Bakketoppen 10E'],
    'B1-2': ['Breiens vei 6', 'Breiens vei 8', 'Eysteins Torkildsens vei 11', 'Eysteins Torkildsens vei 12A', 'Eysteins Torkildsens vei 12B', 'Eysteins Torkildsens vei 14', 'Eysteins Torkildsens vei 15', 'Eysteins Torkildsens vei 17', 'Eysteins Torkildsens vei 18', 'Eysteins Torkildsens vei 19', 'Eysteins Torkildsens vei 21', 'Nordstrandveien 57A', 'Nordstrandveien 63A', 'Munkerudveien 34C', 'Oberst Rodes vei 93'],
    'B3-6': ['Breiens vei 41A', 'Breiens vei 41B', 'Munkerudveien 38', 'Munkerudveien 41A', 'Munkerudveien 43A', 'Munkerudveien 54', 'Munkerudveien 56', 'Munkerudveien 57A', 'Oberst Rodes vei 97A', 'Oberst Rodes vei 97B', 'Oberst Rodes vei 102A', 'Oberst Rodes vei 104A', 'Oberst Rodes vei 106A', 'Oberst Rodes vei 108A', 'Oberst Rodes vei 110A', 'Oberst Rodes vei 111', 'Oberst Rodes vei 112A'],
    'B7-8': ['Breiens vei 25', 'Breiens vei 27', 'Munkerudveien 37A'],
    'B9': ['Munkerudåsen 23', 'Munkerudåsen 26A', 'Munkerudåsen 26B', 'Munkerudåsen 27', 'Munkerudåsen 28A', 'Munkerudåsen 31', 'Munkerudåsen 34C', 'Munkerudåsen 38', 'Munkerudåsen 40'],
    'B10': ['Bakketoppen 8', 'Bakketoppen 10', 'Munkerudbakken 1', 'Munkerudbakken 8A', 'Munkerudbakken 8B', 'Munkerudbakken 10A', 'Munkerudbakken 10B'],
    'B11-13': ['Munkerudveien 61', 'Munkerudveien 65A', 'Munkerudveien 66', 'Munkerudveien 70A', 'Munkerudvollen 25', 'Oberst Rodes vei 116', 'Oberst Rodes vei 118A', 'Oberst Rodes vei 119', 'Oberst Rodes vei 121A', 'Oberst Rodes vei 122A', 'Oberst Rodes vei 123', 'Oberst Rodes vei 127', 'Oberst Rodes vei 129A'],
    'B12': ['Munkerudstubben 1', 'Munkerudstubben 3', 'Munkerudstubben 4', 'Munkerudstubben 5A', 'Munkerudstubben 5B'],
    'C2': ['Nordstrandveien 91A', 'Nordstrandveien 103A', 'Nordstrandveien 103B', 'Munkerudkleiva 18', 'Munkerudkleiva 19', 'Munkerudkleiva 21A', 'Munkerudkleiva 21B', 'Munkerudkleiva 22A', 'Munkerudkleiva 22B', 'Munkerudkleiva 22C'],
    'C3': ['Ogårdsvei 1', 'Ogårdsvei 2', 'Ogårdsvei 4A', 'Ogårdsvei 4B', 'Ogårdsvei 10A', 'Ogårdsvei 10B', 'Nordstrandveien 113', 'Nordstrandveien 119B', 'Leirskallen 16A', 'Leirskallen 16B', 'Leirskallen 17', 'Leirskallen 18A', 'Leirskallen 18B', 'Leirskallen 19', 'Leirskallen 20', 'Leirskallen 21', 'Leirskallen 22', 'Leirskallen 23', 'Leirskallen 24', 'Leirskallen 25', 'Leirskallen 26', 'Leirskallen 27', 'Leirskallbakken 2', 'Leirskallbakken 4', 'Leirskallbakken 6', 'Leirskallbakken 8', 'Leirskallsvingen 2', 'Leirskallsvingen 4'],
    'C4': ['Frostveien 1', 'Frostveien 5A', 'Frostveien 5B', 'Frostveien 7', 'Frostveien 9', 'Frostveien 10A', 'Frostveien 10B', 'Frostveien 11A', 'Frostveien 11B', 'Frostveien 11C', 'Frostveien 13A', 'Frostveien 13B', 'Frostveien 14A', 'Frostveien 14B', 'Frostveien 15', 'Rådyrstien 1', 'Rådyrstien 2', 'Rådyrstien 3', 'Rådyrstien 5', 'Rådyrstien 11A', 'Rådyrstien 11B'],
    'C5': ['Munkerudtunet 1', 'Munkerudtunet 2', 'Munkerudtunet 3', 'Munkerudtunet 4', 'Munkerudtunet 5', 'Munkerudtunet 7', 'Munkerudtunet 9', 'Munkerudtunet 11', 'Nordstrandveien 65A', 'Nordstrandveien 65B', 'Nordstrandveien 69A', 'Nordstrandveien 69B', 'Nordstrandveien 71A', 'Nordstrandveien 71B', 'Nordstrandveien 75A', 'Nordstrandveien 75B', 'Nordstrandveien 75C', 'Nordstrandveien 79A', 'Nordstrandveien 79B', 'Nordstrandveien 79C', 'Nordstrandveien 81A', 'Nordstrandveien 81B', 'Nordstrandveien 85A', 'Nordstrandveien 85B', 'Nordstrandveien 85C', 'Nordstrandveien 87'],
    'D1-2': ['Rosendalsveien 2', 'Rosendalsveien 8', 'Rosendalsveien 12'],
    'D5-6-7': ['Midtåsen 1', 'Midtåsen 3'],
    'D8-10': ['Stuttveien 6'],
    'D11-13': ['Solveien 126D', 'Stuttveien 1', 'Stuttveien 2', 'Stuttveien 3', 'Stuttveien 4'],
    'D12': ['Bjerkelia 1', 'Bjerkelia 2', 'Bjerkelia 3'],
    'E2': ['Vangen 1'],
    'E3': ['Nordstrandveien 50', 'Nordstrandveien 51', 'Nordstrandveien 52', 'Nordstrandveien 53', 'Nordstrandveien 54', 'Nordstrandveien 55', 'Nordstrandveien 56', 'Nordstrandveien 57', 'Nordstrandveien 58', 'Nordstrandveien 59', 'Nordstrandveien 60', 'Nordstrandveien 61', 'Nordstrandveien 62'],
    'E4': ['Nordstrandveien 66', 'Nordstrandveien 70', 'Nordstrandveien 71', 'Nordstrandveien 72', 'Nordstrandveien 73', 'Nordstrandveien 74', 'Nordstrandveien 75', 'Nordstrandveien 76'],
    'F3': ['Tyslevveien 49', 'Tyslevveien 51', 'Tyslevveien 53', 'Tyslevveien 55', 'Tyslevveien 57', 'Tyslevveien 59', 'Tyslevveien 61', 'Tyslevveien 63', 'Tyslevveien 65', 'Tyslevveien 67', 'Tyslevveien 69', 'Tyslevveien 71', 'Tyslevveien 73', 'Tyslevveien 75', 'Tyslevveien 77', 'Tyslevveien 79'],
    'G1-2': ['Lindbäckveien 25', 'Lindbäckveien 27', 'Lindbäckveien 29', 'Lindbäckveien 31', 'Lindbäckveien 33', 'Lindbäckveien 35', 'Lindbäckveien 37', 'Nordseter terrasse 29', 'Nordseter terrasse 31', 'Nordseter terrasse 35', 'Tyslevveien 31', 'Tyslevveien 33', 'Tyslevveien 35', 'Tyslevveien 37', 'Tyslevveien 39', 'Tyslevveien 41', 'Tyslevveien 43'],
    'G3-4-5': ['Lindbäckveien 11', 'Lindbäckveien 13', 'Lindbäckveien 15', 'Lindbäckveien 17', 'Lindbäckveien 19', 'Lindbäckveien 21', 'Lindbäckveien 23', 'Lindbäckveien 16', 'Lindbäckveien 18', 'Lindbäckveien 20', 'Lindbäckveien 22', 'Lindbäckveien 24', 'Lindbäckveien 26', 'Lindbäckveien 28', 'Lindbäckveien 30', 'Lindbäckveien 32'],
    'G10-13 & G11-12': ['Kaptein Oppegaards vei 36', 'Kaptein Oppegaards vei 37', 'Kaptein Oppegaards vei 38', 'Kaptein Oppegaards vei 39', 'Kaptein Oppegaards vei 40', 'Kaptein Oppegaards vei 41', 'Kaptein Oppegaards vei 42', 'Kaptein Oppegaards vei 43', 'Kaptein Oppegaards vei 44', 'Kaptein Oppegaards vei 45', 'Kaptein Oppegaards vei 46', 'Kaptein Oppegaards vei 47'],
    'H14': ['Bernt Knudsens vei 15', 'Bernt Knudsens vei 17', 'Bernt Knudsens vei 19', 'Bernt Knudsens vei 21', 'Bernt Knudsens vei 23', 'Bernt Knudsens vei 25', 'Bernt Knudsens vei 27'],
    'L2': ['Støttumveien 1', 'Støttumveien 2', 'Støttumveien 3', 'Støttumveien 4', 'Støttumveien 5', 'Støttumveien 6', 'Støttumveien 7'],
}

missing = []
for name, addrs in requested.items():
    for a in addrs:
        if a not in existing:
            missing.append((name, a))

print('missing_count', len(missing))
for item in missing[:120]:
    print(item)
