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
  let slider  = $('.articles__items'),
      wrapper = $('.articles__items-wrapper'),
      slide   = $('.articles .article'),
      page    = $('.articles');

  if (!page.hasClass('articles-page')) {
    if (widthWindow > 600) {
      slider.addClass('swiper-container');
      wrapper.addClass('swiper-wrapper');
      slide.addClass('swiper-slide');
  
      var articlesSlider = new Swiper(".articles__items", {
        slidesPerView: 'auto',
        spaceBetween: 17,
        navigation: {
          nextEl: ".articles .slider-arrow-next",
          prevEl: ".articles .slider-arrow-prev",
        },
        lazy: true,
        resistance: true,
        resistanceRatio: 0,
        watchSlidesVisibility: true,
      });
    } else {
      slider.removeClass('swiper-container swiper-container-initialized swiper-container-horizontal');
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
}



