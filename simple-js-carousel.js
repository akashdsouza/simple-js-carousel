class SJCarousel {
  indicatorListeners = []
  constructor(el = '.sj-carousel-container', {
    autoScroll,
    visibleCount,
    keyboardListenerOnDoc
  } = {}) {
    this.carouselContainer = typeof el === 'string' ? document.querySelector(el) : el;
    if (!this.carouselContainer) {
      return;
    }
    this.carouselElements = Array.from(this.carouselContainer.querySelectorAll('.sj-carousel-slide'));
    this.containerWidth = this.carouselContainer.getBoundingClientRect().width;
    this.carouselContent = this.carouselContainer.querySelector('.sj-carousel-content');
    this.activeElement = 0;
    this.visibleCount = visibleCount || 1;
    this.keyboardListenerOnDoc = keyboardListenerOnDoc;
    this.setContentWidth();
    this.goToElement(this.activeElement);
    this.addIndicatorEvents();
    this.setLeftRightNavigation();
    this.addKeyboardEvents();
    this.addResizeEventHandler();
    this.removeResizeEventHandler();
    if (autoScroll) {
      this.autoScroll();
    }
  }
  autoScroll() {
    this.scrollTimeout = setTimeout(() => {
      this.goToNext();
      this.autoScroll();
    }, 6000);
  }
  setContentWidth() {
    this.carouselElements.forEach((el) => {
      el.style.flexBasis = `${this.containerWidth / this.visibleCount}px`;
    })
  }
  goToElement(position) {
    this.activeElement = position;
    this.carouselContent.style.transform = `translateX(${position * (this.containerWidth / this.visibleCount) * -1}px)`;
  }
  addIndicatorEvents() {
    this.carouselIndicators = Array.from(this.carouselContainer.querySelectorAll('.sj-carousel-indicators'));
    this.carouselIndicators.forEach((indicator, index) => {
      let cb = () => {
        this.goToElement(index);
      }
      this.indicatorListeners.push(cb);
      indicator.addEventListener('click', cb);
    });
  }
  removeCarouselIndicatorEvents() {
    this.carouselIndicators.forEach((indicator, index) => {
      indicator.removeEventListener('click', this.indicatorListeners[index]);
    })
  }
  goToPrev = () => {
    let activeElement = this.activeElement;
    let length = this.carouselElements.length;
    this.goToElement((activeElement + length - 1) % length);
  }
  goToNext = () => {
    let activeElement = this.activeElement;
    let length = this.carouselElements.length;
    this.goToElement((activeElement + 1) % length);
  }
  keydownHandler = ({ keyCode }) => {
    if (keyCode === 37) {
      // Left key
      this.goToPrev();
    } else if (keyCode === 39) {
      // Right key
      this.goToNext();
    }
  }
  addKeyboardEvents() {
    if (this.keyboardListenerOnDoc) {
      document.addEventListener('keydown', this.keydownHandler);
    } else {
      this.carouselContainer.addEventListener('keydown', this.keydownHandler);
    }
  }
  removeKeyBoardEvents() {
    if (this.keyboardListenerOnDoc) {
      document.removeEventListener('keydown', this.keydownHandler);
    } else {
      this.carouselContainer.removeEventListener('keydown', this.keydownHandler);
    }
  }
  setLeftRightNavigation() {
    let prev = document.querySelector('.sj-carousel-prev');
    let next = document.querySelector('.sj-carousel-next');
    prev.addEventListener('click', this.goToPrev);
    next.addEventListener('click', this.goToNext);
  }
  removeLeftRightNavigation() {
    let prev = document.querySelector('.sj-carousel-prev');
    let next = document.querySelector('.sj-carousel-next');
    prev.removeEventListener('click', this.goToPrev);
    next.removeEventListener('click', this.goToNext);
  }
  removeEventListeners() {
    this.removeCarouselIndicatorEvents();
    this.removeKeyBoardEvents();
    this.removeLeftRightNavigation();
    this.removeResizeEventHandler();
  }
  windowResized = () => {
    this.containerWidth = this.carouselContainer.getBoundingClientRect().width;
    this.setContentWidth();
    this.goToElement(this.activeElement);
  }
  addResizeEventHandler() {
    window.addEventListener('resize', this.windowResized);
  }
  removeResizeEventHandler() {
    window.addEventListener('resize', this.windowResized);
  }
}

module.exports = SJCarousel;