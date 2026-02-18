import { Carousel } from './components/carrusel.js';
import { MegaMenu } from './components/menu.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const carousel = new Carousel('.hero_slider', '.slider_track', '.slide_item', 10000);
    carousel.init();

    const menu = new MegaMenu();
    menu.init();
});
