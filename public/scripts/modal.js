function toggleRotate(e) {
    let closed = e.attr('state');
    if (closed === "closed") {
        e.attr('state', 'opened');
        $({deg: 180}).animate({deg: 0}, {
            duration: 400,
            step: function (now) {
                e.css({transform: 'rotate(' + now + 'deg)'});
            }
        });
    } else {
        e.attr('state', 'closed');
        $({deg: 0}).animate({deg: 180}, {
            duration: 400,
            step: function (now) {
                e.css({transform: 'rotate(' + now + 'deg)'});
            }
        });
    }
}

$(function () {
    setupDateTimeSelector($('*[datetime]'), true);

    $('#reg_success_modal_close_icon').click(function (event) {
        event.preventDefault();
        $('.reg_success_modal').slideUp();
    });

    $('.modal_reg_header').click(function (event) {
        $('.modal_registration').slideToggle('slow');
        toggleRotate($('#slider_icon_reg'));
        event.preventDefault();
    });

    $('#slider_icon_reg').click(function (event) {
        $('.modal_registration').slideToggle('slow');
        toggleRotate($('#slider_icon_reg'));
        event.preventDefault();
    });

    $('.services_modal_header').click(function (event) {
        $('.services_list_modal').slideToggle('slow');
        toggleRotate($('#slider_icon_services'));
        event.preventDefault();
    });

    $('#slider_icon_services').click(function (event) {
        $('.services_list_modal').slideToggle('slow');
        toggleRotate($('#slider_icon_services'));
        event.preventDefault();
    });
})