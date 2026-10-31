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
     ARRANQUE
     ------------------------------------------------------------------------ */
  function init() {
    initMobileMenu();
    initTabs();
    initScrollSpy();
    initBackToTop();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
