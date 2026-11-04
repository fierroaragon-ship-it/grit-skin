import { accessoryProducts } from './accessoryProducts.js';

export const categories = [
  { id: 'skin-care', name: 'Skin Care', number: '01', image: '/images/categories/skin-care.png', imageWidth: 1451, imageHeight: 1084, imageAlt: { es: 'Envases sin marca para ilustrar el cuidado facial', en: 'Unbranded containers illustrating facial care' }, description: { es: 'El cuidado diario empieza por tu piel.', en: 'Everyday care starts with your skin.' } },
  { id: 'grooming', name: 'Grooming', number: '02', image: '/images/categories/grooming.png', imageWidth: 1452, imageHeight: 1083, imageAlt: { es: 'Rastrillo, brocha, peine y frasco sin marca para ilustrar el arreglo personal', en: 'Unbranded razor, brush, comb and bottle illustrating grooming' }, description: { es: 'Barba, cabello y detalles que cuentan.', en: 'Beard, hair and the details that matter.' } },
  { id: 'mens-essentials', name: 'Men’s Essentials', number: '03', image: '/images/categories/mens-essentials.png', imageWidth: 1451, imageHeight: 1084, imageAlt: { es: 'Cartera y accesorios personales sin marca sobre una superficie clara', en: 'Unbranded wallet and personal accessories on a light surface' }, description: { es: 'Lo esencial para acompañar tu día.', en: 'Everyday essentials to keep you going.' } },
  { id: 'smart-finds', name: 'Smart Finds', number: '04', image: '/images/categories/smart-finds.png', imageWidth: 1452, imageHeight: 1083, imageAlt: { es: 'Dispositivos y accesorios sin marca para ilustrar hallazgos prácticos', en: 'Unbranded devices and accessories illustrating practical finds' }, description: { es: 'Ideas prácticas para hacer la vida más simple.', en: 'Practical finds to make life simpler.' } },
];

