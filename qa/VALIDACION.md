# Validación · 29 de septiembre de 2026

Pruebas reales con Playwright y Microsoft Edge instalado, en modo headless, sirviendo HTML por HTTP local. Resultados detallados: results.json y contrast.json. Capturas: retro-desktop.png, modern-desktop.png, retro-mobile.png y modern-mobile.png.

- 60 combinaciones con JavaScript: seis páginas × dos temas × anchos 320, 375, 768, 1024 y 1440 px. Sin desbordamiento horizontal, imágenes rotas o errores JavaScript; un h1 por página.
- 60 combinaciones sin JavaScript: navegación y contenido visibles, sin desbordamiento. Para Moderno se sirvió su CSS en lugar del archivo predeterminado, simulando una publicación con tema fijo.
- 18 destinos de enlaces internos y anclas: sin fallos. Respuesta 404 comprobada para ruta inexistente.
- Teclado móvil: Enter abre Secciones; Tab llega al primer enlace; Escape cierra y devuelve el foco. Foco claro en pie oscuro; navegación de escritorio conserva su orden natural. Sin trampa de foco.
- Selector: persiste entre páginas. Almacenamiento bloqueado: funciona. Fallo de CSS moderno: vuelve a Retro y muestra mensaje.
- Movimiento reducido: intensidad 0px en ambos temas. Se corrigió la prioridad de la regla sobre brand.css.
- Texto al 200% en Menú a 320 px: sin desbordamiento en ambos temas. Nombre de producto largo: sin desbordamiento.
- Zoom CSS 200% a 1024 px en Menú: sin desbordamiento. Es una simulación de ampliación; NO equivale a una prueba del control nativo de zoom del navegador.
- Cabecera y pie consistentes en las seis páginas, exceptuando el indicador de página actual.
- Contrastes calculados según luminancia WCAG para los pares de texto usados; todos los pares comprobados superan 4.5:1. Ver contrast.json. No se certifica una auditoría completa WCAG.
- Inspección visual de Inicio en ambos temas, móvil y escritorio. Las capturas guardadas incluyen toda la página.

Límites: no se probaron dispositivos físicos, lector de pantalla, zoom nativo, Safari ni Firefox. Los embeds sociales definitivos no se prueban sin URL oficial. No se han verificado los datos comerciales pendientes. Repetir revisión visual, teclado y contraste al sustituir contenido o paleta.

Comprobaciones finales: al pasar de móvil a escritorio con el botón enfocado, el foco pasa al primer enlace visible. Fallo de imagen simulado: se muestra alternativa textual. Servidor scripts/serve.mjs ejecutado y comprobado: 200 en Inicio/Menú/CSS, 301 de /menu a /menu/, 404 en ruta inexistente y 403 para scripts privados. Sintaxis de servidor y main.js validada con node --check.
