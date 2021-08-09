$(function () {
    setupDateTimeSelector($('.date-time_selector'), false);
});

$(document).on('click', '*[data-modal]', function (event) {
    event.preventDefault();
    $(this).modal({
        modalClass: "modal_window",
        showClose: false,
        fadeDuration: 250,
        fadeDelay: 0.80
    });
})