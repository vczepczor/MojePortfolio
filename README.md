# Portfolio – Václav Czepczor

Osobní portfolio: projekty z oblasti Linuxu, sítí a kybernetické bezpečnosti.
Statický web v [Astro](https://astro.build), česky (`/`) a anglicky (`/en/`),
nasazený na GitHub Pages: <https://vczepczor.github.io/MojePortfolio/>.

- Bez UI knihoven a bez Tailwindu: obyčejné CSS s custom properties.
- Bez trackerů a analytiky, písma hostovaná lokálně.
- Jediný JavaScript na klientu je pár řádků na stránce 404.

## Spuštění lokálně

Potřebuješ Node.js 22.23.4 nebo novější (doporučeno 24).

```bash
npm install
```

```bash
npm run dev
```

Web poběží na <http://localhost:4321/MojePortfolio/> (pozor na `/MojePortfolio/`, kořen `/` vrací 404).

| Příkaz | Co dělá |
|---|---|
| `npm run dev` | vývojový server s automatickým obnovením |
| `npm run build` | produkční build do `dist/` |
| `npm run preview` | lokální náhled produkčního buildu |
| `npm run check` | kontrola typů a šablon (`astro check`) |

## Struktura

```text
src/
  config.ts                  kontakty (e-mail, GitHub, LinkedIn, CV) – na jednom místě
  content.config.ts          schéma projektů (co musí mít každý .md soubor)
  content/projects/cs/*.md   projekty česky
  content/projects/en/*.md   projekty anglicky
  i18n/cs.json, en.json      texty rozhraní a hlavní stránky
  components/
    home/                    sekce hlavní stránky
    project/                 šablona detailu projektu
    diagrams/                inline SVG diagramy (SOC Lab, Smart Lock)
  styles/global.css          design tokeny a základní styly
  lib/rehype-portfolio.mjs   placeholdery a tabulky v Markdownu
public/                      soubory 1:1 (favicon, og.png, robots.txt, cv.pdf, docs/)
```

## Jak přidat projekt

Stačí jeden Markdown soubor v každém jazyce se **stejným názvem**. Název souboru je
zároveň adresa: `homelab.md` → `/projekty/homelab/` a `/en/projects/homelab/`.

1. Vytvoř `src/content/projects/cs/homelab.md` a `src/content/projects/en/homelab.md`.
2. Nahoru dej frontmatter (povinná pole hlídá `src/content.config.ts`, build při chybě řekne, co chybí):

   ```yaml
   ---
   order: 3                       # pořadí na hlavní stránce
   title: "Homelab: ..."
   subtitle: "Jedna věta pod nadpisem"
   period: "2026"
   type: personal                 # school | personal | client
   duration: "cca 20 hodin"       # volitelné
   role: "samostatná práce"       # volitelné
   tech: ["Raspberry Pi", "Docker", "Pi-hole"]
   summary: "1–2 věty na hlavní stránku."
   keyFinding: "Jedno klíčové zjištění."
   github: "https://github.com/..."   # volitelné
   pdf: "/docs/homelab.pdf"           # volitelné, soubor do public/docs/
   cover:                             # volitelné, hlavní obrázek
     src: "../../../assets/projects/homelab/schema.png"
     alt: "Popis obrázku"
   ---
   ```

3. Pod frontmatter napiš obsah v jednotné struktuře:

   ```markdown
   ## Problém
   ## Řešení
   ## Výsledky
   ## Limity a co bych udělal jinak
   ## Co jsem se naučil
   ```

   Anglicky: `Problem`, `Solution`, `Results`, `Limitations and what I would do differently`, `What I learned`.

Hotovo: projekt se objeví na hlavní stránce i s detailem, navigací a v sitemapě.

**Obrázky** dávej do `src/assets/projects/<slug>/` a odkazuj relativně z `.md` souboru
(jako `cover` výše). Astro je při buildu zmenší a převede do moderních formátů.

**Diagram místo obrázku:** nakresli komponentu do `src/components/diagrams/`, přidej ji
do mapy v `src/components/project/ProjectVisual.astro` a její název do enumu `diagram`
v `src/content.config.ts`.

## Placeholdery

Co ještě chybí, je označené hodnotou `TODO: popis`:

- ve frontmatteru, JSON a `config.ts` jako obyčejný text `"TODO: ..."`,
- v textu Markdownu v obrácených apostrofech: `` `TODO: ...` ``.

Na webu se zobrazí nenápadné `[doplnit]` / `[to be added]` a popis je vidět po najetí myší.
Seznam všech placeholderů je v [TODO.md](TODO.md). Rychlé hledání: `grep -rn "TODO:" src`.

## Nasazení

Nasazení je automatické přes GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml))
s oficiální akcí `withastro/action`.

1. Repozitář na GitHubu: `vczepczor/MojePortfolio`.
2. V repozitáři: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Pushni kód do větve `main`:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/vczepczor/MojePortfolio.git
   git push -u origin main
   ```

Každý další push do `main` web znovu sestaví a nasadí (záložka **Actions** ukazuje průběh).

**Důležité:** `BASE` v `astro.config.mjs` musí přesně odpovídat názvu repozitáře (včetně velkých písmen),
jinak se nenačte CSS ani obrázky. Při přejmenování repozitáře uprav `SITE` a `BASE` v `astro.config.mjs`,
`url` v `src/config.ts` a adresu sitemapy v `public/robots.txt`.

## Obrázek pro sdílení (og.png)

`public/og.png` (1200 × 630) je statický obrázek, který se ukáže při sdílení odkazu.
Když ho budeš chtít změnit, stačí ho nahradit jiným PNG stejné velikosti.
