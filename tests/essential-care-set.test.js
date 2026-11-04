import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { products, filterProducts, resolvePage } from '../src/data/catalog.js';

const slug = 'grooming-essentials-pack';
const product = products.find(p => p.slug === slug);
const affiliate = 'https://www.awin1.com/cread.php?awinmid=110224&awinaffid=3132227&ued=https%3A%2F%2Fterezandhonor.com%2Fproducts%2Fgrooming-essentials-pack';
test('set preserves identity, original image and existing products without duplicates', () => {
  assert.equal(product.url, affiliate);
  assert.equal(resolvePage('/producto/grooming-essentials-pack').slug, slug);
  assert.equal(resolvePage('/producto/the-essential-care-set').slug, slug);
  assert.equal(product.officialName, 'The Essential Care Set');
  assert.equal(product.formerName, 'Grooming Essentials Pack');
  assert.equal(product.price, undefined);
  assert.equal(new Set(products.map(p => p.slug)).size, 3);
  assert.ok(products.some(p => p.slug === 'dermforce-face-cream'));
  assert.ok(products.some(p => p.slug === 'caffeine-hyaluronic-acid-eye-gel-patch'));
  assert.equal(product.presenter, '/images/hamburgueso/hamburgueso-mini-corvette.png');
  const pose = readFileSync(`public${product.presenter}`);
  assert.equal(pose[25], 6, 'PNG keeps alpha channel');
  assert.equal(createHash('sha256').update(pose).digest('hex'), 'e7a7e5d630925e7674eff2c784818c999c1c622b3cbb2122a2c779ae69de0ec9');
  const photo = readFileSync(`public${product.photos[0].src}`);
  assert.equal(createHash('sha256').update(photo).digest('hex'), '1cd8fda28aca29575c31f20f0f4adbf24b2a93f9d4c9f6fe9e91138572bfae72');
  for (const query of ['grooming-essentials-pack', 'The Essential Care Set', 'Grooming Essentials Pack', 'Kit esencial de cuidado facial']) {
    assert.equal(filterProducts(products, { query, category: 'skin-care' })[0].slug, slug);
  }
});
test('set renders once in intended pages in both languages with independent illustration and sponsored links', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    for (const lang of ['es', 'en']) {
      globalThis.localStorage = { getItem: () => lang };
      for (const pathname of ['/', '/tienda', '/skin-care', `/producto/${slug}`]) {
        globalThis.location = { pathname, search: '' };
        const html = renderToStaticMarkup(React.createElement(App));
        const feature = html.match(new RegExp(`<article class="dermforce-feature" id="${slug}">[\\s\\S]*?<\\/article>`))?.[0];
        assert.ok(feature);
        assert.ok(feature.includes('The Essential Care Set'));
        assert.ok(feature.includes(product.hook[lang]));
        if (!pathname.startsWith('/producto/')) assert.ok(feature.includes(`href="/producto/${slug}"`));
        assert.ok(feature.includes('Grooming Essentials Pack'));
        assert.equal(html.split(`id="${slug}"`).length - 1, 1);
        const href = `href="${affiliate.replaceAll('&', '&amp;')}" target="_blank" rel="sponsored noopener"`;
        assert.equal(feature.split(href).length - 1, 2);
        const photo = feature.match(/<a class="dermforce-photo-frame"[\s\S]*?<\/a>/)[0];
        assert.ok(photo.includes(product.photos[0].src));
        assert.ok(!photo.includes('hamburgueso'));
        assert.ok(feature.includes(product.presenter));
        assert.ok(feature.includes('width="1424" height="1105"'));
        assert.ok(feature.includes('class="presenter-landscape"'));
        assert.ok(feature.includes(`<figcaption>${product.presenterCaption[lang]}</figcaption>`));
        assert.ok(feature.includes(lang === 'es' ? 'Ver kit en Terez &amp; Honor' : 'View set at Terez &amp; Honor'));
        assert.ok(feature.includes(lang === 'es' ? 'Podemos recibir una comisión' : 'We may earn a commission'));
        assert.ok(!/elimina|removes|\$|MXN|USD/.test(feature));
        assert.equal(feature.includes('<h1>'), pathname.startsWith('/producto/'));
      }
    }
  } finally { await server.close(); delete globalThis.location; delete globalThis.localStorage; }
});
