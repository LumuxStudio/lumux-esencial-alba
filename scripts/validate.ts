import {existsSync} from 'node:fs';
import {site} from '../src/lib/content';
function assets(value:unknown){if(typeof value==='string'&&value.startsWith('/images/')&&!existsSync('public'+value))throw new Error('Imagen ausente: '+value);if(value&&typeof value==='object')Object.values(value).forEach(assets);}
assets(site);
for(const file of ['favicon.svg','favicon-32.png','apple-touch-icon.png'])if(!existsSync('public/'+file))throw new Error('Icono ausente: '+file);
console.log('ALBA: contenido y recursos locales verificados.');
