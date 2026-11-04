import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { products, externalUrl } from '../src/data/catalog.js';

const affiliate = 'https://www.awin1.com/cread.php?awinmid=110224&awinaffid=3132227&ued=https%3A%2F%2Fterezandhonor.com%2Fes%2Fproducts%2Fdermforce-face-cream';
test('Dermforce preserves exact deep link and has no unverified price or reviews', () => {
  assert.equal(products[0].url, affiliate);
  assert.equal(externalUrl(products[0].url), affiliate);
  assert.equal(products[0].price, undefined);
  assert.equal(products[0].rating, undefined);
  assert.equal(products[0].features.es.length, 3);
});
test('Dermforce detail preserves full content and presenter; catalog respects filters', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    globalThis.localStorage = { getItem: () => 'es' };
    const render = (pathname, search = '') => {
      globalThis.location = { pathname, search };
      return renderToStaticMarkup(React.createElement(App));
    };
    for (const pathname of ['/producto/dermforce-face-cream']) {
      const html = render(pathname);
      assert.equal((html.match(/id="dermforce-face-cream"/g) || []).length, 1);
      const expectedHref = `href="${affiliate.replaceAll('&', '&amp;')}" target="_blank" rel="sponsored noopener noreferrer"`;
      assert.equal(html.split(expectedHref).length - 1, 2, 'image and CTA share exact affiliate destination');
      assert.ok(html.includes('¿Qué trae y qué hace aquí?'));
      assert.ok(html.includes('Envío internacional a México. Consulta costos de envío y posibles cargos de importación.'));
      assert.ok(html.includes('Ver precio y comprar en Terez &amp; Honor'));
      assert.ok(html.includes('width="1500" height="2000"'));
      assert.ok(html.includes('class="dermforce-host"'));
      const photoLink = html.match(/<a class="dermforce-photo-frame"[\s\S]*?<\/a>/)[0];
      assert.ok(photoLink.includes('dermforce-face-cream-original.jpg'));
      assert.ok(!photoLink.includes('hamburgueso'), 'presenter is outside photo link/frame');
      assert.ok(html.includes('enlaces de afiliados'));
      assert.ok(!/\$24|USD|MXN|testimonios|estrellas/.test(html));
    }
    assert.ok(render('/tienda', '?q=bakuchiol&category=skin-care&need=hidratacion-facial').includes('id="dermforce-face-cream"'));
    assert.ok(!render('/tienda', '?q=no-existe').includes('id="dermforce-face-cream"'));
    assert.ok(!render('/tienda', '?category=grooming').includes('id="dermforce-face-cream"'));
  } finally { await server.close(); delete globalThis.location; delete globalThis.localStorage; }
});
