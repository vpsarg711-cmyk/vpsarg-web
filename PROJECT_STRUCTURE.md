# PROJECT_STRUCTURE — VPS ARG Web

## Archivos raíz
- `index.html`: inicio.
- `servicios.html`: catálogo de servicios y acceso al curso.
- `compras.html`: flujo/página de compras.
- `renovaciones.html`: renovación de servicios.
- `pruebas.html`: prueba gratuita.
- `coins.html`: revendedores y COINS.
- `curso-vpn.html`: página independiente Curso ADM Redes VPN.
- `academia.html`: biblioteca de tutoriales.
- `descargas.html`: descargas.
- `soporte.html`: soporte.
- `pago-exitoso.html`, `pago-fallido.html`, `pago-pendiente.html`: estados de pago.
- `planes.html`: archivo aún presente en el ZIP; no debe volver a aparecer como sección principal sin decisión explícita.
- `_headers`, `_redirects`: configuración de hosting Netlify.
- `LEEME.txt`, `ACADEMIA-README.txt`: notas incluidas en el paquete.
- `PROJECT_CONTEXT.md`, `PROJECT_RULES.md`, `CHANGELOG.md`, `TASK_STATUS.md`, `PROJECT_STRUCTURE.md`, `DATABASE_SCHEMA.md`: documentación de continuidad.

## Directorios
- `assets/`: imágenes, iconos, estilos y PDF del programa.
- `js/`: JavaScript compartido de frontend.

## Responsabilidades verificadas
- `assets/site.css`: estilos compartidos, navegación y responsive.
- `js/app.js`: lógica frontend compartida; no se modificó en el parche del header.
- `_redirects`: reglas de rutas de Netlify; no se modificó en el parche del header.
