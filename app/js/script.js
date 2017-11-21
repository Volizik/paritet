$(function () {



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
        window.location = "/paritet/admin-user-cabinet-account-main.html";
    });
    $(document).on('click', '.someone-group', function() {
        window.location = "/paritet/admin-groups-cabinet-group-main.html";
    });
    $(document).on('click', 'tbody .bill-num', function() {
        window.location = "/paritet/issuer-bills-cabinet-bill.html";
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
    $(document).on('click', 'tbody .ai-register', function() {
        window.location = "/paritet/admin-issuer-cabinet.html";
    });
    $(document).on('click', 'tbody .iml-number', function() {
        window.location = "/paritet/issuer-meeting-cabinet-info.html";
    });
    $(document).on('click', 'tbody .mml-number', function() {
        window.location = "/paritet/manager-meeting-cabinet-info.html";
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




    $(document).on('click', '.sidebar__item .active-now',function () {
        $('.header__filter--field .filter--input').hide();
        $('.autofilter').hide();
        $('.autofilter[data-id="active-now"]').css('display', 'flex');

    });
    $(document).on('click', '.sidebar__item .meeting',function () {
        $('.header__filter--field .filter--input').hide();
        $('.autofilter').hide();
        $('.autofilter[data-id="meeting"]').css({'display': 'flex'});

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
    });
    $(document).on('click', '.header__user .user-icon', function (e) {
        e.preventDefault()
    });
    /*------------gropdown-user-icon---------------*/


    $(document).on('click', '.issuer-bills-statement .period', function () {
        $('.issuer-bills-statement .period').removeClass('active-period');
        $(this).addClass('active-period');
    })





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

    });



    $(document).on( 'click', '.load-list', function () {
        if($(this).hasClass('grey')) return false;
        $(this).attr('data-btn-text', 'Список загружается...').addClass('orange');

        setTimeout(function () {
            $('.load-list').attr('data-btn-text', 'Список получен 12.05. 2017, 15:06').removeClass('orange').addClass('grey');
        }, 2000)
    })

    $(document).on('click', 'label[for="applies"]',function () {
        if($('#applies').is(':checked')) {
            $(this).closest('.content__block').find('.voting-date').addClass('voting-date-hidden')
        } else {
            $(this).closest('.content__block').find('.voting-date').removeClass('voting-date-hidden')
        }
    })
    
    $(document).on('click', '.show-constraints', function () {
        $('.constraints').toggleClass('constraints-hidden');
    })
    
    $(document).on('click', '.info-affix', function () {
        $(this).closest('.content__block').find('.add-files').fadeIn('fast')
    })
});