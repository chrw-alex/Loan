'use strict'

window.addEventListener('DOMContentLoaded', () => {

  // Slider 
  class Slider {
    constructor(page, btns) {
      this.page = document.querySelector(page);
      this.slides = this.page.querySelectorAll('.slide');
      this.btns = document.querySelectorAll(btns);
      this.slideIndex = 1;

      this.slides.forEach(slide => {
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



      this.slides.forEach(slide => {
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

  const slider = new Slider('.page', '.next');
  slider.render();

  //playVideo

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

  const player = new VideoPlayer('.showup .play', '.overlay');
  player.init();


});