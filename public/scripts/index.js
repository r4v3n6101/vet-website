function loadCatalog(region) {
    $.get('/catalog', {region: region}, function (data) {
        $('.catalog_placeholder').html(data);
    });
}

$(function () {
    let regions = $('.region_button > *[name="region"]');
    loadCatalog(regions.filter(':checked').val());

    regions.change(function () {
        let region = $(this).val();
        loadCatalog(region);
    });

    $('#rct4_close_button').click(function (event) {
        event.preventDefault();
        $('.rectangle_4').slideUp();
    });

    $('#reg_success_close_button').click(function (event) {
        event.preventDefault();
        $('.reg_success').slideUp();
    });

    $('.registration').submit(function (event) {
        event.preventDefault();
        let parameters = $(this).serializeArray();
        $('.rectangle_4').slideUp();
        $.get("/api/contact", parameters, function (data) {
            $('.reg_success').slideDown();
        });
    });
})

// Global event for the whole page, not for every catalog
$(document).on('click', '*[data-modal]', function (event) {
    event.preventDefault();
    $(this).modal({
        modalClass: "modal_window",
        showClose: false,
        fadeDuration: 250,
        fadeDelay: 0.80
    });
})

$(document).on($.modal.CLOSE, function () {
    $('.date_selector input:checked').change(); // Update time-block after closing modal as data can be updated
});