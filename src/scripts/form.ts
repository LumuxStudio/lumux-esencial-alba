import {site} from '../lib/content';

export function startForm(){
 const form=document.querySelector<HTMLFormElement>('[data-contact-form]');if(!form)return;
 const submit=form.querySelector<HTMLButtonElement>('[type=submit]')!;
 const status=form.querySelector<HTMLElement>('#form-status')!;
 const fields=['name','email','message'].map(id=>form.querySelector<HTMLInputElement|HTMLTextAreaElement>(`#${id}`)!);
 const abort=new AbortController();const signal=abort.signal;const touched=new Set<string>();
 const validate=(field:HTMLInputElement|HTMLTextAreaElement)=>{
  const value=field.value.trim();let error='';
  if(!value)error=field.id==='name'?'Escribe tu nombre para identificar la solicitud.':field.id==='email'?'Escribe un correo para completar la solicitud.':'Escribe una pregunta sobre la coordinación de la atención.';
  else if(field.id==='email'&&!field.validity.valid)error='Revisa el correo: usa el formato nombre@dominio.com.';
  else if(field.id==='message'&&value.length<10)error='Añade un poco más de detalle: al menos 10 caracteres.';
  field.setAttribute('aria-invalid',String(Boolean(error)));document.getElementById(`${field.id}-error`)!.textContent=error;return !error;
 };
 fields.forEach(field=>{field.addEventListener('blur',()=>{touched.add(field.id);validate(field);},{signal});field.addEventListener('input',()=>{if(touched.has(field.id))validate(field);status.textContent='';delete status.dataset.state;delete form.dataset.state;},{signal});});
 submit.disabled=false;submit.setAttribute('aria-disabled','false');
 form.addEventListener('submit',event=>{
  event.preventDefault();const result=fields.map(field=>{touched.add(field.id);return validate(field);});
  if(result.some(ok=>!ok)){form.dataset.state='error';status.dataset.state='error';status.textContent='Revisa los campos indicados antes de continuar.';fields[result.indexOf(false)].focus();return;}
  form.dataset.state='loading';form.setAttribute('aria-busy','true');submit.disabled=true;submit.setAttribute('aria-disabled','true');submit.textContent='Revisando solicitud…';
  requestAnimationFrame(()=>{form.dataset.state='success';form.removeAttribute('aria-busy');status.dataset.state='success';status.textContent=site.contact.success;submit.disabled=false;submit.setAttribute('aria-disabled','false');submit.textContent=site.contact.submit;});
 },{signal});
 document.querySelectorAll<HTMLAnchorElement>('[data-service]').forEach(link=>link.addEventListener('click',()=>{const interest=form.querySelector<HTMLSelectElement>('#interest');if(interest)interest.value=link.dataset.service!;},{signal}));
 window.addEventListener('pagehide',()=>abort.abort(),{once:true});
}
