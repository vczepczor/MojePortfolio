// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypePortfolio from './src/lib/rehype-portfolio.mjs';

const SITE = 'https://vczepczor.github.io';
const BASE = '/MojePortfolio'; // = název repozitáře na GitHubu

/**
 * Vrátí českou a anglickou URL téže stránky (hlavní stránka nebo detail projektu).
 * @param {string} url
 */
function alternatePair(url) {
  const root = SITE + BASE;
  const path = url.slice(root.length);
  let m;
  if (path === '/' || path === '/en/') return { cs: `${root}/`, en: `${root}/en/` };
  if ((m = path.match(/^\/projekty\/([^/]+)\/$/))) {
    return { cs: url, en: `${root}/en/projects/${m[1]}/` };
  }
  if ((m = path.match(/^\/en\/projects\/([^/]+)\/$/))) {
    return { cs: `${root}/projekty/${m[1]}/`, en: url };
  }
  return null;
}

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    locales: ['cs', 'en'],
    defaultLocale: 'cs',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    // Klasický remark/rehype pipeline kvůli vlastnímu pluginu (placeholdery, tabulky).
    processor: unified({
      rehypePlugins: [rehypePortfolio],
    }),
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/') && !page.endsWith('/404.html'),
      // České a anglické cesty se liší (/projekty/x/ vs. /en/projects/x/),
      // takže hreflang dvojice skládáme ručně.
      serialize(item) {
        const pair = alternatePair(item.url);
        if (pair) {
          item.links = [
            { lang: 'cs-CZ', url: pair.cs },
            { lang: 'en-US', url: pair.en },
          ];
        }
        return item;
      },
    }),
  ],
});
