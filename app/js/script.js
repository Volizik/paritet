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

    $('.content__section').each(function (i) {
        if(i !=0) {
            $(this).hide(0);
        }
    });

    $(document).on('click', '.header__menu a', function (e) {
        e.preventDefault();
        var tabId = $(this).attr('href');
        $('.header__menu a').removeClass('header__menu--active');
        $(this).addClass('header__menu--active');
        $('.content__section').hide(0);
        $(tabId).fadeIn();
    });

    /*--------------------end header tabs--------------------*/




    /*------------------start edit user tabs--------------------*/

    $('.content__user').each(function (i) {
        if(i !=0) {
            $(this).hide(0);
        }
    });


    $(document).on('click', '.action-btn > .user-edit', function (e) {
        e.preventDefault();
        var tabId = $(this).attr('href');
        $('.content__user').hide(0);
        $(tabId).fadeIn();
        if(!$(this).hasClass('user-edit-active')) {
            $(this).text('Сохранить').addClass('user-edit-active');
            $(this).attr('href', '#user-cabinet')
        } else {
            $(this).text('Изменить').removeClass('user-edit-active');
            $(this).attr('href', '#user-cabinet-edit')
        }
    });

    $(document).on('click', '.return-to-cabinet', function (e) {
        e.preventDefault();
        var tabId = $(this).attr('href');
        $('.content__user').hide(0);
        $(tabId).fadeIn();
        $('.action-btn > .user-edit').text('Изменить').removeClass('user-edit-active').attr('href', '#user-cabinet-edit');
    });


    /*--------------------end edit user tabs--------------------*/





    /*-------------------start action-btn---------------------*/


    $(document).on('click', '.action-btn--arrow', function () {
        $(this).toggleClass('action-btn--active');
        $(this).parent().find('ul').fadeToggle('fast');
    });

    $(document).on('click', '.action-btn ul li a', function () {
        $('.action-btn--arrow').removeClass('action-btn--active');
        $('.action-btn ul').fadeToggle('fast')
    });

    $(document).click(function(event) {
        if ($(event.target).closest(".action-btn").length) return;
        $(".action-btn ul").fadeOut("fast");
        $('.action-btn--arrow').removeClass('action-btn--active');
    });

    /*---------------------end action-btn---------------------*/
    
    
    
    
    /*------------------------start edit password btn--------------------*/
    
    $(document).on('click', '.edit-pass', function () {
        var input = $(this).parent().find('input[type=password]');
        input.removeAttr('disabled').focus();
    });
    
    /*------------------------end edit password btn--------------------*/




    /*-------------------SET LOCATION FOR CLASS "SOMEONE"-------------------------*/

    $(document).on('click', '.someone', function() {
        window.location = "/paritet/admin-cabinet.html";
    });

    /*-------------------!SET LOCATION FOR CLASS "SOMEONE"-------------------------*/


    /*----------------scrollbar----------------*/
    $('.content__section').mCustomScrollbar({
        theme: "my-theme"
    });
    $('.content__section .filter__body').mCustomScrollbar({
        theme: "my-theme"
    });
    /*----------------!scrollbar----------------*/

    $(document).on('click', '.filter--user-list', function () {
        $('.filter').fadeToggle('fast');
    });


    /*----------filter in new user-----------*/
    $(document).on('click', '.new-account .filter tr', function () {
        var checkbox = $(this).find('input[type="checkbox"]');
        checkbox.is(':checked') ? checkbox.prop('checked', false) : checkbox.prop('checked', true);
    });
    $(document).on('click', '.new-account .filter .submit', function () {
        var trArr = document.querySelectorAll('.new-account .filter tr');
        for(var i = 0; i< trArr.length; i++) {
            var checkbox = trArr[i].querySelector('input[type="checkbox"]:checked');
            var span = trArr[i].querySelectorAll('td > span');
           if (checkbox !== null) {
               for(var j = 0; j<span.length; j++) {
                   $('.new-account .t-search').val(span[j].innerHTML)
               }
           }
        }
    });
    /*----------!filter in new user-----------*/




});