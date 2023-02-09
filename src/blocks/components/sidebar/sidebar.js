import $ from 'jquery';

let checkbox = $('.sidebar-input');

checkbox.on('click', function() {
    getActive($(this));
});

function getActive(input) {
    let item = $(input).closest('.sidebar-filters__list-item');

    if ($(input).is(':checked') == true) {
        $(item).addClass('active');
    } else {
        $(item).removeClass('active');
    }
}
