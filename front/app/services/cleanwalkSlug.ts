import type { Cleanwalk, SingleCleanwalk } from '@/interfaces/cleanwalkInterface';

const slugify = (value: string): string => {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
};

export const buildCleanwalkSlug = (cleanwalkName: string, hostName?: string): string => {
  const raw = hostName ? `${cleanwalkName}-${hostName}` : cleanwalkName;
  const slug = slugify(raw);
  return slug || 'cleanwalk';
};

export const getCleanwalkRouteParams = (cleanwalk: Pick<Cleanwalk, 'id' | 'name' | 'host'> | Pick<SingleCleanwalk, 'id' | 'name' | 'host'>) => {
  return {
    id: String(cleanwalk.id),
    slug: buildCleanwalkSlug(cleanwalk.name, cleanwalk.host?.name),
  };
};