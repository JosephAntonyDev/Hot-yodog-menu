// Optional local authoring tool. The deployed menu has no Node dependencies.
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {makeText} from "../hot-yo'dog_landing/src/brand/outline.mjs";
const require=createRequire(new URL("../hot-yo'dog_landing/package.json",import.meta.url));
const sharp=require('sharp'),ot=require('opentype.js');
const font=name=>{const b=fs.readFileSync(`dist/assets/${name}`);return ot.parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));};
const displayFont=font('LilitaOne-Regular.ttf'),bodyFont=font('DMSans.ttf');
const text=makeText(displayFont,bodyFont);
const html=fs.readFileSync('dist/index.html','utf8');
const phone=html.match(/data-phone>([^<]+)</)?.[1];
if(!phone)throw Error('Missing phone');
const addressLines=[...html.matchAll(/<span data-address-line>(.*?)<\/span>/g)].map(([,line])=>line);
if(addressLines.length!==2)throw Error('Expected two address lines in the menu.');
const items=[...html.matchAll(/<article class="menu-item"><div class="item-line"><h3>(.*?)<\/h3><span class="price"[^>]*>(.*?)<\/span><\/div><p>(.*?)<\/p><\/article>/g)].map(([,name,price,detail])=>({name,price,detail}));
if(items.length!==4)throw Error('Expected four menu items; review export layout when menu changes.');
const logo=fs.readFileSync('dist/assets/logo-principal.svg','utf8');
// Recolor only lettering; preserve the entire mascot, including its red details.
const letteringStart=logo.indexOf('<g transform="translate(286 49)">');
if(letteringStart<0)throw Error('Logo structure changed; review lettering boundary before export.');
const whiteLetterLogo=logo.slice(0,letteringStart)+logo.slice(letteringStart).replaceAll('#A9322A','#FFFFFF');
fs.mkdirSync('dist/downloads',{recursive:true});
for(const theme of ['classic','red','white']){
 const red=theme==='red';
 const bg=red?'#A9322A':theme==='white'?'#FFFFFF':'#FFF5DF',ink=red?'#FFFFFF':'#25231F',accent=red?'#FFFFFF':'#A9322A';
 const t=(s,x,y,size,color=ink,face='body',max=920,align='left')=>{
   if(align==='right'){
     const f=face==='display'?displayFont:bodyFont;
     const units=Array.from(s.normalize('NFC')).reduce((n,c)=>n+(f.charToGlyph(c).advanceWidth||0),0);
     const width=Math.min(units*size/f.unitsPerEm,max);
     return text(s,x-width,y,size,color,'left',face,max);
   }
   return text(s,x,y,size,color,align,face,max);
 };
 const line=y=>`<path d="M80 ${y}H1000" stroke="${ink}" stroke-opacity=".3" stroke-width="2"/>`;
 let body=`<rect width="1080" height="1920" fill="${bg}"/>`;
 if(!red)body+=`<rect x="42" y="160" width="996" height="1720" rx="8" fill="none" stroke="${theme==='white'?'#DDDDDD':'#D9CBB5'}" stroke-width="2"/>`;
 body+=`<g transform="translate(80 205) scale(.85)">${(red?whiteLetterLogo:logo).replace(/<svg[^>]*>|<\/svg>/g,'')}</g>`;
 body+=t('NUESTRA CARTA',80,515,24,accent)+t('¿Qué se te antoja?',80,590,72,ink,'display');
 body+=line(627)+t('HOT YO’DOGS',80,685,31,accent,'body');
 const row=(item,y)=>t(item.name,80,y,45,ink,'display',750)+t(item.price,1000,y,48,accent,'display',150,'right')+t(item.detail,80,y+47,27,ink,'body',890);
 body+=row(items[0],750)+row(items[1],867);
 body+=line(940)+t('PARA ACOMPAÑAR',80,999,31,accent)+row(items[2],1065)+row(items[3],1178);
 const promoBg=red?'#FFFFFF':'#A9322A',promoInk=red?'#A9322A':'#FFFFFF';
 body+=`<rect x="80" y="1266" width="920" height="216" rx="12" fill="${promoBg}"/>`;
 body+=t('PROMOCIÓN ESPECIAL',108,1308,24,promoInk)+t('Hot dog + Coca-Cola de vidrio',108,1365,41,promoInk,'display',660)+t('Tradicional o combinado',108,1411,29,promoInk,'body',650)+t('Incluye una Coca-Cola de vidrio.',108,1447,25,promoInk,'body',650)+t('$75',970,1392,83,promoInk,'display',200,'right');
 body+=t('PEDIDOS POR WHATSAPP',80,1530,25,accent)+t(phone,80,1585,49,accent,'display');
 body+=t('Lunes a domingo · 6:30 p. m. — 11:30 p. m.',80,1641,29,ink);
 body+=t('Envío a domicilio con costo extra según ubicación.',80,1688,25,ink);
 body+=line(1720)+t('ENCUÉNTRANOS AQUÍ',80,1760,24,accent);
 addressLines.forEach((address,i)=>{body+=t(address,80,1800+i*38,27,ink,'body');});
 body+=t('Precios en MXN.',80,1865,20,ink);
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">${body}</svg>`;
 const name=red?'menu-rojo-blanco':theme==='white'?'menu-blanco-rojo':'menu-clasico';
 fs.writeFileSync(`dist/downloads/${name}.svg`,svg);
 await sharp(Buffer.from(svg)).png().toFile(`dist/downloads/${name}.png`);
 await sharp(Buffer.from(svg)).resize(324,576).webp({quality:85}).toFile(`dist/downloads/${name}-preview.webp`);
}
// White lettering for the red website; the illustration keeps its own palette.
fs.writeFileSync('dist/assets/logo-rojo-blanco.svg',whiteLetterLogo);
console.log('Three outlined menus exported at 1080 × 1920 px, with lightweight previews.');
