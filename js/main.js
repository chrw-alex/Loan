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

      this.slides.forEach(slide => {
        slide.style.display = 'none';
      });

      this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    }

    render() {
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


});