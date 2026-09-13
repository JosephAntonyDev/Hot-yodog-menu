import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync('dist/index.html','utf8');
for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  if(ref.startsWith('#'))assert(html.includes(`id="${ref.slice(1)}"`));
  else if(ref.startsWith('https://'))assert.equal(new URL(ref).hostname,'www.bing.com');
  else assert(fs.existsSync(`dist/${ref}`),`Missing asset: ${ref}`);
}
for(const text of ['Tradicional','Combinado','horchata','Coca-Cola','6:30 p. m.','11:30 p. m.','Servicio a domicilio'])assert(html.includes(text),text);
assert.equal((html.match(/class="price"/g)||[]).length,4);
assert(html.includes('Carretera Villaflores entre 14 y 15 Oriente Sur'));
assert(html.includes('Tuxtla Gutiérrez, México, 29080'));
assert.equal((html.match(/data-address-line/g)||[]).length,2);
assert(html.includes('35 pesos')&&html.includes('45 pesos')&&html.includes('25 pesos'));
const css=fs.readFileSync('dist/menu.css','utf8');
for(const [,ref] of css.matchAll(/url\('([^']+)'\)/g))assert(fs.existsSync(`dist/${ref}`));
assert(css.includes('max-width:600px')&&css.includes('grid-template-columns:1fr'));
const logo=fs.readFileSync('dist/assets/logo-principal.svg','utf8');
const inverse=fs.readFileSync('dist/assets/logo-rojo-blanco.svg','utf8');
const boundary=logo.indexOf('<g transform="translate(286 49)">');
assert(boundary>0);
assert.equal(inverse.slice(0,boundary),logo.slice(0,boundary),'Mascot colors must not change with lettering');
assert.equal((inverse.slice(0,boundary).match(/#A9322A/g)||[]).length,2,'Keep red nose and sausage');
assert(!inverse.slice(boundary).includes('#A9322A'),'Inverse lettering must be white');
for(const theme of ['classic','red','white'])assert(html.includes(`data-theme="${theme}"`));
for(const name of ['clasico','rojo-blanco','blanco-rojo']){
 const png=fs.readFileSync(`dist/downloads/menu-${name}.png`);
 assert.equal(png.readUInt32BE(16),1080);
 assert.equal(png.readUInt32BE(20),1920);
}
const white=fs.readFileSync('dist/downloads/menu-blanco-rojo.svg','utf8');
assert(white.includes('<rect width="1080" height="1920" fill="#FFFFFF"/>'));
assert(white.includes('height="216" rx="12" fill="#A9322A"'));
console.log('Verified: menu content, links, assets, responsive rules, 3 themes, 1080×1920 PNGs, white background/red promo, and unchanged mascot colors.');
