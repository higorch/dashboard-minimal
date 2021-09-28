(function ($) {

    $('.scrollbar-macosx').scrollbar();

    $('.box-catalog.inline >').matchHeight();

    // prevent click link #
    $(document).on('click', '[href="#"]', function (e) {
        e.preventDefault();
    });

    // toggle sidebar and topbar logo
    $('.toggle-menu a').on('click', function (e) {

        var el = $(this);
        var icon = el.find('i')

        el.toggleClass('closed')

        $('.box-general > .header .logo').toggleClass('closed');
        $('.box-general > .sidebar').toggleClass('closed');
        $('.box-general > .header .topbar').toggleClass('closed');
        $('.box-general > .container').toggleClass('closed');

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

    // submenu
    $('.sidebar .menu-wrap ul li').on('mouseover', function (e) {
        var el = $(this),
            submenu = $('> ul', el);

        if (!submenu.length) {
            return;
        }

        // grab the menu item's position relative to its positioned parent
        var menuItemPos = el.position();

        // place the submenu in the correct position relevant to the menu item
        submenu.css({
            top: menuItemPos.top
        });

        var bottomSpacing = submenu.position().top + submenu.outerHeight(true) >= $(window).height();
        var bottomPosition = submenu.position().top + submenu.outerHeight(true) - $(window).height();

        if (bottomSpacing) {
            submenu.css({
                'top': (menuItemPos.top - 30) - bottomPosition,
            });
        }

    });

    // menu accordion
    $(document).on('click', '.sidebar .menu-accordion > ul > li > a', function (e) {
        e.preventDefault();
        var el = $(this);
        el.next('ul').slideToggle();
        el.parent('li').toggleClass('open');
    });

})(jQuery)