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

  // difference

  class Difference {
    constructor(oldOfficer, newOfficer, items) {
      this.oldOfficer = document.querySelector(oldOfficer);
      this.newOfficer = document.querySelector(newOfficer);
      this.oldItems = this.oldOfficer.querySelectorAll(items);
      this.newItems = this.newOfficer.querySelectorAll(items);

      this.oldCounter = 0;
      this.newCounter = 0;

      this.oldItems.forEach(item => {
        item.classList.add('animated', 'fadeIn');
      });

      this.newItems.forEach(item => {
        item.classList.add('animated', 'fadeIn');
      });
    }

    bindTriggers(container, items, counter) {
      container.querySelector('.plus').addEventListener('click', () => {
        if (counter !== items.length - 2) {
          items[counter].style.display = 'flex';
          counter++;
        } else {
          items[counter].style.display = 'flex';
          items[items.length - 1].remove();
        }
      });
    }

    hideItems(items) {
      items.forEach((item, i, arr) => {
        if (i !== arr.length - 1) {
          item.style.display = 'none';
        }
      });
    }

    init() {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);
      this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
      this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
    }
  }

  // form

  class Form {
    constructor(forms) {
      this.forms = document.querySelectorAll(forms);
      this.inputs = document.querySelectorAll('input');
      this.message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Упс! Что-то пошло не так...'
      };
      this.path = 'assets/question.php';
    }

    clearInputs() {
      this.inputs.forEach(input => {
        input.value = '';
      });
    }

    checkMailInputs() {
      const mailInputs = document.querySelectorAll('[type="email"]');

      mailInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
          if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
            e.preventDefault();
          }
        });
      });
    }

    initMask() {
      let setCursorPosition = (pos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
          elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
          let range = elem.createTextRange();

          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
      };

      function createMask(event) {
        let matrix = '+1 (___) ___-____',
          i = 0,
          def = matrix.replace(/\D/g, ''),
          val = this.value.replace(/\D/g, '');

        if (def.length >= val.length) {
          val = def;
        }

        this.value = matrix.replace(/./g, function (a) {
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
          if (this.value.length == 2) {
            this.value = '';
          }
        } else {
          setCursorPosition(this.value.length, this);
        }
      }

      let inputs = document.querySelectorAll('[name="phone"]');

      inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
      });
    }

    async postData(url, data) {
      let res = await fetch(url, {
        method: 'POST',
        body: data
      });

      return await res.text();
    }

    init() {
      this.checkMailInputs();
      this.initMask();
      this.forms.forEach(item => {
        item.addEventListener('submit', (e) => {
          e.preventDefault();

          let statusMessage = document.createElement('div');
          statusMessage.style.cssText = `
            margin-top: 15px;
            font-size: 18px;
            color: grey;
          `;
          item.parentNode.appendChild(statusMessage);

          statusMessage.textContent = this.message.loading;

          const formData = new FormData(item);

          this.postData(this.path, formData)
            .then(res => {
              console.log(res);
              statusMessage.textContent = this.message.success;
            })
            .catch(() => {
              statusMessage.textContent = this.message.failure;
            })
            .finally(() => {
              this.clearInputs();
              setTimeout(() => {
                statusMessage.remove();
              }, 6000);
            });
        });
      });
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

  new Difference('.officerold', '.officernew', '.officer__card-item').init();

  new Form('.form').init()
});