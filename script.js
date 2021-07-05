const accordion = document.querySelector(".accordion");
const slides1 = document.querySelectorAll(".slider-1__slide");
const btnLeft1 = document.querySelector(".slider-1__btn--left");
const btnRight1 = document.querySelector(".slider-1__btn--right");
const slides2 = document.querySelectorAll(".slider-2__slide");
const btnLeft2 = document.querySelector(".slider-2__btn--left");
const btnRight2 = document.querySelector(".slider-2__btn--right");

// Expand and collapse services

accordion.addEventListener("click", function (e) {
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
});

// Slider

const slider = function (slides, btnLeft, btnRight) {
  console.log(slides);

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

slider(slides1, btnLeft1, btnRight1);
slider(slides2, btnLeft2, btnRight2);
