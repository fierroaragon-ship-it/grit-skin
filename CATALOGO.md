# Catálogo de Gritskin

Versión aprobada en `feat/catalogo-hamburgueso`.

## Rutas

- `/`: inicio y catálogo general.
- `/tienda`: catálogo general con Hamburgueso señalando.
- `/skin-care`, `/grooming`, `/mens-essentials`, `/smart-finds`: categorías.
- `/hamburgueso`: presentación del anfitrión.
- `/rutinas-y-guias`: contenido educativo y espacio para manuales confirmados de Hotmart.
- `/sobre-gritskin`: fotografía y presentación personal, accesible desde el pie.
- `/producto/:slug`: ficha individual; si no existe, muestra producto no disponible.

La navegación usa History API. Búsqueda y categoría están en los parámetros `q` y `category`; se conservan al recargar. Vite sirve las rutas en desarrollo. `vercel.json` configura la compilación y el fallback de páginas, dejando las rutas de imágenes y assets fuera del fallback. No se ha desplegado.

## Añadir un producto confirmado

Editar `src/data/catalog.js`, en `products`. No hay productos publicados actualmente. Cada entrada debe tener:

```js
{
  slug: 'identificador-unico',
  category: 'skin-care', // o grooming, mens-essentials, smart-finds
  name: { es: 'Nombre confirmado', en: 'Confirmed name' },
  description: { es: 'Descripción confirmada', en: 'Confirmed description' },
  features: { es: ['Característica confirmada'], en: ['Confirmed feature'] },
  photos: [{ src: '/images/archivo-confirmado.webp', alt: { es: 'Descripción de la imagen', en: 'Image description' } }],
  store: 'Nombre confirmado de la tienda',
  url: 'URL externa confirmada',
  cta: 'product' // offer solo cuando corresponda; nunca se inventan ofertas
}
```

El ejemplo define el formato; no es un producto publicado. Usar fotografías comerciales autorizadas por la marca, plataforma o vendedor, texto y URL verificados. Registrar la procedencia y autorización del material antes de incorporarlo. No recrear productos con IA, añadir marca Gritskin ni recortar o alterar envases y marcas. Las URL de compra solo aceptan HTTP/HTTPS. El botón identifica la tienda, abre otra pestaña y usa `rel="sponsored noopener noreferrer"`. No hay precios, reseñas, carrito, checkout ni redes sociales inventados.

## Hamburgueso e imagen principal aprobados

Cuatro PNG completos con transparencia en `public/images/hamburgueso/`: saludando en Inicio, señalando en Tienda, explicando en guías y presentando en su página. Rutas en `host.image` y `host.poses`, proporción automática y `object-fit: contain`, sin reflejos ni recortes. La presentación incluye el texto «Hamburgueso pa’ los compas.» y el botón hacia Rutinas y guías.

Hero aprobado de ocho integrantes: `grit-hero-eight-friends-workshop.webp`, 2100 × 749 px, calidad 92, 295 768 bytes. PNG original junto al WebP como alternativa. La fotografía anterior `grit-hero-workers.png` se conserva como respaldo. Grupo completo a todo el ancho y textos debajo para despejar rostros también en móvil.

## Desarrollo y comprobación

- `npm run dev -- --host 127.0.0.1`
- `npm run build`
- `node --test tests/*.test.js`

Revisar en navegador escritorio y móvil: enlaces de navegación, atrás/adelante, recarga directa, búsqueda y limpieza, filtros, idioma persistente, menú móvil, foco y enlaces externos al incorporar productos reales.

## Validación realizada

Compilación de producción y diez pruebas automatizadas: resolución de rutas, búsqueda bilingüe y sin acentos, filtros combinados, estado vacío, seguridad de URL y renderizado de todas las páginas en ambos idiomas. Se comprueban imágenes locales, aviso de afiliados y ausencia de enlaces vacíos. El navegador de pruebas no pudo inicializarse; quedan pendientes las comprobaciones visuales e interactivas reales en móvil y escritorio, incluidos atrás/adelante y menú móvil.

## Imágenes de categorías

Cada entrada de `categories` admite `image`, inicialmente `null`. Guardar la fotografía de categoría autorizada en `public/images/` y asignar su ruta en este campo. Hasta entonces Inicio muestra un bloque tipográfico grande con aviso de fotografía pendiente, sin simular un producto.
