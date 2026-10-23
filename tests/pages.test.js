import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

test('pages render in both languages with real images, working destinations and empty catalog', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    for (const lang of ['es', 'en']) {
      globalThis.localStorage = { getItem: () => lang };
      for (const pathname of ['/', '/tienda', '/skin-care', '/grooming', '/mens-essentials', '/smart-finds', '/hamburgueso', '/rutinas-y-guias', '/sobre-gritskin', '/producto/no-confirmado', '/no-existe']) {
        globalThis.location = { pathname, search: '' };
        const html = renderToStaticMarkup(React.createElement(App));
        assert.ok(html.includes('Grit Skin'));
        const expectedPose = { '/': 'saludando', '/tienda': 'senalando-derecha', '/rutinas-y-guias': 'explicando', '/hamburgueso': 'presentando' }[pathname];
        const hostImages = [...html.matchAll(/<img[^>]+src="(\/images\/hamburgueso\/[^"]+)"/g)];
        assert.equal(hostImages.length, expectedPose ? 1 : 0, 'limited mascot appearances');
        if (expectedPose) assert.equal(hostImages[0][1], `/images/hamburgueso/hamburgueso-${expectedPose}.png`);

        const nav = html.match(/<nav[^>]*id="main-nav"[^>]*>([\s\S]*?)<\/nav>/)[1];
        assert.ok(nav.includes('aria-controls="shop-links"'));
        assert.ok(nav.includes('id="shop-links" class="shop-links" hidden=""'));
        assert.ok(nav.includes(lang === 'es' ? 'Tienda' : 'Shop'));
        assert.ok(nav.includes('href="/rutinas-y-guias"'));
        assert.ok(!nav.includes('href="/sobre-gritskin"'));
        for (const category of ['skin-care', 'grooming', 'mens-essentials', 'smart-finds']) assert.ok(nav.includes(`href="/${category}"`));
        if (pathname === '/rutinas-y-guias') {
          assert.ok(html.includes(lang === 'es' ? 'Rutinas y guías' : 'Routines &amp; guides'));
          assert.ok(html.includes('Cuidado 360° para hombres.'));
          assert.ok(html.includes('Barbería: higiene de tu barba en casa.'));
          assert.ok(html.includes('Beard Grooming'));
          assert.ok(html.includes('/images/barberia-higiene-barba-portada.png'));
          assert.ok(html.includes('href="https://go.hotmart.com/A108158861S" target="_blank" rel="sponsored noopener noreferrer"'));
          assert.ok(html.includes(lang === 'es' ? 'Ver curso en Hotmart' : 'View course on Hotmart'));
          assert.ok(html.includes('id="barberia-en-casa"'));

          assert.ok(html.includes('Ángel Valdez'));
          assert.ok(html.includes('/images/cuidado-360-hombres-portada.png'));
          assert.ok(html.includes('href="https://go.hotmart.com/J108158867M" target="_blank" rel="sponsored noopener noreferrer"'));
          assert.ok(html.includes(lang === 'es' ? 'Ver libro en Hotmart' : 'View book on Hotmart'));
          assert.ok(html.includes(lang === 'es' ? 'La compra se realiza en Hotmart. Consulta allí el precio vigente.' : 'Purchases take place on Hotmart. Check the current price there.'));
          assert.ok(!html.includes('Manuales en preparación') && !html.includes('Manuals in preparation'));
        }
        if (pathname === '/') {
          assert.equal((html.match(/class="category-card category-visual-card"/g) || []).length, 4);
          assert.equal((html.match(/class="ribbon-band ribbon-band-/g) || []).length, 2);
          assert.equal((html.match(/class="ribbon-group"/g) || []).length, 4);
          assert.ok(html.includes('aria-controls="grit-ribbons" aria-pressed="false"'));
          assert.ok(html.includes('id="grit-ribbons" class="ribbon-stage" aria-hidden="true"'));
          assert.ok(html.includes(lang === 'es' ? 'Pausar cintas' : 'Pause ribbons'));
          assert.ok(!html.includes('opacity:0'), 'content visible without animation');
          assert.ok(html.includes(lang === 'es' ? 'Fotografía de categoría pendiente' : 'Category photograph pending'));
        }
        assert.ok(html.includes('href="/sobre-gritskin"'), 'about page linked in footer');
        if (pathname === '/sobre-gritskin') {
          assert.ok(html.includes('/images/miguel-fierro-founder.jpeg'));
          assert.ok(html.includes('Miguel Fierro'));
          assert.ok(html.includes(lang === 'es' ? 'Creado desde la experiencia.' : 'Created from experience.'));
        } else {
          assert.ok(!html.includes('/images/miguel-fierro-founder.jpeg'), 'founder photo restricted to about');
          assert.ok(!html.includes('Miguel Fierro'), 'personal presentation restricted to about');
          assert.ok(!html.includes('Gritskin nace de la vida entre obra') && !html.includes('Gritskin comes from life across construction'));
        }
        assert.ok(!/href="#"/.test(html), 'no inert links');
        assert.ok(!html.includes('Explora por necesidad') && !html.includes('Explore by need'), 'no unsupported need shortcuts');
        assert.ok(!/atomy|papu/i.test(html));
        assert.ok(html.includes('saltar al contenido') || html.includes('Saltar al contenido') || html.includes('Skip to content'));
        for (const [, src] of html.matchAll(/<img[^>]+src="([^"]+)"/g)) assert.ok(existsSync(`public${src}`), src);
        if (['/', '/skin-care', '/grooming', '/mens-essentials', '/smart-finds'].includes(pathname)) assert.ok(html.includes(lang === 'es' ? 'Selección en preparación' : 'Selection in progress'));
        if (pathname.startsWith('/producto/')) assert.ok(html.includes(lang === 'es' ? 'Producto no disponible' : 'Product unavailable'));
        if (['/skin-care', '/grooming', '/mens-essentials', '/smart-finds'].includes(pathname)) assert.ok(html.includes('class="host-note"'), 'category host intro');
        if (pathname === '/') {
          const heroImage = html.match(/<img[^>]*class="hero-photo"[^>]*>/)[0];
          assert.ok(heroImage.includes('src="/images/grit-hero-nine-friends-workbench.png"'), 'approved nine-person cover');
          assert.ok(heroImage.includes('loading="eager"'), 'hero must not be lazy-loaded');
          assert.ok(heroImage.includes('width="2100"') && heroImage.includes('height="749"'), 'space reserved before image download');
          assert.ok(html.includes('srcSet="/images/grit-hero-nine-friends-workbench.webp"'));
          assert.ok(existsSync('public/images/grit-hero-workers.png'), 'previous photograph retained');
          assert.ok(!heroImage.includes('hidden') && !heroImage.includes('opacity:0'), 'hero rendered immediately');
        }
        if (pathname === '/hamburgueso') assert.ok(html.includes(lang === 'es' ? 'Hamburgueso pa’ los compas.' : 'Hamburgueso, for the amigos.'));
        assert.ok(html.includes(lang === 'es' ? 'enlaces de afiliados' : 'affiliate links'));
      }
      globalThis.location = { pathname: '/', search: '?q=prueba&category=grooming' };
      const filtered = renderToStaticMarkup(React.createElement(App));
      assert.ok(filtered.includes('value="prueba"'));
      assert.ok(filtered.includes('value="grooming" selected=""'));
      assert.ok(filtered.includes(lang === 'es' ? 'Limpiar filtros' : 'Clear filters'));
    }
  } finally { await server.close(); delete globalThis.location; delete globalThis.localStorage; }
});
