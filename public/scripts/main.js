$(function () {
    $('*[data-modal]').click(function () {
        $(this).modal({
            modalClass: "modal_window",
            showClose: false,
        });
        return false;
    });
});