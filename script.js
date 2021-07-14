"use strict";

const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__navigation");
const header = document.querySelector(".header");
const accordion = document.querySelector(".accordion");
const slides1 = document.querySelectorAll(".slider-1__slide");
const btnLeft1 = document.querySelector(".slider-1__btn--left");
const btnRight1 = document.querySelector(".slider-1__btn--right");
const slides2 = document.querySelectorAll(".slider-2__slide");
const btnLeft2 = document.querySelector(".slider-2__btn--left");
const btnRight2 = document.querySelector(".slider-2__btn--right");

// Sticky Nav

class Website {
  constructor() {
    // Slider
    this._slider(slides1, btnLeft1, btnRight1);
    this._slider(slides2, btnLeft2, btnRight2);

    // Attach Event Handlers
    navLinks.addEventListener("click", this._smoothScroll);
    accordion.addEventListener("click", this._toggleAccordion);
  }
  _smoothScroll = function (e) {
    e.preventDefault();

    if (!e.target.classList.contains("nav__link")) return;
    if (e.target.classList.contains("nav__link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  };

  _toggleAccordion = function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("accordion__button")) return;

    if (e.target.classList.contains("accordion__button")) {
      const button = e.target;
      const detail = e.target.nextElementSibling;
      const icon = button.querySelector(".svg__link");
      if (detail.classList.contains("detail--collapsed")) {
        detail.classList.remove("detail--collapsed");
        icon.setAttribute(
          "xlink:href",
          "img/symbol-defs.svg#icon-chevron-thin-up"
        );
      } else {
        detail.classList.add("detail--collapsed");
        icon.setAttribute(
          "xlink:href",
          "img/symbol-defs.svg#icon-chevron-thin-down"
        );
      }
    }
  };

  _slider = function (slides, btnLeft, btnRight) {
    let curSlide = 0;
    const maxSlide = slides.length;

    const goToSlide = function (slide) {
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
      );
    };

    const nextSlide = function () {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      goToSlide(curSlide);
    };

    const prevSlide = function () {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }

      goToSlide(curSlide);
    };

    goToSlide(0);

    btnLeft.addEventListener("click", prevSlide);
    btnRight.addEventListener("click", nextSlide);
  };
}

const website = new Website();

///////////////////////////////////////////////////////////////////////////////

class Observer {
  constructor() {
    const navHeight = nav.getBoundingClientRect().height;

    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: `-${navHeight}px`,
    };

    const headerObserver = new IntersectionObserver(
      this._observerCallback,
      observerOptions
    );
    headerObserver.observe(header);
  }

  _observerCallback = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add("nav__sticky");
    if (entry.isIntersecting) nav.classList.remove("nav__sticky");
  };
}

const observer = new Observer();
