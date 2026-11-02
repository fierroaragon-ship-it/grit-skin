import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { developmentDate, isLacosteActive } from '../src/data/stylePartners.js';

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
    assert.ok(html.includes('Del 6 al 12 de noviembre de 2026'));
    assert.ok(html.includes('20% de descuento en nueva colección'));
    assert.ok(html.includes('Podemos recibir una comisión si compras desde estos enlaces.'));
    for (const date of ['2026-11-05T23:59:59-06:00', '2026-11-13T00:00:00-06:00']) {
      const inactive = render(date);
      assert.ok(inactive.includes('style-grid-single'));
      assert.ok(inactive.includes('Explorar Adidas'));
      assert.ok(!inactive.includes('Lacoste') && !inactive.includes('4969747'));
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
    for (const date of ['2026-11-05T23:59:59.999-06:00', '2026-11-13T00:00:00-06:00']) {
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
