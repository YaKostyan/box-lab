import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = join(projectRoot, 'dist');
const outputPath = join(projectRoot, 'BOX-LAB-OPEN-ME.html');

let html = await readFile(join(distRoot, 'index.html'), 'utf8');
const stylesheetTag = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
const scriptTag = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/);

if (!stylesheetTag || !scriptTag) {
  throw new Error('Built CSS or JavaScript entry was not found in dist/index.html.');
}

const assetPath = (value) => join(distRoot, value.replace(/^\.\//, '').replace(/^\//, ''));
const css = await readFile(assetPath(stylesheetTag[1]), 'utf8');
const javascript = await readFile(assetPath(scriptTag[1]), 'utf8');
const favicon = await readFile(join(distRoot, 'favicon.svg'));
const faviconData = `data:image/svg+xml;base64,${favicon.toString('base64')}`;
const bundledStylesheet = `<style>${css}</style>`;
const bundledScript = `<script type="module">${javascript.replace(/<\/script/gi, '<\\/script')}</script>`;

html = html
  .replace(stylesheetTag[0], () => bundledStylesheet)
  .replace(scriptTag[0], () => bundledScript)
  .replace(/href="\.\/favicon\.svg"/, () => `href="${faviconData}"`)
  .replace('<title>', '<!-- Відкрийте цей файл подвійним кліком: інсталяція не потрібна. --><title>');

await writeFile(outputPath, html, 'utf8');
console.log(`Standalone file created: ${outputPath}`);
