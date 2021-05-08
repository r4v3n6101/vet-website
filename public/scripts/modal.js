$(function () {
    $('*[data-modal]').click(function (event) {
        event.preventDefault();
        $(this).modal({
            modalClass: "modal_window",
            escapeModal: false,
            clickClose: false,
            showClose: false,
        });
    });
});