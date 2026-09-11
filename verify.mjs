import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync('dist/index.html','utf8');
for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  if(ref.startsWith('#'))assert(html.includes(`id="${ref.slice(1)}"`));
  else assert(fs.existsSync(`dist/${ref}`),`Missing asset: ${ref}`);
}
for(const text of ['Tradicional','Combinado','horchata','Coca-Cola','6:30 p. m.','11:30 p. m.','Servicio a domicilio'])assert(html.includes(text),text);
assert.equal((html.match(/class="price"/g)||[]).length,4);
assert(html.includes('35 pesos')&&html.includes('45 pesos')&&html.includes('25 pesos'));
const css=fs.readFileSync('dist/menu.css','utf8');
for(const [,ref] of css.matchAll(/url\('([^']+)'\)/g))assert(fs.existsSync(`dist/${ref}`));
assert(css.includes('max-width:600px')&&css.includes('grid-template-columns:1fr'));
console.log('Verified: 4 items, supplied prices and hours, promotion, internal links, local assets and responsive rules.');
