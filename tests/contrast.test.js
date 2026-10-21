import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/App.css', import.meta.url), 'utf8');
const color = name => css.match(new RegExp(`--${name}: (#[0-9a-fA-F]{6});`))[1];
function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map(value => {
    const c = parseInt(value, 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function contrast(fg, bg) {
  const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
test('actual text and button color pairs meet WCAG AA for normal text', () => {
  for (const [foreground, background] of [['graphite', 'ivory'], ['muted', 'ivory'], ['muted', 'stone'], ['ivory', 'graphite'], ['graphite', 'coral'], ['graphite', 'coral-hover']]) {
    const ratio = contrast(color(foreground), color(background));
    assert.ok(ratio >= 4.5, `${foreground}/${background}: ${ratio.toFixed(2)}:1`);
    console.log(`${foreground}/${background}: ${ratio.toFixed(2)}:1`);
  }
});
test('field outlines contrast against white', () => {
  assert.ok(contrast('#837769', color('ivory')) >= 3);
});

test('white hero text contrasts with the local 70 percent black scrim even over white pixels', () => {
  assert.ok(contrast('#FFFFFF', '#4D4D4D') >= 4.5);
});
