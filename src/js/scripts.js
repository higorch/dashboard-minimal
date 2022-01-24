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
            el.trigger("opened");
        }

        if (action == 'close') {
            el.removeClass('active');
            $("body").css("overflow", "initial");
            el.trigger("closed");
        }
    }

    /**
     * Multiple files updalod preview
     */
    $.fn.attachFiles = function () {

        var input = $(this);

        $(input).on('change', function (e) {

            var el = $(this);
            var box_files = el.parents('.box-attach').next('.box-files');

            if (el[0].files.length > 0) {

                box_files.addClass('active');

                var output = '<ul>';

                $.each(el[0].files, function (index, file) {

                    var src = URL.createObjectURL(file);

                    output += '<li>';

                    output += '<div class="box">';

                    // preview thumb
                    switch (file.type) {
                        case 'image/apng':
                        case 'image/avif':
                        case 'image/gif':
                        case 'image/jpeg':
                        case 'image/png':
                        case 'image/svg+xml':
                        case 'image/webp':
                        case 'image/x-icon':
                            output += '<div class="preview"><img src="' + src + '"></div>';
                            break;

                        case 'text/csv':
                            output += '<div class="preview"><div class="icon"><i class="fas fa-file-csv"></i></div></div>';
                            break;

                        case 'application/pdf':
                            output += '<div class="preview"><div class="icon"><i class="fas fa-file-pdf"></i></div></div>';
                            break;

                        default:
                            output += '<div class="preview"><div class="icon"><i class="far fa-file-alt"></i></div></div>';
                            break;
                    }

                    output += '<div class="details">';
                    output += '<div class="info">';
                    output += '<span class="name">' + file.name + '</span>';
                    output += '<span class="progress">0%</span>';
                    output += '</div>';
                    output += '<div class="progressbar"><span class="blue" style="width: 0%;"></span></div>';
                    output += '</div>';

                    output += '<div class="actions">';

                    // preview btn
                    switch (file.type) {
                        case 'image/apng':
                        case 'image/avif':
                        case 'image/gif':
                        case 'image/jpeg':
                        case 'image/png':
                        case 'image/svg+xml':
                        case 'image/webp':
                        case 'image/x-icon':
                        case 'application/pdf':
                            output += '<a href="' + src + '" class="external-link btn btn-dark-gray" title="Visualizar" target="_blank"><i class="fas fa-external-link-alt"></i></a>';
                            break;
                    }

                    output += '<a href="#" class="delete btn btn-black" title="Excluir"><i class="fas fa-times"></i></a>';
                    output += '</div>';

                    output += '</div>';

                    output += '</li>';

                    console.log();

                });

                output += '</ul>';

                box_files.html(output);

            } else {
                box_files.removeClass('active');
            }
        });

    }

    $("#myfiles").attachFiles();

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
        $(id).trigger("opened");
    });

    // close modal
    $(document).on('click', '.modal', function (e) {

        var el = $(this);

        if (!$(e.target).closest('.modal > *').length || $(e.target).hasClass('dialog') || $(e.target).closest('.modal .dialog .content .close').length) {
            el.removeClass('active');
            $("body").css("overflow", "initial");
            el.trigger("closed");
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