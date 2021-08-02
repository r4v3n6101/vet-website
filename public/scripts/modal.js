$(function () {
    $('#reg_success_modal_close_icon').click(function (event) {
        event.preventDefault();
        $('.reg_success_modal').slideUp();
    });

    $('.modal_reg_header').click(function () {
        $('.modal_registration').slideToggle('slow');
        $('#slider_icon_reg').css({'transform': 'rotate(0)'})
        return false;
    });

    $('.services_modal_header').click(function () {
        $('.services_list_modal').slideToggle('slow');
        $('#slider_icon_services').css({'transform': 'rotate(0)'})
        return false;
    });

    $('#slider_icon_reg').click(function () {
        $('.modal_registration').slideToggle('slow');
        $('#slider_icon_reg').css({'transform': 'rotate(0)'})
        return false;
    });

    $('#slider_icon_services').click(function () {
        $('.services_list_modal').slideToggle('slow');
        $('#slider_icon_services').css({'transform': 'rotate(0)'})
        return false;
    });
})