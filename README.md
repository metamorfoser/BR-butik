BR-shop med React, TypeScript & Vite
En funktionell webshop byggd med React, TypeScript och Vite.
Applikationen hämtar produktdata från DummyJSON‑API och erbjuder ett fullt kundvagnsflöde med produktsidor, varukorg, checkout och orderbekräftelse.
Projektet är utvecklat som en övning i komponentbaserad arkitektur, tillståndshantering, API‑kommunikation och routing i frontendmiljö.
Innehåll
Funktionalitet
Tekniska funktioner
Teknikstack
Installation
Köra projektet
Projektstruktur
Arkitektur och designbeslut
API‑integration
Tillståndshantering
Routing
Styling
Utvecklingsmiljö
Övrigt
Funktionalitet
Produktlista
Hämtar produkter från DummyJSON API (/products).
Visar namn, pris och bild.
Justering av kvantitet.
Möjlighet att lägga till produkten i kundvagnen.
Klick på produkt leder till en detaljerad produktsida.
Produktsida
Visar produktens namn, pris, beskrivning och bild.
Användaren kan välja kvantitet.
Möjlighet att lägga till produkten i kundvagnen..
Rekommendationer med liknande produkter och månaden/säsongens rekommendation
Kundvagn
Visar alla valda produkter.
Justering av kvantitet.
Visar totalpriset.
Rekommendationer baserat på innehållet i kundkorgen. Om kundkorgen är tom visas istället nyheter. Presentkort och Klippkort i display med fast summa
Möjlighet att gå vidare till checkout.
Checkout
Formulär för personuppgifter (namn, adress m.m.).
Orderöversikt innan bekräftelse.
Orderbekräftelse
Visar bekräftelse efter genomförd beställning med orderinformation som ordernummer och totalt belopp. 
UI‑detaljer
Popup vid “Lägg till i kundvagn”.
Mobilanpassad layout.
Progress‑steg i checkoutflödet.
Tekniska funktioner
API‑anrop med fetch
Context API för global kundvagnslogik
Dynamisk routing med React Router
TypeScript‑typer för produkter och kundvagn
SCSS‑moduler och globala variabler
Responsiv design
CSS‑animationer (t.ex. popup och checkout‑steg)
Teknikstack
Frontend
React 19
TypeScript
React Router 7
Context API
SCSS/SASS
Build & Dev
Vite 7
ESLint
Strict TypeScript‑konfiguration
API
DummyJSON (https://dummyjson.com/products)
Installation
Klona projektet:
bash
git clone <repo-url>

Installera beroenden:
bash
npm install

Köra projektet
Starta utvecklingsserver:
bash
npm run dev

Projektstruktur
Kod
src/
 ├─ assets/              // Bilder, ikoner
 ├─ components/          // Återanvändbara UI-komponenter
 ├─ context/             // CartContext och custom hooks
 ├─ pages/               // Sidor för routing
 ├─ styles/              // Globala SCSS-filer, variabler, typografi
 ├─ types/               // TypeScript-typer (ShopProduct, CartItem)
 ├─ RootApp.tsx          // Routing och layout
 └─ main.tsx             // Inträdespunkt

Arkitektur och designbeslut
React + Context API
Kundvagnen hanteras globalt via Context API.
Det gör att komponenter på olika nivåer kan läsa och uppdatera kundvagnen utan prop‑drilling.
Separation av ansvar
pages/ innehåller sidkomponenter kopplade till routing.
components/ innehåller återanvändbara UI‑komponenter.
context/ innehåller logik för kundvagn.
styles/ innehåller globala SCSS‑filer och variabler.
TypeScript
Alla centrala datatyper är definierade, t.ex.:
Produkt
Kundvagnsobjekt
API‑respons
Det ger bättre felkontroll och tydligare kod.
API‑integration
Projektet använder DummyJSON:
Hämta alla produkter:
Kod
GET https://dummyjson.com/products

Hämta en produkt:
Kod
GET https://dummyjson.com/products/:id

Data hämtas med fetch i useEffect och lagras i komponentstate.
Tillståndshantering
Kundvagnen hanteras via:
CartContext
useCart() (custom hook)
Funktioner inkluderar:
addToCart
removeFromCart
updateQuantity
getTotal
clearCart
Tillståndet lagras i minnet under sessionen.
Routing
React Router används för att hantera:
/ – startsida
/butik – produktlista
/produkt/:id – produktsida
/cart – kundvagn
/checkout – checkout
/confirmation – orderbekräftelse
RootApp.tsx innehåller routerkonfigurationen.
Styling
Styling görs med:
SCSS‑moduler
Globala variabler (_variables.scss)
Typografi‑inställningar (_typography.scss)
Responsiva media queries
Animationer (t.ex. popup och checkout‑progress)
Utvecklingsmiljö
Projektet använder:
Vite för snabb utvecklingsserver och build
ESLint för kodkvalitet
Strict TypeScript för robust typkontroll
Modern bundler‑mode i tsconfig
Övrigt
Projektet är utvecklat som en övning i:
komponentbaserad arkitektur
API‑kommunikation
global state management
routing
responsiv design
e‑handelsflöden
