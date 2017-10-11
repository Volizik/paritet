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

    $(document).on('click', '.action-btn a', function (e) {
        e.preventDefault();
        var btn = $('.action-btn > a');
        var tabId = $(this).attr('href');
        $('.content__user').hide(0);
        $(tabId).fadeIn();
        if (btn.attr('href') !== '#user-cabinet') {
            btn.html('Сохранить');
            btn.attr('href', '#user-cabinet');
            $('.header__menu a').removeClass('header__menu--active');
            $('.header__menu a[href="#account-content"]').addClass('header__menu--active');
            $('.content__section').hide();
            $('#account-content').show();
        } else {
            if (tabId === '#user-cabinet') {
                btn.attr('href', '#user-cabinet-edit').text('Изменить')
            }
        }

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
        window.location = "/paritet/admin-users-cabinet.html";
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

    $(document).on('click', '.filter--icon', function () {
        $('.filter').fadeToggle('fast');
    });


    /*----------filter in new user-----------*/
    $(document).on('click', '#user-cabinet-new .filter tr', function () {
        var checkbox = $(this).find('input[type="checkbox"]');
        checkbox.is(':checked') ? checkbox.prop('checked', false) : checkbox.prop('checked', true);
    });
    $(document).on('click', '#user-cabinet-new .filter .submit', function () {
        var trArr = document.querySelectorAll('#user-cabinet-new .filter tr');
        var users = '';
        for(var i = 0; i< trArr.length; i++) {
            var checkbox = trArr[i].querySelector('input[type="checkbox"]:checked');
            var span = trArr[i].querySelectorAll('td > span');

           if (checkbox !== null) {
               var user = '';
               for(var j = 0; j<span.length; j++) {
                   user = user + span[j].innerHTML + ' '
               }
               users = users + user + '; '
           }
        }
        $('#user-cabinet-new .t-search').val(users);
        var parent = $('#user-cabinet-new .search');
        var child = document.createElement('span');
        $(child).css({
            'display': 'block',
            'position': 'absolute',
            'right': '1px',
            'top': '1px',
            'height': '28px',
            'width': '25px',
            'padding': '0',
            'cursor': 'pointer',
            'background': 'url(../images/icons/delete.png) no-repeat center #fff'
        });
        if ($('#user-cabinet-new .t-search').val().length > 0) {
            $(parent).append(child);
        }
        $('#user-cabinet-new .filter').hide();
    });
    $(document).on('click', '.filter .cancel', function () {
        $('.filter').hide();
    });
    $(document).on('click', '.filter__header .t-delete', function () {
        $('.filter').hide();
    });
    $(document).on('click', '#user-cabinet-new .search > span', function () {
        $('#user-cabinet-new .t-search').val('');
        $('#user-cabinet-new .filter').hide();
        $(this).remove();
    });
    $(document).on('mouseover', '#user-cabinet-new .t-search', function () {
        var tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        if($(this).val().length > 5) {
            $(tooltip).css({
                'display': 'block',
                'position': 'absolute',
                'top': '50px',
                'left': '-50%',
                'transform': 'translateX(17%)',
                'min-width': '440px',
                'text-align': 'center',
                'padding': '5px',
                'line-height': '20px',
                'color': '#fff',
                'background': '#00467f',
                'z-index': '2',
                'font-weight': '400'
            });
            $(tooltip).text($(this).val());
            $('#user-cabinet-new .search').append(tooltip);
        }

    });
    $(document).on('mouseleave', '#user-cabinet-new .t-search', function () {
       $('.tooltip').remove();
    });
    /*----------!filter in new user-----------*/

    /*filter in user-groups*/
    $(document).on('click', '.content__groups .filter tr', function () {
        $('.content__groups .filter tr').removeClass('activeTr');
        $(this).addClass('activeTr');
    });
    $(document).on('click', '.content__groups .filter .submit', function () {
        if($('.activeTr').length >0) {
            $('.content__groups .t-search').val($('.activeTr').text());
            $('.content__groups .filter').hide();
            $('.content__groups .insert').addClass('insert-active').removeAttr('disabled')
        }
    });
    $(document).on('click', '.content__groups .filter .cancel', function () {
        $('.content__groups .filter').hide();
    });


});