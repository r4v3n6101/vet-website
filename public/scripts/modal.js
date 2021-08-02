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
    $('#reg_success_modal_close_icon').click(function (event) {
        event.preventDefault();
        $('.reg_success_modal').slideUp();
    });

    $('.modal_reg_header').click(function () {
        $('.modal_registration').slideToggle('slow');
        toggleRotate($('#slider_icon_reg'))
    });

    $('#slider_icon_reg').click(function () {
        $('.modal_registration').slideToggle('slow');
        toggleRotate($('#slider_icon_reg'))
    });

    $('.services_modal_header').click(function () {
        $('.services_list_modal').slideToggle('slow');
        toggleRotate($('#slider_icon_services'));
    });

    $('#slider_icon_services').click(function () {
        $('.services_list_modal').slideToggle('slow');
        toggleRotate($('#slider_icon_services'))
    });
})