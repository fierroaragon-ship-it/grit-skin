export const categories = [
  { id: 'skin-care', name: 'Skin Care', number: '01', image: null, description: { es: 'El cuidado diario empieza por tu piel.', en: 'Everyday care starts with your skin.' } },
  { id: 'grooming', name: 'Grooming', number: '02', image: null, description: { es: 'Barba, cabello y detalles que cuentan.', en: 'Beard, hair and the details that matter.' } },
  { id: 'mens-essentials', name: 'Men’s Essentials', number: '03', image: null, description: { es: 'Lo esencial para acompañar tu día.', en: 'Everyday essentials to keep you going.' } },
  { id: 'smart-finds', name: 'Smart Finds', number: '04', image: null, description: { es: 'Ideas prácticas para hacer la vida más simple.', en: 'Practical finds to make life simpler.' } },
];

// Solo productos confirmados. Consulta CATALOGO.md antes de añadir entradas.
export const products = [];
export const host = {
  name: 'Hamburgueso',
  image: '/images/hamburgueso/hamburgueso-presentando.png',
  poses: {
    welcome: '/images/hamburgueso/hamburgueso-saludando.png',
    shop: '/images/hamburgueso/hamburgueso-senalando-derecha.png',
    guide: '/images/hamburgueso/hamburgueso-explicando.png',
  },
};

export function externalUrl(value) {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; }
}
export function filterProducts(items, { query = '', category = '', need = '' } = {}, lang = 'es') {
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const needle = normalize(query.trim());
  return items.filter(p => (!category || p.category === category) && (!need || p.needs?.some(n => n.id === need)) && normalize([p.name[lang], p.description[lang], p.store, ...(p.features[lang] || [])].join(' ')).includes(needle));
}
export function resolvePage(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { type: 'home' };
  if (path === '/tienda') return { type: 'shop' };
  if (path === '/rutinas-y-guias') return { type: 'guides' };
  if (path === '/sobre-gritskin') return { type: 'about' };
  if (path === '/hamburgueso') return { type: 'host' };
  const category = categories.find(c => path === `/${c.id}`);
  if (category) return { type: 'category', category };
  const match = path.match(/^\/producto\/([^/]+)$/);
  if (match) return { type: 'product', slug: match[1] };
  return { type: 'missing' };
}

// Las necesidades provienen exclusivamente de entradas confirmadas del catálogo.
export function availableNeeds(items, category = '') {
  const needs = new Map();
  for (const product of items) {
    if (category && product.category !== category) continue;
    for (const need of product.needs || []) {
      if (need.id && need.label?.es && need.label?.en) needs.set(need.id, need);
    }
  }
  return [...needs.values()];
}
