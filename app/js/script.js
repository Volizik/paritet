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

    $(document).on('click', '.user-header .action-btn a', function (e) {
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
    $('.content__group').each(function (i) {
        if(i !=0) {
            $(this).hide(0);
        }
    });
    $(document).on('click', '.group-header .action-btn a', function (e) {
        e.preventDefault();
        var btn = $('.action-btn > a');
        var tabId = $(this).attr('href');
        $('.content__group').hide(0);
        $(tabId).fadeIn();
        if (btn.attr('href') !== '#group-cabinet') {
            btn.html('Сохранить');
            btn.attr('href', '#group-cabinet');
            $('.header__menu a').removeClass('header__menu--active');
            $('.header__menu a[href="#group-content"]').addClass('header__menu--active');
            $('.content__section').hide();
            $('#group-content').show();
        } else {
            if (tabId === '#group-cabinet') {
                btn.attr('href', '#group-cabinet-edit').text('Изменить')
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
    $(document).on('click', '.someone-group', function() {
        window.location = "/paritet/admin-groups-cabinet.html";
    });
    $(document).on('click', 'tbody .bill-num', function() {
        window.location = "/paritet/issuer-bills-cabinet.html";
    });
    $(document).on('click', 'tbody .mi-register', function() {
        window.location = "/paritet/manager-issuer-cabinet.html";
    });
    $(document).on('click', 'tbody .mv-register', function() {
        window.location = "/paritet/manager-voting-issuer-list.html";
    });
    $(document).on('click', 'tbody .vil-bill', function() {
        window.location = "/paritet/manager-voting-form.html";
    });

    /*-------------------!SET LOCATION FOR CLASS "SOMEONE"-------------------------*/


    /*----------------scrollbar----------------*/
    $('.content__section').mCustomScrollbar({
        theme: "my-theme"
    });
    $('.content__section .filter__body').mCustomScrollbar({
        theme: "my-theme"
    });
    $('.filter .filter .filter__body').mCustomScrollbar({
        theme: "my-theme"
    });
    /*----------------!scrollbar----------------*/

    $(document).on('click', '.filter--icon', function () {
        $('.header__filter>.filter').fadeToggle('fast');
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




    $(document).on('click', '.content__registers .filter tr', function () {
        $('.content__registers .filter tr').removeClass('activeTr');
        $(this).addClass('activeTr');
    });
    $(document).on('click', '.content__registers .filter .submit', function () {
        if($('.activeTr').length >0) {
            $('.content__registers .t-search').val($('.activeTr').text());
            $('.content__registers .filter').hide();
            $('.content__registers .insert').addClass('insert-active').removeAttr('disabled')
        }
    });




    $(document).on('click', '.sidebar__item .users_inside',function () {
        var curLoc = window.location.href.toString();
        if (~curLoc.indexOf('admin-users-list')) {
            $('.header__filter--field .filter--input').hide();
            $('.autofilter[data-id="user_inside"]').css('display', 'flex');
        } else {
            window.location = "/paritet/admin-users-list.html"
        }

    });
    $(document).on('click', '.sidebar__item .users_outside',function () {
        var curLoc = window.location.href.toString();
        if (~curLoc.indexOf('admin-users-list')) {
            $('.header__filter--field .filter--input').hide();
            $('.autofilter').hide();
            $('.autofilter[data-id="user_outside"]').css({'display': 'flex'});
        } else {
            window.location = "/paritet/admin-users-list.html"
        }

    });
    $(document).on('click', '.autofilter .t-delete', function () {
        $(this).parent().hide();
        $('.header__filter--field .filter--input').show();
    });

    $(document).on('click', '.filter .filter tr', function () {
        $('.filter .filter tr').removeClass('activeTr');
        $(this).addClass('activeTr');
    });
    $(document).on('click', '.filter .filter .submit', function () {
        if($('.filter .filter .activeTr').length > 0) {
            $(this).closest('.filter__body--item').find('.t-search').val($('.activeTr').text());
            $('.header__filter .filter .filter').hide();
        }
    })



    //dropdown-----------------------------------------------
    $(document).on('click', '.drop', function () {
        if($(this).find('ul').hasClass('visible-drop')) {
            $(this).find('ul').removeClass('visible-drop');
        } else {
            $('.drop ul').removeClass('visible-drop');
            $(this).find('ul').addClass('visible-drop')
        }
    });
    $(document).on('click', '.drop li', function () {
        $(this).parent().parent().find('span.blue-bold').text($(this).text())
    });
    //dropdown-----------------------------------------------



    /*------------gropdown-user-icon---------------*/
    $(document).on('click', '.header__user', function () {
        $(this).find('.header__user--menu').fadeToggle('fast')
    })
    /*------------gropdown-user-icon---------------*/


    $(document).on('click', '.issuer-bills-statement .period', function () {
        $('.issuer-bills-statement .period').removeClass('active-period');
        $(this).addClass('active-period');
    })



    $('.manager-meeting-agenda').each(function (i) {
        if(i !=0) {
            $(this).hide(0);
        }
    });
    $(document).on('click', '.manager-header .action-btn a', function (e) {
        e.preventDefault();
        var btn = $('.action-btn > a');
        var tabId = $(this).attr('href');
        $('.manager-meeting-agenda').hide(0);
        $(tabId).fadeIn();
        if (btn.attr('href') !== '#manager-agenda') {
            btn.html('Сохранить');
            btn.attr('href', '#manager-agenda');
            $('.header__menu a').removeClass('header__menu--active');
            $('.header__menu a[href="#manager-meeting-agenda"]').addClass('header__menu--active');
            $('.content__section').hide();
            $('#manager-meeting-agenda').show();
        } else {
            if (tabId === '#manager-agenda') {
                btn.attr('href', '#manager-agenda-settings').text('Изменить')
            }
        }

    });


    $(document).on('click', '.bullet-number', function () {
        $('.bullet-number').removeClass('activeBullet');
        $(this).addClass('activeBullet');
    })
    $(document).on('click', '.show-condition', function () {
        $('.condition-hidden').addClass('show-condition-hidden');
        $(this).hide();
    })
    $(document).on('click', '.hide-condition', function () {
        $('.condition-hidden').removeClass('show-condition-hidden');
        $('.show-condition').show();
    })
    $(document).on('click', '.hide-voting-settings', function () {

        if ($('.agenda-settings__hidden').hasClass('is-hidden')) {
            $('.hide-voting-settings').text('Скрыть настройки голосования')
            $('.agenda-settings__hidden').removeClass('is-hidden').slideDown('fast')
        } else {
            $('.agenda-settings__hidden').addClass('is-hidden').slideUp('fast')
            $('.hide-voting-settings').text('Показать настройки голосования')
        }

    })
});