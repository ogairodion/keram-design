import $ from 'jquery';

let tabs            = $('.favorites__tab'),
    products        =  $('.favorites__products'),
    collections     =  $('.favorites__collections');

tabs.each(function() {
    if ($(this).hasClass('active')) {
        getActiveTab($(this));
    }
})
    
tabs.on('click', function(e) {
    e.preventDefault();
    getActiveTab($(this));
    tabs.removeClass('active');
    $(this).addClass('active');
});

function getActiveTab(item) {
    let attr = item.data('items');

    switch(true) {
        case attr == 'products': 
            products.removeClass('hidden');
            collections.addClass('hidden');
        break;
        case attr == 'collections': 
            collections.removeClass('hidden');
            products.addClass('hidden');
        break;
    }
}