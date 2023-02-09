import $ from 'jquery';
import { Swiper, Navigation, Pagination, Lazy } from "swiper";

Swiper.use([Navigation, Lazy, Pagination]);

const compareSliderLeft = new Swiper(".swiper-container-left", {
    slidesPerView: 1,
    navigation: {
        nextEl: ".swiper-container-left .slider-arrow-next",
        prevEl: ".swiper-container-left .slider-arrow-prev",
    },
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    resistance: false,
    resistanceRatio: 0,
    pagination: {
        el: '.compare__sliders-pagination-1',
        type: 'bullets',
        clickable: true,
    },
    breakpoints: {
        1199: {
            slidesPerView: 'auto',
        }
    }
});

const compareSliderCenter = new Swiper(".swiper-container-center", {
    slidesPerView: 1,
    navigation: {
        nextEl: ".swiper-container-center .slider-arrow-next",
        prevEl: ".swiper-container-center .slider-arrow-prev",
    },
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    resistance: false,
    resistanceRatio: 0,
    pagination: {
        el: '.compare__sliders-pagination-2',
        type: 'bullets',
        clickable: true,
    },
    breakpoints: {
        1199: {
            slidesPerView: 'auto',
        }
    }
});

const compareSliderRight = new Swiper(".swiper-container-right", {
    slidesPerView: 1,
    navigation: {
        nextEl: ".swiper-container-right .slider-arrow-next",
        prevEl: ".swiper-container-right .slider-arrow-prev",
    },
    pagination: {
        el: '.compare__sliders-pagination-3',
        type: 'bullets',
        clickable: true,
    },
    observer: true,
    observeParents: true,
    resistance: false,
    resistanceRatio: 0,
    spaceBetween: 20,
    breakpoints: {
        1199: {
            slidesPerView: 'auto',
        }
    }
});

const compareTableSliderLeft = new Swiper(".swiper-container-table-left", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    allowTouchMove: false,
    resistance: false,
    resistanceRatio: 0,
    navigation: {
        nextEl: ".swiper-container-left .slider-arrow-next",
        prevEl: ".swiper-container-left .slider-arrow-prev",
    },
    breakpoints: {
        1199: {
            slidesPerView: 'auto',
        }
    },
    init: function() {
        $('.slides-length', this.$el).text(this.slides.length);
    }
});

const compareTableSliderCenter = new Swiper(".swiper-container-table-center", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    allowTouchMove: false,
    resistance: false,
    resistanceRatio: 0,
    navigation: {
        nextEl: ".swiper-container-center .slider-arrow-next",
        prevEl: ".swiper-container-center .slider-arrow-prev",
    },
    breakpoints: {
        1199: {
            slidesPerView: 'auto',
        }
    }
});

const compareTableSliderRight = new Swiper(".swiper-container-table-right", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    allowTouchMove: false,
    resistance: false,
    resistanceRatio: 0,
    navigation: {
        nextEl: ".swiper-container-right .slider-arrow-next",
        prevEl: ".swiper-container-right .slider-arrow-prev",
    },
    breakpoints: {
        1199: {
            slidesPerView: 'auto',
        }
    }
});

compareSliderLeft.on('slideChange', function() {
    compareTableSliderLeft.slideTo(this.activeIndex);
    $('.active-slide', this.$el).text(this.activeIndex + 1);
});

compareSliderCenter.on('slideChange', function() {
    compareTableSliderCenter.slideTo(this.activeIndex);
    $('.active-slide', this.$el).text(this.activeIndex + 1);
});

compareSliderRight.on('slideChange', function() {
    compareTableSliderRight.slideTo(this.activeIndex);
    $('.active-slide', this.$el).text(this.activeIndex + 1);
});


$('.compare__slider').each(function() {
    let slides      = $('.swiper-slide', $(this)),
        countInfo   = $('.slides-length', $(this));

        countInfo.text(slides.length);
});