# Dirección visual de Gritskin

Referencias revisadas antes de esta iteración: 20 de octubre de 2026. Trabajo local en `feat/catalogo-hamburgueso`.

| Referencia | Observación | Adaptación propia |
| --- | --- | --- |
| [Horace](https://horace.com/us) y su [ficha de limpiador](https://horace.com/us/product/purifying-face-cleanser) | Separa tipo de producto y necesidad. La ficha organiza descripción, uso y características junto a fotografías. | Catálogo blanco con filtros legibles, tarjetas de fotografía grande y ficha preparada con resumen, características y tienda. Los accesos por necesidad se derivan solo de productos confirmados. |
| [Jack Black](https://www.getjackblack.com/) | Navegación reconocible por cuidado facial, rasurado/barba, cuerpo y cabello. | Las cuatro categorías acordadas conservan acceso directo, URL y descripción breve: Skin Care, Grooming, Men’s Essentials y Smart Finds. No se trasladan todas sus subcategorías. |
| [Lumin](https://www.luminskin.com/) | Combina navegación por necesidad, rutinas y mensajes breves organizados en pasos. | Guía editorial de tres pasos, «Menos pasos. Más constancia.», con la voz de Hamburgueso. Preparación de accesos por necesidad respaldados por el catálogo. No se publican paquetes ni rutinas de productos ficticios. |
| [Beardbrand](https://www.beardbrand.com/) | Identidad verbal marcada, relatos vinculados a fotografías y acceso a contenido editorial. | Hamburgueso recibe al visitante en una franja propia y tiene página de consejos. Humor amable y textos originales sobre la vida cotidiana, con espacios editoriales separados del catálogo. |

## Actualización aprobada · 21 de octubre de 2026

Esta actualización sustituye las notas históricas inferiores sobre hero original e imágenes pendientes de Hamburgueso. La portada usa la fotografía panorámica aprobada de ocho integrantes, con WebP y PNG de respaldo, sin recortes y con texto debajo. La fotografía anterior se conserva. Las cuatro poses aprobadas están integradas; tamaños ampliados en Inicio y guías, composición próxima al texto en su página y adaptaciones móviles. Los textos mexicanos aprobados sustituyen la presentación anterior. Tienda incluye `/tienda`.

El navegador sigue fallando al inicializar; la revisión visual real de escritorio y móvil queda pendiente. La compilación y las pruebas automatizadas se verifican por separado.

## Dirección definitiva: blanco, grafito y coral

Esta instrucción sustituye las anteriores sobre fondo crema dominante, verde, hero en columnas y limitación de Hamburgueso a una página. Se implementa primero la composición de Inicio y Skin Care. Se conservan todas las rutas, las cuatro categorías, buscador, filtros, idiomas y configuración para Vercel.

La limpieza de Lumin se adapta mediante superficies blancas, fotografías amplias, aire entre secciones y jerarquía clara. La personalidad de Hamburgueso entra en bloques editoriales puntuales sin reemplazar la fotografía principal ni desplazar productos.

| Color | Valor | Aplicación |
| --- | --- | --- |
| Blanco | `#FFFFFF` | Fondo principal y catálogo. |
| Negro/grafito | `#171714` | Texto, cabecera y pie. |
| Coral/rosa | `#F08B91` | Botones y acentos. |
| Coral hover | `#E87982` | Respuesta de acciones principales. |
| Crema | `#F7EEDC` | Pequeña etiqueta gráfica del anfitrión. |
| Mostaza | `#C4A046` | Marcas decorativas pequeñas. |
| Gris claro | `#F4F4F2` | Superficies secundarias. |
| Texto secundario | `#555555` | Lectura auxiliar. |

El cartel aún no está disponible: el coral es el valor provisional de la iteración anterior, pendiente de cotejar con la referencia. No se ha extraído color ni reproducido un personaje de un adjunto inexistente. No se usa verde.

Contraste calculado desde el CSS: grafito/blanco 17.96:1; grafito/coral 7.53:1; grafito/coral hover 6.41:1; texto secundario/blanco 7.46:1 y texto secundario/gris claro 6.77:1. Botones coral con texto oscuro. Crema y mostaza no son fondos dominantes ni se usan para texto pequeño de bajo contraste.

## Hero original a todo el ancho

Se conserva exactamente `public/images/grit-hero-workers.png`, comprobando que su hash coincide con el archivo de `main`. No hay recreación, sustitución ni edición de la fotografía.

Hero sin columnas: la imagen ocupa todo su ancho y fondo, con título «Cuidado real.» / «Real care.» y dos acciones sobre ella: categorías y catálogo. Se mantiene la proporción original 1376:768 y `object-fit: contain`; en móvil el hero sigue siendo panorámico para conservar al grupo completo en lugar de recortarlo en vertical. Título y acciones se compactan; el párrafo auxiliar se oculta en pantallas pequeñas.

Una superposición local de negro al 70 % respalda el texto, sobre la parte inferior de la fotografía. La parte superior y los rostros permanecen sin esa capa. El texto blanco tiene contraste incluso sobre píxeles originalmente blancos en la zona respaldada. Es una decisión implementada, pendiente de confirmar visualmente con un navegador funcional.

## Hamburgueso recurrente y recursos pendientes

Hamburgueso recibe en Inicio, introduce cada categoría con un texto distinto, aporta un consejo en las fichas y acompaña las guías. También firma el recordatorio de transparencia que aparece en todas las páginas. No se repiten bloques largos ni se ocupa la zona de productos con retratos.

No está disponible la referencia aprobada ni un conjunto de poses del personaje. Se preparan rutas independientes en `host.poses`: `welcome`, `skin-care`, `category`, `product-tip` y `guide`. Cada recurso permanece en `null` hasta disponer de material aprobado. No se usa otra figura como sustituto, no se repite automáticamente una imagen para todos los contextos y no se publican imágenes con el nombre anterior. Las ilustraciones deben conservar identidad coherente, expresión amable y poses apropiadas a cada contexto.

## Fotografías de producto

Solo se incorporarán fotografías comerciales autorizadas por la plataforma, marca o vendedor. Conservar envases, marcas, colores, proporciones y todo su contenido: sin IA, sin marca Gritskin añadida y sin recortar información. Las tarjetas reservan un área consistente 4:5 con `object-fit: contain`; la galería de ficha mantiene el material completo, sin deformarlo. El área se adapta a la imagen mediante espacio libre, no mediante recorte.

Faltan productos confirmados, destinos comerciales y sus fotografías autorizadas. El catálogo continúa en «Selección en preparación»; no se inventan precios, descuentos, productos o enlaces. Atomy sigue excluido.

## Presentación del fundador

`/sobre-gritskin` conserva exclusivamente el retrato y la presentación de Miguel Fierro, accesible desde el pie. Las pruebas verifican que el nombre, retrato y presentación personal no aparezcan en las páginas comerciales.

## Necesidades y contenido confirmado

`availableNeeds` en `src/data/catalog.js` deriva los accesos de la propiedad opcional `needs` de productos publicados. Formato: `needs: [{ id: 'identificador', label: { es: 'Nombre confirmado', en: 'Confirmed label' } }]`. No hay lista pública de necesidades sin productos que la sustenten. El filtro se conserva en `?need=...`, se combina con búsqueda y categoría y se limpia al cambiar categoría.

El catálogo sigue vacío. No se han incorporado productos, precios, reseñas, descuentos ni enlaces comerciales de las referencias. Sigue pendiente la imagen aprobada de Hamburgueso; su lugar es tipográfico hasta recibirla, sin sustituirlo por otro personaje.

## Navegación y portada de categorías

La cabecera tiene tres entradas: **Tienda**, **Rutinas y guías** y **Hamburgueso**. El logo vuelve a `/`. Sobre Gritskin sigue en el pie.

Tienda es un desplegable de navegación con botón nativo y enlaces normales a `/skin-care`, `/grooming`, `/mens-essentials` y `/smart-finds`. No depende de hover: clic, toque, Enter o Espacio alternan su apertura. `aria-expanded` y `aria-controls` comunican el estado; el panel cerrado queda oculto también al teclado. Tab recorre enlaces; flecha abajo/arriba desde el botón abre y enfoca el primer/último enlace. Escape cierra y devuelve el foco al control correspondiente. Clic fuera y salida de foco cierran el desplegable. En móvil, la navegación se presenta como panel vertical y Tienda como acordeón dentro de ese panel, con controles de al menos 44 px.

`/rutinas-y-guias` reúne la guía editorial y los consejos educativos que ya existían. La página de Hamburgueso mantiene su presentación y enlaza al nuevo espacio. Los manuales de Hotmart aparecen como pendientes; no hay manuales, ventas ni enlaces inventados.

Inicio presenta las cuatro categorías como bloques visuales grandes, en dos columnas en escritorio y una en móvil. Los bloques usan composición tipográfica original con números y detalles coral. No simulan fotografías comerciales: indican explícitamente «Fotografía de categoría pendiente». `categories[].image` permite incorporar cada imagen aprobada sin cambiar su enlace. La portada conserva la fotografía original de trabajadores; el retrato del fundador no se reutiliza en categorías.

Recursos pendientes: cuatro fotografías de categoría autorizadas, ilustraciones aprobadas y poses de Hamburgueso, productos y fotografías comerciales confirmados y manuales de Hotmart con contenido y enlaces verificados.

## Comprobación y límites

- Compilación de producción y diez pruebas automatizadas: rutas, búsqueda bilingüe, filtros, estado vacío, seguridad de URL, necesidades respaldadas y renderizado de las páginas en ambos idiomas.
- La prueba de renderizado comprueba las categorías dentro de Tienda, el panel inicialmente oculto, la nueva página educativa en ambos idiomas, cuatro bloques de categoría, los avisos de imágenes y manuales pendientes y el enlace a Sobre Gritskin y que el retrato, nombre y presentación personal solo aparezcan en esa página; verifica también que los archivos de imagen existen.
- Nueva tentativa de revisión visual: el navegador sigue bloqueado al inicializar con el error `Cannot redefine property: process`. No se obtuvieron capturas ni se pudo comprobar visualmente escritorio o móvil. Los tamaños y las adaptaciones están implementados en CSS, pero no se consideran visualmente aprobados.
- La compilación, las pruebas y una respuesta HTTP correcta no sustituyen la revisión del diseño. Quedan pendientes inspección visual en escritorio y móvil, recortes fotográficos, equilibrio de espacios y comprobación interactiva de menú, idioma y navegación.

Revisión local de esta dirección: Inicio y Skin Care. La versión local se mantiene activa en http://127.0.0.1:5173/. Trabajo sobre `feat/catalogo-hamburgueso`, sin commit, push ni deploy.

## Corrección puntual de visibilidad del hero

Investigación: la imagen del proyecto, la de `main` y la servida en `/images/grit-hero-workers.png` son idénticas. La respuesta local fue HTTP 200 con `Content-Type: image/png`, 2 082 505 bytes y dimensiones 1376×768. La inspección de la imagen descargada confirma que contiene al grupo original. SHA-256 del archivo local y de la respuesta: `813d9f2bdb08b306a45c43ac9815bcb226f3cc0f8bc894160c97ebbd8e884eb0`.

El historial original usaba la misma URL como fondo CSS. La implementación actual la cambió a `<img>` absoluta con `z-index: -3`, sombra en `-2` y altura del padre dependiente de `aspect-ratio`. Esa es la configuración frágil encontrada; no hay evidencia de sustitución, URL rota, filtro de ocultación, video, cargador o condición de animación. Sin acceso al navegador no se puede demostrar que el apilamiento fuera la única causa del síntoma observado.

Corrección limitada al hero: imagen en el flujo normal, ancho 100 % y altura automática a su proporción natural; capas explícitas no negativas (foto 0, sombra 1, texto 2). Foto visible con opacidad 1, sin filtros ni animaciones. Carga inmediata `loading="eager"`, prioridad alta y preload; atributos de tamaño reservan espacio antes de terminar la descarga. No hay espera de video o animación. Se conserva el encuadre completo y la superposición local para el texto. Menú, rutas y catálogo permanecen sin cambios.

La nueva tentativa de navegador vuelve a fallar con `Cannot redefine property: process`. La imagen servida sí se inspeccionó como archivo; eso no equivale a verificar el hero renderizado en escritorio o móvil. La comprobación visual del sitio sigue pendiente.

## Primera demostración de movimiento en Inicio

Dos cintas inmediatamente después del hero: coral y grafito, con inclinaciones opuestas de 1.4 grados y desplazamiento lineal en sentidos contrarios (55 y 65 segundos por ciclo). Cada cinta tiene dos grupos idénticos, incluyendo espaciado y tamaño fijo del logo, y se desplaza exactamente la mitad del ancho de su pista para unir el final con el inicio. Cada grupo ocupa al menos el ancho visible de la banda, también en pantallas amplias. No se usan fotos de productos ni recursos de terceros: solo nombres de categorías, mensajes de Gritskin y el logo existente.

Botón nativo «Pausar cintas» / «Reanudar cintas», con `aria-pressed` y `aria-controls`. La pausa detiene en la posición actual y la reanudación continúa desde ella. Los duplicados visuales no se anuncian al lector de pantalla; hay una descripción textual única. Con movimiento reducido, ambas cintas quedan estáticas, sin inclinación y con el contenido distribuido en líneas; se ocultan duplicados y el control informa que la preferencia está activa. Si CSS o las animaciones no se ejecutan, el texto y el control siguen en el documento.

Los bloques de categorías usan IntersectionObserver para activar una sola entrada de 18 px, de 650 ms, al entrar en pantalla. No hay opacidad cero ni contenido oculto esperando observadores, carga o animaciones. Con movimiento reducido, falta de soporte o foco sobre un enlace, el contenido se muestra estático. El desplazamiento es decorativo y no bloquea los enlaces ni el scroll. Las bandas recortan su propio desbordamiento dentro de su sección; no se añade bloqueo de scroll al documento.

La imagen original del hero y sus capas no se han alterado para esta demostración. Recursos pendientes: ilustraciones y poses aprobadas de Hamburgueso (entradas futuras breves, sin movimiento continuo), cuatro imágenes autorizadas de categorías y fotografías comerciales de productos confirmados. No se inventan imágenes para llenar las cintas.

Comprobaciones técnicas: compilación, pruebas de renderizado bilingüe de las dos bandas y el control, rutas y catálogo existentes. Pendiente de comprobación visual e interactiva real en escritorio y móvil si el navegador continúa bloqueado; no se presenta el build como validación del movimiento.

## Logo aprobado y variantes transparentes

El usuario aprobó la última versión blanca mostrada. Se aplica como `grit-logo-white.png` en cabecera, cinta oscura y pie. `grit-logo-black.svg` utiliza el mismo alfa sin redibujar para la cinta coral y futuras superficies claras. El original se conserva. Fuente, aprobación, dimensiones y validación documentadas en LOGO.md. No se cambian hero, colores, movimiento ni funcionalidades.
