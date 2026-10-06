# ALBA · Clínica de atención integral

Proyecto independiente de Lumux Esencial. Marca ficticia y contenidos ilustrativos para presentar un concepto de clínica con una identidad sobria: blanco frío, tinta azul petróleo, acento cobalto y Manrope.

## Ejecutar

Requiere Node.js 22.12 o superior.

```sh
npm ci
npm run dev
```

La vista local utiliza el puerto **4335**.

```sh
npm test
npm run build
npm run preview
```

`dist/` contiene la salida estática. Puedes copiar esta carpeta fuera del workspace; no importa archivos de otros proyectos. El manifiesto, lockfile, configuración Astro, dependencias, fuentes, imágenes e iconos son propios.

## Editar

- `src/content/site.es.json`: marca, SEO, navegación, atención, primera visita, principios, ambiente, FAQ y contacto.
- `src/lib/content.ts`: contrato Zod; valida campos, enlaces, imágenes locales e IDs únicos.
- `tokens.css`: paleta, tipografía, medidas y foco.
- `src/styles/site.css`: composición exclusiva de ALBA.
- `src/pages/index.astro` y `src/components/`: estructura y elementos de interfaz.
- `public/images/`: fotografías WebP locales y variantes de 768 px.
- `src/components/Mark.astro`: símbolo vectorial de cinco pétalos con centro.
- `src/components/CareDrawing.astro`: versión semántica de los pétalos de cuidado en Primera visita; su pie utiliza la frase de marca del JSON.
- `public/favicon.svg`: icono independiente con su propia paleta semántica.

Para actualizar las variantes PNG tras editar el favicon:

```sh
npm run icons
```

El color de navegador está en `src/layouts/Layout.astro`. Los iconos se enlazan como SVG, PNG de 32 px y Apple Touch Icon de 180 px.

Hay siete bloques principales. Puedes ocultar las secciones opcionales en `sections`; conserva `inicio` y `contacto`, y actualiza los enlaces de navegación que apunten a secciones retiradas. El orden visual corresponde al archivo `index.astro`.

## Interacciones y movimiento

El desplazamiento es nativo. Las entradas esperan 160 ms después del último evento de rueda, tacto, teclado o scroll. Los listeners de rueda, tacto y scroll son pasivos y no alteran distancias ni bloquean el navegador. Al volver a desplazar, las animaciones activas se cancelan y se restauran inmediatamente. El texto mantiene su posición: solo cambia sutilmente de opacidad (0.9 a 1 durante 0.18 s) al detenerse; los SVG se trazan una vez durante 0.35–0.45 s. GSAP se carga bajo demanda después de la pausa. Las imágenes usan decodificación asíncrona. Pausa y movimiento reducido conservan el contenido visible. Cada proyecto contiene su propio controlador, sin dependencias entre plantillas.

Los cinco pétalos de cuidado se trazan una sola vez en Primera visita, durante 0.45 s en total. El centro permanece visible. El SVG tiene título y descripción accesibles; la figura completa está visible sin JavaScript. Movimiento reducido omite las entradas y el trazado, también si cambias esa preferencia con la página abierta. Al terminar se eliminan los estilos temporales. No hay fijaciones, parallax ni animación continua.

Atención y preguntas utilizan `details/summary` nativos con los nombres de grupo independientes `alba-attention` y `alba-faq`: al abrir un elemento se cierra el anterior de su grupo. Esta exclusividad funciona sin JavaScript en navegadores compatibles con `details name`; el menú queda separado. El menú móvil se cierra al elegir un enlace o pulsar Escape. El enlace de cada área selecciona el tema correspondiente en el formulario.

El formulario valida nombre, correo y un mensaje de coordinación localmente. Presenta errores asociados a los campos y un estado de revisión correcto. No realiza peticiones, no guarda datos y no confirma citas. Sin JavaScript el botón permanece deshabilitado y se explica la limitación. Su propósito es coordinar información general, sin datos clínicos.

## Recursos y comprobación

La licencia de Manrope está en `public/licenses/Manrope-OFL.txt`. Las fuentes fotográficas y licencias están en `docs/MEDIA_LICENSES.md`; el razonamiento visual está en `docs/DESIGN_NOTES.md` y los pares de contraste en `docs/CONTRAST.json`.

`npm run build` valida recursos y contenido, ejecuta la comprobación de TypeScript/Astro y genera el sitio. `npm test` comprueba el contrato editable. La revisión visual en navegador se documenta por separado al realizarla.
