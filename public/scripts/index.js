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

    $('#reg_success_modal_close_icon').click(function (event) {
        event.preventDefault();
        $('.reg_success_modal').slideUp();
        });

    $(document).ready(function () {
        $('.modal_reg_header').click(function () {
            $('.modal_registration').slideToggle('slow');
            $('#slider_icon_reg').css({'transform':'rotate(0)'})
            return false;
            });
        });

    $(document).ready(function () {
        $('.services_modal_header').click(function () {
            $('.services_list_modal').slideToggle('slow');
            $('#slider_icon_services').css({'transform':'rotate(0)'})
            return false;
            });
        });

    $(document).ready(function () {
        $('#slider_icon_reg').click(function () {
            $('.modal_registration').slideToggle('slow');
                $('#slider_icon_reg').css({'transform': 'rotate(180)'})
            return false;
        });
    });
    $(document).ready(function () {
        $('#slider_icon_services').click(function () {
            $('.services_list_modal').slideToggle('slow');
            $('#slider_icon_services').css({'transform':'rotate(0)'})
            return false;
        });
    });
    $('.registration').submit(function (event) {
        event.preventDefault();
        let parameters = $(this).serializeArray();
        $('.rectangle_4').slideUp();
        $.ajax("/api/contact", {
            method: 'GET',
            data: parameters,
            success: function (response) {
                // TODO : show successful modal
            },
            error: function (jqXHR, exception) {
                // TODO : show modal error
            },
        })
    });
})