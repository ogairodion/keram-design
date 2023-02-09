import $ from 'jquery';

let windowWidth     = $(window).width(),
    footerDropdown  = $('.footer__item-top');

windowWidth = $(window).width();
adaptiveFooter(windowWidth);

$(window).on('resize', function() {
    windowWidth = $(window).width();
    adaptiveFooter(windowWidth);
});

function adaptiveFooter(widthWindow) {
    if (widthWindow < 600) {
        footerDropdown.addClass('dropdown-top'); 
    } else {
        footerDropdown.removeClass('dropdown-top'); 
    }
}