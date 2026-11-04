import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { developmentDate, isLacosteActive, lacostePhase, stylePartners } from '../src/data/stylePartners.js';

test('Lacoste uses Mexico City boundaries, independently of the host timezone', () => {
  for (const [date, active] of [
    ['2026-11-02T12:00:00-06:00', false],
    ['2026-11-05T23:59:59.999-06:00', false],
    ['2026-11-06T00:00:00-06:00', true],
    ['2026-11-12T23:59:59.999-06:00', true],
    ['2026-11-13T00:00:00-06:00', false],
    ['2027-11-06T00:00:00-06:00', false]
  ]) assert.equal(isLacosteActive(Date.parse(date)), active, date);
});
test('date simulation requires development and an explicit timezone', () => {
  const query = '?styleDate=2026-11-08T12%3A00%3A00-06%3A00';
  assert.equal(developmentDate(query, true), Date.parse('2026-11-08T12:00:00-06:00'));
  assert.equal(developmentDate(query, false), null);
  for (const value of ['', '?styleDate=invalid', '?styleDate=2026-11-08T12:00:00']) assert.equal(developmentDate(value, true), null);
});
test('cards preserve exact affiliate URLs, image dimensions and remove expired card space', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
  try {
    const { default: Feature } = await server.ssrLoadModule('/src/StyleAccessories.jsx');
    const render = date => renderToStaticMarkup(React.createElement(Feature, { lang: 'es', search: `?styleDate=${encodeURIComponent(date)}` }));
    const html = render('2026-11-08T12:00:00-06:00');
    for (const params of ['s=3716681&amp;v=79918&amp;q=498084&amp;r=3132227', 's=4969747&amp;v=32585&amp;q=606120&amp;r=3132227']) {
      const href = `href="https://www.awin1.com/cread.php?${params}" target="_blank" rel="sponsored noopener noreferrer"`;
      assert.equal(html.split(href).length - 1, 2);
      assert.ok(html.includes(`src="https://www.awin1.com/cshow.php?${params}"`));
    }
    assert.ok(html.includes('width="622" height="391"'));
    assert.ok(html.includes('width="336" height="280"'));
    assert.ok(html.includes('Del 6 al 12 de noviembre'));
    assert.ok(html.includes('20% de descuento en nueva colección'));
    assert.ok(html.includes('Podemos recibir una comisión si compras desde estos enlaces.'));
    for (const date of ['2026-11-13T00:00:00-06:00']) {
      const inactive = render(date);
      assert.ok(inactive.includes('style-grid-single'));
      assert.ok(inactive.includes('Explorar Adidas'));
      assert.ok(!inactive.includes('4969747'));
    }
    assert.ok(!/Croco Days|Members Week|40%/.test(html));
  } finally { await server.close(); }
});

test('home uses horizontal Lacoste once after ribbons, exact URLs, and preserves the shop creative', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    globalThis.localStorage = { getItem: () => 'es' };
    const render = (pathname, date) => {
      globalThis.location = { pathname, search: `?styleDate=${encodeURIComponent(date)}` };
      return renderToStaticMarkup(React.createElement(App));
    };
    const active = render('/', '2026-11-06T00:00:00-06:00');
    const params = 's=4969749&amp;v=32585&amp;q=606120&amp;r=3132227';
    assert.ok(active.includes(`href="https://www.awin1.com/cread.php?${params}" target="_blank" rel="sponsored noopener noreferrer"`));
    assert.ok(active.includes(`src="https://www.awin1.com/cshow.php?${params}"`));
    assert.ok(active.includes('width="728" height="90"'));
    assert.equal(active.split('class="home-lacoste"').length - 1, 1);
    assert.equal(active.split('class="home-adidas"').length - 1, 1);
    assert.ok(active.indexOf('class="ribbon-stage"') < active.indexOf('class="home-lacoste"'));
    assert.ok(!active.includes('4969747'));
    for (const date of ['2026-11-13T00:00:00-06:00']) {
      const inactive = render('/', date);
      assert.ok(!inactive.includes('home-lacoste') && !inactive.includes('4969749'));
      assert.ok(inactive.includes('Explorar Adidas'));
    }
    const shop = render('/tienda', '2026-11-08T12:00:00-06:00');
    assert.ok(shop.includes('4969747') && shop.includes('width="336" height="280"'));
    assert.ok(!shop.includes('4969749') && !shop.includes('home-adidas'));
  } finally { await server.close(); delete globalThis.location; delete globalThis.localStorage; }
});

test('development navigation retains simulation across home, shop and filter reset', async () => {
  const { withDevelopmentDate } = await import('../src/data/developmentNavigation.js');
  const search = '?styleDate=2026-11-08T12%3A00%3A00-06%3A00&q=prueba';
  for (const href of ['/', '/tienda', '/#categorias']) {
    const next = new URL(withDevelopmentDate(href, search, true), 'http://localhost');
    assert.equal(developmentDate(next.search, true), Date.parse('2026-11-08T12:00:00-06:00'));
    assert.equal(next.searchParams.get('q'), null);
    assert.equal(withDevelopmentDate(href, search, false), href);
  }
});


