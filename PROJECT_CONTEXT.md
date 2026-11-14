# PROJECT_CONTEXT — VPS ARG Web

## Objetivo
Sitio web de VPS ARG para presentar servicios de conectividad, facilitar compras y renovaciones, ofrecer pruebas, administrar el acceso de revendedores/COINS, publicar tutoriales y presentar el Curso ADM Redes VPN.

## Tecnologías verificadas en esta entrega
- Frontend estático: HTML, CSS y JavaScript.
- Hojas de estilo: `assets/site.css`.
- JavaScript compartido: `js/app.js`.
- Publicación de prueba: Netlify (el usuario confirmó que ya publicó una versión de prueba).
- Backend externo: existe un backend VPS ARG separado. Su contrato y estado operativo no fueron auditados durante esta modificación.

## Estructura funcional verificada
- Inicio: `index.html`
- Servicios: `servicios.html`
- Compras: `compras.html`
- Renovaciones: `renovaciones.html`
- Prueba gratis: `pruebas.html`
- Revendedores/COINS: `coins.html`
- Curso ADM Redes VPN: `curso-vpn.html`
- Academia de tutoriales: `academia.html`
- Descargas: `descargas.html`
- Soporte: `soporte.html`
- Páginas de resultado de pago: `pago-exitoso.html`, `pago-fallido.html`, `pago-pendiente.html`

## Decisiones aprobadas
- El lema principal es “Fácil, simple, rápido y sin preocupaciones”.
- No mostrar Planes como sección independiente; los CTA de compra deben dirigir a Compras.
- El curso se denomina “Curso ADM Redes VPN”, es independiente de Academia, tiene una primera clase pública y consultas/inscripción por WhatsApp.
- Academia se reserva para tutoriales de servicios, mantenimiento, configuraciones, conexiones y paneles para revendedores.
- VEXA debe ser un elemento de presentación contenido, no un fondo gigante detrás de los videos.
- Diseño adaptable a celulares, tablets, netbooks, notebooks y escritorio.
- Header: logo a la izquierda; menú hamburguesa al extremo derecho; Contactar dentro del menú.

## Límites de conocimiento
- No se inspeccionó el backend ni la base de datos para esta modificación.
- No se verificó el funcionamiento real de pagos, renovaciones, pruebas ni COINS en un entorno publicado.
- No se afirma que las integraciones estén operativas por el solo hecho de conservar el JavaScript.
