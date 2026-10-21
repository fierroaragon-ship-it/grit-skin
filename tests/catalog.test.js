import test from 'node:test';
import assert from 'node:assert/strict';
import { categories, products, availableNeeds, filterProducts, resolvePage, externalUrl, host } from '../src/data/catalog.js';
const sample = [{ slug: 'test', category: 'skin-care', name: { es: 'Cuidado básico', en: 'Basic care' }, description: { es: 'Descripción de prueba', en: 'Test description' }, store: 'Test store', features: { es: ['Práctico'], en: ['Practical'] } }];
test('all independent routes resolve, including trailing slash and unavailable products', () => {
  assert.equal(resolvePage('/').type, 'home');
  assert.equal(resolvePage('/hamburgueso/').type, 'host');
  assert.equal(resolvePage('/sobre-gritskin/').type, 'about');
  assert.equal(resolvePage('/rutinas-y-guias/').type, 'guides');
  for (const c of categories) assert.equal(resolvePage(`/${c.id}`).category.id, c.id);
  assert.deepEqual(resolvePage('/producto/test'), { type: 'product', slug: 'test' });
  assert.equal(resolvePage('/otra-pagina').type, 'missing');
  assert.equal(resolvePage('/producto/test/extra').type, 'missing');
});
test('search supports accents, store, features and both languages', () => {
  for (const query of ['BASICO', 'practico', 'test store', '  cuidado  ']) assert.equal(filterProducts(sample, { query }).length, 1);
  assert.equal(filterProducts(sample, { query: 'practical' }, 'en').length, 1);
  assert.equal(filterProducts(sample, { query: 'missing' }).length, 0);
});
test('category and search combine without mutating data', () => {
  assert.equal(filterProducts(sample, { query: 'cuidado', category: 'grooming' }).length, 0);
  assert.equal(filterProducts(sample, { query: 'cuidado', category: 'skin-care' }).length, 1);
  assert.equal(sample.length, 1);
});
test('empty confirmed catalog and approved host image', () => {
  assert.deepEqual(products, []);
  assert.deepEqual(filterProducts(products, { query: 'anything' }), []);
  assert.equal(host.image, '/images/hamburgueso/hamburgueso-presentando.png');
});
test('purchase links reject executable and invalid protocols', () => {
  for (const value of ['javascript:alert(1)', 'data:text/html,test', '/relative', '', undefined]) assert.equal(externalUrl(value), null);
  assert.equal(externalUrl('https://example.com/item'), 'https://example.com/item');
});

test('need shortcuts require supporting products and are scoped by category', () => {
  const need = { id: 'test-need', label: { es: 'Necesidad de prueba', en: 'Test need' } };
  const items = [{ ...sample[0], needs: [need] }, { ...sample[0], needs: [need] }];
  assert.deepEqual(availableNeeds([]), []);
  assert.deepEqual(availableNeeds(items), [need]);
  assert.deepEqual(availableNeeds(items, 'grooming'), []);
  assert.equal(filterProducts(items, { need: need.id }).length, 2);
  assert.equal(filterProducts(items, { need: 'unsupported' }).length, 0);
  assert.equal(filterProducts(sample, { need: need.id }).length, 0);
});
