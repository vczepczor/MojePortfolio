import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type Project = CollectionEntry<'projects'>;

/** Slug projektu = název souboru bez jazykové složky ("cs/soc-lab" -> "soc-lab"). */
export function projectSlug(entry: Project): string {
  return entry.id.split('/').slice(1).join('/');
}

/** Projekty daného jazyka seřazené podle `order`. */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const all = await getCollection(
    'projects',
    (entry) => entry.id.startsWith(`${lang}/`) && !entry.data.draft,
  );
  return all.sort((a, b) => a.data.order - b.data.order);
}
