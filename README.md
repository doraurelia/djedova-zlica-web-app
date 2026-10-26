# Express Server Application

* **Autor:** Dora Kovačević
* **Datum:** svibanj 2026.

# O projektu  
Web aplikacija zasnovana na Node.js i Express okviru. Projekt uključuje posluživanje statičkih datoteka (CSS, resursi, JS klijent skripte) i dinamičko kreiranje sadržaja te podržava dinamičko određivanje porta ovisno o okruženju poslužitelja.

## Korištene tehnologije

* **Node.js (v18+) i Express.js (^5.2.1)** za programiranje na strani poslužitelja  
* **JavaScript** za programiranje na klijentskoj strani
* **HTML i CSS** za frontend

## Struktura projekta

```text
.
├── css/              # Statičke datoteke dizajna (poslužuje se na /dizajn)
├── resursi/          # Medijske i ostale datoteke (poslužuje se na /resursi)
├── js/
│   └── klijent/      # Skripte na strani klijenta (poslužuje se na /JSklijent)
├── html/
│   └── index.html    # Glavna HTML stranica
├── server.cjs        # Glavni poslužiteljski kod
├── package.json      # Konfiguracija projekta i zavisnosti
└── package-lock.json # Zaključane verzije paketa

```
---
*Projekt je izrađen u sklopu kolegija Osnove web tehnologija, zato koristi dinamičko određivanje porta i ima ovakvu strukturu.*
