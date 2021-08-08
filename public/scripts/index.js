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