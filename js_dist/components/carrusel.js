const datosBoletines = [
  {
      src: 'img/boletines/febrero.jpeg',
      tag: 'IMPUESTOS',
      fecha: '15 FEB, 2026',
      titulo: 'Nuevas regulaciones fiscales',
      hoverTitulo: 'Impacto de la reforma fiscal 2026',
      hoverDesc: 'Análisis detallado de cómo la nueva reforma afecta a las grandes empresas y las estrategias recomendadas.'
  },
  {
      src: 'img/boletines/marzo.jpeg',
      tag: 'TECNOLOGÍA',
      fecha: '02 MAR, 2026',
      titulo: 'IA en la Auditoría',
      hoverTitulo: 'El futuro de la auditoría automatizada',
      hoverDesc: 'Cómo las herramientas de IA están reduciendo tiempos de revisión y aumentando la precisión en los reportes.'
  },
  {
      src: 'img/boletines/abril.jpeg',
      tag: 'LEGAL',
      fecha: '10 ABR, 2026',
      titulo: 'Cambios en Ley Laboral',
      hoverTitulo: 'Actualización normativa laboral',
      hoverDesc: 'Resumen de los cambios en contratación y seguridad social que entran en vigencia este trimestre.'
  },
  {
      src: 'img/boletines/mayo.jpeg',
      tag: 'FINANZAS',
      fecha: '20 MAY, 2026',
      titulo: 'Estrategias de Inversión',
      hoverTitulo: 'Mercados emergentes en 2026',
      hoverDesc: 'Oportunidades clave en el sector de energías renovables y tecnología financiera.'
  },
  {
      src: 'img/boletines/junio.jpeg',
      tag: 'CIBERSEGURIDAD',
      fecha: '05 JUN, 2026',
      titulo: 'Protección de Datos',
      hoverTitulo: 'Protocolos ante ciberataques',
      hoverDesc: 'Guía práctica para blindar la infraestructura crítica de su organización ante nuevas amenazas.'
  }
];

export function initCarrusel(trackId) {
  const track = document.getElementById(trackId);
  let isPaused = false;
  let onInteraction = null;
  let isTransitioning = false;

  let baseItems = [...datosBoletines];
  while (baseItems.length < 5) baseItems = [...baseItems, ...datosBoletines];

  const displayList = [...baseItems, ...baseItems, ...baseItems];
  let currentIndex = baseItems.length;

  function render() {
    track.innerHTML = '';
    displayList.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'img_card';
      
      card.innerHTML = `
        <div class="card_header_tag">${item.tag}</div>
        <img src="${item.src}" alt="${item.titulo}">
        
        <div class="card_content_default">
          <div class="card_meta">
            <span class="meta_type">ARTICLE</span>
            <span class="meta_date">${item.fecha}</span>
          </div>
          <h3 class="card_title">${item.titulo}</h3>
        </div>

        <div class="card_hover_overlay">
          <div class="hover_meta">
             <span class="meta_type">ARTICLE</span>
             <span class="meta_date">${item.fecha}</span>
          </div>
          <h3 class="hover_title">${item.hoverTitulo}</h3>
          <p class="hover_desc">${item.hoverDesc}</p>
          <button class="hover_btn">LEER MÁS <span class="arrow">→</span></button>
        </div>
      `;

      card.onclick = () => {
        if (isTransitioning || currentIndex === i) return;
        currentIndex = i;
        if (onInteraction) onInteraction();
        actualizarUI();
      };
      track.appendChild(card);
    });
    actualizarUI(false);
  }

  function actualizarUI(animate = true) {
    if (animate) {
      isTransitioning = true;
      track.classList.remove('stop_transitions');
      track.style.transition = 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      track.classList.add('stop_transitions');
      track.style.transition = 'none';
    }

    const cards = track.querySelectorAll('.img_card');
    cards.forEach((card, i) => {
      card.classList.remove('active', 'side');
      if (i === currentIndex) card.classList.add('active');
      else if (Math.abs(i - currentIndex) === 1) card.classList.add('side');
    });

    const cardWidth = 190; 
    const offset = -(currentIndex * cardWidth) - 130;

    track.style.transform = `translateX(${offset}px)`;

    if (!animate) {
      void track.offsetWidth;
      setTimeout(() => {
        track.classList.remove('stop_transitions');
      }, 50);
    }
  }

  track.addEventListener('transitionend', (e) => {
    if (e.target !== track) return;

    isTransitioning = false;

    let jumpNeeded = false;
    if (currentIndex < baseItems.length) {
      currentIndex += baseItems.length;
      jumpNeeded = true;
    } else if (currentIndex >= baseItems.length * 2) {
      currentIndex -= baseItems.length;
      jumpNeeded = true;
    }

    if (jumpNeeded) {
      actualizarUI(false);
    }
  });

  render();

  return {
    next: () => { if (!isTransitioning) { currentIndex++; actualizarUI(); } },
    prev: () => { if (!isTransitioning) { currentIndex--; actualizarUI(); } },
    togglePause: () => { isPaused = !isPaused; return isPaused; },
    isPaused: () => isPaused,
    setOnInteraction: (cb) => { onInteraction = cb; }
  };
}
