(function ($) {

    // box menu height
    $.heightMenuBox = function () {
        var hSidebarHeader = $('.sidebar .header').outerHeight();
        var hHeaderLogo = $('.box-general.large > .header .logo').outerHeight();
        var menuBoxHeight = hSidebarHeader + hHeaderLogo;
        $('.page-course .sidebar .box-menu').css({
            'height': 'calc(100vh - ' + menuBoxHeight + 'px)',
        });
    }

    /**
     * Actions modal
     * 
     * @param string action "open" or "close"
     */
    $.fn.modal = function (action) {

        var el = $(this);

        if (action == 'open') {
            el.addClass('active');
            $("body").css("overflow", "hidden");
        }

        if (action == 'close') {
            el.removeClass('active');
            $("body").css("overflow", "initial");
        }
    }

    $('.box-catalog.inline >').matchHeight();
    $('.scrollbar-macosx').scrollbar();

    // prevent click link #
    $(document).on('click', '[href="#"]', function (e) {
        e.preventDefault();
    });

    // toggle sidebar and topbar logo
    $(document).on('click', '.toggle-menu a', function (e) {

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
    $(document).on('click', '[data-trigger="modal"]', function (e) {
        e.preventDefault();
        var el = $(this);
        var id = el.data('modal');
        $(id).addClass('active');
        $("body").css("overflow", "hidden");
    });

    // close modal
    $(document).on('click', '.modal-main', function (e) {

        var el = $(this);

        if (!$(e.target).closest('.modal-main > *').length || $(e.target).hasClass('dialog') || $(e.target).closest('.modal-main .dialog .content .close').length) {
            el.removeClass('active');
            $("body").css("overflow", "initial");
        }

    });

    // tabs
    $(document).on('click', '.tab-main ul.nav li a', function (e) {

        e.preventDefault();

        var el = $(this);
        var id = el.attr('href');

        el.parent('li').addClass('active').siblings().removeClass('active');
        el.parents('ul.nav').next('.content').find(id).addClass('active').siblings('.body').removeClass('active');

    });

    // submenu
    $(document).on('mouseover', '.sidebar .menu-wrap ul li', function (e) {

        var el = $(this),
            submenu = $('> ul', el);

        if (!submenu.length) {
            return;
        }

        // get menu item height
        var menuItemHeight = 15 + (el.outerHeight() / 2);

        // grab the menu item's position relative to its positioned parent
        var menuItemPos = el.position();

        // place the submenu in the correct position relevant to the menu item
        var topPosition = menuItemPos.top + menuItemHeight;

        submenu.css({
            top: topPosition
        });

        var bottomSpacing = submenu.position().top + submenu.outerHeight(true) >= $(window).height();
        var bottomPosition = submenu.position().top + submenu.outerHeight(true) - $(window).height();

        if (bottomSpacing) {
            submenu.css({
                top: (topPosition - 30) - bottomPosition,
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

    // box menu resize
    $(window).on('resize', function () {
        $.heightMenuBox();
    }).trigger('resize');

    // close error validation
    $(document).on('mouseover', '.form-wrap .group span.error', function (e) {
        $(this).fadeOut(150, function () {
            $(this).remove();
        });
    });

})(jQuery)