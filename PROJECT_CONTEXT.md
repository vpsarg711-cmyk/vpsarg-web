# PROJECT_CONTEXT — VPS ARG Web

Sitio estático HTML/CSS/JS de VPS ARG, desplegado en Netlify. Contiene Inicio, Servicios, Compras, Renovaciones, Prueba gratis, Revendedores/COINS, Curso ADM Redes VPN, Academia, Descargas, Soporte y estados de pago.

## Decisiones vigentes
- Lema: “Fácil, simple, rápido y sin preocupaciones”.
- Los CTA de compra llevan a Compras; no mostrar Planes como sección principal.
- Curso ADM Redes VPN es independiente de Academia; su primera clase es pública y la inscripción se consulta por WhatsApp.
- Academia contiene tutoriales de mantenimiento, configuración, conexiones y paneles de revendedores.
- Header: logo a la izquierda, menú hamburguesa a la derecha y Contactar dentro del menú.
- El menú se cierra al tocar fuera, elegir un enlace o presionar Escape.
- Diseño responsive para celulares, tablets, netbooks, notebooks y escritorio.

## Tecnologías
HTML, CSS compartido en `assets/site.css`, JavaScript compartido en `js/app.js`, hosting Netlify. Backend VPS ARG externo separado; no modificado.

## Límites de verificación
No se han probado pagos ni operaciones reales en este cambio. La modificación actual es frontend y no altera endpoints ni contratos API.
