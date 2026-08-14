[README.md](https://github.com/user-attachments/files/31090108/README.md)
# Sistema-QR-Vil# Proyecto X — Validador QR

Esta versión permite abrir una web desde el celular, activar la cámara y escanear QR.

Códigos de prueba:
- PX-2026-DEMO01
- PX-2026-DEMO02

IMPORTANTE: esta demo guarda el estado en el navegador del propio celular. Para una fiesta real, donde varios celulares deben compartir las mismas entradas, hay que conectar una base de datos online y un backend.

Para publicarla gratis, sube `index.html`, `style.css` y `app.js` a un hosting estático que proporcione HTTPS. La cámara del navegador necesita HTTPS (excepto localhost).

La biblioteca de lectura QR se carga desde un CDN en `index.html`.
