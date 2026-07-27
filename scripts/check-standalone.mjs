import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const file = resolve('TOFFIPACKS-OPEN-ME.html');
const html = await readFile(file, 'utf8');
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const scriptMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/);

if (!styleMatch) throw new Error('Bundled stylesheet was not found in the standalone HTML.');
if (!scriptMatch) throw new Error('Bundled application script was not found in the standalone HTML.');
if (/<(?:script|link)\b[^>]*(?:src|href)="[^"]*assets\//.test(html)) {
  throw new Error('Standalone HTML still references an external build asset.');
}
if (html.includes('toffipacks-logo.webp')) {
  throw new Error('Standalone HTML still references an external logo asset.');
}

new Function(scriptMatch[1]);

for (const marker of [
  'TOFFIPACKS',
  'toffipacks-demo-orders-v1',
  'data-select-product',
  'calculator-card',
  'admin-page',
  'Демо-прототип',
]) {
  if (!html.includes(marker)) throw new Error(`Missing marker: ${marker}`);
}

console.log(`Standalone bundle check passed: ${file}`);
