(function ($) {

    // box menu height
    $.heightMenuBox = function () {
        var hSidebarHeader = $('.sidebar .header').outerHeight();
        var hHeaderLogo = $('.box-general.large > .header .logo').outerHeight();
        var menuBoxHeight = hSidebarHeader + hHeaderLogo;
        $('.page-course .sidebar .box-menu').css({
            'height': 'calc(100vh - ' + menuBoxHeight + 'px)',
        });
    };

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
    };

    /**
     * Drag and drop files upload
     */
    $.fn.attachFilesDragDrop = function (options) {

        var settings = $.extend({
            accept: null, // '.png,.jpg,.jpeg,.pdf'
            size: null, // em MB
            urlUpload: null, // url to upload file with ajax
            urlDelete: null, // url to delete uploaded file with ajax
            showBtnDelete: false, // true or false
        }, options);

        var getFiles = settings.getFiles;
        var getUploaded = settings.getUploaded;
        var processUpload = settings.processUpload;
        var successUpload = settings.successUpload;
        var deletedUpload = settings.deletedUpload;

        var areaUpload = $(this);
        var input = areaUpload.find('input[type="file"]');
        var boxFiles = areaUpload.find('.box-files');

        var files = [];

        // preview dos arquivos
        var preview = function (files) {

            if (files.length > 0) {

                boxFiles.addClass('active');

                var output = '';

                $.each(files, function (index, file) {

                    var src = URL.createObjectURL(file);

                    output += '<div class="item" data-id="" data-key="' + index + '">';

                    output += '<div class="box">';

                    // preview icon
                    switch (file.type) {
                        case 'image/gif':
                        case 'image/jpeg':
                        case 'image/jpe':
                        case 'image/jpg':
                        case 'image/png':
                            output += '<div class="preview"><img src="' + src + '"></div>';
                            break;

                        case 'video/3gp':
                        case 'video/avi':
                        case 'video/mp4':
                        case 'video/mpeg':
                        case 'video/m1v':
                        case 'video/mpa':
                        case 'video/mpg':
                        case 'video/mpe':
                        case 'video/quicktime':
                        case 'video/mov':
                        case 'video/qt':
                        case 'video/x-flv':
                        case 'video/flv':
                        case 'video/x-ms-asf':
                        case 'video/asf':
                        case 'video/asx':
                            output += '<div class="preview"><div class="icon"><i class="far fa-file-video"></i></div></div>';
                            break;

                        case 'audio/3gpp':
                        case 'audio/aac':
                        case 'audio/aiff':
                        case 'audio/amr':
                        case 'audio/mp4':
                        case 'audio/mpeg':
                        case 'audio/ogg':
                        case 'audio/webm':
                        case 'audio/vnd.dlna.adts':
                            output += '<div class="preview"><div class="icon"><i class="far fa-file-audio"></i></div></div>';
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

                    // view btn
                    switch (file.type) {
                        //video
                        case 'video/3gp':
                        case 'video/avi':
                        case 'video/mp4':
                        case 'video/mpeg':
                        case 'video/m1v':
                        case 'video/mpa':
                        case 'video/mpg':
                        case 'video/mpe':
                        case 'video/quicktime':
                        case 'video/mov':
                        case 'video/qt':
                        case 'video/x-flv':
                        case 'video/flv':
                        case 'video/x-ms-asf':
                        case 'video/asf':
                        case 'video/asx':
                        // audio
                        case 'audio/3gpp':
                        case 'audio/aac':
                        case 'audio/aiff':
                        case 'audio/amr':
                        case 'audio/mp4':
                        case 'audio/mpeg':
                        case 'audio/ogg':
                        case 'audio/webm':
                        case 'audio/vnd.dlna.adts':
                            output += '<a href="' + src + '" class="external-link btn btn-dark-gray" title="Visualizar" target="_blank"><i class="fas fa-play"></i></a>';
                            break;
                        default:
                            output += '<a href="' + src + '" class="external-link btn btn-dark-gray" title="Visualizar" target="_blank"><i class="fas fa-external-link-alt"></i></a>';
                            break;
                    }

                    if (settings.showBtnDelete) {
                        output += '<a href="#" class="delete btn btn-black active" title="Excluir"><i class="fas fa-times"></i></a>';
                    } else {
                        output += '<a href="#" class="delete btn btn-black" title="Excluir"><i class="fas fa-times"></i></a>';
                    }

                    output += '</div>';

                    output += '</div>';

                    output += '</div>';
                });

                boxFiles.prepend(output);
            }
        }

        // validar extencao do arquivo
        var isAccept = function (file) {

            var accept = settings.accept;

            if (accept !== '' && accept !== null) {

                var accepts = accept.split(',');
                var fileExtension = '.' + file.name.split(".").pop();

                if (accepts.includes(fileExtension)) {
                    return true;
                }

                return false;
            }

            return true;
        }

        // validar tamanho do arquivo
        var acceptFileSize = function (file) {

            if (settings.size == '' || settings.size == null) {
                return true;
            }

            var size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
            var settings_size = parseFloat(settings.size).toFixed(2);

            return parseFloat(settings_size) >= parseFloat(size);
        }

        var uploadFiles = function (files) {

            var urlUpload = settings.urlUpload;

            if (files.length > 0 && urlUpload !== '' && urlUpload !== null) {

                var countFiles = files.length;
                var countUploaded = 0;

                if (typeof processUpload === 'function') {
                    processUpload.call(this);
                }

                files.forEach(function (file, index) {

                    var formData = new FormData();
                    var item = areaUpload.find('.box-files .item[data-key="' + index + '"]');

                    item.removeAttr('data-key');

                    formData.append('attachment', file);

                    $.ajax({
                        type: 'POST',
                        url: urlUpload,
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: formData,
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();

                            xhr.upload.addEventListener("progress", function (evt) {

                                if (evt.lengthComputable) {

                                    var percentComplete = (evt.loaded / evt.total).toFixed(2);

                                    item.find('.info .progress').text(percentComplete * 100 + '%');
                                    item.find('.progressbar span').css({
                                        width: percentComplete * 100 + '%'
                                    });
                                }

                            }, false);

                            return xhr;
                        },
                        success: function (response) {

                            var data = response.data;

                            item.attr('data-id', data.id);
                            countUploaded += 1;

                            if (typeof getUploaded === 'function') {
                                getUploaded.call(this, item);
                            }
                        },
                        error: function (response) {
                            item.find('.progressbar span').removeClass('blue').addClass('red');
                            countUploaded += 1;
                        }
                    }).done(function (data) {
                        if (typeof successUpload === 'function' && countFiles == countUploaded) {
                            successUpload.call(this);
                        }
                    });
                });
            }
        }

        // ajax delete uploaded file item
        var deleteUploadedFile = function () {

            var urlDelete = settings.urlDelete;

            if (urlDelete !== '' && urlDelete !== null) {

                $(document).on('click', "#" + areaUpload.attr('id') + " .actions a.delete", function (e) {

                    var el = $(this);
                    var item = el.parents('.item');
                    var id = item.data('id');

                    if (id == '' || id == null)
                        return;

                    $.post(urlDelete, {
                        "id": id,
                    }).done(function (response) {

                        if (item.siblings().length == 0)
                            boxFiles.removeClass('active');

                        if (typeof deletedUpload === 'function')
                            deletedUpload.call(this, 'done', response);

                        item.remove();

                    }).fail(function (response) {
                        if (typeof deletedUpload === 'function')
                            deletedUpload.call(this, 'fail', response);
                    });
                });

            }
        }

        var methods = {
            // get all ajax uploaded files id
            getUploadedFiles: function () {
                var attachments = [];
                var itens = areaUpload.find('.box-files .item');

                if (itens.length > 0) {
                    $.each(itens, function (index, item) {
                        if ($(item).data('id') !== '' && $(item).data('id') !== null) {
                            attachments.push($(item).data('id'));
                        }
                    });
                }

                return attachments;
            },
            countFiles: function () {
                var attachments = [];
                var itens = areaUpload.find('.box-files .item');

                if (itens.length > 0) {
                    $.each(itens, function (index, item) {
                        if ($(item).data('id') !== '' && $(item).data('id') !== null) {
                            attachments.push($(item).data('id'));
                        }
                    });
                }

                return attachments.length;
            },
            // clear preview area
            removeAllPreview: function () {
                boxFiles.removeClass('active');
                boxFiles.find('.item').remove();
            }
        }

        input.attr('accept', settings.accept);

        // quando arrastar os arquivos para area de upload
        areaUpload.on('dragover', function (e) {
            e.preventDefault();
            areaUpload.addClass('active');
        });

        // quando arrastar os arquivos fora da area de upload
        areaUpload.on('dragleave', function (e) {
            areaUpload.removeClass('active');
        });

        // quando soltar os arquivos dentro da area de upload
        areaUpload.on('drop', function (e) {

            e.preventDefault();

            if (e.originalEvent.dataTransfer.files.length > 0) {

                $.each(e.originalEvent.dataTransfer.files, function (index, file) {
                    if (isAccept(file) && acceptFileSize(file)) {
                        files.push(file);
                    }
                });

                input.trigger('newFilesAdded');
            }
        });

        // quando a escolha das imagens for feita pelo input tipo file
        input.on('change', function (e) {

            var el = $(this);

            if (el[0].files.length > 0) {

                $.each(el[0].files, function (index, file) {
                    if (isAccept(file) && acceptFileSize(file)) {
                        files.push(file);
                    }
                });

                el.trigger('newFilesAdded');

                // limpar o input type file
                el.val('');
            }
        });

        input.on('newFilesAdded', function (e) {

            // preview dos arquivos
            preview(files);

            // upload files
            uploadFiles(files);

            // get array files objs File
            if (typeof getFiles === 'function') {
                getFiles.call(this, files);
            }

            // clear array
            files = [];
        });

        deleteUploadedFile();

        return methods;
    };

    // detect element has scrollbar
    $.fn.hasScrollBar = function (direction) {

        var el = $(this);

        if (el.length == 0) {
            return false;
        }

        if (direction == 'vertical') {
            return el.get(0).scrollHeight > el.innerHeight();
        }

        else if (direction == 'horizontal') {
            return el.get(0).scrollWidth > el.innerWidth();
        }
    }

    // active scrollbar
    $.fn.scrollbarActive = function () {

        var el = $(this);

        // change width element has scrollbar
        var changeWidth = function () {

            if ($(window).width() <= 768) {
                el.removeClass('scrollbar-v-active');
                return;
            }

            if (el.hasScrollBar('vertical')) {
                el.addClass('scrollbar-v-active');
            } else {
                el.removeClass('scrollbar-v-active');
            }
        }

        changeWidth();

        var resizeObserver = new ResizeObserver(() => {
            changeWidth();
        });

        resizeObserver.observe(document.body);

        if (typeof el.get(0) === 'object') {
            resizeObserver.observe(el.get(0));
        }
    };

    $('.box-catalog.inline >').matchHeight();

    $('.sidebar .menu-wrap').scrollbarActive();
    $('.header .notification .dropdown-menu .body').scrollbarActive();

    // prevent click link #
    $(document).on('click', '[href="#"]', function (e) {
        e.preventDefault();
    });

    // toggle sidebar and topbar logo
    $(document).on('click', '.toggle-menu a', function (e) {

        var el = $(this);
        var icon = el.find('i')

        el.toggleClass('closed');

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
        $(id).trigger("modal-open");

        if ($(id).hasClass('scrollbar')) {
            $(id).find('.content:first .body:first').scrollbarActive();
        }
    });

    // close modal
    $(document).on('click', '.modal', function (e) {

        var el = $(this);

        if (!$(e.target).closest('.modal > *').length || $(e.target).hasClass('dialog') || $(e.target).closest('.modal .dialog .content .close').length || $(e.target).closest('.modal .content .close').length) {
            el.removeClass('active');
            $("body").css("overflow", "initial");
            el.trigger("modal-close");
        }

    });

    // modal z-index open multiple
    $(document).on('modal-open', '.modal', function (e) {
        var zIndex = 10 + 10 * $('.modal.active').length;
        $(this).css('z-index', zIndex);
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