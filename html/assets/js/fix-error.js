(function ($) {

    if ($.fn.select2) {

        // important, fix error "_attachPositioningHandler" select2 in modal
        $.fn.select2.amd.require(["select2/dropdown/attachBody", "select2/utils"], (AttachBody, Utils) => {
            AttachBody.prototype._attachPositioningHandler = function (decorated, container) {
                var self = this;
                var scrollEvent = "scroll.select2." + container.id;
                var resizeEvent = "resize.select2." + container.id;
                var orientationEvent = "orientationchange.select2." + container.id;
                var $watchers = this.$container.parents().filter(Utils.hasScroll);
                $watchers.each(function () {
                    $(this).data("select2-scroll-position", {
                        x: $(this).scrollLeft(),
                        y: $(this).scrollTop()
                    });
                });
                $watchers.on(scrollEvent, function (ev) {
                    var position = $(this).data("select2-scroll-position");
                    $(self).scrollTop(position.y); // patch: this => self
                });
                $(window).on(scrollEvent + " " + resizeEvent + " " + orientationEvent,
                    function (e) {
                        self._positionDropdown();
                        self._resizeDropdown();
                    }
                );
            };
        });

        $(document).on('select2:open', () => {
            let allFound = document.querySelectorAll('.select2-container--open .select2-search__field');
            $(this).one('mouseup', () => {
                setTimeout(() => {
                    allFound[allFound.length - 1].focus();
                }, 0);
            });
        });
    }

})(jQuery);