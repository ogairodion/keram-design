import { Swiper, Navigation, Lazy } from "swiper";
import $ from "jquery";

Swiper.use([Navigation, Lazy ]);

let windowWidth = $(window).width();

adaptiveSlider(windowWidth);

$(window).on('resize', function() {
  let widthWindow = $(window).width();
  adaptiveSlider(widthWindow);
});

function adaptiveSlider(widthWindow) {
  let slider  = $('.new-collection__items'),
      wrapper = $('.new-collection__items-wrapper'),
      slide   = $('.new-collection .collection');

  if (widthWindow > 600) {
    slider.addClass('swiper-container');
    wrapper.addClass('swiper-wrapper');
    slide.addClass('swiper-slide');

    var newCollectionSlider = new Swiper(".new-collection__items", {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
          nextEl: ".new-collection .slider-arrow-next",
          prevEl: ".new-collection .slider-arrow-prev",
        },
        lazy: true,
        resistance: true,
        resistanceRatio: 0,
        watchSlidesVisibility: true,
    });
  } else {
    slider.removeClass('swiper-container');
    wrapper.removeClass('swiper-wrapper');
    slide.removeClass('swiper-slide swiper-slide-next swiper-slide-prev swiper-slide-active');

    $(slide).each(function() {
      let img = $('img', $(this));
      let imgSrc = img.attr('data-src');

      img.attr('src', imgSrc);
      img.addClass('swiper-lazy-loaded');
    });
  }
}



