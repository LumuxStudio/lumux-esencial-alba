import sharp from 'sharp';
import {readFile} from 'node:fs/promises';
const source=await readFile('public/favicon.svg','utf8');
// Resolve semantic SVG tokens before rasterizing; the browser SVG retains its palette variables.
const palette=Object.fromEntries(Array.from(source.matchAll(/--(color-[a-z-]+):([^;}]+)/g),match=>[match[1],match[2]]));
const resolved=source.replace(/var\(--(color-[a-z-]+)\)/g,(_,name)=>palette[name]);
await sharp(Buffer.from(resolved)).resize(32,32).png().toFile('public/favicon-32.png');
await sharp(Buffer.from(resolved)).resize(180,180).png().toFile('public/apple-touch-icon.png');
console.log('Iconos ALBA actualizados.');
