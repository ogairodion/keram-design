import $ from "jquery";

let actualBtn = $('#actual-btn');
let fileChosen = $('#file-chosen');
let uploadMessage = $('.form__upload');

actualBtn.on('change', function(){
    uploadMessage.removeClass('hidden');
    fileChosen.text(this.files[0].name);
})

$('#delete-file').on('click', function() {
    actualBtn.val('');
    fileChosen.text('');
    uploadMessage.addClass('hidden');
});