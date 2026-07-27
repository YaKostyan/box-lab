import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = join(projectRoot, 'dist');
const outputPaths = [
  join(projectRoot, 'TOFFIPACKS-OPEN-ME.html'),
  join(projectRoot, 'BOX-LAB-OPEN-ME.html'),
];

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
const logo = await readFile(join(distRoot, 'toffipacks-logo.webp'));
const faviconData = `data:image/svg+xml;base64,${favicon.toString('base64')}`;
const logoData = `data:image/webp;base64,${logo.toString('base64')}`;
const bundledStylesheet = `<style>${css}</style>`;
const bundledJavascript = javascript
  .replaceAll('./toffipacks-logo.webp', logoData)
  .replaceAll('/toffipacks-logo.webp', logoData)
  .replace(/<\/script/gi, '<\\/script');
const bundledScript = `<script type="module">${bundledJavascript}</script>`;

html = html
  .replace(stylesheetTag[0], () => bundledStylesheet)
  .replace(scriptTag[0], () => bundledScript)
  .replace(/href="\.\/favicon\.svg"/, () => `href="${faviconData}"`)
  .replace(
    '<title>',
    '<!-- Відкрийте цей файл подвійним кліком: інсталяція не потрібна. --><title>',
  );

for (const outputPath of outputPaths) {
  await writeFile(outputPath, html, 'utf8');
  console.log(`Standalone file created: ${outputPath}`);
}
