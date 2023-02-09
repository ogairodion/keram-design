import { Swiper, Navigation, Lazy, Thumbs, EffectFade } from "swiper";
import $ from "jquery";

Swiper.use([Navigation, Lazy, Thumbs, EffectFade ]);

let sliders = $('.catalog-main__slider'),
    windowWidth,
    control = $('.catalog-detail-description-tabs__control'),
    tab = $('.catalog-detail-description-tabs__item'),
    descriptionTitle = $('.catalog-detail-description__title'),
    articleDescription = $('.catalog-detail-description__article'),
    brandDescription = $('.catalog-detail-description__collection'),
    fabricDescription = $('.catalog-detail-description__fabric-text'),
    mobile = $('.catalog-category-card__content-sidebar'),
    filters = $('.sidebar-filters__form'),
    sidebar = $('.sidebar');


windowWidth = $(window).width();
adaptiveCatalog(windowWidth);
adaptiveDescription(windowWidth);

$(window).on('resize', function() {
    let widthWindow = $(window).width();
    adaptiveCatalog(widthWindow);
    adaptiveDescription(widthWindow);
});

sliders.each(function(i) {
    $(this).addClass('catalog-main__slider-' + i);

    let catalogSlider = new Swiper(".catalog-main__slider-" + i, {
        slidesPerView: 'auto',
        spaceBetween: 18,
        navigation: {
          nextEl: ".catalog-main__slider .slider-arrow-next",
          prevEl: ".catalog-main__slider .slider-arrow-prev",
        },
        lazy: true,
        watchSlidesVisibility: true,
        resistance: true,
        resistanceRatio: 0,
    });
});

const catalogDetailSliderThumbs = new Swiper(".catalog-collections-detail__slider-thumbs", {
    slidesPerView: 3,
    spaceBetween: 18,
    lazy: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    grabCursor: true,
    breakpoints: {
        1199: {
            slidesPerView: 4,
            spaceBetween: 22,
        }
    }
});

const catalogDetailSliderMain = new Swiper(".catalog-collections-detail__slider-main", {
    slidesPerView: 1,
    navigation: {
        nextEl: ".catalog-collections-detail__slider .slider-arrow-next",
        prevEl: ".catalog-collections-detail__slider .slider-arrow-prev",
    },
    lazy: true,
    thumbs: {
        swiper: catalogDetailSliderThumbs,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    observer: true,
    observeParents: true,
});

if (!$('.catalog-detail-description').hasClass('no-img')) {
    const catalogDetailDescriptionThumbs = new Swiper(".catalog-detail-description__thumbs", {
        slidesPerView: 'auto',
        navigation: {
            nextEl: ".catalog-detail-description__thumbs-wrapper .slider-arrow-next",
            prevEl: ".catalog-detail-description__thumbs-wrapper .slider-arrow-prev",
        },
        lazy: true,
        observer: true,
        spaceBetween: 18,
        observeParents: true,
        watchSlidesProgress: true,
        breakpoints: {
            1199: {
                direction: 'vertical',
            }
        }
    });
    
    const catalogDetailDescriptionSlider = new Swiper(".catalog-detail-description__slider", {
        slidesPerView: 1,
        lazy: true,
        thumbs: {
            swiper: catalogDetailDescriptionThumbs,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        observer: true,
        observeParents: true,
    });
    
    catalogDetailDescriptionThumbs.on('slideChange', function() {
        catalogDetailDescriptionSlider.slideTo(this.activeIndex);
    });
}

$('.catalog-collections-detail__slider-main .swiper-slide').each(function() {
    let imageURL = $('img', $(this)).attr('src') ?? $('img', $(this)).data('src'),
        slideWrapper = $('.swiper-slide__wrapper', $(this));
    
    if (slideWrapper) {
        slideWrapper.css({'background': `url(.././${imageURL})`});
    }
});

function adaptiveCatalog(widthWindow) {
    let parent = $('.catalog-collections-detail');

    if (parent) {
        let top = $('.page-top__info'),
            info = $('.catalog-collections-detail__info-content'),
            infoBody = $('.catalog-collections-detail__info');

        switch(true) {
            case widthWindow < 1199 && $('.page-top__info .catalog-collections-detail__info-content').length == 0: 
                top.append(info);
            break;
            case widthWindow > 1199 && $('.catalog-collections-detail__info .catalog-collections-detail__info-content').length == 0: 
                infoBody.append(info);
            break;
        }
    }
}

function adaptiveDescription(widthWindow) {
    let parent = $('.catalog-detail-description');

    if (parent) {
        let top = $('.page-top__back-mobile'),
            info = $('.catalog-detail-description__info'),
            collection = $('.catalog-detail-description__brand'),
            fabric = $('.catalog-detail-description__fabric');

        switch(true) {
            case widthWindow < 1199 && $('.page-top__back-mobile .catalog-detail-description__title').length == 0: 
                top.append(descriptionTitle);
                top.append(articleDescription);
                top.append(brandDescription);
                top.append(fabricDescription);
                mobile.append(filters);
            break;
            case widthWindow > 1199 && $('.catalog-detail-description__info .catalog-detail-description__title').length == 0: 
                info.append(articleDescription);
                info.append(descriptionTitle);
                collection.append(brandDescription);
                fabric.append(fabricDescription);
                sidebar.append(filters);
            break;
        }
    }
}
 
control.on('click', function() {
    let id = $(this).data('id');
    control.removeClass('active');
    $(this).addClass('active');

    tab.each(function() {
        let tabID = $(this).data('id');

        if (id == tabID) {
            $(this).removeClass('hidden');
        } else {
            $(this).addClass('hidden');
        }
    }); 
});

$('.filters__mobile').on('click', function(e) {
    e.preventDefault();
    if (windowWidth < 1199) {
        mobile.toggleClass('hidden');
    }
});
