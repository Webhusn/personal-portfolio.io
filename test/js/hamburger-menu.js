$(function () {

    var scrollTop = 0;
    var closing = false;

    $('.navbar-toggle').on('click', function (e) {
        e.preventDefault();
        if ($('body').hasClass('menu-lock')) {
            $('body').removeClass('menu-lock');
            $(window).scrollTop(scrollTop);
            closing = true;
        }
        $menu = $(this).parents('.navbar-header').next('.navbar-collapse');
        $menu.slideToggle(400, function () {
            if (!$('body').hasClass('menu-lock') && !closing) {
                scrollTop = $(window).scrollTop();
                $('body').addClass('menu-lock');
            }
            closing = false;
        });
        return false;
    });

    $('nav').each(function () {
        if ($(this).parents('header').length === 0) {
            var $org = $(this);
            var $new = $($org[0].innerHTML).appendTo('header .navbar-collapse');
            $new.addClass('visible-sm-block').addClass('visible-xs-block').addClass('hidden-md').addClass('hidden-lg');
            console.log($new)
            $org.addClass('hidden-sm').addClass('hidden-xs').addClass('visible-md-block').addClass('visible-lg-block');
        }
    });


})