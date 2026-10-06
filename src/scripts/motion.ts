import {startIdleMotion} from './idle-motion';
export function startMotion(){
startIdleMotion('[data-enter],[data-care-motion]','[data-care-motion]','[data-care-petal]');
const menu=document.querySelector<HTMLDetailsElement>('.mobile-menu');
 menu?.addEventListener('click',event=>{if((event.target as Element).closest('a'))menu.open=false;});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.open){menu.open=false;menu.querySelector('summary')?.focus();}});
}
