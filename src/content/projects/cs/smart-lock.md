---
order: 2
title: "Smart Lock: přístupový systém s rozpoznáním obličeje"
subtitle: "Dveřní zámek na Raspberry Pi, který odemyká podle obličeje a loguje každý pokus"
period: "leden–květen 2026"
type: school
duration: "TODO: délka práce (např. cca 60 hodin za 5 měsíců)"
role: "TODO: role v projektu (např. hardware + backend)"
tech: ["Raspberry Pi 4", "Pi Camera 3", "Python", "FastAPI", "OpenCV", "face_recognition (dlib)", "React", "MariaDB", "systemd"]
summary: "Dveřní zámek, který odemkne podle obličeje. Kamera, elektromagnetický zámek přes GPIO, admin dashboard a záznam každého pokusu s fotkou."
keyFinding: "TODO: jedno klíčové zjištění (např. latence rozpoznání na Pi 4, nebo zda zámek odolá fotce obličeje na mobilu)"
github: "TODO: URL GitHub repozitáře Smart Locku"
diagram: smart-lock-flow
photos:
  - caption: "Zámek u dveří: kamera a dotykový displej"
    todo: "TODO: fotka zámku namontovaného u dveří (soubor do src/assets/projects/smart-lock/, pak doplň src a alt)"
  - caption: "Admin dashboard s historií přístupů"
    todo: "TODO: screenshot admin dashboardu (soubor do src/assets/projects/smart-lock/, pak doplň src a alt)"
---

## Problém

Bezklíčový přístup do místnosti s přehledem o tom, kdo a kdy vstoupil. Klíče se dají ztratit nebo půjčit a klasický zámek neřekne, kdo dveře otevřel.

## Řešení

Celý systém běží na jednom Raspberry Pi 4 přímo u dveří. Kamera snímá obličej, backend ho porovná s uloženými šablonami a podle výsledku přes GPIO odemkne elektromagnetický zámek. Každý pokus se zapíše do databáze i s fotkou.

### Hardware

- Raspberry Pi 4 a Pi Camera 3.
- 7" dotykový displej u dveří.
- Elektromagnetický zámek ovládaný přes GPIO.

### Software

- **Backend:** Python + FastAPI jako REST API mezi frontendem a hardwarem.
- **Rozpoznávání:** OpenCV + knihovna face_recognition (dlib), porovnání se šablonami uložených uživatelů.
- **Frontend:** React, dotykové rozhraní u dveří a admin dashboard pro správu uživatelů a historii přístupů.
- **Databáze:** MariaDB, log všech pokusů s fotkou a časem.
- **Provoz:** po startu Pi naběhnou systemd služby a Chromium v kiosk módu na celou obrazovku, takže zařízení funguje bez zásahu.

### Výzvy

- **Převod barev BGR ↔ RGB:** OpenCV vrací snímky v BGR, face_recognition čeká RGB, takže každý snímek je potřeba před rozpoznáním převést.
- **Výkon v reálném čase:** detekci obličeje bylo potřeba optimalizovat, aby na Pi 4 stíhala živý obraz z kamery.
- **Rozhraní pro dotykový displej:** velké ovládací prvky a jednoduché obrazovky, které jdou ovládat prstem.

## Výsledky

Systém funguje a odemyká autorizované osoby. Každý pokus o vstup je dohledatelný v admin dashboardu včetně fotky.

| Metrika | Hodnota |
|---|---|
| Latence odemknutí | `TODO: čas od příchodu k odemknutí (např. průměr z N pokusů)` |
| Úspěšnost rozpoznání | `TODO: podíl správně rozpoznaných autorizovaných osob` |
| Falešné pokusy | `TODO: kolik neautorizovaných pokusů bylo odmítnuto / propuštěno` |

## Limity a co bych udělal jinak

`TODO: doplnit poctivě limity – např. odolnost proti fotce obličeje na mobilu (chybějící liveness detection), kde a jak jsou uložená biometrická data a kdo k nim má přístup, chování zámku při výpadku proudu nebo sítě`

## Co jsem se naučil

Propojit hardware, backend a frontend do jednoho systému, který běží sám. Ovládat periferie přes GPIO a nasadit aplikaci na Linuxu jako službu, která přežije restart.
