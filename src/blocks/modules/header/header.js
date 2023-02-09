import $ from "jquery";
import LazyLoad from "vanilla-lazyload";
// eslint-disable-next-line no-unused-vars
import fancybox from "@fancyapps/fancybox";
// eslint-disable-next-line no-unused-vars
import ionRangeSlider from "ion-rangeslider";

// eslint-disable-next-line no-unused-vars
global.$ = global.jQuery = $;
window.fancybox = $.fancybox;

// eslint-disable-next-line no-unused-vars
const lazyLoadInstance = new LazyLoad({});

let header              = $('.header'),
    headerHeight        = $('.header').height(),
    burger              = $('.header__burger'),
    windowWidth         = $(window).width(),
    search              = $('.header__search'),
    bottomMobile        = $('.header__bottom-mobile'),
    bottomWrapper       = $('.header__bottom-wrapper'),
    mobile              = $('.header__mobile-content'),
    phone               = $('.header__phone'),
    menu                = $('.header__menu'),
    catalogMenu         = $('.catalog-menu__wrapper'),
    catalogMenuWrapper  = $('.catalog-menu'),
    socials             = $('.header__socials'),
    headerTop           = $('.header__top-wrapper'),
    shadow              = $('.shadow'),
    cart                = $('.sidebar-cart-menu'),
    iconBasket          = $('.header__icon-basket'),
    body                = $('html, body'),
    compare             = $('.popup-compare'),
    compareProducts     = $('.popup-compare__products .table-product'),
    compareClose        = $('.popup-compare .btn-close'),
    compareBtn          = $('.popup-compare .btn-compare'),
    compareMessage      = $('.popup-compare__message'),
    headerCompare       = $('.header__icon-compare'),
    lkPopup             = $('.popup-lk'),
    lkButton            = $('.header__icon-lk'),
    filtersMobile       = $('.catalog-category-card__content-sidebar'),
    inputs              = $('.radio-input');


    // catalogMenu = $('.catalog-menu__items');

burger.on('click', function() {
    burgerFunc();
});

shadow.on('click', function() {
    $(this).addClass('hidden');

    cart.removeClass('open');
    menu.removeClass('open');
    body.removeClass('overflow-y-hidden');
    compare.addClass('hidden');
});

function burgerFunc() {
    header.toggleClass('open');
    if (!shadow.hasClass('hidden') && !header.hasClass('open')) {
        shadow.addClass('hidden');
    } else {
        shadow.removeClass('hidden');
    }
    cart.removeClass('open');
    compare.addClass('hidden');
    filtersMobile.addClass('hidden');
    lkPopup.addClass('hidden');
    
    if ($('body, html').hasClass('overflow-y-hidden')) {
        $('body, html').removeClass('overflow-y-hidden');
    } else {
        $('body, html').addClass('overflow-y-hidden');
    }
}

adaptiveMenu(windowWidth);
comparePopup();

$(window).on('resize', function() {
    windowWidth = $(window).width();

    adaptiveMenu(windowWidth);

    if (windowWidth > 767 && header.hasClass('open')) {
        header.removeClass('open z1001');
        shadow.addClass('hidden');
        $('body, html').removeClass('overflow-y');
    }
});

function adaptiveMenu(widthWindow) {
    switch(true) {
        case widthWindow < 767 && $('.header__search', bottomMobile).length == 0:
            bottomMobile.append(search);
            mobile.append(catalogMenu);
            mobile.append(menu);
            mobile.append(phone);
            mobile.append(socials);
        break;
        case widthWindow > 767 && $('.header__search', bottomMobile).length != 0:
            bottomWrapper.append(search);
            bottomWrapper.append(phone);
            headerTop.append(socials);
            headerTop.append(menu);
            catalogMenuWrapper.append(catalogMenu);
        break;
    }
}

$(window).on('scroll', function() {
    let scrollTop = $(window).scrollTop();
    let screen = $(window).width();
    let diff; 

    switch(true) {
        case screen > 1199: 
            diff = 123;
        break;
        case screen < 1199 && screen > 359: 
            diff = 125;
        break;
        case screen < 359: 
            diff = 120;
        break;
    }

    if (scrollTop > headerHeight) {
        header.addClass('fixed');
        $('main').css('margin-top', diff);
    } else {
        header.removeClass('fixed');
        $('main').css('margin-top', '0');
    }
});

$('.dropdown-menu-top').on('click', function() {
    if (windowWidth < 1199) {
        let wrapper = $(this).closest('.dropdown');
        $(wrapper).toggleClass('open');
    }
});

$('.dropdown-icon').on('click', function() {
    if (windowWidth < 1199) {
        let wrapper = $(this).closest('.dropdown');
        $(wrapper).toggleClass('open');
    }
});

$(document).on('click', '.dropdown-top', function(e) {
    let wrapper = $(this).closest('.dropdown');
    $(wrapper).toggleClass('open');
});

