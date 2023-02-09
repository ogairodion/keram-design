import { Swiper, Navigation, Lazy } from "swiper";

Swiper.use([Navigation, Lazy ]);

var salesSlider = new Swiper(".sales__items", {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      nextEl: ".sales .slider-arrow-next",
      prevEl: ".sales .slider-arrow-prev",
    },
    lazy: true,
    resistance: true,
    resistanceRatio: 0,
    watchSlidesVisibility: true,
});