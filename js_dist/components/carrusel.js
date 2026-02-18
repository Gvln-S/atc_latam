export class Carousel {
  constructor(containerSelector, trackSelector, itemSelector, intervalTime = 10000) {
    this.container = document.querySelector(containerSelector);
    this.track = document.querySelector(trackSelector);
    this.itemsClassName = itemSelector.replace('.', ''); 

    this.intervalTime = intervalTime;
    this.intervalId = null;
    this.isAnimating = false; 

    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.restartTimer = this.restartTimer.bind(this);
  }

  init() {
    if (!this.track) return;

    const nextBtn = document.querySelector('.next_btn');
    const prevBtn = document.querySelector('.prev_btn');

    if (nextBtn) nextBtn.addEventListener('click', () => {
      this.nextSlide();
      this.restartTimer();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      this.prevSlide();
      this.restartTimer();
    });

    this.track.addEventListener('mouseenter', (e) => {
      const item = e.target.closest(`.${this.itemsClassName}`);
      if (item) {
        this.stopTimer();
        this.highlightItem(item);
      }
    }, true); 

    this.track.addEventListener('mouseleave', () => {
      this.startTimer();
    });

    this.updateActiveStatus();
    this.startTimer();
  }

  nextSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.track.style.transition = 'transform 0.5s ease-in-out';
    this.track.style.transform = 'translateX(-25%)';

    setTimeout(() => {
      const firstItem = this.track.firstElementChild;
      this.track.appendChild(firstItem);
      this.track.style.transition = 'none';
      this.track.style.transform = 'translateX(0)';
      this.isAnimating = false;
      this.updateActiveStatus();

    }, 500);
  }

  prevSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const lastItem = this.track.lastElementChild;
    this.track.prepend(lastItem);

    this.track.style.transition = 'none';
    this.track.style.transform = 'translateX(-25%)';

    void this.track.offsetWidth;

    this.track.style.transition = 'transform 0.5s ease-in-out';
    this.track.style.transform = 'translateX(0)';

    setTimeout(() => {
      this.isAnimating = false;
      this.updateActiveStatus();
    }, 500);
  }

  updateActiveStatus() {
    const allItems = this.track.querySelectorAll(`.${this.itemsClassName}`);
    allItems.forEach(item => item.classList.remove('active'));

    if (allItems.length > 0) {
      this.highlightItem(allItems[0]);
    }
  }

  highlightItem(item) {
    const allItems = this.track.querySelectorAll(`.${this.itemsClassName}`);
    allItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const bgImage = item.getAttribute('data-bg');
    if (bgImage && this.container) {
      this.container.style.backgroundImage = `url('${bgImage}')`;
    }
  }

  startTimer() {
    this.stopTimer();
    this.intervalId = setInterval(this.nextSlide, this.intervalTime);
  }
  stopTimer() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
  restartTimer() {
    this.stopTimer();
    this.startTimer();
  }
}
