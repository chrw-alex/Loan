'use strict'

window.addEventListener('DOMContentLoaded', () => {

  // slider
  class Slider {
    constructor({ container = null,
      btns = null,
      slides = null,
      next = null,
      prev = null,
      activeClass = '',
      animate,
      autoplay } = {}) {
      this.container = document.querySelector(container);
      this.slides = this.container.children;
      this.btns = document.querySelectorAll(btns);
      this.prev = document.querySelector(prev);
      this.next = document.querySelector(next);
      this.activeClass = activeClass;
      this.animate = animate;
      this.autoplay = autoplay;
      this.slideIndex = 1;
    }
  }

  // slider-main

  class MainSlider extends Slider {
    constructor(btns) {
      super(btns);

      Array.from(this.slides).forEach(slide => {
        slide.classList.add('animated', 'fadeIn');
      });
    }

    showSlides(n) {
      if (n > this.slides.length) {
        this.slideIndex = 1;
      }

      if (n < 1) {
        this.slideIndex = this.slides.length;
      }

      try {
        this.hanson.style.opacity = '0';

        if (n === 3) {
          this.hanson.classList.add('animated');
          setTimeout(() => {
            this.hanson.style.opacity = '1';
            this.hanson.classList.add('slideInUp');
          }, 3000);
        } else {
          this.hanson.classList.remove('slideInUp');
        }
      } catch (e) { }

      Array.from(this.slides).forEach(slide => {
        slide.style.display = 'none';
      });

      this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    }

    render() {
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (e) { }

      this.btns.forEach(item => {
        item.addEventListener('click', () => {
          this.plusSlides(1);
        });

        item.parentNode.previousElementSibling.addEventListener('click', (e) => {
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        });
      });

      this.showSlides(this.slideIndex);
    }
  }

  // slider-mini

  class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
      super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
      Array.from(this.slides).forEach(slide => {
        slide.classList.remove(this.activeClass);
        if (this.animate) {
          slide.querySelector('.card__title').style.opacity = '0.4';
          slide.querySelector('.card__controls-arrow').style.opacity = '0';
        }
      });

      if (!this.slides[0].closest('button')) {
        this.slides[0].classList.add(this.activeClass);
      }

      if (this.animate) {
        this.slides[0].querySelector('.card__title').style.opacity = '1';
        this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
      }
    }

    nextSlide() {
      if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
        this.container.appendChild(this.slides[0]); // Slide
        this.container.appendChild(this.slides[1]); // Btn
        this.container.appendChild(this.slides[2]); // Btn
        this.decorizeSlides();
      } else if (this.slides[1].tagName == "BUTTON") {
        this.container.appendChild(this.slides[0]); // Slide
        this.container.appendChild(this.slides[1]); // Btn
        this.decorizeSlides();
      } else {
        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();
      }
    }

    bindTriggers() {
      this.next.addEventListener('click', () => this.nextSlide());

      this.prev.addEventListener('click', () => {

        for (let i = this.slides.length - 1; i > 0; i--) {
          if (this.slides[i].tagName !== "BUTTON") {
            let active = this.slides[i];
            this.container.insertBefore(active, this.slides[0]);
            this.decorizeSlides();
            break;
          }
        }
      });
    }

    init() {
      this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

      this.bindTriggers();
      this.decorizeSlides();

      if (this.autoplay) {
        setInterval(() => this.nextSlide(), 5000);
      }
    }
  }


  //videoplayer

  class VideoPlayer {
    constructor(triggers, overlay) {
      this.btns = document.querySelectorAll(triggers);
      this.overlay = document.querySelector(overlay);
      this.close = this.overlay.querySelector('.close');
    }

    bindTriggers() {
      this.btns.forEach(btn => {
        btn.addEventListener('click', () => {

          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex';
          } else {
            const path = btn.getAttribute('data-url');

            this.createPlayer(path);
          }

        });
      });
    }

    bindCloseBtn() {
      this.close.addEventListener('click', () => {
        this.overlay.style.display = 'none';
        this.player.stopVideo();
      });
    }

    createPlayer(url) {
      this.player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: `${url}`
      });

      this.overlay.style.display = 'flex';
    }

    init() {
      const tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindCloseBtn();
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////
  const slider = new MainSlider({ btns: '.next', container: '.page', slides: '.slide' });
  slider.render();

  const showUpSlider = new MiniSlider({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true
  });
  showUpSlider.init();

  const modulesSlider = new MiniSlider({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active'
  });
  feedSlider.init();

  const player = new VideoPlayer('.showup .play', '.overlay');
  player.init();
});