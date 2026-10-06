import {z} from 'zod';
import raw from '../content/site.es.json';
const text=z.string().trim().min(1).max(1500).refine(v=>!/<[^>]+>/.test(v),'Solo texto plano');
const image=z.string().regex(/^\/images\/[a-z0-9-]+\.webp$/);
const section=z.enum(['inicio','atencion','primera-visita','forma','espacio','preguntas','contacto']);
const link=z.object({label:text,href:z.string().regex(/^#[a-z-]+$/)});
const block=z.object({title:text,text});
export const contentSchema=z.object({
 brand:z.object({name:text,descriptor:text,tagline:text}),seo:z.object({title:text,description:text}),
 nav:z.array(link).min(1).max(5),sections:z.array(section).min(5).max(7),
 hero:z.object({label:text,lines:z.array(text).min(1).max(4),text,cta:link,secondary:link,image,alt:text,caption:text}),
 attention:block.extend({items:z.array(z.object({id:z.string().regex(/^[a-z-]+$/),title:text,text,detail:text})).min(1).max(6)}),
 visit:block.extend({steps:z.array(z.object({label:text,title:text,text})).min(1).max(5),note:text}),
 approach:block.extend({values:z.array(z.object({title:text,text})).min(1).max(6)}),
 space:block.extend({image,alt:text,caption:text}),faq:block.extend({items:z.array(z.object({question:text,answer:text})).min(1).max(8)}),
 contact:block.extend({email:z.string().email(),note:text,messageNote:text,submit:text,success:text}),footer:z.object({text,legal:text})
}).superRefine((value,ctx)=>{
 if(new Set(value.sections).size!==value.sections.length)ctx.addIssue({code:'custom',message:'Secciones repetidas'});
 if(value.sections[0]!=='inicio'||value.sections.at(-1)!=='contacto')ctx.addIssue({code:'custom',message:'Conserva inicio y contacto como extremos'});
 for(const item of [...value.nav,value.hero.cta,value.hero.secondary])if(!value.sections.includes(item.href.slice(1) as z.infer<typeof section>))ctx.addIssue({code:'custom',message:'Enlace a sección ausente: '+item.href});
 if(new Set(value.attention.items.map(item=>item.id)).size!==value.attention.items.length)ctx.addIssue({code:'custom',message:'Cada atención necesita un ID distinto'});
});
export const site=contentSchema.parse(raw);
