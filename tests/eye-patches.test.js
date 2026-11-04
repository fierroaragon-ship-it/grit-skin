import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { products, filterProducts } from '../src/data/catalog.js';

const slug = 'caffeine-hyaluronic-acid-eye-gel-patch';
const product = products.find(p => p.slug === slug);
const affiliate = 'https://www.awin1.com/cread.php?awinmid=110224&awinaffid=3132227&ued=https%3A%2F%2Fterezandhonor.com%2Fproducts%2Fcaffeine-hyaluronic-acid-eye-gel-patch';
test('eye patches preserve supplied destination, transparent original host and conservative content', () => {
  assert.equal(product.url, affiliate);
  assert.equal(product.name.es, 'Parches hidratantes para el contorno de ojos');
  assert.equal(product.price, undefined);
  assert.equal(product.rating, undefined);
  const png = readFileSync(`public${product.presenter}`);
  assert.equal(png[25], 6, 'original PNG includes alpha channel');
  assert.equal(createHash('sha256').update(png).digest('hex'), '3ee337fbd61261f4240db7b27f9aecb4cfc2268eccdf11b8e07cb71a970415e7', 'supplied illustration remains unchanged');
  assert.equal(filterProducts(products, { query: 'cafeina', category: 'skin-care', need: 'contorno-de-ojos' })[0].slug, slug);
  assert.equal(filterProducts(products, { category: 'grooming', need: 'contorno-de-ojos' }).length, 0);
});
test('eye patch details preserve both languages, illustration and sponsored links', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    for (const lang of ['es', 'en']) {
      globalThis.localStorage = { getItem: () => lang };
      for (const pathname of [`/producto/${slug}`]) {
        globalThis.location = { pathname, search: '' };
        const html = renderToStaticMarkup(React.createElement(App));
        const feature = html.match(new RegExp(`<article class="dermforce-feature" id="${slug}">[\\s\\S]*?<\\/article>`))?.[0];
        assert.ok(feature);
        assert.equal(html.split(`id="${slug}"`).length - 1, 1);
        const href = `href="${affiliate.replaceAll('&', '&amp;')}" target="_blank" rel="sponsored noopener noreferrer"`;
        assert.equal(feature.split(href).length - 1, 2);
        const photo = feature.match(/<a class="dermforce-photo-frame"[\s\S]*?<\/a>/)[0];
        assert.ok(photo.includes(product.photos[0].src));
        assert.ok(!photo.includes('hamburgueso'));
        assert.ok(feature.includes(product.presenter));
        assert.ok(feature.includes(product.hook[lang]));
        assert.ok(feature.includes(product.editorial[lang]));
        assert.ok(feature.includes(lang === 'es' ? 'Ver en Terez &amp; Honor' : 'View at Terez &amp; Honor'));
        assert.ok(feature.includes(lang === 'es' ? 'Podemos recibir una comisión' : 'We may earn a commission'));
        assert.ok(!/elimina|removes|\$|MXN|USD/.test(feature));
        assert.equal(feature.includes('<h1>'), pathname.startsWith('/producto/'));
      }
    }
  } finally { await server.close(); delete globalThis.location; delete globalThis.localStorage; }
});
