import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { accessoryProducts } from '../src/data/accessoryProducts.js';
import { products, filterProducts } from '../src/data/catalog.js';

const expected = [
  ['NH1112FG', 'mens-essentials', '32585', 'https://www.lacoste.com/mx/lacoste/hombre/marroquineria/carteras-y-tarjeteros/NH1112FG.html?color=000&size=00&utm_source=chatgpt.com'],
  ['RC4082', 'mens-essentials', '32585', 'https://www.lacoste.com/mx/lacoste/hombre/marroquineria/cinturones-de-piel/RC4082.html?color=000&utm_source=chatgpt.com'],
  ['JY0939', 'mens-essentials', '79918', 'https://www.adidas.mx/gorra-essentials-climacool/JY0939.html?utm_source=chatgpt.com'],
  ['NU5089NE', 'grooming', '32585', 'https://www.lacoste.com/mx/lacoste/hombre/marroquineria/carteras-y-tarjeteros/NU5089NE.html?color=000&size=00&utm_source=chatgpt.com'],
  ['JM7152', 'smart-finds', '79918', 'https://www.adidas.mx/bolsa-organizadora-essentials/JM7152.html?utm_source=chatgpt.com']
];

test('five approved accessories preserve affiliate destinations and scoped filters', () => {
  assert.equal(accessoryProducts.length, 5);
  assert.equal(products.length, 8);
  assert.equal(new Set(products.map(p => p.slug)).size, 8);
  for (const [model, category, mid, target] of expected) {
    const product = accessoryProducts.find(p => p.model === model);
    assert.equal(product.category, category);
    assert.equal(product.url, `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=3132227&ued=${encodeURIComponent(target)}`);
    assert.equal(product.price, undefined);
    assert.equal(product.rating, undefined);
    for (const lang of ['es', 'en']) {
      assert.equal(filterProducts(products, { category, query: model }, lang)[0].slug, product.slug);
      assert.equal(filterProducts(products, { category: 'skin-care', query: model }, lang).length, 0);
      assert.equal(filterProducts(products, { category, need: product.needs[0].id }, lang).some(p => p.slug === product.slug), true);
    }
    const pose = readFileSync(`public${product.presenter}`);
    assert.equal(pose[25], 6, 'approved PNG retains transparency');
  }
});

test('accessory details separate photos, editorial and transparent host', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    for (const lang of ['es', 'en']) {
      globalThis.localStorage = { getItem: () => lang };
      for (const product of accessoryProducts) {
        globalThis.location = { pathname: `/producto/${product.slug}`, search: '' };
        const html = renderToStaticMarkup(React.createElement(App));
        const feature = html.match(/<article class="dermforce-feature"[\s\S]*?<\/article>/)[0];
        const photo = feature.match(/<a class="dermforce-photo-frame"[\s\S]*?<\/a>/)[0];
        assert.ok(photo.includes(product.photos[0].src));
        assert.ok(photo.includes('width="500" height="500"'));
        assert.ok(!photo.includes('hamburgueso'));
        const href = `href="${product.url.replaceAll('&', '&amp;')}" target="_blank" rel="sponsored noopener noreferrer"`;
        assert.equal(feature.split(href).length - 1, 2);
        const presenter = feature.match(/<figure class="dermforce-host">[\s\S]*?<\/figure>/)?.[0];
        assert.ok(presenter, product.slug);
        assert.ok(presenter.includes(`src="${product.presenter}"`));
        assert.ok(presenter.includes('loading="eager"'));
        assert.ok(presenter.includes('width="1122" height="1402"'));
        assert.ok(presenter.includes(`<figcaption>${product.hook[lang]}</figcaption>`));
        assert.ok(feature.indexOf(presenter) > feature.indexOf('class="dermforce-copy"'));
        assert.equal((feature.match(/class="dermforce-host"/g) || []).length, 1);
        assert.ok(feature.includes('class="product-editorial"'));
        assert.ok(feature.includes(product.editorial[lang]));
        assert.ok(feature.includes(product.model));
        assert.ok(!feature.includes(lang === 'es' ? 'Envío internacional' : 'International shipping'));
        assert.ok(feature.includes(lang === 'es' ? 'Podemos recibir una comisión' : 'We may earn a commission'));
      }
    }
  } finally { await server.close(); delete globalThis.location; delete globalThis.localStorage; }
});
