// Navegación móvil. Sin JavaScript, todos los enlaces permanecen visibles.
const botonMenu = document.querySelector('.boton-menu');
const navegacion = document.querySelector('#navegacion');
const pantallaMovil = window.matchMedia('(max-width: 700px)');

function cerrarMenu() {
  botonMenu.setAttribute('aria-expanded', 'false');
  navegacion.hidden = pantallaMovil.matches;
}

function adaptarNavegacion() {
  botonMenu.hidden = !pantallaMovil.matches;
  cerrarMenu();
}

botonMenu.addEventListener('click', () => {
  const abierto = botonMenu.getAttribute('aria-expanded') === 'true';
  botonMenu.setAttribute('aria-expanded', String(!abierto));
  navegacion.hidden = abierto;
});

navegacion.addEventListener('click', (evento) => {
  if (evento.target.closest('a')) cerrarMenu();
});

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && pantallaMovil.matches && !navegacion.hidden) {
    cerrarMenu();
    botonMenu.focus();
  }
});

pantallaMovil.addEventListener('change', adaptarNavegacion);
adaptarNavegacion();

// Marca el destino seleccionado, también al usar atrás y adelante del navegador.
function actualizarEnlace() {
  const destino = window.location.hash || '#inicio';
  navegacion.querySelectorAll('a').forEach((enlace) => {
    if (enlace.getAttribute('href') === destino) {
      enlace.setAttribute('aria-current', 'location');
    } else {
      enlace.removeAttribute('aria-current');
    }
  });
}
window.addEventListener('hashchange', actualizarEnlace);
actualizarEnlace();

// Filtros del menú: usa data-categoria en cada nuevo platillo.
const filtros = document.querySelector('.filtros');
const platillos = [...document.querySelectorAll('[data-categoria]')];
filtros.hidden = false;
filtros.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-filtro]');
  if (!boton) return;
  filtros.querySelectorAll('button').forEach((elemento) => {
    elemento.setAttribute('aria-pressed', String(elemento === boton));
  });
  const categoria = boton.dataset.filtro;
  platillos.forEach((platillo) => {
    platillo.hidden = categoria !== 'todos' && platillo.dataset.categoria !== categoria;
  });
  const cantidad = platillos.filter((platillo) => !platillo.hidden).length;
  document.querySelector('#resultado-filtro').textContent = `${cantidad} platillo${cantidad === 1 ? '' : 's'} disponible${cantidad === 1 ? '' : 's'}.`;
});

document.querySelector('#anio').textContent = new Date().getFullYear();
