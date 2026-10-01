(() => {
  'use strict';
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#navegacion');
  const mobile = matchMedia('(max-width: 41.99rem)');
  const navPosition = document.createComment('Posición de la navegación de escritorio');
  nav.before(navPosition);
  const navDialog = document.createElement('dialog');
  navDialog.className = 'nav-dialog';
  navDialog.setAttribute('aria-label', 'Secciones');
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'nav-dialog-close';
  closeButton.setAttribute('aria-label', 'Cerrar menú');
  closeButton.textContent = '×';
  navDialog.append(closeButton);
  document.body.append(navDialog);
  // Sin JavaScript, la navegación permanece visible en la cabecera.
  function closeNav(returnFocus = false) {
    if (navDialog.open) navDialog.close();
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    nav.hidden = mobile.matches;
    if (returnFocus) toggle.focus();
  }
  function adaptNav() {
    const focusInside = nav.contains(document.activeElement);
    const focusOnToggle = document.activeElement === toggle;
    toggle.hidden = !mobile.matches;
    closeNav(false);
    if (mobile.matches) {
      navDialog.append(nav);
      if (focusInside) toggle.focus();
    } else {
      navPosition.after(nav);
      if (focusOnToggle || focusInside || document.activeElement === closeButton) nav.querySelector('a').focus();
    }
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    if (!open) { closeNav(true); return; }
    toggle.setAttribute('aria-expanded', String(open));
    nav.hidden = false;
    document.body.classList.add('nav-open');
    navDialog.showModal();
    nav.querySelector('a').focus();
  });
  closeButton.addEventListener('click', () => closeNav(true));
  navDialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeNav(true);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && !nav.hidden) closeNav(true);
  });
  document.addEventListener('click', event => {
    if (mobile.matches && navDialog.open && event.target === navDialog) {
      const bounds = navDialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (outside) closeNav(true);
    }
  });
  nav.addEventListener('click', event => {
    if (mobile.matches && event.target.closest('a')) closeNav(true);
  });
  if (mobile.addEventListener) mobile.addEventListener('change', adaptNav);
  else mobile.addListener(adaptNav);
  window.addEventListener('resize', () => {
    if (mobile.matches !== (nav.parentElement === navDialog)) adaptNav();
  });
  adaptNav();

  const header = document.querySelector('.cabecera');
  if (header) {
    let previousScroll = Math.max(0, window.scrollY);
    function updateHeader() {
      const currentScroll = Math.max(0, window.scrollY);
      const distance = currentScroll - previousScroll;
      const menuOpen = toggle.getAttribute('aria-expanded') === 'true';
      const keyboardFocus = header.querySelector(':focus-visible');
      if (currentScroll <= header.offsetHeight || menuOpen || keyboardFocus) {
        header.classList.remove('is-hidden');
        previousScroll = currentScroll;
      } else if (Math.abs(distance) >= 6) {
        header.classList.toggle('is-hidden', distance > 0);
        previousScroll = currentScroll;
      }
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
  }

  const selector = document.querySelector('#tema');
  const sheet = document.querySelector('#theme');
  const status = document.querySelector('#theme-status');
  let current = 'retro';
  // Se cambia el href de UNA hoja de tema. La base retro siempre viene en el HTML.
  // El almacenamiento bloqueado y la falta de CSS moderno tienen retorno seguro.
  function setTheme(theme) {
    if (!['retro', 'modern'].includes(theme) || theme === current) return;
    selector.disabled = true;
    const previous = current;
    sheet.onload = () => {
      current = theme;
      selector.value = theme;
      selector.disabled = false;
      status.textContent = '';
      try { localStorage.setItem('california-theme', theme); } catch (_) { /* Preferencia sólo durante esta visita. */ }
      sheet.onload = sheet.onerror = null;
    };
    sheet.onerror = () => {
      sheet.onload = sheet.onerror = null;
      sheet.href = '/css/theme-' + previous + '.css';
      selector.value = previous;
      selector.disabled = false;
      status.textContent = 'No se pudo cargar el tema. Se conserva la vista anterior.';
    };
    sheet.href = '/css/theme-' + theme + '.css';
  }
  document.querySelector('.demo').hidden = false;
  selector.addEventListener('change', () => setTheme(selector.value));
  try { setTheme(localStorage.getItem('california-theme')); } catch (_) { /* Retro sigue disponible. */ }

  // Un fallo de imagen conserva un mensaje textual y la leyenda del placeholder.
  document.querySelectorAll('img').forEach(img => {
    const fallback = () => {
      const message = document.createElement('p');
      message.className = 'resource-error';
      message.textContent = img.alt || 'Imagen no disponible. Consulta la descripción de este espacio.';
      img.replaceWith(message);
    };
    img.addEventListener('error', fallback, { once: true });
    if (img.complete && img.naturalWidth === 0) fallback();
  });

  // Mejora social opcional. Sólo un botón editorialmente configurado activa un
  // iframe oficial; el enlace y el texto local se conservan aun si el proveedor falla.
  document.querySelectorAll('[data-embed-src]').forEach(button => {
    let url;
    try { url = new URL(button.dataset.embedSrc); } catch (_) { return; }
    const allowed = url.protocol === 'https:' &&
      ((url.hostname === 'www.instagram.com' && url.pathname.endsWith('/embed/')) ||
       (url.hostname === 'www.facebook.com' && url.pathname === '/plugins/post.php'));
    if (!allowed) return;
    button.hidden = false;
    button.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.title = button.dataset.embedTitle || 'Publicación oficial';
      frame.width = '500'; frame.height = '600';
      frame.style.cssText = 'width:100%;max-width:100%;border:0';
      frame.referrerPolicy = 'no-referrer';
      frame.src = url.href;
      button.after(frame);
      button.disabled = true;
      button.textContent = 'Publicación solicitada. Si no aparece, usa el enlace oficial.';
    }, { once: true });
  });
})();
