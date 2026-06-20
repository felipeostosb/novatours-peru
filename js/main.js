// ══════════════════════════════════════
// NovaTours — Main JavaScript
// ══════════════════════════════════════

(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const navbar     = $('#navbar');
  const hero       = $('#hero');
  const viewHome   = $('#view-home');
  const viewDest   = $('#view-destination');
  const grid       = $('#destinations-grid');
  const toggle     = $('#nav-toggle');
  const mobileMenu = $('#mobile-menu');

  // ══════════════════════════════════════
  // 1. Navbar — Transparent on hero, solid on scroll
  // ══════════════════════════════════════
  const navObserver = new IntersectionObserver(
    ([entry]) => {
      navbar.classList.toggle('navbar--scrolled', !entry.isIntersecting);
    },
    { threshold: 0 }
  );
  navObserver.observe(hero);

  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-open');
  });

  // ══════════════════════════════════════
  // 1.5 Hero Slider
  // ══════════════════════════════════════
  const slides = document.querySelectorAll('.hero__slide');
  let currentSlide = 0;
  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('is-active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('is-active');
    }, 5000); // Cambia cada 5 segundos
  }

  // ══════════════════════════════════════
  // 2. Destinations Data — SEO + GEO
  // ══════════════════════════════════════
  const DATA = {
    lima: {
      name: 'Lima',
      subtitle: 'La Ciudad de los Reyes',
      region: 'Costa central del Perú',
      seoTag: 'Capital gastronómica de América · Patrimonio UNESCO',
      heroImg: 'https://picsum.photos/id/164/2000/1200',
      cardImg: 'https://picsum.photos/id/164/800/1000',
      airport: 'Llegada principal por el Aeropuerto Internacional Jorge Chávez (LIM). Conexión directa desde las principales capitales del mundo.',
      info: 'La capital culinaria de América. Clima húmedo todo el año. Se recomienda moverse mediante aplicaciones de transporte por los distritos costeros.',
      places: [
        { title: 'Centro Histórico de Lima', desc: 'Maravíllate con la arquitectura colonial declarada Patrimonio de la Humanidad, los balcones tallados de madera y desciende a las misteriosas Catacumbas del Convento de San Francisco.', img: 'https://picsum.photos/id/54/1600/1200' },
        { title: 'Miraflores y Malecón Cisneros', desc: 'Siente la brisa del Océano Pacífico. El malecón es perfecto para recorrer en bicicleta, observar a los parapentistas o disfrutar de la alta gastronomía con vista al mar.', img: 'https://picsum.photos/id/57/1600/1200' },
        { title: 'Distrito Bohemio de Barranco', desc: 'El rincón del arte limeño. Atraviesa el Puente de los Suspiros, piérdete entre calles decoradas con murales vibrantes y disfruta de cócteles de pisco en casonas restauradas.', img: 'https://picsum.photos/id/122/1600/1200' },
        { title: 'Circuito Mágico del Agua', desc: 'La noche limeña se ilumina en este inmenso parque Guinness World Record. Un espectáculo visual fascinante de fuentes cibernéticas, láseres y música.', img: 'https://picsum.photos/id/65/1600/1200' }
      ]
    },
    cusco: {
      name: 'Cusco',
      subtitle: 'El Ombligo del Mundo',
      region: 'Sierra sur del Perú · 3,399 m.s.n.m.',
      seoTag: 'Machu Picchu · Valle Sagrado · Capital del Imperio Inca',
      heroImg: 'https://picsum.photos/id/1018/2000/1200',
      cardImg: 'https://picsum.photos/id/1018/800/1000',
      airport: 'Arribo al Aeropuerto Internacional Velasco Astete (CUZ). Vuelos constantes desde Lima (1 hora de duración).',
      info: 'Elevación de 3,399 m.s.n.m. Es fundamental descansar el primer día, mantenerse hidratado y beber mate de coca para evitar el mal de altura.',
      places: [
        { title: 'Machu Picchu', desc: 'La majestuosa ciudadela inca, una de las 7 Maravillas del Mundo Moderno, oculta entre las nubes a 2,430 m.s.n.m. El viaje panorámico en tren desde Ollantaytambo es imperdible.', img: 'https://picsum.photos/id/29/1600/1200' },
        { title: 'Valle Sagrado de los Incas', desc: 'El corazón agrícola del antiguo imperio. Explora el mercado artesanal de Pisac, las terrazas circulares de Moray y las Salineras de Maras con más de 3,000 pozas de sal.', img: 'https://picsum.photos/id/46/1600/1200' },
        { title: 'Montaña de 7 Colores (Vinicunca)', desc: 'Una obra maestra de la geología andina a más de 5,000 metros de altura. Cumbres teñidas por minerales que crean un espectáculo cromático único en el planeta.', img: 'https://picsum.photos/id/10/1600/1200' },
        { title: 'Laguna Humantay', desc: 'A los pies del glaciar Salkantay descansa este espejo de agua turquesa irreal. Destino fotográfico y de meditación absoluto para los amantes del trekking en los Andes.', img: 'https://picsum.photos/id/43/1600/1200' }
      ]
    },
    arequipa: {
      name: 'Arequipa',
      subtitle: 'La Ciudad Blanca',
      region: 'Sierra sur del Perú · 2,335 m.s.n.m.',
      seoTag: 'Cañón del Colca · Volcán Misti · Gastronomía regional',
      heroImg: 'https://picsum.photos/id/248/2000/1200',
      cardImg: 'https://picsum.photos/id/248/800/1000',
      airport: 'Llegada al Aeropuerto Rodríguez Ballón (AQP). Ubicado muy cerca de la ciudad, con traslados rápidos en taxi seguro.',
      info: 'Arquitectura deslumbrante tallada en sillar (piedra volcánica blanca). Capital gastronómica regional; las picanterías tradicionales son paradas obligatorias.',
      places: [
        { title: 'Cañón del Colca', desc: 'Uno de los cañones más profundos de la Tierra (3,400 m de profundidad). El Mirador de la Cruz del Cóndor ofrece la oportunidad de ver al cóndor andino planear sobre el abismo.', img: 'https://picsum.photos/id/1067/1600/1200' },
        { title: 'Monasterio de Santa Catalina', desc: 'Una ciudadela virreinal intacta de 20,000 m². Calles pintadas en tonos rojos y azules profundos, patios silenciosos y pasillos detenidos en el siglo XVI.', img: 'https://picsum.photos/id/11/1600/1200' },
        { title: 'Ruta del Sillar', desc: 'En las Canteras de Añashuayco podrás ver de dónde nace la ciudad. Enormes paredes blancas talladas por maestros canteros que continúan una tradición milenaria.', img: 'https://picsum.photos/id/1016/1600/1200' },
        { title: 'Mirador de Yanahuara', desc: 'Bajo sus icónicos arcos de piedra volcánica, Arequipa se extiende ante la imponente vista de los volcanes Misti, Chachani y Pichu Pichu.', img: 'https://picsum.photos/id/58/1600/1200' }
      ]
    },
    puno: {
      name: 'Puno',
      subtitle: 'Capital Folklórica del Perú',
      region: 'Altiplano sur · Lago Titicaca · 3,812 m.s.n.m.',
      seoTag: 'Lago Titicaca · Islas de los Uros · Taquile · Folklore',
      heroImg: 'https://picsum.photos/id/1044/2000/1200',
      cardImg: 'https://picsum.photos/id/1044/800/1000',
      airport: 'Los vuelos llegan al Aeropuerto de Juliaca (JUL). Desde allí, un escénico traslado terrestre de 1 hora te lleva a la ciudad de Puno.',
      info: 'Ubicado a las orillas del Lago Titicaca, el lago navegable más alto del mundo (3,812 m.s.n.m). Prepararse para un clima frío. Tierra de danzas y cultura viva.',
      places: [
        { title: 'Islas Flotantes de los Uros', desc: 'Un estilo de vida fascinante sobre las aguas del Titicaca. Plataformas construidas con totora tejida a mano, donde las familias mantienen sus saberes ancestrales por siglos.', img: 'https://picsum.photos/id/1011/1600/1200' },
        { title: 'Isla de Taquile', desc: 'Reconocida por UNESCO por su arte textil. El turismo vivencial te permite desconectar del mundo moderno y compartir la apacible vida agrícola y tejedora de sus habitantes.', img: 'https://picsum.photos/id/218/1600/1200' },
        { title: 'Complejo Arqueológico de Sillustani', desc: 'Místicas torres funerarias (chullpas) de hasta 12 metros de altura en una península de la laguna Umayo. Un lugar de silencio e impacto visual imponente.', img: 'https://picsum.photos/id/16/1600/1200' }
      ]
    },
    piura: {
      name: 'Piura',
      subtitle: 'Sol Eterno y Océano Cálido',
      region: 'Costa norte del Perú · Playas tropicales',
      seoTag: 'Máncora · Surf · Avistamiento de ballenas · Playas del norte',
      heroImg: 'https://picsum.photos/id/1050/2000/1200',
      cardImg: 'https://picsum.photos/id/1050/800/1000',
      airport: 'Puedes arribar al aeropuerto de Piura (PIU) o Talara (TYL). Este último está más cerca de las principales playas del norte peruano.',
      info: 'Un refugio tropical con sol todo el año. Traslados sencillos por la Panamericana Norte. Meca de mariscos frescos, surf y atardeceres inolvidables.',
      places: [
        { title: 'Máncora', desc: 'El balneario más famoso del norte peruano. Vibrante, soleado y con olas perfectas para surf. Escena nocturna activa y hospedaje que va del lujo al estilo mochilero.', img: 'https://picsum.photos/id/13/1600/1200' },
        { title: 'Los Órganos', desc: 'Naturaleza marina en su esplendor. Desde aquí parten embarcaciones para avistar ballenas jorobadas (julio-octubre) y nadar junto a tortugas marinas.', img: 'https://picsum.photos/id/1055/1600/1200' },
        { title: 'Vichayito', desc: 'El epítome de la tranquilidad en la costa peruana. Arena blanca, aguas templadas y atardeceres perfectos para caminatas solitarias o cabalgatas.', img: 'https://picsum.photos/id/42/1600/1200' }
      ]
    },
    loreto: {
      name: 'Loreto (Iquitos)',
      subtitle: 'El Latido de la Amazonía',
      region: 'Selva norte del Perú · Río Amazonas',
      seoTag: 'Amazonas · Iquitos · Delfines rosados · Selva tropical',
      heroImg: 'https://picsum.photos/id/1015/2000/1200',
      cardImg: 'https://picsum.photos/id/1015/800/1000',
      airport: 'Llegada única por aire al Aeropuerto Francisco Secada (IQT) o por río. Iquitos es inaccesible por carretera.',
      info: 'Iquitos: la metrópoli más grande del mundo sin acceso terrestre. Clima caluroso, humedad profunda y lluvias tropicales. Puerta a la Amazonía peruana.',
      places: [
        { title: 'Navegación por el Río Amazonas', desc: 'Surca las aguas del río más caudaloso del mundo. Ecolodges en la selva, avistamiento de delfines rosados al atardecer y noches bajo las estrellas amazónicas.', img: 'https://picsum.photos/id/28/1600/1200' },
        { title: 'Reserva Nacional Pacaya Samiria', desc: 'La «Selva de los Espejos»: 2 millones de hectáreas donde aguas oscuras reflejan el cielo, ocultando caimanes, primates y una biodiversidad asombrosa.', img: 'https://picsum.photos/id/195/1600/1200' },
        { title: 'CREA y Mariposarios', desc: 'Conecta con la conservación amazónica. El Centro de Rescate Amazónico rehabilita manatíes, mientras Pilpintuwasi te rodea de mariposas tropicales.', img: 'https://picsum.photos/id/110/1600/1200' }
      ]
    },
    'madre-de-dios': {
      name: 'Madre de Dios',
      subtitle: 'Capital de la Biodiversidad',
      region: 'Selva sur del Perú · Puerto Maldonado',
      seoTag: 'Tambopata · Guacamayos · Lago Sandoval · Ecoturismo',
      heroImg: 'https://picsum.photos/id/10/2000/1200',
      cardImg: 'https://picsum.photos/id/10/800/1000',
      airport: 'Aterrizaje en el Aeropuerto Padre Aldamiz (PEM) en Puerto Maldonado. Vuelos directos desde Lima y Cusco.',
      info: 'Puerta de entrada a la selva sur peruana. Vacunarse contra la fiebre amarilla es altamente recomendado. Inmersión directa e intensa en la naturaleza.',
      places: [
        { title: 'Reserva Nacional Tambopata', desc: 'Un rincón prístino del planeta. La Collpa de Guacamayos reúne cientos de aves al alba creando una explosión visual y sonora inigualable en la selva peruana.', img: 'https://picsum.photos/id/17/1600/1200' },
        { title: 'Lago Sandoval', desc: 'Navega en silenciosas canoas por este espejo de agua rodeado de palmeras gigantes aguaje, hogar de tortugas taricaya, garzas y las esquivas nutrias gigantes.', img: 'https://picsum.photos/id/37/1600/1200' }
      ]
    },
    'san-martin': {
      name: 'San Martín',
      subtitle: 'La Ceja de Selva',
      region: 'Selva alta del Perú · Tarapoto',
      seoTag: 'Tarapoto · Cascadas · Laguna Azul · Aventura',
      heroImg: 'https://picsum.photos/id/1039/2000/1200',
      cardImg: 'https://picsum.photos/id/1039/800/1000',
      airport: 'Arribo al Aeropuerto Guillermo del Castillo (TPP) en Tarapoto, la ciudad más activa de la selva alta.',
      info: 'Selva de fácil acceso terrestre y aéreo. Geografía montañosa con cascadas, lagunas cristalinas y un clima cálido exquisito todo el año.',
      places: [
        { title: 'Laguna Azul (Sauce)', desc: 'Paraje rodeado de cerros verdes donde puedes pasear en bote, relajarte en centros de spa o practicar canopy sobre la selva con vistas panorámicas.', img: 'https://picsum.photos/id/1040/1600/1200' },
        { title: 'Catarata de Ahuashiyacu', desc: 'A minutos de Tarapoto, esta caída de agua de 40 metros es un refugio de frescura en el bosque denso, con pozas naturales perfectas para nadar.', img: 'https://picsum.photos/id/74/1600/1200' },
        { title: 'Lamas y Comunidad Wayku', desc: 'La «Ciudad de los Tres Pisos» con su castillo de piedra. La comunidad nativa Wayku conserva intactas su vestimenta, lengua quechua y tradiciones ancestrales.', img: 'https://picsum.photos/id/15/1600/1200' }
      ]
    },
    'la-libertad': {
      name: 'La Libertad',
      subtitle: 'La Ruta Moche',
      region: 'Costa norte del Perú · Trujillo',
      seoTag: 'Chan Chan · Huacas del Sol y Luna · Huanchaco · Arqueología',
      heroImg: 'https://picsum.photos/id/234/2000/1200',
      cardImg: 'https://picsum.photos/id/234/800/1000',
      airport: 'Llegada al Aeropuerto Carlos Martínez de Pinillos (TRU) en Trujillo, la Ciudad de la Eterna Primavera.',
      info: 'Ciudad de la Eterna Primavera. Importantes vestigios arqueológicos pre-incas de barro, la elegante Marinera norteña y caballitos de totora milenarios.',
      places: [
        { title: 'Ciudadela de Chan Chan', desc: 'Capital del Reino Chimú y la ciudad de adobe más grande de América precolombina (Patrimonio UNESCO). Intrincados laberintos decorados con motivos marinos.', img: 'https://picsum.photos/id/49/1600/1200' },
        { title: 'Huacas del Sol y de la Luna', desc: 'Santuarios Moche con templos superpuestos llenos de coloridos murales de divinidades mitológicas. Más de 1,500 años de historia desenterrada.', img: 'https://picsum.photos/id/14/1600/1200' },
        { title: 'Balneario de Huanchaco', desc: 'Pescadores desafiando las olas en los mismos «Caballitos de Totora» que usaban sus ancestros hace 3,000 años. Patrimonio Cultural de la Nación.', img: 'https://picsum.photos/id/12/1600/1200' }
      ]
    }
  };

  // ══════════════════════════════════════
  // 3. Render — Home Grid (con SEO tags)
  // ══════════════════════════════════════
  function renderGrid() {
    grid.innerHTML = Object.keys(DATA)
      .map((key) => {
        const d = DATA[key];
        return `
        <article class="card" data-dest="${key}">
          <img class="card__img" src="${d.cardImg}" alt="Turismo en ${d.name}, ${d.region} — ${d.seoTag}" loading="lazy">
          <div class="card__overlay"></div>
          <div class="card__body">
            <span class="card__label">Explorar destino</span>
            <h3 class="card__title">${d.name}</h3>
          </div>
        </article>`;
      })
      .join('');

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (card) showDestination(card.dataset.dest);
    });
  }

  // ══════════════════════════════════════
  // 4. SPA — Show Destination
  // ══════════════════════════════════════
  function showDestination(key) {
    const d = DATA[key];
    if (!d) return;

    $('#dest-hero-img').src = d.heroImg;
    $('#dest-hero-img').alt = `Destino turístico ${d.name}, ${d.region}`;
    $('#dest-title').textContent = d.name;
    $('#dest-subtitle').textContent = d.subtitle;
    $('#dest-geo').textContent = `📍 ${d.region} · ${d.seoTag}`;
    $('#dest-airport').textContent = d.airport;
    $('#dest-info-text').textContent = d.info;

    // Update page title for SEO
    document.title = `${d.name} — Turismo en ${d.region} | NovaTours Perú`;

    const list = $('#dest-places-list');
    list.innerHTML = d.places
      .map((p, i) => {
        const reverse = i % 2 !== 0 ? ' place--reverse' : '';
        return `
        <div class="place${reverse} reveal">
          <div class="place__img-wrap">
            <img src="${p.img}" alt="${p.title} — atractivo turístico en ${d.name}, Perú" loading="lazy">
          </div>
          <div class="place__text">
            <span class="place__number">0${i + 1}</span>
            <h3 class="place__title">${p.title}</h3>
            <div class="place__sep"></div>
            <p class="place__desc">${p.desc}</p>
          </div>
        </div>`;
      })
      .join('');

    viewHome.classList.add('is-hidden');
    viewDest.classList.remove('is-hidden');
    window.scrollTo({ top: 0, behavior: 'auto' });

    navObserver.disconnect();
    const destHero = $('.dest-hero');
    if (destHero) navObserver.observe(destHero);
  }

  // ══════════════════════════════════════
  // 5. SPA — Show Home
  // ══════════════════════════════════════
  function showHome() {
    viewDest.classList.add('is-hidden');
    viewHome.classList.remove('is-hidden');
    document.title = 'NovaTours Perú | Destinos Turísticos, Experiencias y Aventuras en Perú';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    navObserver.disconnect();
    navObserver.observe(hero);
  }

  $('#nav-home').addEventListener('click', (e) => { e.preventDefault(); showHome(); });
  $('#back-btn').addEventListener('click', showHome);

  // ── Init ──
  renderGrid();
})();