// Solo productos confirmados. Consulta CATALOGO.md antes de añadir entradas.
// Primera ficha: publicación solicitada por el usuario; procedencia en dermforce-source.md.
export const products = [
  {
    "slug": "dermforce-face-cream",
    "brand": "Terez & Honor",
    "category": "skin-care",
    "name": {
      "es": "Dermforce Face Cream",
      "en": "Dermforce Face Cream"
    },
    "description": {
      "es": "Entre el rastrillo, las prisas y el ‘al rato me pongo crema’, la cara también pide atención. Dermforce reúne hidratación y cuidado diario en una fórmula que la marca describe como ligera, de rápida absorción y sin perfume.",
      "en": "Between shaving, rushing around and “I’ll put cream on later,” your face could use some attention, too. Dermforce brings together hydration and daily care in a formula the brand describes as lightweight, fast-absorbing and fragrance-free."
    },
    "features": {
      "es": [
        "Niacinamida, jojoba y escualano: para ayudar a mantener la hidratación.",
        "Centella asiática y alantoína: la marca las incluye para calmar la piel después del afeitado.",
        "Bakuchiol: forma parte de su propuesta de cuidado de las líneas finas."
      ],
      "en": [
        "Niacinamide, jojoba and squalane: to help maintain hydration.",
        "Centella asiatica and allantoin: the brand includes them to soothe skin after shaving.",
        "Bakuchiol: part of the brand’s approach to caring for fine lines."
      ]
    },
    "needs": [
      {
        "id": "hidratacion-facial",
        "label": {
          "es": "Hidratación facial",
          "en": "Facial hydration"
        }
      }
    ],
    "photos": [
      {
        "src": "/images/dermforce-face-cream-original.jpg",
        "width": 1500,
        "height": 2000,
        "alt": {
          "es": "Envase original de Dermforce Face Cream de Terez & Honor",
          "en": "Original Terez & Honor Dermforce Face Cream packaging"
        }
      }
    ],
    "store": "Terez & Honor",
    "url": "https://www.awin1.com/cread.php?awinmid=110224&awinaffid=3132227&ued=https%3A%2F%2Fterezandhonor.com%2Fes%2Fproducts%2Fdermforce-face-cream",
    "cta": "product",
    "ctaLabel": {
      "es": "Ver precio y comprar en Terez & Honor",
      "en": "View price and buy at Terez & Honor"
    },
    "hook": {
      "es": "Traes mucha personalidad. La cara de lija sale sobrando.",
      "en": "You’ve got plenty of personality. The sandpaper face can sit this one out."
    },
    "featureTitle": {
      "es": "¿Qué trae y qué hace aquí?",
      "en": "What’s in it, and what’s it doing here?"
    },
    "editorial": {
      "es": "Lo que me interesa es resolver el cuidado diario sin formar una colección de frascos junto al lavabo. Una crema práctica para quien quiere empezar a cuidarse y seguir con su día.",
      "en": "What interests me is taking care of the daily routine without starting a bottle collection by the sink. A practical cream for someone who wants to start looking after their skin and get on with their day."
    }
  },
  {
    "slug": "caffeine-hyaluronic-acid-eye-gel-patch",
    "brand": "Terez & Honor",
    "category": "skin-care",
    "name": {
      "es": "Parches hidratantes para el contorno de ojos",
      "en": "Hydrating eye patches"
    },
    "originalName": "Caffeine & Hyaluronic Acid Eye Gel Patch",
    "description": {
      "es": "Anoche eras el alma de la fiesta. Hoy la junta es a las nueve. Estos parches de hidrogel están pensados para hidratar el contorno de ojos y ayudar a mejorar el aspecto de las bolsas. Aquí la cafeína viene en parche; el café te lo preparas aparte.",
      "en": "Last night you were the life of the party. Today the meeting is at nine. These hydrogel patches are designed to hydrate the eye area and help improve the appearance of under-eye bags. Here, caffeine comes in a patch; you’ll have to make your coffee separately."
    },
    "features": {
      "es": [
        "Cafeína: la marca la incluye para ayudar a mejorar el aspecto de la hinchazón.",
        "Ácido hialurónico: aporta hidratación al contorno de ojos.",
        "Niacinamida: complementa el cuidado del tono y la apariencia de la piel."
      ],
      "en": [
        "Caffeine: the brand includes it to help improve the appearance of puffiness.",
        "Hyaluronic acid: provides hydration to the eye area.",
        "Niacinamide: complements care for skin tone and appearance."
      ]
    },
    "needs": [
      {
        "id": "contorno-de-ojos",
        "label": {
          "es": "Contorno de ojos",
          "en": "Eye care"
        }
      }
    ],
    "photos": [
      {
        "src": "/images/caffeine-hyaluronic-acid-eye-gel-patch-original.jpg",
        "width": 2000,
        "height": 2667,
        "alt": {
          "es": "Envase original de Caffeine & Hyaluronic Acid Eye Gel Patch de Terez & Honor",
          "en": "Original Terez & Honor Caffeine & Hyaluronic Acid Eye Gel Patch packaging"
        }
      }
    ],
    "presenter": "/images/hamburgueso/hamburgueso-desvelado.png",
    "presenterCaption": {
      "es": "La desvelada estuvo buena. Que no te delaten los ojos.",
      "en": "The late night was worth it. Don’t let your eyes give you away."
    },
    "kicker": {
      "es": "SKIN CARE · CONTORNO DE OJOS",
      "en": "SKIN CARE · EYE CARE"
    },
    "store": "Terez & Honor",
    "url": "https://www.awin1.com/cread.php?awinmid=110224&awinaffid=3132227&ued=https%3A%2F%2Fterezandhonor.com%2Fproducts%2Fcaffeine-hyaluronic-acid-eye-gel-patch",
    "cta": "product",
    "ctaLabel": {
      "es": "Ver en Terez & Honor",
      "en": "View at Terez & Honor"
    },
    "hook": {
      "es": "La desvelada estuvo buena. Que no te delaten los ojos.",
      "en": "The late night was worth it. Don’t let your eyes give you away."
    },
    "featureTitle": {
      "es": "¿Qué traen estos cuates?",
      "en": "What do these little buddies bring?"
    },
    "editorial": {
      "es": "Me llaman la atención para darle un rato de cuidado a los ojos antes de salir. Eso sí: no te reponen las horas de sueño. Tampoco hay que pedirles que hagan la chamba de la almohada.",
      "en": "They catch my eye as a way to give the eye area a little care before heading out. Mind you, they won’t give you back those hours of sleep. Don’t ask them to do your pillow’s job."
    }
  },
  {
    "slug": "grooming-essentials-pack",
    "brand": "Terez & Honor",
    "category": "skin-care",
    "name": {
      "es": "Kit esencial de cuidado facial",
      "en": "The Essential Care Set"
    },
    "officialName": "The Essential Care Set",
    "hook": {
      "es": "Al coche sí le das servicio. Échale tantita atención a la fachada.",
      "en": "You service your car. Give your own exterior a little attention, too."
    },
    "formerName": "Grooming Essentials Pack",
    "description": {
      "es": "Este kit junta tres cuidados para cejas, contorno de ojos y nariz. Para quien quiere dedicarle un rato a su presentación sin convertir el baño en sucursal de una perfumería.",
      "en": "This kit brings together three kinds of care for brows, the eye area and the nose. For anyone who wants to spend a little time on their appearance without turning the bathroom into a perfume counter."
    },
    "features": {
      "es": [
        "Sérum para cejas: orientado a una apariencia más poblada y definida.",
        "Parches con cafeína y ácido hialurónico: para hidratar el contorno de ojos.",
        "Parches para nariz: destinados a retirar puntos negros e impurezas superficiales."
      ],
      "en": [
        "Eyebrow serum: aimed at a fuller, more defined appearance.",
        "Patches with caffeine and hyaluronic acid: to hydrate the eye area.",
        "Nose patches: intended to remove blackheads and surface impurities."
      ]
    },
    "needs": [
      {
        "id": "rutina-facial",
        "label": {
          "es": "Rutina facial",
          "en": "Facial routine"
        }
      }
    ],
    "photos": [
      {
        "src": "/images/essential-care-set-original.jpg",
        "width": 2000,
        "height": 2667,
        "alt": {
          "es": "Fotografía original de The Essential Care Set de Terez & Honor, con sus tres productos y etiquetas completas",
          "en": "Original Terez & Honor The Essential Care Set photograph with all three products and complete labels"
        }
      }
    ],
    "presenter": "/images/hamburgueso/hamburgueso-mini-corvette.png",
    "presenterWidth": 1424,
    "presenterHeight": 1105,
    "presenterLayout": "landscape",
    "presenterAlt": { "es": "Hamburgueso poniéndose crema dentro de un mini Corvette rojo, con su espejo", "en": "Hamburgueso applying cream inside a red mini Corvette, holding his mirror" },
    "presenterCaption": {
      "es": "Al coche sí le das servicio. Échale tantita atención a la fachada.",
      "en": "You service your car. Give your own exterior a little attention, too."
    },
    "kicker": {
      "es": "SKIN CARE · KIT DE CUIDADO FACIAL",
      "en": "SKIN CARE · FACIAL CARE SET"
    },
    "store": "Terez & Honor",
    "url": "https://www.awin1.com/cread.php?awinmid=110224&awinaffid=3132227&ued=https%3A%2F%2Fterezandhonor.com%2Fproducts%2Fgrooming-essentials-pack",
    "cta": "product",
    "ctaLabel": {
      "es": "Ver kit en Terez & Honor",
      "en": "View set at Terez & Honor"
    },
    "featureTitle": {
      "es": "¿Qué viene en el paquete?",
      "en": "What comes in the package?"
    },
    "editorial": {
      "es": "Lo elegiría si me interesan los tres cuidados juntos. Si solo buscas hidratar los ojos, revisa los parches por separado. Comprar con cabeza también es verse bien, compa.",
      "en": "I’d choose it if I wanted all three kinds of care together. If you’re only looking to hydrate the eye area, check out the patches on their own. Shopping smart is part of looking good, amigo."
    }
  },
  ...accessoryProducts
];
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
  return items.filter(p => (!category || p.category === category) && (!need || p.needs?.some(n => n.id === need)) && normalize([p.slug, p.model || '', p.color?.[lang] || '', p.name[lang], p.officialName || p.originalName || '', p.formerName || '', p.description[lang], p.store, ...(p.features[lang] || [])].join(' ')).includes(needle));
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
  if (match) return { type: 'product', slug: match[1] === 'the-essential-care-set' ? 'grooming-essentials-pack' : match[1] };
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
