$(function () {


    /*------------------start login tabs--------------------*/

    $('.main__form--content').each(function (i) {
        if(i !=0) {
            $(this).hide(0);
        }
    });

    $(document).on('click', '.main__form--buttons a', function (e) {
        e.preventDefault();
        var tabId = $(this).attr('href');
        $('.main__form--buttons a').removeClass('active');
        $(this).addClass('active');
        $('.main__form--content').hide(0);
        $(tabId).fadeIn();
    });

    /*------------------end login tabs--------------------*/






    /*------------------start header tabs--------------------*/

    $('.adm-content__section').each(function (i) {
        if(i !=0) {
            $(this).hide(0);
        }
    });

    $(document).on('click', '.adm-header__menu a', function (e) {
        e.preventDefault();
        var tabId = $(this).attr('href');
        $('.adm-header__menu a').removeClass('adm-header__menu--active');
        $(this).addClass('adm-header__menu--active');
        $('.adm-content__section').hide(0);
        $(tabId).fadeIn();
    });

    /*--------------------end header tabs--------------------*/





    /*-------------------start action-btn---------------------*/

    $('.action-btn--text').text($('.action-btn ul li:first-of-type a').text());

    $(document).on('click', '.action-btn--drop', function () {
        $(this).toggleClass('action-btn--active');
        $(this).parent().find('ul').fadeToggle('fast');
    });

    $(document).on('click', '.action-btn ul li a', function () {
        $('.action-btn--drop').removeClass('action-btn--active');
        $(this).parent().parent().parent().find($('.action-btn--text').text($(this).text()));
        $('.action-btn ul').fadeToggle('fast')
    });

    $(document).click(function(event) {
        if ($(event.target).closest(".action-btn").length) return;
        $(".action-btn ul").fadeOut("fast");
    });

    /*---------------------end action-btn---------------------*/

});