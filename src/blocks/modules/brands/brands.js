import { Swiper, Navigation, Lazy } from "swiper";

Swiper.use([Navigation, Lazy ]);

var brandsSlider = new Swiper(".brands__items", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".brands .slider-arrow-next",
      prevEl: ".brands .slider-arrow-prev",
    },
    lazy: true,
    resistance: true,
    resistanceRatio: 0,
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 4,
      },
    },
    watchSlidesVisibility: true,
});