$(function () {
    $('*[data-modal]').click(function (event) {
        event.preventDefault();
        $(this).modal({
            modalClass: "modal_window",
            clickClose: false,
            showClose: false,
        });
    });
});