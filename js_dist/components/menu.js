export class MegaMenu {
  constructor() {
    this.trigger = document.getElementById('servicios_trigger');
    this.menu = document.getElementById('mega_menu');
    this.overlay = document.getElementById('menu_overlay');
    this.header = document.querySelector('header');
  }

  init() {
    if (!this.trigger || !this.menu) {
      console.error("Menú: Elementos no encontrados");
      return;
    }
    this.trigger.addEventListener('mouseenter', () => {this.open();});
    this.menu.addEventListener('mouseenter', () => {this.open();});
    this.header.addEventListener('mouseleave', () => {this.close();});

    if(this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }
  }

  open() {
    this.menu.classList.add('active');
    this.trigger.classList.add('active');
    if(this.overlay) this.overlay.classList.add('active');
  }

  close() {
    this.menu.classList.remove('active');
    this.trigger.classList.remove('active');
    if(this.overlay) this.overlay.classList.remove('active');
  }
}
