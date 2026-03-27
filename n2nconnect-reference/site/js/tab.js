$(document).ready(function () {

    (function ($) {
        $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

        $('.tab ul.tabs li a').click(function (g) {
            var tab = $(this).closest('.tab'),
                index = $(this).closest('li').index();

            tab.find('ul.tabs > li').removeClass('current');
            $(this).closest('li').addClass('current');

            tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').fadeOut();
            tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').fadeIn();

            g.preventDefault();
        });
    })(jQuery);

    (function ($) {
        $('.tab2 ul.tabs2').addClass('active').find('> li:eq(0)').addClass('current');

        $('.tab2 ul.tabs2 li a').click(function (g) {
            var tab = $(this).closest('.tab2'),
                index = $(this).closest('li').index();

            tab.find('ul.tabs2 > li').removeClass('current');
            $(this).closest('li').addClass('current');

            tab.find('.tab2_content').find('div.tabs2_item').not('div.tabs2_item:eq(' + index + ')').fadeOut().css("display", "none");
            tab.find('.tab2_content').find('div.tabs2_item:eq(' + index + ')').fadeIn().css("top", "0");

            g.preventDefault();
        });
    })(jQuery);

    (function ($) {
        $('.capital-tab ul.capital-tabs').addClass('active').find('> li:eq(0)').addClass('capital-current');

        $('.capital-tab ul.capital-tabs li a').click(function (g) {
            var tab = $(this).closest('.capital-tab, .career_info_tab_wrapper'),
                index = $(this).closest('li').index();

            tab.find('ul.capital-tabs > li').removeClass('capital-current');
            $(this).closest('li').addClass('capital-current');

            tab.find('.capital-tab_content').find('div.tabs_items').not('div.tabs_items:eq(' + index + ')').fadeOut();
            tab.find('.capital-tab_content').find('div.tabs_items:eq(' + index + ')').fadeIn();

            g.preventDefault();
        });
    })(jQuery);

    (function ($) {
        $('.career_info_tab_wrapper ul.career_info_tab').addClass('active').find('> li:eq(0)').addClass('career_info_current');

        $('.career_info_tab_wrapper ul.career_info_tab li a').click(function (g) {
            var tab = $(this).closest('.career_info_tab_wrapper'),
                index = $(this).closest('li').index();

            tab.find('ul.career_info_tab > li').removeClass('career_info_current');
            $(this).closest('li').addClass('career_info_current');

            tab.find('.career_info_content').find('div.tabs_items').not('div.tabs_items:eq(' + index + ')').fadeOut();
            tab.find('.career_info_content').find('div.tabs_items:eq(' + index + ')').fadeIn();

            g.preventDefault();
        });
    })(jQuery);

});

$('#toggle-on').click(function () {
    $(this).toggleClass('.active');
    $('#overlay').addClass('open');
});

$('#toggle-off').click(function () {
    $(this).toggleClass('.active');
    $('#overlay').removeClass('open');
});
