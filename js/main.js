/* ==========================================================================
   GESTIÓN DE TRANSACCIONES — Interactividad de la landing page
   Taller de Base de Datos · Actividad 4.2 · TecNM
   --------------------------------------------------------------------------
   Sin dependencias externas. Se carga con `defer`, por lo que el DOM ya está
   disponible cuando este archivo se ejecuta.

   Módulos:
   01. Menú móvil
   02. Pestañas ACID (con navegación por teclado)
   03. Scroll-spy de la navegación
   04. Botón "volver arriba"
   05. Año del pie de página
   06. Configuración de la portada desde data/portada.json
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     01. MENÚ MÓVIL
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    var button = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');

    if (!button || !menu) return;

    function openMenu() {
      menu.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-label', 'Cerrar menú de navegación');
    }

    function closeMenu() {
      menu.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Abrir menú de navegación');
    }

    button.addEventListener('click', function () {
      if (menu.hidden) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Cierra al elegir un destino
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    // Cierra con la tecla Escape y devuelve el foco al botón
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !menu.hidden) {
        closeMenu();
        button.focus();
      }
    });

    // Cierra al hacer clic fuera del encabezado
    document.addEventListener('click', function (event) {
      if (menu.hidden) return;
      if (!event.target.closest('.site-header')) closeMenu();
    });

    // Si se pasa a escritorio con el menú abierto, se restablece
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1000 && !menu.hidden) closeMenu();
    });
  }

  /* ------------------------------------------------------------------------
     02. PESTAÑAS ACID
     ------------------------------------------------------------------------ */
  function initTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"][data-tab]'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"]'));

    if (!tabs.length || !panels.length) return;

    function activate(tab, moveFocus) {
      var target = tab.getAttribute('data-tab');

      tabs.forEach(function (item) {
        var isTarget = item === tab;
        item.classList.toggle('is-active', isTarget);
        item.setAttribute('aria-selected', isTarget ? 'true' : 'false');
        item.setAttribute('tabindex', isTarget ? '0' : '-1');
      });

      panels.forEach(function (panel) {
        var isTarget = panel.id === 'panel-' + target;
        panel.hidden = !isTarget;
      });

      if (moveFocus) tab.focus();
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activate(tab, false);
      });

      // Navegación por teclado según el patrón ARIA de pestañas
      tab.addEventListener('keydown', function (event) {
        var current = tabs.indexOf(tab);
        var next = null;

        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            next = tabs[(current + 1) % tabs.length];
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            next = tabs[(current - 1 + tabs.length) % tabs.length];
            break;
          case 'Home':
            next = tabs[0];
            break;
          case 'End':
            next = tabs[tabs.length - 1];
            break;
          default:
            return;
        }

        event.preventDefault();
        activate(next, true);
      });
    });
  }

  /* ------------------------------------------------------------------------
     03. SCROLL-SPY DE LA NAVEGACIÓN
     ------------------------------------------------------------------------ */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var sections = links
      .map(function (link) {
        var id = link.getAttribute('href');
        return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    function markActive(id) {
      links.forEach(function (link) {
        var isActive = link.getAttribute('href') === '#' + id;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) markActive(entry.target.id);
        });
      },
      {
        // Deja una franja de detección justo debajo del encabezado fijo
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------------------------------
     04. BOTÓN "VOLVER ARRIBA"
     ------------------------------------------------------------------------ */
  function initBackToTop() {
    var button = document.getElementById('back-to-top');
    if (!button) return;

    function toggleVisibility() {
      var shouldShow = window.scrollY > 500;
      button.classList.toggle('is-visible', shouldShow);
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    button.addEventListener('click', function () {
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     05. AÑO DEL PIE DE PÁGINA
     ------------------------------------------------------------------------ */
  function initYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------------
     06. CONFIGURACIÓN DE LA PORTADA (data/portada.json)
     ------------------------------------------------------------------------
     El HTML contiene valores de respaldo para que la página nunca se vea
     vacía. Cuando el JSON se puede leer, sus valores tienen prioridad.

     Nota: `fetch` está bloqueado en el protocolo file://. Abriendo el archivo
     con doble clic se muestran los valores del HTML; para ver el JSON en local
     hay que servir la carpeta (python3 -m http.server).
     ------------------------------------------------------------------------ */
  var PORTADA_JSON = './data/portada.json';

  function esPlaceholder(valor) {
    return /^[\s_\-–—]*$/.test(valor);
  }

  // Parte el título en dos líneas para respetar el diseño de la portada
  function escribirTitulo(elemento, texto) {
    var partes = String(texto).trim().split(/\s+/);

    if (partes.length < 2) {
      elemento.textContent = texto;
      return;
    }

    var ultima = partes.pop();

    elemento.textContent = partes.join(' ') + ' ';

    var acento = document.createElement('span');
    acento.className = 'grad-text';
    acento.textContent = ultima;
    elemento.appendChild(acento);
  }

  function aplicarPortada(datos) {
    var campos = document.querySelectorAll('[data-field]');

    Array.prototype.forEach.call(campos, function (elemento) {
      var clave = elemento.getAttribute('data-field');
      var valor = datos[clave];

      if (valor === undefined || valor === null || valor === '') return;

      switch (clave) {
        case 'titulo':
          escribirTitulo(elemento, valor);
          break;

        case 'fecha':
          elemento.textContent = datos.fechaTexto || valor;
          elemento.setAttribute('datetime', valor);
          break;

        case 'matricula':
        case 'docente':
          elemento.textContent = valor;
          // Deja de verse como campo pendiente cuando hay un dato real
          elemento.classList.toggle('placeholder', esPlaceholder(valor));
          break;

        case 'url':
          elemento.setAttribute('href', valor);
          break;

        case 'etiquetaUrl':
          elemento.textContent = valor;
          break;

        default:
          elemento.textContent = valor;
      }
    });

    // Enlace visible de la portada
    var valorUrl = document.querySelector('.portada__url-value');
    if (valorUrl && datos.url) valorUrl.textContent = datos.url;

    // Metadatos del documento
    if (datos.url) {
      var canonical = document.querySelector('link[rel="canonical"]');
      var ogUrl = document.querySelector('meta[property="og:url"]');
      if (canonical) canonical.setAttribute('href', datos.url);
      if (ogUrl) ogUrl.setAttribute('content', datos.url);
    }
  }

  function initPortadaConfig() {
    if (!window.fetch) return;

    fetch(PORTADA_JSON, { cache: 'no-store' })
      .then(function (respuesta) {
        if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
        return respuesta.json();
      })
      .then(aplicarPortada)
      .catch(function (error) {
        if (window.location.protocol === 'file:') {
          console.warn(
            '[portada] No se puede leer data/portada.json desde file://. ' +
            'Se usan los valores escritos en el HTML. Ejecuta ' +
            '"python3 -m http.server" para previsualizar el JSON en local.'
          );
        } else {
          console.warn('[portada] No se pudo cargar ' + PORTADA_JSON, error);
        }
      });
  }

  /* ------------------------------------------------------------------------
     ARRANQUE
     ------------------------------------------------------------------------ */
  function init() {
    initMobileMenu();
    initTabs();
    initScrollSpy();
    initBackToTop();
    initYear();
    initPortadaConfig();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
