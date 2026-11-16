/**
 * Schéma kolekce projektů.
 * (Astro 6+ hledá konfiguraci kolekcí v src/content.config.ts – starší cesta
 *  src/content/config.ts už není podporovaná.)
 *
 * Nový projekt = jeden .md soubor v src/content/projects/cs/ a jeden se stejným
 * názvem v src/content/projects/en/. Název souboru = slug v URL.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    /** Pořadí na hlavní stránce (1 = nahoře). */
    order: z.number().int().positive(),
    title: z.string(),
    subtitle: z.string(),
    /** Datum/období pro zobrazení, např. "březen 2026". */
    period: z.string(),
    type: z.enum(['school', 'personal', 'client']),
    /** Délka práce, např. "cca 35 hodin za 2 týdny". */
    duration: z.string().optional(),
    role: z.string().optional(),
    tech: z.array(z.string()).min(1),
    /** 1–2 věty na hlavní stránku. */
    summary: z.string(),
    /** Jedno klíčové zjištění na hlavní stránku. */
    keyFinding: z.string(),
    /** Odkazy – mohou být "TODO: …". */
    github: z.string().optional(),
    pdf: z.string().optional(),
    /**
     * Hlavní vizuál: inline SVG diagram (komponenty v src/components/diagrams/).
     * Projekt bez diagramu může použít `cover` (fotka nebo obrázek schématu).
     */
    diagram: z.enum(['soc-network', 'smart-lock-flow']).optional(),
    cover: z
      .object({ src: image(), alt: z.string(), caption: z.string().optional() })
      .optional(),
    /**
     * Fotky pod hlavním vizuálem. Bez `src` se zobrazí placeholder s popiskem;
     * `todo` popisuje, jaká fotka tam patří. Soubory patří do src/assets/projects/<slug>/.
     */
    photos: z
      .array(
        z.object({
          src: image().optional(),
          alt: z.string().optional(),
          caption: z.string(),
          todo: z.string().optional(),
        }),
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
