import cs from './cs.json';
import en from './en.json';

export const languages = { cs: 'CZ', en: 'EN' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'cs';

const dictionaries = { cs, en } as const;
export type Dictionary = typeof cs;

/** Vrátí slovník textů rozhraní pro daný jazyk. */
export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Zjistí jazyk z URL (respektuje base). */
export function getLangFromUrl(url: URL): Lang {
  const path = stripBase(url.pathname);
  const [first] = path.split('/').filter(Boolean);
  return first === 'en' ? 'en' : defaultLang;
}

/** Odstraní base (např. "/MojePortfolio") ze začátku cesty. */
export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
}

/**
 * Sestaví URL uvnitř webu s ohledem na base a koncové lomítko.
 * withBase('/en/') -> '/MojePortfolio/en/'
 */
export function withBase(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = ('/' + path.replace(/^\/+/, '')).replace(/\/{2,}/g, '/');
  // soubory (cv.pdf, favicon.svg) a kotvy necháváme bez koncového lomítka
  const [pathPart, hash = ''] = clean.split('#');
  const isFile = /\.[a-z0-9]+$/i.test(pathPart);
  const withSlash = isFile || pathPart.endsWith('/') ? pathPart : pathPart + '/';
  return base + withSlash + (hash ? '#' + hash : '');
}

/** Domovská stránka daného jazyka. */
export function homePath(lang: Lang): string {
  return withBase(lang === defaultLang ? '/' : `/${lang}/`);
}

/** Lokalizované URL detailu projektu. */
export function projectPath(lang: Lang, slug: string): string {
  return withBase(lang === 'cs' ? `/projekty/${slug}/` : `/en/projects/${slug}/`);
}

/** Je hodnota placeholder? (začíná "TODO:") */
export function isTodo(value: unknown): boolean {
  return typeof value === 'string' && value.trim().startsWith('TODO');
}
