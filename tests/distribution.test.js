import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { categories, products, resolvePage } from '../src/data/catalog.js';

test('compact listings, distinct category guides and internal destinations in both languages', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx');
    for (const lang of ['es', 'en']) {
      globalThis.localStorage = { getItem: () => lang };
      const render = pathname => {
        globalThis.location = { pathname, search: '' };
        return renderToStaticMarkup(React.createElement(App));
      };
      const pages = new Map(['/', '/tienda', ...categories.map(c => `/${c.id}`), ...products.map(p => `/producto/${p.slug}`), '/rutinas-y-guias', '/hamburgueso', '/sobre-gritskin'].map(path => [path, render(path)]));
      for (const path of ['/tienda', ...categories.map(category => `/${category.id}`)]) {
        const html = pages.get(path);
        const expected = products.filter(product => path === "/tienda" || path === `/${product.category}`);
        assert.equal((html.match(/class="product-card"/g) || []).length, expected.length, path);
        assert.ok(!html.includes('class="dermforce-feature"'), 'full descriptions stay on detail pages');
        assert.ok(!html.includes('class="product-editorial"'));
        for (const product of expected) {
          assert.equal(html.split(`id="${product.slug}"`).length - 1, 1);
          assert.ok(html.includes(`href="/producto/${product.slug}"`));
        }
      }
      assert.ok(!pages.get('/').includes('role="search"'));
      assert.ok(!pages.get('/').includes('class="product-card"'));
      assert.ok(!pages.get('/').includes('id="catalogo"'));
      assert.ok(!pages.get('/').includes(lang === 'es' ? 'EL CATÁLOGO GRIT' : 'THE GRIT CATALOG'));
      assert.ok(pages.get('/').indexOf('id="categorias"') < pages.get('/').indexOf('id="marcas-inicio"'));
      assert.ok(pages.get('/').includes('href="/tienda" class="button hero-secondary"'));
      for (const product of products) assert.ok(!pages.get('/').includes(`id="${product.slug}"`));
      assert.ok(pages.get('/tienda').includes('class="category-navigation"'));
      const guides = new Set();
      for (const category of categories) {
        const html = pages.get(`/${category.id}`);
        assert.ok(html.includes(`src="${category.image}"`));
        if (category.id === 'skin-care') continue;
        assert.ok(!html.includes('class="empty-state"'));
        const guide = html.match(/<h2 id="category-guide-title">(.*?)<\/h2>/)?.[1];
        assert.ok(guide);
        guides.add(guide);
      }
      assert.equal(guides.size, 3);
      for (const product of products) {
        const detail = pages.get(`/producto/${product.slug}`);
        assert.ok(detail.includes('class="dermforce-feature"'));
        assert.ok(detail.includes('class="product-editorial"'));
        assert.ok(detail.includes(product.presenter || '/images/hamburgueso/hamburgueso-presentando.png'));
      }
      for (const [path, html] of pages) {
        const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
        assert.equal(new Set(ids).size, ids.length, `duplicate section IDs: ${path}`);
        for (const [, href] of html.matchAll(/href="([/#][^"]*)"/g)) {
          if (href.startsWith('/images/')) continue;
          const url = new URL(href.replaceAll('&amp;', '&'), `http://localhost${path}`);
          assert.notEqual(resolvePage(url.pathname).type, 'missing', href);
          if (url.hash) assert.ok(pages.get(url.pathname)?.includes(`id="${url.hash.slice(1)}"`), `missing anchor ${href} from ${path}`);
        }
      }
    }
  } finally { await server.close(); delete globalThis.location; delete globalThis.localStorage; }
});
