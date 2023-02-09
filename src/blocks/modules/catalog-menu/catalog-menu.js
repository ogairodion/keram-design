import $ from "jquery";
import Swiper from 'swiper';

let shadow      = $('.shadow'),
    links       = $('.catalog-menu__item'),
    bodies      = $('.catalog-menu__body'),
    parent      = $('.catalog-menu'),
    activeBody,
    header      = $('.header'),
    body        =  $('html, body'),
    isMobile    = false,
    windowWidth,
    watcher     = null,
    catalogMenuSlider;

bodies.addClass('hidden');

windowWidth = $(window).width();

adaptiveCatalogMenu(windowWidth);
getSlider();

if (windowWidth < 767) {
    isMobile = true;
    getArrow();
} else {
    isMobile = false;
}

isMobileWatcher(isMobile);
adaptiveCatalogMenu(windowWidth);

$(window).on('resize', function() {
    windowWidth = $(window).width();

    if (windowWidth < 767) {
        isMobile = true;
        isMobileWatcher(isMobile);
        getArrow();
    } else {
        isMobile = false;
        isMobileWatcher(isMobile);
    }
});

function isMobileWatcher(isMobile) {
    if (watcher == null) {
        watcher = isMobile;
    }

    if (watcher !== isMobile) {
        watcher = !watcher;
        adaptiveCatalogMenu(windowWidth);
    }
}

links.each(function(i) {
    if (i == 0) {
        $(this).addClass('active');
        $(bodies[0]).removeClass('hidden');  
        activeBody = $(bodies[0]);      
    }
});

function getSlider() {
    if ($('.catalog-menu__items').hasClass('swiper-container')) {
        catalogMenuSlider = new Swiper(".catalog-menu__items", {
            slidesPerView: 1,
            observer: true,
            observeParents: true,
            autoHeight: true,
            clickable: false,
            breakpoints: {
                767: {
                    slidesPerView: 3,
                    resistance: true,
                    resistanceRatio: 0,
                },
            }
        });
    }
}

if ($('.catalog-menu__items').hasClass('swiper-container')) {
    catalogMenuSlider.on('slideChange', function(){
        catalogMenuSlider.update();
        catalogMenuSlider.updateAutoHeight();
    });
} 

$('.catalog-menu__burger').on('click', function() {
    parent.toggleClass('open z1001');
    shadow.toggleClass('hidden');
    body.toggleClass('overflow-y-hidden');
    $('.sidebar-cart-menu').removeClass('hidden');
    $('.popup-compare').addClass('hidden');
    $('.popup-lk').addClass('hidden');

    $('.catalog-menu__item-text').each(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
    });

    $('.catalog-menu__left-item', activeBody).each(function(i) {
        if (i == 0) {
            let itemID = $(this).data('id');
            $(this).addClass('active');

            getActiveContent(itemID, activeBody);
        }
    });
});

shadow.on('click', function() {
    parent.removeClass('open z1001');
    shadow.addClass('hidden');

    $('body, html').removeClass('overflow-y-hidden');
});

function getActiveContent(id, wrapper) {
    let content = $('.catalog-menu__content', wrapper);

    content.addClass('hidden');

    content.each(function() {
        let contentID = $(this).data('id');

        if (contentID == id) {
            $(this).removeClass('hidden');
        } else {
            $(this).addClass('hidden');
        }
    });
}

function adaptiveCatalogMenu() {
    let slider = $('.catalog-menu__items');
    if (!watcher) {
        slider.removeClass('swiper-container-pointer-events swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-autoheight');
        $('.catalog-menu__items-wrapper', slider).removeClass('swiper-wrapper');
        $('.catalog-menu__items-wrapper', slider).removeAttr('style');
        $('.catalog-menu__item', slider).removeClass('swiper-slide swiper-slide-active swiper-slide-prev swiper-slide-next');
        $('.catalog-menu__left-item').removeClass('dropdown');
        $('.catalog-menu__left-list').removeClass('dropdown-list');
        $('.catalog-menu__item').removeAttr('style');
        $('.catalog-menu').removeClass('open');
        $('.catalog-menu__item-text').removeClass('active');
        $('.shadow').addClass('hidden');
        destroySlider(slider);
    } else {
        slider.addClass('swiper-container');
        $('.catalog-menu__items-wrapper', slider).addClass('swiper-wrapper');
        $('.catalog-menu__item', slider).addClass('swiper-slide ');
        $('.catalog-menu__left-item').addClass('dropdown');
        $('.catalog-menu__left-list').addClass('dropdown-list');
        $('.catalog-menu__body').removeClass('hidden');
        $('.catalog-menu__content').removeClass('hidden');
        $('.shadow').addClass('hidden');
        
        getSlider();
        getSlidersLists(slider);
    }
}

function getSlidersLists(items) {
    items.each(function() {
        let menuItems   = $('.catalog-menu__left-item', $(this)),
            menuBodies  = $('.catalog-menu__body-right', $(this));

            getSlidersListsItems($(this), menuItems, menuBodies);
    });
}

function getSlidersListsItems($this, menuItems, menuBodies) {
    $(menuItems, $this).each(function(i) {
        if ($('.catalog-menu__left-list .catalog-menu__body-right', $(this)).length == 0) {
            if ($(menuBodies[i]).hasClass('empty')) {
                let parent = $('.catalog-menu__left-list', $(this)).closest('.catalog-menu__left-item');
                $(parent).addClass('empty');
            } else {
                $(parent).removeClass('empty');
            }
            $('.catalog-menu__left-list', $(this)).append(menuBodies[i]);
        }
    });
}

function destroySlider(slider) {
    let items = $('.catalog-menu__item', slider);

    items.each(function() {
        let body        = $('.catalog-menu__body', $(this)),
            leftItems   = $('.catalog-menu__left-item', $(this));

            destroySliderLists(body, leftItems, slider);
    });
}

function destroySliderLists(body, leftItems, slider) {
    if ($('.catalog-menu__left-list .catalog-menu__body-right', slider).length != 0) {
        leftItems.each(function() {
            let list        = $('.catalog-menu__left-list', $(this)),
                bodyRight   = $('.catalog-menu__body-right', $(this));
    
            if ($(bodyRight, list).length !== 0) {
                bodyRight.addClass('hidden');
                body.append(bodyRight);
            }
        });
    }
}

$('.catalog-menu__left-item').on('mouseover', function() {
    let itemID = $(this).data('id');

    if (!$(this).hasClass('dropdown')) {
        $('.catalog-menu__left-item').removeClass('active');

        $(this).addClass('active');
    
        getActiveContent(itemID, activeBody);
    } else {
        catalogMenuSlider.update();
        catalogMenuSlider.updateAutoHeight();
    }
});

function getArrow() {
    let items = $('.catalog-menu__columns');

    items.each(function(index, elem) {
        let item        = $('.catalog-menu__columns', $(this)),
            categories  = $('.catalog-menu__content-title', elem),
            parent      = $(this).closest('.catalog-menu__left-item');

        if (categories.length === 0) {
            $('.dropdown-icon', item).addClass('hidden');
        } else {
            $('.dropdown-icon', item).removeClass('hidden');
        }
    });
}

$('.catalog-menu__body-right').each(function() {
    let items = $('.catalog-menu__column-title', $(this));

    if (items.length == 0) {
        $(this).addClass('empty');
    } else {
        $(this).removeClass('empty');
    }
});