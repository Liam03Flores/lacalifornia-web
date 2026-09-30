# La California · sitio estático

Restaurante y paletería tradicional de calle 3 Norte, Centro Histórico de Puebla. Fundación confirmada: **1935**. HTML5, CSS y JavaScript vanilla; no hay compilación, dependencias de producción, formularios, pagos ni seguimiento. No se ha publicado.

## Vista local

Con Node.js instalado, desde esta carpeta:

```sh
node scripts/serve.mjs
```

Abre http://127.0.0.1:4173. PORT permite cambiar el puerto. El servidor escucha sólo en el equipo local, resuelve carpetas a index.html y sirve 404.html con estado HTTP 404. No abrir con file://: los enlaces parten de la raíz. También funciona cualquier servidor estático con índices de directorio. No se requiere npm install para ver el sitio.

Rutas: /, /nosotros/, /menu/, /sucursales/, /contacto/ y /404.html. El alojamiento futuro debe servir el proyecto desde la raíz del dominio y configurar su página 404, sin redirigir todo a Inicio. Para subcarpetas habrá que ajustar TODOS los enlaces absolutos, rutas CSS/JS y recursos. /menu/ es el destino de navegación, CTA y futuros QR. No hay QR definitivo.

## Archivos y mantenimiento

- HTML completo en cada index.html; edición directa sin generador ni peticiones de fragmentos.
- css/base.css: estructura compartida, componentes, cuadrícula, responsive y accesibilidad.
- css/brand.css: todos los colores de marca y neutros; tipografías y ancho máximo.
- css/theme-retro.css y css/theme-modern.css: roles semánticos, bordes, superficies, botones, espaciado y presentación.
- js/main.js: navegación móvil, temas, fallos de imágenes y activación opcional de publicaciones oficiales.
- archivo-inicial/: copia íntegra del trabajo encontrado, con sus textos y estilos originales. No forma parte del sitio ni debe publicarse.
- qa/: capturas y resultados de pruebas; scripts/: utilidades locales. Excluirlos del despliegue.

Cabecera, selector y pie se repiten en las seis páginas. Al cambiar sus enlaces o datos, actualizar las seis copias; mantener aria-current="page" sólo en la página correspondiente (ninguna en 404). La comprobación de consistencia está registrada en QA. Los contactos se repiten también en Contacto y Sucursales.

## Diseño y temas

Retro es la hoja inicial de cada HTML. El selector “Vista de demostración” carga una sola hoja de tema y guarda california-theme en localStorage cuando está permitido. Si falla almacenamiento, sigue funcionando la vista; si falla CSS moderno, restaura el tema anterior. Sin JavaScript queda Retro con enlaces visibles.

Para fijar un tema al publicar: cambiar el href de #theme en las seis páginas al archivo elegido, retirar el div.demo y eliminar en main.js el bloque desde const selector hasta antes del comentario de fallos de imagen. Esto elimina también la lectura de la preferencia guardada. No retirar la navegación ni el manejo de imágenes.

- Colores: sólo brand.css. Naranja y amarillo son acentos/fondos, no texto claro sobre blanco. Los SVG provisionales monocromos usan currentColor, sin replicar la paleta.
- Tipografías: --font-body (Montserrat y sistema), --font-title (Josefin Sans y sistema), --font-display (Georgia y sistema). Georgia se usa para los grandes titulares editoriales. No se descarga ninguna fuente. Si se incorporan fuentes autorizadas, alojar WOFF2 local y usar font-display:swap.
- Bordes: --borde-color, --borde y --radio en cada tema. Sin degradados ni sombras difusas.
- Espaciado: --espacio en cada tema; gaps y padding de componentes en base.css y ajustes del tema moderno.
- Movimiento: --duracion y --movimiento en brand.css. Sólo hay una breve respuesta de botones. prefers-reduced-motion anula ambos con una regla de mayor especificidad. No hay animaciones continuas ni contenido oculto esperando animación.
- Productos estrella: una columna móvil; desde 42rem dos columnas con Chabela ocupando el ancho; desde 60rem tres columnas con Chabela en la primera columna y dos filas. No se altera el orden del DOM.
- Navegación: divulgación en móvil, Escape devuelve foco al botón; Tab es natural, sin trampa de foco ni roles de menú de aplicación. Los controles no se comprimen en una fila.

## Editar carta y promociones

En menu/index.html, cada .menu-section tiene un id estable utilizado por el índice y por Inicio. Editar h3, descripción, .price y .variants de cada .menu-item. Los cinco productos confirmados ya están incluidos. Sólo Chabela tiene descripción confirmada: torta con carne al pastor. No inferir ingredientes, tamaños ni disponibilidad.

