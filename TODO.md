# TODO – placeholdery k doplnění

Všechno, co na webu zatím ukazuje `[doplnit]` / `[to be added]`.
U projektů vždy uprav **obě** jazykové verze (`cs/` i `en/`).
Kontrola, že nic nezbylo: `grep -rn "TODO:" src`.

## Kontakty a CV

| Co | Kde |
|---|---|
| E-mail | `src/config.ts` → `CONTACT.email` |
| GitHub profil | `src/config.ts` → `CONTACT.github` |
| LinkedIn profil | `src/config.ts` → `CONTACT.linkedin` |
| Odkaz na zdrojový kód webu (patička) | `src/config.ts` → `CONTACT.sourceRepo` (např. `https://github.com/vczepczor/portfolio`) |
| CV v PDF | soubor `public/cv.pdf`, pak `src/config.ts` → `cvAvailable: true` |

## Hlavní stránka

| Co | Kde |
|---|---|
| Další projekty: Homelab, CTF / TryHackMe, Weby (popis, technologie, odkaz) | `src/i18n/cs.json` a `src/i18n/en.json` → `other.items` |
| „Co mám rozjeté“ (4 řádky: Provozuju / Učím se / Řeším / Zajímá mě) | `src/i18n/cs.json` a `src/i18n/en.json` → `about.now` |
| Odstavec „O mně“ – je to návrh, zkontrolovat, že sedí | `src/i18n/cs.json` a `src/i18n/en.json` → `about.paragraphs` |

## 01 – SOC Lab

Soubory: `src/content/projects/cs/soc-lab.md`, `src/content/projects/en/soc-lab.md`

| Co | Kde v souboru |
|---|---|
| Role v projektu | frontmatter `role` |
| Odkaz na GitHub repozitář | frontmatter `github` |
| PDF dokumentace | soubor do `public/docs/soc-lab.pdf`, frontmatter `pdf: "/docs/soc-lab.pdf"` |
| **Souhrn detekce a false positive rate** | sekce Výsledky / Results, pod tabulkou |

> Pozor na čísla: původní podklady uvádí 43 % / 29 % / 29 % (součet 101 %) a 38 % false positive.
> 43/29/29 odpovídá spíš 7 scénářům (3/7, 2/7, 2/7), ale v tabulce je jich 6. Před doplněním ověřit,
> kolik scénářů bylo a jak se počítala false positive rate.

## 02 – Smart Lock

Soubory: `src/content/projects/cs/smart-lock.md`, `src/content/projects/en/smart-lock.md`

| Co | Kde v souboru |
|---|---|
| Délka práce | frontmatter `duration` |
| Role v projektu | frontmatter `role` |
| Klíčové zjištění (zobrazuje se na hlavní stránce) | frontmatter `keyFinding` |
| Odkaz na GitHub repozitář | frontmatter `github` |
| 2 fotky: zámek u dveří, admin dashboard | soubory do `src/assets/projects/smart-lock/`, ve frontmatteru `photos` doplnit `src` (např. `"../../../assets/projects/smart-lock/door.jpg"`) a `alt`, smazat `todo` |
| Čísla: latence odemknutí, úspěšnost rozpoznání, falešné pokusy | sekce Výsledky / Results, tabulka |
| **Limity a co bych udělal jinak** (povinná sekce) | sekce Limity / Limitations |

> Náměty k limitům: odolnost proti fotce obličeje na mobilu (chybí liveness detection),
> kde a jak jsou uložená biometrická data a kdo k nim má přístup, chování zámku při výpadku proudu nebo sítě.

## Ke kontrole (není placeholder, ale stojí za přečtení)

- Diagram SOC Labu (`src/components/diagrams/NetworkDiagram.astro`) obsahuje uzel „vzdálený klient“
  jako konec WireGuard tunelu. V podkladech není mezi 4 VM – pokud to v labu bylo jinak, upravit.
- Úvodní věty v sekcích Problém / Řešení obou projektů jsou přeformulované podklady – zkontrolovat, že sedí.
