import { Swiper, Pagination, Navigation, EffectFade, Lazy } from "swiper";

Swiper.use([Pagination, Navigation, EffectFade, Lazy]);

var mainSlider = new Swiper(".main-top__slider", {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: ".main-top .slider-arrow-next",
      prevEl: ".main-top .slider-arrow-prev",
    },
    pagination: {
      el: ".main-top .slider-pagination",
      clickable: true,
    },
    allowTouchMove: false,
    loop: true,
    lazy: true,
    speed: 800,
});

var mainSliderInfo = new Swiper(".main-top__info", {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: ".main-top .slider-arrow-next",
      prevEl: ".main-top .slider-arrow-prev",
    },
    pagination: {
      el: ".main-top .slider-pagination",
      clickable: true,
    },
    allowTouchMove: false,
    loop: true,
    lazy: true,
    speed: 800,
});

mainSliderInfo.on('slideChange', () => {
  let wrapper = $('.main-top__content');

  if ($(mainSliderInfo.slides[mainSliderInfo.activeIndex]).hasClass('right')) {
    wrapper.addClass('right-content');
  } else {
    wrapper.removeClass('right-content');
  }
});