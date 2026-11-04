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

## Tres fichas Terez & Honor · versión aprobada del 3 de noviembre de 2026

Catálogo único de tres productos, presentes en Inicio, Tienda y Skin Care, con ficha individual:

- `/producto/dermforce-face-cream`
- `/producto/caffeine-hyaluronic-acid-eye-gel-patch`
- `/producto/grooming-essentials-pack` (la ruta anterior `/producto/the-essential-care-set` resuelve al mismo registro).

Textos aprobados en español y traducciones al inglés: gancho, descripción, ingredientes o contenido y opinión editorial claramente identificada. Marca y nombres reales visibles; enlaces Awin completos y avisos conservados. El kit enlaza también a los parches individuales.

Fotografías comerciales originales completas. Hamburgueso desvelado acompaña los parches; el kit usa la ilustración del mini Corvette de 1424 × 1105, intacta y con transparencia. Procedencias en `public/images/eye-patches-source.md` y `public/images/essential-care-set-source.md`. Cada bloque del personaje ocupa todo el ancho debajo de foto e información, centrado con frase HTML de 18 px. Poses verticales de 410 px en escritorio y 310 px en móvil; mini Corvette a 600 px como máximo y ancho adaptable. Bienvenidas, guías y página Hamburgueso también conservan el aumento de presencia aprobado.

Hero, cintas, portadas, promociones, vigencias y configuración Vercel conservados. Archivos personales, entradas duplicadas, dependencias y temporales excluidos del commit.

## Marcas compartidas · revisión local pendiente de publicación

`BrandPartners.jsx` comparte el bloque compacto entre Inicio y el espacio antes del footer en categorías, las tres fichas, guías, Hamburgueso y Sobre Gritskin. Tienda conserva Estilo y accesorios con 4969747 rectangular; las demás páginas usan 4969749 horizontal en ancho adaptable. No se duplican bloques ni avisos dentro del bloque. La exclusión inicial del creativo 4969774 quedó sustituida por su incorporación independiente, documentada abajo.

Lacoste se muestra como próxima promoción antes del 6 de noviembre de 2026, activa del 6 al 12 y se retira al comenzar el 13, America/Mexico_City. El control compartido actualiza al recuperar foco y visibilidad, y en los límites de vigencia. Adidas 3716681 mantiene la URL remota original, con respaldo local intacto y retirada de imagen si ambas fuentes fallan; el botón se conserva. Sin altura mínima de imagen ni estiramiento de tarjetas para evitar huecos al fallar.

Build y 24 pruebas correctos, incluyendo ambas lenguas, unicidad por página, tres estados temporales, URLs exactas y transición remota/local/fallo. La revisión visual de escritorio y móvil no se pudo realizar: el navegador falla con `Cannot redefine property: process`. HTTP 200 y renderizado automatizado no equivalen a verificación visual. Sin commit, push ni deploy de esta corrección.

## Publicación de marcas y Tote Bag · 3 de noviembre de 2026

El usuario autoriza publicar el conjunto pendiente de marcas y añadir 4969774, 468 × 60, una sola vez en cada bloque de marcas, en Inicio, Tienda y las demás páginas. Campaña independiente de Singles’ Day: no lleva ni hereda fechas de inicio o caducidad. Condición proporcionada: tote bag chica de regalo en compras desde $4,500 en Nueva Colección. Se muestra junto al enlace discreto a `https://www.lacoste.com/mx/TermsandConditionsSAS.html` para consultar vigencia, disponibilidad y condiciones. Las fechas de otras promociones históricas de esa página no se atribuyen al creativo actual.

La imagen remota original y el enlace Awin se conservan completos: `s=4969774&v=32585&q=606680&r=3132227`. Verificación del original: HTTP 200, JPEG de 468 × 60. El destino redirige a Nueva Colección Hombre, pero devolvió HTTP 403 al cliente de comprobación; no se sustituye ni altera el enlace por ello. El fallo de imagen conserva un enlace de texto sin reservar altura de banner. Se mantiene un único aviso breve junto a cada bloque de marcas. Esta autorización sustituye las restricciones de revisión local de las correcciones anteriores.

## Retoma local · 4 de noviembre de 2026

La revisión del código confirma que los banners solicitados ya están implementados; no se modificaron componentes ni el hero. Las 24 pruebas y el build pasan, incluyendo calendario de Singles’ Day, respaldo local Adidas, URLs y presencia del tote independiente en los tres estados temporales, y unicidad del bloque en todas las rutas y ambos idiomas. Servidor de revisión iniciado en `http://localhost:5174/`. La revisión visual sigue pendiente: la conexión del navegador falla con `Cannot redefine property: process`. Por instrucción actual, sin commit, push ni deploy; se conservan todos los archivos existentes.

