// Mantener únicamente el parámetro de simulación, sin arrastrar filtros entre páginas.
export function withDevelopmentDate(href, currentSearch, development) {
  if (!development || !href.startsWith('/') || href.startsWith('//')) return href;
  const current = new URLSearchParams(currentSearch);
  const date = current.get('styleDate');
  if (!date) return href;
  const target = new URL(href, 'http://local.invalid');
  if (!target.searchParams.has('styleDate')) target.searchParams.set('styleDate', date);
  return target.pathname + target.search + target.hash;
}
