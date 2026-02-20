export class Mega_menu {
  constructor() {
    this.trigger = document.getElementById('servicios_trigger');
    this.menu = document.getElementById('mega_menu');
    this.overlay = document.getElementById('menu_overlay');
    this.header = document.querySelector('header');

    this.hamburger = document.getElementById('hamburger_trigger');
    this.mobileSidebar = document.getElementById('mobile_sidebar');
    this.mobileAccordions = document.querySelectorAll('li.has_accordion');
    this.mobileSubAccordions = document.querySelectorAll('li.has_sub_accordion');
  }

  init() {
    if (this.trigger) {
      this.trigger.addEventListener('mouseenter', () => this.open());
      this.menu.addEventListener('mouseenter', () => this.open());
      this.header.addEventListener('mouseleave', () => this.close());
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', () => {
        this.close();
        this.closeMobile();
      });
    }

    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMobile());
    }

    this.mobileAccordions.forEach(acc => {
      const header = acc.querySelector('div.accordion_header');
      header.addEventListener('click', () => acc.classList.toggle('active'));
    });

    this.mobileSubAccordions.forEach(sub => {
      const header = sub.querySelector('div.sub_accordion_header');
      header.addEventListener('click', (e) => {
        e.stopPropagation();
        sub.classList.toggle('active');
      });
    });
  }

  open() {
    if (window.innerWidth > 768) {
      this.menu.classList.add('active');
      this.trigger.classList.add('active');
      this.overlay.classList.add('active');
    }
  }

  close() {
    this.menu.classList.remove('active');
    this.trigger.classList.remove('active');
    this.overlay.classList.remove('active');
  }

  toggleMobile() {
    this.hamburger.classList.toggle('active');
    this.mobileSidebar.classList.toggle('active');
    this.overlay.classList.toggle('active');
  }

  closeMobile() {
    this.hamburger.classList.remove('active');
    this.mobileSidebar.classList.remove('active');
    this.overlay.classList.remove('active');
  }
}