test('upcoming Lacoste labels precede original banners in both languages and expire at Mexico City midnight', async () => {
  assert.equal(lacostePhase(Date.parse('2026-11-05T23:59:59.999-06:00')), 'upcoming');
  assert.equal(lacostePhase(Date.parse('2026-11-06T00:00:00-06:00')), 'active');
  assert.equal(lacostePhase(Date.parse('2026-11-13T00:00:00-06:00')), 'expired');
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
  try {
    for (const path of ['/src/HomePartners.jsx', '/src/StyleAccessories.jsx']) {
      const { default: Component } = await server.ssrLoadModule(path);
      for (const lang of ['es', 'en']) {
        const render = date => renderToStaticMarkup(React.createElement(Component, { lang, search: `?styleDate=${encodeURIComponent(date)}` }));
        const html = render('2026-11-05T23:59:59-06:00');
        const label = lang === 'es' ? 'Disponible del 6 al 12 de noviembre' : 'Available November 6–12';
        assert.ok(html.includes(label));
        assert.ok(html.indexOf(label) < html.indexOf('s=496974'));
        assert.ok(!html.includes('20%'));
        assert.ok(html.includes(lang === 'es' ? 'Promoción aún no vigente.' : 'Promotion not yet active.'));
        const active = render('2026-11-06T00:00:00-06:00');
        assert.ok(active.includes(lang === 'es' ? 'Promoción vigente' : 'Promotion active'));
        const expired = render('2026-11-13T00:00:00-06:00');
        assert.ok(!expired.includes('s=496974'));
        assert.ok(expired.includes('Adidas'));
      }
    }
  } finally { await server.close(); }
});

test('partner images fall back from Awin to intact local Adidas, then remove broken images and their layout', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
  try {
    const { PartnerImageView, nextImageState } = await server.ssrLoadModule('/src/PartnerImage.jsx');
    const adidas = stylePartners[0];
    assert.equal(createHash('sha256').update(readFileSync(`public${adidas.fallback}`)).digest('hex'), '306396bd3e068154bf2774eabeab3e651a8648178fb86bdd809e96cb29278f1e');
    const render = state => renderToStaticMarkup(React.createElement(PartnerImageView, { ...adidas, state, className: 'style-image-link', alt: 'Adidas' }));
    assert.ok(render('remote').includes(adidas.image.replaceAll('&', '&amp;')));
    assert.equal(nextImageState('remote', adidas.fallback), 'local');
    assert.ok(render('local').includes(adidas.fallback));
    assert.ok(!render('local').includes('cshow.php'));
    assert.equal(nextImageState('local', adidas.fallback), 'failed');
    assert.equal(render('failed'), '');
    assert.equal(nextImageState('remote', undefined), 'failed');
    const lacoste = renderToStaticMarkup(React.createElement(PartnerImageView, { state: 'failed', url: stylePartners[1].url, fallbackText: 'Conoce Lacoste' }));
    assert.ok(!lacoste.includes('<img'));
    assert.ok(lacoste.includes('Conoce Lacoste'));
  } finally { await server.close(); }
});

test('all public pages show exactly one partner block with one adjacent disclosure and preserve scheduled creatives', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    const paths = ['/', '/tienda', '/skin-care', '/grooming', '/mens-essentials', '/smart-finds', '/producto/dermforce-face-cream', '/producto/caffeine-hyaluronic-acid-eye-gel-patch', '/producto/grooming-essentials-pack', '/rutinas-y-guias', '/hamburgueso', '/sobre-gritskin', '/no-existe'];
    for (const lang of ['es', 'en']) {
      globalThis.localStorage = { getItem: () => lang };
      for (const pathname of paths) for (const [date, phase] of [['2026-11-03T12:00:00-06:00', 'upcoming'], ['2026-11-08T12:00:00-06:00', 'active'], ['2026-11-13T00:00:00-06:00', 'expired']]) {
        globalThis.location = { pathname, search: `?styleDate=${encodeURIComponent(date)}` };
        const html = renderToStaticMarkup(React.createElement(App));
        assert.equal((html.match(/id="(?:marcas|marcas-inicio|estilo-y-accesorios)"/g) || []).length, 1, pathname);
        const block = html.match(/<section[^>]+id="(?:marcas|marcas-inicio|estilo-y-accesorios)"[\s\S]*?<\/section>/)?.[0];
        assert.ok(block);
        const disclosure = lang === 'es' ? 'Podemos recibir una comisión si compras desde estos enlaces.' : 'We may earn a commission if you buy through these links.';
        assert.equal(block.split(disclosure).length - 1, 1);
        assert.ok(block.includes('s=3716681&amp;v=79918&amp;q=498084&amp;r=3132227'));
        assert.equal((block.match(/class="lacoste-tote"/g) || []).length, 1, 'independent tote campaign appears once');
        assert.ok(block.includes('s=4969774&amp;v=32585&amp;q=606680&amp;r=3132227'));
        assert.ok(block.includes('width="468" height="60"'));
        assert.ok(block.includes('https://www.lacoste.com/mx/TermsandConditionsSAS.html'));
        assert.ok(block.includes(lang === 'es' ? 'Nueva Colección' : 'New Collection'));
        if (phase === 'expired') assert.ok(!block.includes('4969749') && !block.includes('4969747'));
        else {
          assert.ok(block.includes(pathname === '/tienda' ? '4969747' : '4969749'));
          assert.ok(block.includes(lang === 'es' ? phase === 'upcoming' ? 'Próxima promoción' : 'Promoción vigente' : phase === 'upcoming' ? 'Upcoming promotion' : 'Promotion active'));
        }
        if (!['/', '/tienda'].includes(pathname)) {
          assert.ok(html.indexOf('id="marcas"') > html.indexOf('</main>'));
          assert.ok(html.indexOf('id="marcas"') < html.indexOf('<footer'));
        }
      }
    }
  } finally { await server.close(); delete globalThis.location; delete globalThis.localStorage; }
});
