# Variantes del logo de Gritskin

## Fuente y aprobación

El repositorio y su historial contienen una sola fuente original: `public/images/grit-logo.png`, PNG de 586 × 450 px, sin píxeles transparentes. No se encontró SVG, PDF, AI, EPS ni una versión de mayor resolución.

El usuario aprobó expresamente la última versión blanca mostrada, con textura y dibujo derivados de la extracción. Esa aprobación es la base de estas variantes; no se afirma que la extracción generada sea una reproducción píxel a píxel del original.

El original queda intacto (Git blob `f64158b1e822bf6cd00f4c1f0192d82d3839a53e`).

## Archivos nuevos

- `public/images/grit-logo-white.png`: copia exacta de la versión blanca aprobada, 1431 × 1099 px, con canal alfa real. No se ha vuelto a generar ni redibujar.
- `public/images/grit-logo-black.svg`: contiene embebido ese mismo PNG y usa `feFlood` negro y `feComposite` sobre `SourceAlpha`. Conserva exactamente el canal alfa y la geometría de la versión aprobada. No es una vectorización por trazado; es un contenedor SVG de la imagen rasterizada con recoloración declarativa. No depende de una descarga adicional.

La variante negra generada de prueba se descartó porque su canal alfa no coincidía con el de la versión aprobada. El SVG evita ese cambio.

## Aplicación

Blanca en cabecera, cinta oscura y pie. Negra en la cinta coral; usar también la negra en futuras superficies blancas o claras. Ambas conservan la relación 1431:1099, sin fondos rectangulares, recorte, estiramiento ni CSS para simular la eliminación del fondo. Se ajustan anchos y márgenes del logo, sin modificar colores, movimiento de las cintas, hero, menú o rutas.

## Comprobación

Verificados: copia idéntica de la versión blanca aprobada; alfa de 0 a 255 con 1 101 612 píxeles totalmente transparentes; PNG embebido del SVG idéntico al PNG blanco; original sin cambios; compilación y pruebas del sitio. La revisión del sitio en navegador sigue limitada por el bloqueo de inicialización documentado en DIRECCION-DISENO.md.

## Procedencia de la versión blanca aprobada

Se obtuvo con la herramienta integrada de edición de imágenes, a partir del logo original. Prompt utilizado:

> Extract the existing logo with precision. The original image is a photograph of a BLACK logo on LIGHT BEIGE PAPER. The desired result is ONLY THE DARK INK STROKES, made solid WHITE, on a fully transparent background. Every beige/light/cream paper area, including the INSIDE of the large circular outline and between the letters, must become FULLY TRANSPARENT, not white. The circle is only two narrow rings, NOT a filled disc. Keep the exact existing typography: large angled serif GRIT with thin handwritten Skin underneath, two delicate circle outlines and four narrow diagonal line accents. Preserve source geometry, exact relative placement, stroke weights, letterforms and proportions. Do not invent texture or distressed patches. Do not turn any of the original paper into white pixels. Remove the partial dark strip at the bottom edge which is a crop artifact. Deliver clean white ink extracted from the original black strokes only, actual alpha transparency. No new logo, no reconstruction, no solid disc, no filled negative spaces, no shadow, no background.

La salida no cumplió la extracción exacta inicialmente buscada; posteriormente el usuario aprobó expresamente esa imagen blanca. Se conserva esa versión aprobada sin reinterpretarla.