## Distribución de contenido · 4 de noviembre de 2026

La auditoría encontró las tres fichas completas repetidas en Inicio, Tienda y Skin Care, y categorías sin productos presentadas como búsquedas sin coincidencias. Ahora Inicio conserva el hero y las cintas, presenta las cuatro categorías, una selección de tres tarjetas breves, las marcas aprobadas y la bienvenida de Hamburgueso. Tienda ofrece accesos explícitos a las cuatro categorías, catálogo completo filtrable en tarjetas, beneficios Temu y Estilo y accesorios separado. Skin Care muestra su portada y los tres productos confirmados, con acceso a las fichas y enlaces de compra originales.

Grooming, Men’s Essentials y Smart Finds conservan sus portadas y notas de Hamburgueso y ofrecen guías breves propias sobre arreglo personal, accesorios cotidianos y compatibilidad/utilidad, respectivamente. No incorporan productos de Skin Care ni precios o disponibilidad inventados. Grooming enlaza al curso existente en Rutinas y guías. Las fichas conservan íntegros fotografías, textos, traducciones, afiliación y presentadores originales; las explicaciones y poses de producto ya no se repiten en listados. Los bloques de marcas conservan sus creativos, enlaces y calendario; el bloque compacto tiene ahora un título visible de Estilo y accesorios.

Validación: 25 pruebas correctas y build correcto. La prueba de distribución comprueba ES/EN, unicidad de productos y secciones, separación de fichas y listados, guías distintas, portadas y destinos internos con sus anclas. Servidor 5174 responde HTTP 200. Revisión visual/interactiva pendiente por el error del navegador documentado arriba. Hero intacto; sin commit, push ni deploy.

## Ajuste exclusivo de Inicio · 4 de noviembre de 2026

Se retira la selección «EL CATÁLOGO GRIT / Esenciales para tu rutina» y sus tres tarjetas de Inicio, sin sustitución. Tienda, Skin Care, datos y fichas permanecen intactos. Inicio conserva hero, cintas, cuatro categorías con portadas, marcas y Hamburgueso; el espacio inferior de categorías se reduce a 32 px y la entrada al bloque de marcas a 16 px. El botón existente «Ver catálogo» dirige a `/tienda` al desaparecer su ancla anterior; no cambia la presentación del hero. Pasan las 25 pruebas y el build. Sin commit, push ni deploy.

## Cinco accesorios aprobados · 4 de noviembre de 2026

Se añaden cartera Lacoste NH1112FG, cinturón Lacoste RC4082 y gorra Adidas JY0939 a Men’s Essentials; neceser Lacoste NU5089NE a Grooming como accesorio de organización del aseo; bolsa organizadora Adidas JM7152 a Smart Finds. Tienda reúne ahora ocho productos y sus filtros de categoría, búsqueda y necesidad. Inicio conserva su distribución sin catálogo; Skin Care conserva sus tres entradas. Las guías breves de las otras categorías permanecen, con texto actualizado para no afirmar que están vacías.

Se reutilizan tarjetas y fichas existentes. Cada ficha nueva incluye nombre, modelo, color, gancho aprobado, descripción, especificaciones separadas de opinión editorial, CTA y comisión, traducción ES/EN y pose PNG transparente existente en apartado independiente con comentario HTML. Sin precios ni disponibilidad publicados. Los enlaces Awin se conservan completos, incluido awinmid=32585 del neceser; todos los enlaces comerciales de ficha incorporan sponsored noopener noreferrer. La nota de envío internacional previa se conserva para Skin Care y no se atribuye a accesorios de tiendas mexicanas.

Procedencia y límites en `public/images/accessories-source.md`: especificaciones mexicanas verificadas para Lacoste y organizador Adidas; la gorra tiene confirmados modelo/nombre/color, pero no composición, medidas o funciones en la versión accesible. No se extrapolan características. La discrepancia oficial de ranuras de la cartera se indica sin inventar una resolución. Fotografías Adidas originales descargadas e inspeccionadas; Lacoste conserva URLs exactas remotas tras HTTP 403 en descarga. Las fotos nuevas usan contain, dimensiones de presentación explícitas y estado de error compacto sin altura mínima.

Validación: 27 pruebas y build correctos, enlaces y anclas internas en ES/EN, categorías sin duplicados, filtros y afiliados exactos. No se pudo verificar visualmente la carga de las páginas: el navegador sigue fallando con Cannot redefine property: process. Hero, banners, portadas y archivos personales conservados; sin commit, push ni deploy.
