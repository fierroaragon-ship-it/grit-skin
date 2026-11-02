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

## Estilo y accesorios · Awin MX

Bloque exclusivo de `/tienda`, entre Temu y el catálogo. Adidas es acceso permanente a la marca sin descuento ni caducidad; Lacoste Singles’ Day solo aparece desde el 6 de noviembre de 2026 a las 00:00 hasta antes del 13 de noviembre de 2026 a las 00:00, en America/Mexico_City (UTC−06:00). Los instantes absolutos están en `src/data/stylePartners.js`. El componente revisa el reloj en ejecución, programa las transiciones y se actualiza al recuperar foco o visibilidad; no requiere recompilar ni desplegar. Al ocultarse Lacoste se elimina su tarjeta del DOM y Adidas ocupa una composición de una tarjeta.

Creatividades y enlaces proporcionados por el usuario: imágenes remotas originales de Awin, parámetros íntegros, sin recorte, filtros, deformación ni texto superpuesto. Adidas se muestra a 260 px como máximo y Lacoste a 336 × 280 como máximo. Imagen y botón comparten destino, con `sponsored noopener noreferrer`. Incluye aviso de afiliados junto al bloque.

Revisión local:

- Fecha real: http://127.0.0.1:5173/tienda
- Ambas tarjetas (solo desarrollo): http://127.0.0.1:5173/tienda?styleDate=2026-11-08T12%3A00%3A00-06%3A00#estilo-y-accesorios
- Antes del inicio: `?styleDate=2026-11-05T23%3A59%3A59-06%3A00`
- Al finalizar: `?styleDate=2026-11-13T00%3A00%3A00-06%3A00`

La simulación requiere `import.meta.env.DEV` y una fecha con zona explícita; el build de producción elimina el lector de `styleDate`. No usar la simulación para publicar ofertas anticipadas.

Verificación de esta integración: `npm run build`, `node --test tests/*.test.js` (13 pruebas) y `git diff --check` correctos. Pruebas de límites, simulación deshabilitada en producción, renderizado y conservación exacta de URLs. La revisión visual de escritorio/móvil no pudo ejecutarse: el navegador falla durante inicialización con `Cannot redefine property: process`. No se considera visualmente aprobada. Sin commit, push ni deploy.

## Materiales Awin en Inicio

Inicio incorpora un único bloque compacto después de las cintas: banner Lacoste horizontal original de 728 × 90 (creativo `s=4969749`), centrado y responsivo, solo durante la misma vigencia de Tienda; logo Adidas de ancho 120 px con botón permanente. No se modifica el hero ni las cintas. `useLacosteSchedule.js` comparte entre ambas páginas el control de vigencia y la simulación exclusiva de desarrollo; Tienda conserva su banner de 336 × 280 (`s=4969747`). Las imágenes mantienen sus URLs originales y proporciones, con aviso de afiliación y enlaces patrocinados. Ante fallo de carga, el banner se sustituye por enlace de texto y el logo se retira conservando título y botón.

Inicio normal: http://127.0.0.1:5173/

Ambos materiales en desarrollo: http://127.0.0.1:5173/?styleDate=2026-11-08T12%3A00%3A00-06%3A00

Verificación: build correcto, 14 pruebas correctas (incluye orden en Inicio, ausencia de duplicados, URLs y conservación del creativo de Tienda), simulación excluida del bundle de producción y respuesta HTTP 200 local. La revisión visual en navegador sigue pendiente por el fallo de inicialización ya documentado. Sin commit, push ni deploy.

### Diagnóstico de Lacoste en Inicio

Se verificó que el proceso de 127.0.0.1:5173 usa este checkout y sirve los módulos actuales con DEV=true. La URL simulada del 8 de noviembre produce `1794160800000` y activa Lacoste; el renderizado específico incluye 4969749. Awin respondió con redirección y HTTP 200, JPEG real de 728 × 90, inspeccionado como archivo. No se pudo reproducir en navegador el problema tras recarga directa: la inicialización continúa fallando.

Defecto confirmado y corregido: los enlaces internos y Limpiar filtros descartaban styleDate. Ahora lo conservan exclusivamente en desarrollo. El diagnóstico visible de desarrollo distingue campaña activa, imagen cargada y error de imagen; el error ofrece reintentar sin alterar la URL original de Awin. No cambia el diseño Adidas ni el creativo de Tienda. Cuatro pruebas específicas correctas; build y comprobación de exclusión de styleDate y diagnóstico del bundle de producción correctos. La carga de imagen y visibilidad reales en navegador siguen pendientes; la respuesta HTTP y el renderizado automatizado no equivalen a esa revisión.

## Primera ficha · Dermforce (solo revisión local)

Se incorpora una entrada real, `dermforce-face-cream`, de Terez & Honor en Skin Care y necesidad Hidratación facial. Sustituye el estado vacío en Inicio, Tienda y Skin Care; no se añade un segundo bloque destacado en Inicio. Se conserva búsqueda, categoría y necesidad sobre el mismo registro. Ruta individual: `/producto/dermforce-face-cream`.

La fotografía original se sirve intacta desde `/images/dermforce-face-cream-original.jpg`. Procedencia, hash y permiso pendiente de publicación en `public/images/dermforce-source.md`. La foto enlaza al mismo destino Awin exacto que el botón coral «Ver precio y comprar en Terez & Honor», ambos con `sponsored noopener`. El aviso de afiliación global se mantiene. Se muestra aviso de envío internacional y posibles cargos de importación; sin importe ni moneda ambiguos, reseñas o promesas de resultados.

Hamburgueso usa la pose de presentación aprobada en una columna independiente junto al borde lateral inferior del marco; en móvil pasa debajo. Se identifica como anfitrión Gritskin. Sin recortes, transformaciones ni superposición sobre foto, envase o etiqueta. Hero, cintas y materiales Awin permanecen.

Comprobación: build y 17 pruebas correctos; renderizado bilingüe, ausencia de duplicados, enlaces exactos y filtros. La ficha y la fotografía responden localmente; no se pudo revisar visualmente escritorio o móvil por `Cannot redefine property: process` al inicializar el navegador. Sin commit, push ni deploy de esta ficha.

## Publicación de portadas y primera ficha · 2 de noviembre de 2026

El usuario solicita publicar los cambios aprobados, conservando Dermforce, las cuatro portadas, hero, cintas, Hamburgueso y Awin. Esta orden sustituye el alcance de revisión local de las notas anteriores. No se afirma haber verificado permiso del titular de la fotografía; se registra la procedencia y la autorización de publicación del usuario en `public/images/dermforce-source.md`.

Portadas locales de `Gritskin_Portadas_Sin_Marca.zip`: PNG originales intactos con dimensiones, texto alternativo bilingüe y carga diferida, en marcos comunes 4:3 sin recorte. Hashes y origen en `public/images/categories/ORIGEN.json`. Son ilustraciones editoriales de categorías; no se crean productos a partir de sus objetos.

Los avisos cercanos a promociones Awin, Temu y Hotmart se simplifican a «Podemos recibir una comisión si compras desde estos enlaces.» / «We may earn a commission if you buy through these links.». Se conserva el recordatorio general de transparencia, enlaces patrocinados y vigencias Awin. La simulación y el diagnóstico siguen excluidos de producción.
