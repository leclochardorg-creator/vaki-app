# VAKI - Shopping List PWA

Progressive Web App za čekiranje namirnica sa liste. Prihvata share-ovane liste iz bilo koje aplikacije (WhatsApp, Viber, Telegram, itd.).

## 🎯 Kako radi

1. **Instaliraj aplikaciju** na telefon (Add to Home Screen)
2. **Kopiraj listu namirnica** iz bilo koje aplikacije
3. **Share-uj** preko dugmeta Share na telefonu
4. **Izaberi VAKI** iz liste aplikacija
5. **Čekiraj stavke** dok kupuješ!

## 🚀 Instalacija i pokretanje

```bash
# Instaliraj dependencies
npm install

# Pokreni development server
npm run dev

# Build za produkciju
npm run build

# Preview production build
npm run preview
```

## 📱 Testiranje Share funkcionalnosti

### Na Android telefonu:

1. Build-uj aplikaciju: `npm run build`
2. Postavi na neki hosting (Netlify, Vercel, GitHub Pages)
3. Otvori aplikaciju na telefonu preko browsera
4. Instaliraj aplikaciju (Add to Home Screen)
5. Kopiraj listu namirnica bilo gde (npr. u Notes)
6. Selektuj tekst i klikni Share
7. Izaberi VAKI iz liste

### Na računaru (za testiranje UI-a):

Možeš ručno testirati dodavanjem URL parametra:
```
http://localhost:5173/?text=2%20hleba%0A1%20mleko%0A500g%20sira
```

## 🎨 Dizajn

- **Boja teme**: #525252 (tamno siva)
- **Accent boja**: #9ef05e (svetlo zelena)
- **Logo**: Originalni VAKI SVG logo
- **Animacije**: Check mark sa fade-in, scale i draw efektom

## 📋 Format liste

Aplikacija prepoznaje različite formate:
```
2 hleba
1 jogurt
500g sira
- mleko
• jaja
1. paradajz
```

Sve ove formate parsira i pretvara u čekirajuće stavke.

## 🔧 Tehnologije

- React 18
- Vite
- Web Share Target API
- Service Worker (PWA)
- Local Storage

## 📄 Manifest konfiguracija

Share Target API je konfigurisan u `public/manifest.json`:
- Prihvata text, title i url parametre
- Koristi GET metodu
- Action endpoint: `/share`

## 🎯 Ključne funkcionalnosti

- ✅ Primanje share-ovanih lista preko native Share Target API
- ✅ Pametno parsiranje različitih formata lista
- ✅ Animirani checkbox-evi
- ✅ Progress tracking (X/Y stavki)
- ✅ Local storage za čuvanje stanja
- ✅ Celebration kada su sve stavke čekirane
- ✅ PWA sa offline podrškom
- ✅ Responsive dizajn

## 📝 Napomene

- Service Worker mora biti registrovan za Share Target API
- Aplikacija mora biti instalirana na uređaj
- HTTPS je obavezan za PWA (osim na localhost-u)
- Share Target API radi samo na Android/Chrome trenutno
# vaki-app
