// ══════════════════════════════════════
// NovaTours — JavaScript Minimalista y Explicable
// ══════════════════════════════════════

// 1. Efecto Scroll en Navbar
// Detecta cuando el usuario hace scroll hacia abajo para poner fondo oscuro al menú de navegación.
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      // Si bajamos más de 50px, añadimos la clase que le pone fondo oscuro
      navbar.classList.add('navbar--scrolled');
    } else {
      // Si estamos arriba del todo, removemos la clase para que vuelva a ser transparente
      navbar.classList.remove('navbar--scrolled');
    }
  }
});

// 2. Toggle del Menú Móvil
// Permite abrir y cerrar la barra de navegación en pantallas pequeñas (celulares).
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    // Al presionar el botón de hamburguesa, alternamos (abrimos/cerramos) el menú móvil
    mobileMenu.classList.toggle('is-open');
  });
}

// 3. Slider automático del Hero (Solo en la página de inicio)
// Cambia las imágenes de fondo del hero cada 5 segundos de forma automática y suave.
const slides = document.querySelectorAll('.hero__slide');
if (slides.length > 0) {
  let currentSlide = 0;
  setInterval(() => {
    // 1. Oculta la diapositiva actual quitando la clase de visibilidad
    slides[currentSlide].classList.remove('is-active');
    
    // 2. Calcula la siguiente diapositiva usando la operación módulo (%) para reiniciar cuando llegue al final
    currentSlide = (currentSlide + 1) % slides.length;
    
    // 3. Muestra la nueva diapositiva activa
    slides[currentSlide].classList.add('is-active');
  }, 5000); // 5000 milisegundos = 5 segundos
}

// 4. Filtro de Categorías del Blog (Página Inspiración)
const filterPills = document.querySelectorAll('.filter-pill');
const blogCards = document.querySelectorAll('.insp-card');

if (filterPills.length > 0 && blogCards.length > 0) {
  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();

      // Quitar clase activa de todos los botones de filtro
      filterPills.forEach(p => p.classList.remove('active'));
      // Añadir clase activa al botón clickeado
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter');

      // Iterar sobre las tarjetas de blog para ocultar o mostrar
      blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const isMatch = filterValue === 'all' || cardCategory === filterValue;

        if (isMatch) {
          // Si coincide, remover clases de ocultamiento y añadir animación de entrada
          if (card.classList.contains('is-hidden')) {
            card.classList.remove('is-hidden');
            card.classList.remove('is-animating-out');
            card.classList.add('is-animating-in');
          }
        } else {
          // Si no coincide, añadir animación de salida suave
          if (!card.classList.contains('is-hidden')) {
            card.classList.remove('is-animating-in');
            card.classList.add('is-animating-out');
            
            // Después de 300ms (tiempo de animación), ocultar del DOM para no dejar huecos
            setTimeout(() => {
              if (card.classList.contains('is-animating-out')) {
                card.classList.add('is-hidden');
              }
            }, 300);
          }
        }
      });
    });
  });
}

// 5. Experiencias — Scroll-spy de paneles y navegación lateral con puntos
// Activa el punto correcto de la barra lateral y anima el contenido al entrar en el viewport.
const expPanels  = document.querySelectorAll('.exp-panel');
const expDots    = document.querySelectorAll('.exp-dots__dot');
const expDotsNav = document.getElementById('exp-dots');

if (expPanels.length > 0 && expDots.length > 0) {

  // Mostrar la barra lateral de puntos
  if (expDotsNav) expDotsNav.classList.add('is-visible');

  // IntersectionObserver: dispara cuando el panel ocupa el 50% del viewport
  const panelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = entry.target.getAttribute('data-index');

        // Activar el punto correspondiente
        expDots.forEach(d => d.classList.remove('active'));
        if (expDots[idx]) expDots[idx].classList.add('active');

        // Animar el contenido del panel
        const content = entry.target.querySelector('.exp-panel__content');
        if (content) content.classList.add('is-visible');
      }
    });
  }, { threshold: 0.45 });

  expPanels.forEach(panel => panelObserver.observe(panel));

  // Clic en los puntos: scroll suave al panel correspondiente
  expDots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      if (expPanels[i]) {
        expPanels[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