Completar categorías adicionales en #carta-adicional. Editar #promociones y #paquetes con nombre, descripción, precio, vigencia y condiciones confirmados. Retirar el aviso provisional sólo cuando sean ofertas reales. No existe lógica de compra. Actualizar también Inicio si cambia un producto destacado. La etiqueta de exclusividad de Chabela está pendiente: no publicar “Único en nuestra sucursal” sin validación.

## Fotografías, marca y mascota

Carpetas images/marca, local, productos, historia, mascota y placeholders. Los espacios vacíos se reservan para recursos definitivos. Se utiliza una marca tipográfica provisional, no se afirma que sea el logotipo oficial.

Los SVG son dibujos propios de posición: foto.svg y local.svg; la fachada esquemática no representa el edificio real. Sustituir src y dimensiones por fotografías propias o autorizadas, preferentemente WebP/AVIF con tamaños y srcset apropiados. Escribir alt descriptivo para fotos informativas; dejar alt vacío para decoración con leyenda equivalente. Retirar las leyendas PLACEHOLDER cuando corresponda, conservar créditos y fechas históricas verificadas. Mantener width/height y proporciones para evitar saltos. La imagen principal no lleva lazy; las inferiores sí.

Sustituir images/mascota/caballito-provisional.svg por PNG transparente autorizado en los dos lugares (Inicio y Nosotros); editar alt, leyenda y globo HTML. El dibujo actual es explícitamente provisional, no mascota final. No incluir textos esenciales dentro del PNG.

## Contactos, ubicaciones y redes

Buscar PLACEHOLDER, PENDIENTE y PENDIENTES en los HTML. Completar correo, teléfono, dirección, horarios y Maps sólo con datos confirmados. Entonces añadir mailto: y tel: reales, y enlace HTTPS de Maps. No hay enlaces falsos ni capturas de mapas.

Duplicar article.window de Sucursales sólo si se confirma otra ubicación. Cada ficha admite nombre, dirección, horarios, teléfono, Maps, foto y especialidades. Verificar el número real de ubicaciones; la ficha actual no presupone que sea la única.

Las dos zonas data-social son locales y no realizan llamadas externas. Para una publicación oficial confirmada, conservar texto y enlace accesibles y añadir un botón type="button" hidden data-embed-src="URL_OFICIAL_EMBED" data-embed-title="Descripción de la publicación". main.js sólo habilita HTTPS de www.instagram.com con ruta acabada en /embed/ o www.facebook.com/plugins/post.php; sólo crea el iframe al pulsar. Configurar URL oficial siguiendo instrucciones actuales del proveedor. El enlace y la advertencia permanecen si el contenido externo falla. La integración definitiva requiere validación de permisos, privacidad, tamaño y funcionamiento; hoy no existen cuentas o publicaciones confirmadas.

## Antes de publicar

1. Completar carta, precios, promociones, condiciones, variantes y exclusividad de Chabela.
2. Confirmar contactos, dirección completa, horarios, Maps y ubicaciones.
3. Aprobar historia, misión, visión, hitos, mascota y marca.
4. Sustituir imágenes y autorizar testimonios, clientes comerciales y logotipos. No hay reseñas ni valoraciones inventadas.
5. Añadir redes oficiales, agencia, información legal y aviso de privacidad.
6. Elegir dominio y alojamiento; configurar HTTPS, 404 y compresión. Añadir canonical y sitemap con dominio real, robots según el entorno y metadatos sociales con imágenes definitivas. Ampliar JSON-LD sólo con datos verificados. No se han inventado URL, coordenadas o horarios.
7. Fijar tema, retirar selector de demostración si se desea y excluir archivo-inicial, qa, scripts y documentación. Revisar pendientes restantes y repetir QA tras introducir textos y fotos.
8. Hacer revisión con lector de pantalla, navegador Safari/Firefox y dispositivos físicos antes del lanzamiento.

## Referencias, créditos y licencias

Consulta realizada el 29-09-2026. https://elmoro.mx/ respondió y se consultó su jerarquía textual de menú, ubicaciones, historia y catering. https://roly.com.mx/ no pudo recuperarse, incluso al probar HTTP; se siguió la organización indicada en el encargo. Se localizaron retrospectivas de Apple Store y Facebook en https://www.webdesignmuseum.org/exhibitions/apple-store y https://www.versionmuseum.com/history-of/facebook-website ; no se verificó una captura específica de McDonald’s de 1997 ni se reproducen observaciones visuales de ella. La estética retro sigue los criterios del encargo. No se copió código, texto, fotos, logos ni gráficos de esas referencias.

Código y SVG provisionales creados para este proyecto. No se incluyen recursos gráficos de terceros ni fuentes redistribuidas; se usan fuentes instaladas y alternativas del sistema. La licencia de las fotografías, fuentes y mascota definitivas deberá documentarse al incorporarlas. No se asume registro de marca.

Ver qa/VALIDACION.md para pruebas, resultados y límites reales.
