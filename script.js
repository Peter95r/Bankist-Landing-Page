'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//@@@@@ tab elements

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const operationContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  operationContents.forEach(c =>
    c.classList.remove('operations__content--active')
  );

  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});

//@@@@@ shade effect

const shadeEffect = function (e) {
  const hovered = e.target.parentElement;

  if (hovered.classList.contains('nav__item')) {
    const siblings = nav.querySelectorAll('.nav__item');
    siblings.forEach(s => {
      if (s !== hovered) s.style.opacity = this;
    });
    nav.querySelector('img').style.opacity = this;
  }
};

const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', shadeEffect.bind(0.5));
nav.addEventListener('mouseout', shadeEffect.bind(1));

//@@@@@ sticky navigation

const callBackSticky = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const header = document.querySelector('.header');

const optionsSticky = {
  root: null,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
  threshold: 0,
};
const observerHeader = new IntersectionObserver(callBackSticky, optionsSticky);
observerHeader.observe(header);

//@@@@@ appearing sections

const callBackSections = function (entries, obsever) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    console.log(entry);
    entry.target.classList.remove('section--hidden');
    obsever.unobserve(entry.target);
  }
};
const sections = document.querySelectorAll('.section');

const optionsSections = {
  root: null,
  threshold: 0,
};

const observerSections = new IntersectionObserver(
  callBackSections,
  optionsSections
);
sections.forEach(section => {
  section.classList.add('section--hidden');
  observerSections.observe(section);
});

//@@@@@ lazy images

const lazyImages = document.querySelectorAll('img[data-src');

const lazyOptions = {
  root: null,
  threshold: 0.1,
};

const lazyCallBack = function (entries, oberver) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (e) {
    entry.target.classList.toggle('lazy-img');
    observerHeader.unobserve(entry.target);
  });
};

const lazyObserver = new IntersectionObserver(lazyCallBack, lazyOptions);

lazyImages.forEach(img => {
  lazyObserver.observe(img);
});

//@@@slider component

const sliderFunctionality = function () {
  //elements
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  //functions
  const createDots = function () {
    slides.forEach((s, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide=${i}></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');

      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
    });
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide + 1 === maxSlide) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  //init
  init();
  //event handlers

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliderFunctionality();