$("#range").ionRangeSlider({
    type: "double",
    min: 2,
    max: 75,
    from: 0,
    drag_interval: true,
    min_interval: null,
    max_interval: null,
    onStart: function (data) {
        $('.sidebar-filters__price-min input').val(data.from);
        $('.sidebar-filters__price-max input').val(data.to);
    },
    onFinish: function (data) {
        $('.sidebar-filters__price-min input').val(data.from);
        $('.sidebar-filters__price-max input').val(data.to);
    }
});

$("select").each(function(){
    var $this = $(this), numberOfOptions = $(this).children("option").length;
  
    $this.addClass("select-hidden"); 
    $this.wrap("<div class=\"select\"></div>");
    $this.after("<div class=\"select-styled\"></div>");

    var $styledSelect = $this.next("div.select-styled");
    $styledSelect.text($this.children("option").eq(0).text());
  
    var $list = $("<ul />", {
        "class": "select-options"
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $("<li />", {
            text: $this.children("option").eq(i).text(),
            rel: $this.children("option").eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children("li");
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $("div.select-styled.active").not(this).each(function(){
            $(this).removeClass("active").next("ul.select-options").hide();
        });
        $(this).toggleClass("active").next("ul.select-options").toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass("active");
        $this.val($(this).attr("rel"));
        $this.trigger('change');
        $list.hide();
    });
  
    $(document).click(function() {
        $styledSelect.removeClass("active");
        $list.hide();
    });

});

iconBasket.on('click', function(e) {
    e.preventDefault();
    getBasketSidebar();
});

function getBasketSidebar() {
    $('.catalog-menu').removeClass('open z1001');

    cart.toggleClass('open');
    body.toggleClass('overflow-y-hidden');
    lkPopup.addClass('hidden');
    compare.addClass('hidden');
    catalogMenuWrapper.removeClass('open');
    header.removeClass('open');

    if (!cart.hasClass('open')) {
        shadow.addClass('hidden');
    } else {
        shadow.removeClass('hidden');
    }
}

headerCompare.on('click', function(e) {
    e.preventDefault();
    filtersMobile.addClass('hidden');
    compare.toggleClass('hidden');
    shadow.addClass('hidden');
    lkPopup.addClass('hidden');
    body.removeClass('overflow-y-hidden');
    cart.removeClass('open');
    catalogMenuWrapper.removeClass('open');
    header.removeClass('open');
});

compareClose.on('click', function() {
    body.removeClass('overflow-y-hidden');
    compare.addClass('hidden');
});

lkButton.on('click', function(e) {
    e.preventDefault();
    filtersMobile.addClass('hidden');
    lkPopup.toggleClass('hidden');
    compare.addClass('hidden');
    shadow.addClass('hidden');
    header.removeClass('open');
    cart.removeClass('open');
    body.removeClass('overflow-y-hidden');
    catalogMenuWrapper.removeClass('open z1001');
});

function comparePopup() {
    if (compareProducts.length < 2) {
        compareMessage.removeClass('hidden');
        compareBtn.addClass('hidden');
    } 
    
    if (compareProducts.length > 1) {
        compareMessage.addClass('hidden');
        compareBtn.removeClass('hidden');
        compareClose.addClass('hidden');
        compareMessage.addClass('hidden');
    }
}

inputs.each(function() {
    if ($(this).is(':checked')) {
        let parent = $(this).parent();
        parent.addClass('active');
    }
})

$('.radio').on('click', function() {
    let parent = $(this).parent();
    $('.radio', parent).removeClass('active');
    $(this).addClass('active');
});

$(document).mouseup( function(e){ 
    let lk = $(".popup-lk"),
        compare = $('.popup-compare');

    if (!lk.is(e.target) && lk.has(e.target).length === 0) { 
        lk.addClass('hidden');
    }

    if (!compare.is(e.target) && compare.has(e.target).length === 0) { 
        compare.addClass('hidden');
    }

    if (!$('.catalog-category-card__content-sidebar').is(e.target) && $('.catalog-category-card__content-sidebar').has(e.target).length === 0) { 
        $('.catalog-category-card__content-sidebar').addClass('hidden');
    }
});

$('.input-arrow').on('click', function() {
    let $this           = $(this),
        inputWrapper    = $this.closest('.input-wrapper'),
        input           = $('.input', $(inputWrapper)),
        min             = parseInt($(input).attr('min')),
        value           = parseInt($(input).val()),
        step            = parseInt($(input).attr('step'));


        console.log(value - step)

        if ($this.hasClass('input-arrow-plus')) {
            value += step;
        } else {
            switch(true) {
                case value != min && value - step > 0:
                    value -= step;
                    break;
                case value != min && value - step <= 0:
                    value = 0;
                    break;
            }
        }
        
        $(input).val(value);
});
