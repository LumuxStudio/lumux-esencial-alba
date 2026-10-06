# Dirección visual — ALBA

ALBA es una clínica ficticia de atención integral. El sitio debe transmitir claridad y serenidad, con una navegación sencilla y espacio para leer. No presenta médicos, testimonios, métricas ni servicios confirmados de una institución real.

La referencia principal fue [Reckoner](https://reckoner.com/): jerarquía clara, presencia institucional y espacios generosos. [Leome & Partners](https://leome-and-partners.com/) y [NexStudio](https://nexstudio.tech/) aportan referencias de proporción y disciplina tipográfica. Sus textos, fotografías y composición no se reproducen.

## Composición propia

- **Split Studio**: portada con claim amplio y fotografía editorial vertical. Una pareja de atención y explicación recorre el sitio, con la primera visita invertida en escritorio.
- **N6 masthead**: marca central, descriptor, enlace de conversación y banda de navegación. El menú móvil conserva la organización mediante un disclosure nativo.
- **Ft1 colophon**: marca y frase en una banda, enlaces esenciales y nota de demostración.
- Siete bloques: inicio, índice de atención, primera visita, principios, ambiente, preguntas y contacto.
- El índice de atención sustituye una fila de tarjetas. Los valores se presentan como definiciones abiertas; las preguntas permanecen en el mismo documento.

## Sistema

Manrope lleva títulos y lectura. Los encabezados son rectos. Blanco frío, azul petróleo y un acento cobalto pequeño viven en `tokens.css`. Los colores, fuentes y medidas de la interfaz referencian tokens. El símbolo de cinco pétalos con centro se dibuja en SVG y se exporta a iconos de navegador.

El movimiento utiliza un solo IntersectionObserver y entradas de 10 px / 0.32 s para títulos e introducciones. La opacidad empieza en 0.78, con texto ya legible; el umbral de entrada es cero y no hay esperas ni secuencias que retrasen la lectura. Cada elemento deja de observarse tras su primera entrada. Las fotografías y los contenedores grandes permanecen estáticos. GSAP aplica únicamente estas transiciones breves: no hay trabajo asociado a eventos de scroll, pinning, parallax, Three.js, Lenis ni un bucle propio de render.

La primera visita integra `CareDrawing.astro`, una figura semántica con los cinco pétalos de la identidad ALBA alrededor de la persona representada por el centro. Los trazos se dibujan una vez en 0.66 s y no se repiten al volver a la sección. Se conservan título y descripción accesibles; el SVG se presenta completo sin JavaScript. Con movimiento reducido no se animan textos ni pétalos. Cambiar esa preferencia durante una entrada detiene la animación y restaura la figura y el texto completos.

Atención y FAQ emplean grupos exclusivos independientes con el atributo nativo `name`: `alba-attention` y `alba-faq`. El menú no comparte un grupo de contenido. Este comportamiento de cierre mutuo está definido por el [estándar HTML para details](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element); no exige recalcular alturas ni refrescar un motor de scroll al abrir contenido.

La inspección previa encontró entradas de 0.5 s desde opacidad cero y transformaciones de figuras fotográficas completas; no había interceptación del scroll ni listeners de scroll. Esas entradas se sustituyeron para reducir la demora perceptual y el alcance de la animación. Esta observación de código no equivale a un perfil de rendimiento de dispositivos físicos.

## Verificación

La construcción valida contenido Zod, imágenes locales e iconos. El contrato rechaza enlaces ejecutables, imágenes remotas, HTML en texto editable, IDs duplicados y enlaces a secciones ausentes. Los pares de texto principales superan 4.5:1 según la conversión de tokens a luminancia WCAG documentada en `CONTRAST.json`.

Las comprobaciones de navegador para móvil, tablet y escritorio se realizan por el agente principal. Este documento no afirma pruebas de dispositivos físicos.
