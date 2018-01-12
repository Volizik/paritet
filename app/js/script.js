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
        window.location = "../html/admin_pages/admin-user-cabinet-account-main.html";
    });
    $(document).on('click', '.someone-group', function() {
        window.location = "../html/pages/admin-groups-cabinet-group-main.html";
    });
    $(document).on('click', '.iss-bills-list tbody .bill-num', function() {
        window.location = "issuer-bills-cabinet-bill.html";
    });
    $(document).on('click', '.own-bills-list tbody .bill-num', function() {
        window.location = "owner-bills-cabinet-bill.html";
    });
    $(document).on('click', '.manager-issuers-list tbody .mi-register', function() {
        window.location = "manager-issuer-cabinet.html";
    });
    $(document).on('click', '.own-issuers-list tbody .mi-register', function() {
        window.location = "owner-issuer-cabinet.html";
    });
    $(document).on('click', 'tbody .mv-register', function() {
        window.location = "manager-voting-issuer-list.html";
    });
    $(document).on('click', 'tbody .vil-bill', function() {
        window.location = "manager-voting-form.html";
    });
    $(document).on('click', 'tbody .ai-register', function() {
        window.location = "../html/admin_pages/admin-issuer-cabinet.html";
    });
    $(document).on('click', 'tbody .iml-number', function() {
        window.location = "issuer-meeting-cabinet-info.html";
    });
    $(document).on('click', 'tbody .mml-number', function() {
        window.location = "manager-meeting-cabinet-info.html";
    });
    $(document).on('click', 'tbody .ov-register', function() {
        window.location = "owner-voting-cabinet-info.html";
    });

    /*-------------------!SET LOCATION FOR CLASS "SOMEONE"-------------------------*/

    /*----------------scrollbar----------------*/
    $('.content__section').mCustomScrollbar({
        theme: "my-theme"
    });
    $('.content__aside').mCustomScrollbar({
        theme: "my-theme"
    });
    $('.content__section .filter__body').mCustomScrollbar({
        theme: "my-theme"
    });
    $('.filter .filter .filter__body').mCustomScrollbar({
        theme: "my-theme"
    });
    $('.modal__body').mCustomScrollbar({
        theme: "my-theme"
    });
    /*----------------!scrollbar----------------*/

    $(document).on('click', '.filter--icon', function () {
        $('.header__filter>.filter').fadeToggle('fast');
    });


    /*----------filter in new user-----------*/



    $(document).on('click', '.filter .cancel', function () {
        $('.filter').hide();
    });
    $(document).on('click', '.filter__header .t-delete', function () {
        $('.filter').hide();
    });

    /*----------!filter in new user-----------*/

    /*filter in user-groups*/
    $(document).on('click', '.filter tr', function () {
        $('.filter tr').removeClass('activeTr');
        $(this).addClass('activeTr');
    });
    $(document).on('click', '.filter .submit', function () {
        var filter = $(this).closest('.filter');
        var input = filter.siblings('.t-search');
        var btn = filter.parent().find('.insert');
        if ($('.activeTr').length >0) {
            input.val($('.activeTr').text());
            filter.hide();
            btn.addClass('insert-active').removeAttr('disabled');
        }
    });
    $(document).on('click', '.filter .cancel', function () {
        $(this).closest('.filter').hide();
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
            window.location = "/app/html/pages/admin-users-list.html"
        }

    });
    $(document).on('click', '.sidebar__item .users_outside',function () {
        var curLoc = window.location.href.toString();
        if (~curLoc.indexOf('admin-users-list')) {
            $('.header__filter--field .filter--input').hide();
            $('.autofilter').hide();
            $('.autofilter[data-id="user_outside"]').css({'display': 'flex'});
        } else {
            window.location = "/app/html/pages/admin-users-list.html"
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
    $(document).click(function(event) {
        if ($(event.target).closest(".header__user").length) return;
        $(".header__user--menu").fadeOut("fast");
    });
    $(document).on('click', '.header__user .user-icon', function (e) {
        e.preventDefault()
    });
    /*------------gropdown-user-icon---------------*/


    $(document).on('click', '.issuer-bills-statement .period', function () {
        $('.issuer-bills-statement .period').removeClass('active-period');
        $(this).addClass('active-period');
    })


    $(document).on('change', '.add-files input[type="file"]', function() {
        var parent = $(this).parent();
        var chosenFiles = $(this)[0].files;
        for (var i=0; i<chosenFiles.length; i++) {
            $('.selected-file').remove();
            $('<p>', {text: chosenFiles[i].name}).addClass('selected-file').appendTo(parent)
        }
    });
    $(document).on('click', '.add-files .cancel', function () {
        var parent = $(this).closest('.add-files')
        parent.find('.selected-file').remove()
    })


    $(document).on('click', '.bullet-number', function () {
        $(this).closest('.bullet-numbers').find('.bullet-number').removeClass('activeBullet');
        $(this).addClass('activeBullet');
    });
    $(document).on('click', '.show-condition', function () {
        $('.condition-hidden').addClass('show-condition-hidden');
        $(this).hide();
    });
    $(document).on('click', '.hide-condition', function () {
        $('.condition-hidden').removeClass('show-condition-hidden');
        $('.show-condition').show();
    });
    $(document).on('click', '.hide-voting-settings', function () {

        var concrete = $(this).closest('.content__block');

        if (concrete.find('.agenda-settings__hidden').hasClass('is-hidden')) {
            concrete.find('.hide-voting-settings').text('Скрыть настройки голосования')
            concrete.find('.agenda-settings__hidden').removeClass('is-hidden').slideDown('fast')
        } else {
            concrete.find('.agenda-settings__hidden').addClass('is-hidden').slideUp('fast')
            concrete.find('.hide-voting-settings').text('Показать настройки голосования')
        }

    });


    $(document).on( 'click', '.load-list', function () {
        if($(this).hasClass('grey')) return false;
        $(this).attr('data-btn-text', 'Список загружается...').addClass('orange');

        setTimeout(function () {
            $('.load-list').attr('data-btn-text', 'Список получен 12.05. 2017, 15:06').removeClass('orange').addClass('grey');
        }, 2000)
    });

    $(document).on('click', 'label[for="applies"]',function () {
        if($('#applies').is(':checked')) {
            $(this).closest('.content__block').find('.voting-date').addClass('voting-date-hidden')
        } else {
            $(this).closest('.content__block').find('.voting-date').removeClass('voting-date-hidden')
        }
    });

    $(document).on('click', '.show-constraints', function () {
        $('.constraints').toggleClass('constraints-hidden');
    });

    $(document).on('click', '.show-meetings', function () {
        if($('.meetings').hasClass('meetings-hidden')) {
            $('.meetings').removeClass('meetings-hidden');
            $(this).text('Скрыть ход собрания')
        } else {
            $('.meetings').addClass('meetings-hidden');
            $(this).text('Показать ход собрания')
        }

    });

    $(document).on('click', '.info-affix', function () {
        $(this).closest('.content__block').find('.add-files').fadeIn('fast')
    });


    $(document).on('click', '.active-question>span', function () {
        $(this).parent().find('.active-question__content').fadeIn('fast')
    });
    $(document).on('click', '.active-question .cancel', function () {
        $(this).closest('.active-question__content').fadeOut('fast')
    });
    $(document).click(function(event) {
        if ($(event.target).closest(".active-question").length) return;
        $(".active-question__content").fadeOut("fast");
    });

    $(document).on('click', '.show-all-state', function () {
        var parent = $(this).closest('tr');
        var row = $('.hidden-row');
        if(parent.find(row).hasClass('hidden')) {
            parent.find(row).removeClass('hidden');
            $(this).text('Всего (скрыть)')
        } else {
            parent.find(row).addClass('hidden');
            $(this).text('Всего (показать)')
        }
    });


    $(document).on('click', '.agenda-btn-edit', function () {
        $(this).closest('.content__block').find('.agenda-question-content').toggle();
        $(this).closest('.content__block').find('.agenda-question-edit').toggle();
    });
    $(document).on('click', '.agenda-btn-new-question', function () {
        $('.manager-meeting-agenda .modal').hide();
        $(this).closest('.content__block').find('.modal').show();
    });
    $(document).on('click', '.manager-meeting-agenda .cancel', function () {
        $(this).closest('.content__block').find('.agenda-question-edit').hide();
        $(this).closest('.content__block').find('.agenda-question-content').show();
    });


    if($('.write-msg')) {
        $(document).on('click', '.show-write-msg', function () {
            $('.write-msg').fadeIn('fast');
        });
        $(document).on('click', '.write-msg .cancel', function () {
            $('.write-msg').fadeOut('fast');
        });
    }


    $(document).on('click', '.modal__header .t-delete', function () {
        $(this).closest('.modal').fadeOut('fast');
    });
    $(document).on('click', '.modal .cancel', function () {
        $(this).closest('.modal').fadeOut('fast');
    });

    $(document).on('click', '.edit-status-meeting', function () {
        $('.manager-meeting-info .modal').show()
    });
    $(document).click(function(event) {
        if ($(event.target).closest(".edit-status-meeting").length || $(event.target).closest(".manager-meeting-info .modal").length) return;
        $(".manager-meeting-info .modal").fadeOut("fast");
    });


    $(document).on('click', '.voting-actions__choice--item', function () {
        if ($(this).closest('.voting-actions').hasClass('voting-actions-disable')) {
            return false
        }
        $(this).closest('.voting-actions').find('.voting-actions__choice--item').removeClass('voting-selected');
        $(this).addClass('voting-selected')
    });

    $(document).on('click', '.show-divide-voting>span', function () {
        $(this).closest('.voting__block').find('.voting-actions__divide').css('display', 'flex');
        $(this).closest('.voting__block').find('.voting-actions-hidden').css('display', 'flex');
    });
    $(document).on('click', '.del-divide-voting', function () {
        $(this).closest('.voting__block').find('.voting-actions__divide').css('display', 'none');
        $(this).closest('.voting__block').find('.voting-actions-hidden').css('display', 'none');
    });


    $(document).on('click', '.voting-order', function () {
        var text = $(this).closest('.content__block').find('.voting-order__text')
        if (text.hasClass('j-invisible')) {
            text.removeClass('j-invisible')
        } else {
            text.addClass('j-invisible')
        }
    });

    $(document).on('click', '.voting-send', function () {
        var btn = $(this).closest('.content__block').find('.voting-actions__choice--item');
        if (btn.hasClass('voting-selected')) {
            $(this).val('Подписано и отправлено')
                .removeClass('bg-blue')
                .addClass('bg-grey')
                .attr('disabled', 'true');
            btn.not('.voting-selected').css({
                background: '#fff',
                color: '#777'
            });

            $(this).closest('.content__block').find('.voting-actions').addClass('voting-actions-disable');
        } else {
            return false
        }
    });
    $(document).on('click', '.sign-up', function () {
        $(this).val('Зарегистрироваться')
            .removeClass('bg-blue')
            .addClass('bg-grey')
            .attr('disabled', 'true');
    });

    $(document).on('click', '.users-list .t-delete', function (e) {
        e.preventDefault();
        $('.modal-delete').show();
        var href = $(this).closest('a').attr('href');
        $('.modal-delete .delete-btn').attr('href', href);
    });


    $(document).on('click', '.voting-bill', function () {
        $(this).siblings('.voting-bill').removeClass('voting-bill--active');
        $(this).addClass('voting-bill--active')
    });




});