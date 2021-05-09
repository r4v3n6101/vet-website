$(function () {
    $('*[data-modal]').click(function (event) {
        event.preventDefault();
        $(this).modal({
            modalClass: "modal_window",
            clickClose: false,
            showClose: false,
            fadeDuration: 250,
            fadeDelay: 0.80
        });
    });
});