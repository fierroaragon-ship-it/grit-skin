export const categories = [
  { id: 'skin-care', name: 'Skin Care', number: '01', image: '/images/categories/skin-care.png', imageWidth: 1451, imageHeight: 1084, imageAlt: { es: 'Envases sin marca para ilustrar el cuidado facial', en: 'Unbranded containers illustrating facial care' }, description: { es: 'El cuidado diario empieza por tu piel.', en: 'Everyday care starts with your skin.' } },
  { id: 'grooming', name: 'Grooming', number: '02', image: '/images/categories/grooming.png', imageWidth: 1452, imageHeight: 1083, imageAlt: { es: 'Rastrillo, brocha, peine y frasco sin marca para ilustrar el arreglo personal', en: 'Unbranded razor, brush, comb and bottle illustrating grooming' }, description: { es: 'Barba, cabello y detalles que cuentan.', en: 'Beard, hair and the details that matter.' } },
  { id: 'mens-essentials', name: 'Men’s Essentials', number: '03', image: '/images/categories/mens-essentials.png', imageWidth: 1451, imageHeight: 1084, imageAlt: { es: 'Cartera y accesorios personales sin marca sobre una superficie clara', en: 'Unbranded wallet and personal accessories on a light surface' }, description: { es: 'Lo esencial para acompañar tu día.', en: 'Everyday essentials to keep you going.' } },
  { id: 'smart-finds', name: 'Smart Finds', number: '04', image: '/images/categories/smart-finds.png', imageWidth: 1452, imageHeight: 1083, imageAlt: { es: 'Dispositivos y accesorios sin marca para ilustrar hallazgos prácticos', en: 'Unbranded devices and accessories illustrating practical finds' }, description: { es: 'Ideas prácticas para hacer la vida más simple.', en: 'Practical finds to make life simpler.' } },
];

// Solo productos confirmados. Consulta CATALOGO.md antes de añadir entradas.
// Primera ficha: publicación solicitada por el usuario; procedencia en dermforce-source.md.
export const products = [{
  slug: 'dermforce-face-cream',
  brand: 'Terez & Honor',
  category: 'skin-care',
  name: { es: 'Dermforce Face Cream', en: 'Dermforce Face Cream' },
  description: { es: 'Crema facial hidratante para hombres, pensada para una rutina diaria sencilla.', en: 'A moisturizing face cream for men, designed for a simple daily routine.' },
  features: {
    es: ['Con niacinamida y bakuchiol.', 'Fórmula descrita como ligera y sin perfume.', 'Puede utilizarse después del afeitado.'],
    en: ['With niacinamide and bakuchiol.', 'Formula described as lightweight and fragrance-free.', 'Can be used after shaving.']
  },
  needs: [{ id: 'hidratacion-facial', label: { es: 'Hidratación facial', en: 'Facial hydration' } }],
  photos: [{ src: '/images/dermforce-face-cream-original.jpg', width: 1500, height: 2000, alt: { es: 'Envase original de Dermforce Face Cream de Terez & Honor', en: 'Original Terez & Honor Dermforce Face Cream packaging' } }],
  store: 'Terez & Honor',
  url: 'https://www.awin1.com/cread.php?awinmid=110224&awinaffid=3132227&ued=https%3A%2F%2Fterezandhonor.com%2Fes%2Fproducts%2Fdermforce-face-cream',
  cta: 'product',
  ctaLabel: { es: 'Ver precio y comprar en Terez & Honor', en: 'View price and buy at Terez & Honor' }
}];
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
