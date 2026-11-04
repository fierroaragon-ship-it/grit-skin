import test from 'node:test';
import assert from 'node:assert/strict';
import { observeCardEntrances } from '../src/cardMotion.js';

function fixture(reduced = false) {
  const animations = [], observers = [], listeners = new Set();
  const preference = { matches: reduced, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) };
  const card = { matches: () => false, animate: () => {
    let resolve;
    const animation = { finished: new Promise(done => { resolve = done; }), cancel: () => { animation.cancelled = true; resolve(); } };
    animations.push(animation);
    return animation;
  } };
  class Observer {
    constructor(callback) { this.callback = callback; this.observed = new Set(); observers.push(this); }
    observe(card) { this.observed.add(card); }
    unobserve(card) { this.observed.delete(card); }
    disconnect() { this.observed.clear(); }
    enter(card, isIntersecting = true) { this.callback([{ target: card, isIntersecting }]); }
  }
  const root = { querySelectorAll: () => [card] };
  const environment = { matchMedia: () => preference, IntersectionObserver: Observer };
  return { root, environment, card, animations, observers, listeners, preference, change: reduced => { preference.matches = reduced; for (const fn of listeners) fn(); } };
}

test('cards animate once when entering, including observer recreation after filtering', () => {
  const f = fixture(), seen = new WeakSet();
  let cleanup = observeCardEntrances(f.root, seen, f.environment);
  f.observers[0].enter(f.card, false);
  assert.equal(f.animations.length, 0);
  f.observers[0].enter(f.card);
  f.observers[0].enter(f.card);
  assert.equal(f.animations.length, 1);
  assert.ok(!f.observers[0].observed.has(f.card));
  cleanup();
  cleanup = observeCardEntrances(f.root, seen, f.environment);
  assert.ok(!f.observers[1].observed.has(f.card));
  cleanup();
  assert.equal(f.listeners.size, 0);
});

test('reduced motion blocks entrance and cancels motion immediately when preference changes', () => {
  const f = fixture(true);
  const cleanup = observeCardEntrances(f.root, new WeakSet(), f.environment);
  assert.equal(f.observers.length, 0);
  f.change(false);
  f.observers[0].enter(f.card);
  f.change(true);
  assert.equal(f.animations[0].cancelled, true);
  assert.equal(f.observers[0].observed.size, 0);
  f.change(false);
  assert.equal(f.observers[1].observed.size, 0, 'already seen card never replays');
  cleanup();
});

test('keyboard focus and unavailable browser APIs keep cards static', () => {
  const f = fixture();
  f.card.matches = () => true;
  const cleanup = observeCardEntrances(f.root, new WeakSet(), f.environment);
  f.observers[0].enter(f.card);
  assert.equal(f.animations.length, 0);
  cleanup();
  assert.doesNotThrow(() => observeCardEntrances(f.root, new WeakSet(), {})());
  delete f.card.animate;
  f.card.matches = () => false;
  const next = observeCardEntrances(f.root, new WeakSet(), f.environment);
  assert.doesNotThrow(() => f.observers[1].enter(f.card));
  next();
});
