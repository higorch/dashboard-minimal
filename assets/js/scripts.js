(function ($) {

    $('.scrollbar-macosx').scrollbar();

    // prevent click link #
    $(document).on('click', '[href="#"]', function (e) {
        e.preventDefault();
    });

    // toggle sidebar and topbar logo
    $('.toggle-menu a').on('click', function (e) {

        var el = $(this);
        var icon = el.find('i')

        el.toggleClass('closed')

        $('.wrap-master > .header .logo').toggleClass('closed');
        $('.wrap-master > .sidebar').toggleClass('closed');
        $('.wrap-master > .header .topbar').toggleClass('closed');
        $('.wrap-master > .container').toggleClass('closed');

        if (el.hasClass('closed')) {
            icon.removeClass('fa-outdent').addClass('fa-indent');
        } else {
            icon.removeClass('fa-indent').addClass('fa-outdent');
        }
    })

    // open modal
    $('[data-trigger="modal"]').on('click', function (e) {
        e.preventDefault();
        var el = $(this);
        var id = el.data('modal');
        $(id).addClass('active');
        $("body").css("overflow", "hidden");
    });

    // close modal
    $('.modal-main, .modal-main .body a.close').on('click', function (e) {

        e.preventDefault();

        var el = $(this);

        // click outline modal body
        if (!$(e.target).closest('.modal-main .body').length && el.hasClass('modal-main')) {
            el.removeClass('active');
            $("body").css("overflow", "initial");
        }

        // click of modal close
        if (el.hasClass('close')) {
            el.parents('.modal-main').removeClass('active');
            $("body").css("overflow", "initial");
        }

    });

    // open submenu
    $('.sidebar .menu-wrap ul li').on('mouseenter', function (e) {

        var el = $(this);

        if (el.find('ul').length) {

            var submenu = el.find('ul');

            if (submenu.hasClass('active')) {
                return;
            }

            var submenuHeight = submenu.height();
            var centerY = el.offset().top - submenuHeight / 2;

            submenu.css({
                'top': centerY,
            }).addClass('active');

            var windowBottomSpacing = submenu.position().top + submenu.outerHeight(true) >= $(window).height();
            var windowBottomPosition = submenu.offset().top + submenu.outerHeight(true) - $(window).height();

            if (windowBottomSpacing) {
                alert('')
                submenu.css({
                    'top': (centerY - 30) - windowBottomPosition,
                });
            }

        }

    });

    // close submenu
    $('.sidebar .menu-wrap ul li ul').on('mouseleave', function (e) {
        $(this).removeClass('active');
    })

})(jQuery)