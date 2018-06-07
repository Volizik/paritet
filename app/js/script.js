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

    $(document).click(function (event) {
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

    $(document).on('click', '.someone', function () {
        window.location = "../html/admin_pages/admin-user-cabinet-account-main.html";
    });
    $(document).on('click', '.someone-group', function () {
        window.location = "../html/pages/admin-groups-cabinet-group-main.html";
    });
    $(document).on('click', '.iss-bills-list tbody .bill-num', function () {
        window.location = "issuer-bills-cabinet-bill.html";
    });
    $(document).on('click', '.own-bills-list tbody .bill-num', function () {
        window.location = "owner-bills-cabinet-bill.html";
    });
    $(document).on('click', '.manager-issuers-list tbody .mi-register', function () {
        window.location = "manager-issuer-cabinet.html";
    });
    $(document).on('click', '.own-issuers-list tbody .mi-register', function () {
        window.location = "owner-issuer-cabinet.html";
    });
    $(document).on('click', 'tbody .mv-register', function () {
        window.location = "manager-voting-issuer-list.html";
    });
    $(document).on('click', 'tbody .vil-bill', function () {
        window.location = "manager-voting-form.html";
    });
    $(document).on('click', 'tbody .ai-register', function () {
        window.location = "../html/admin_pages/admin-issuer-cabinet.html";
    });
    $(document).on('click', 'tbody .iml-number', function () {
        window.location = "issuer-meeting-cabinet-info.html";
    });
    $(document).on('click', 'tbody .mml-number', function () {
        window.location = "manager-meeting-cabinet-info.html";
    });
    $(document).on('click', 'tbody .ov-register', function () {
        window.location = "owner-voting-cabinet-info.html";
    });

    /*-------------------!SET LOCATION FOR CLASS "SOMEONE"-------------------------*/


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

    function createCross(input) {
        var cross = $('<span class="act_t-search"></span>');
        input.after(cross);
        var crossLeft = cross[0].getBoundingClientRect().right;
        var inputLeft = input[0].getBoundingClientRect().right;
        cross.css({
            'left': inputLeft - crossLeft + 300 - 30
        });
    }

    $(document).on('click', '.filter .submit', function () {
        var filter = $(this).closest('.filter');
        var input = filter.parent().find('.t-search');
        var btn = filter.parent().find('.insert');
        if ($('.activeTr').length > 0) {
            input.val($('.activeTr').text());
            filter.hide();
            if (input.hasClass('t-search--disabled')) {
                return false
            } else {
                btn.addClass('insert-active').removeAttr('disabled');
                input.addClass('t-search--disabled').attr('readonly', '');
                createCross(input)
            }
        }
    });
    $(document).on('keyup', '.t-search', function () {
        if ($(this).val() !== '') {
            if ($(this).siblings('.act_t-search').length > 0) {
                return false
            }
            createCross($(this));
            $(this).addClass('t-search--cross')
        } else {
            $(this).removeClass('t-search--cross');
            $(this).siblings('.act_t-search').remove();
        }
    })
    $(document).on('click', '.act_t-search', function () {
        $(this).parent().find('.t-search').removeClass('t-search--disabled').removeAttr('readonly').val('').removeClass('t-search--cross');
        $(this).parent().find('.insert').removeClass('insert-active');
        $(this).remove();
    });
    $(document).on('click', '.filter .cancel', function () {
        $(this).closest('.filter').hide();
    });


    $(document).on('click', '.admin-groups .filter tr', function () {
        $('.admin-groups .filter tr').removeClass('activeTr');
        $(this).addClass('activeTr');
    });
    $(document).on('click', '.admin-groups .filter .submit', function () {
        if ($('.activeTr').length > 0) {
            $('.admin-groups .t-search').val($('.activeTr').text());
            $('.admin-groups .filter').hide();
            $('.admin-groups .insert').addClass('insert-active').removeAttr('disabled')
        }
    });


    $(document).on('click', '.sidebar__item .users_inside', function () {
        var curLoc = window.location.href.toString();
        if (~curLoc.indexOf('admin-users-list')) {
            $('.header__filter--field .filter--input').hide();
            $('.autofilter[data-id="user_inside"]').css('display', 'flex');
        } else {
            window.location = "/app/html/pages/admin-users-list.html"
        }

    });
    $(document).on('click', '.sidebar__item .users_outside', function () {
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


    $(document).on('click', '.sidebar__item .active-now', function () {
        $('.header__filter--field .filter--input').hide();
        $('.autofilter').hide();
        $('.autofilter[data-id="active-now"]').css('display', 'flex');

    });
    $(document).on('click', '.sidebar__item .meeting', function () {
        $('.header__filter--field .filter--input').hide();
        $('.autofilter').hide();
        $('.autofilter[data-id="meeting"]').css({'display': 'flex'});

    });


    $(document).on('click', '.filter .filter tr', function () {
        $('.filter .filter tr').removeClass('activeTr');
        $(this).addClass('activeTr');
    });
    $(document).on('click', '.filter .filter .submit', function () {
        if ($('.filter .filter .activeTr').length > 0) {
            $(this).closest('.filter__body--item').find('.t-search').val($('.activeTr').text());
            $('.header__filter .filter .filter').hide();
        }
    })


    //dropdown-----------------------------------------------
    $(document).on('click', '.drop', function () {
        if ($(this).find('ul').hasClass('visible-drop')) {
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
    $(document).click(function (event) {
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


    $(document).on('change', '.add-files input[type="file"]', function () {
        var parent = $(this).parent();
        var chosenFiles = $(this)[0].files;
        for (var i = 0; i < chosenFiles.length; i++) {
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
    // $(document).on('click', '.show-condition', function () {
    //     $('.condition-hidden').addClass('show-condition-hidden');
    //     $(this).hide();
    // });
    // $(document).on('click', '.hide-condition', function () {
    //     $('.condition-hidden').removeClass('show-condition-hidden');
    //     $('.show-condition').show();
    // });
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


    $(document).on('click', '.load-list', function () {
        var _this_ = $(this);
        if ($(this).hasClass('grey')) return false;
        var meetId = $(this).siblings('input[name="meetId"]').val();
        $(this).attr('data-btn-text', 'Список загружается...').addClass('orange');
        $.ajax({
            url: '/Manager/Meeting/GetRegistry',
            type: 'post',
            data: {
                meetId: meetId
            },
            success: function (html) {
                console.log('html', html)
                _this_.attr('data-btn-text', 'Список получен ' + html).removeClass('orange').addClass('grey');
            },
            error: function (err) {
                console.log(err)
                var modal = _this_.siblings('.overlay')
                modal.find('.modal__header h2').text('Ошибка №' + err.status);
                modal.find('.modal__body').html('<div style="margin-bottom: 10px">'+ err.statusText + '</div>' + '<div>'+ err.responseText + '</div>');
                modal.show();
                _this_.attr('data-btn-text', 'Получить список...').removeClass('orange');
            }
        })
    });

    $(document).on('click', 'label[for="applies"]', function () {
        if ($('#applies').is(':checked')) {
            $(this).closest('.content__block').find('.voting-date').addClass('voting-date-hidden')
        } else {
            $(this).closest('.content__block').find('.voting-date').removeClass('voting-date-hidden')
        }
    });

    $(document).on('click', '.show-constraints', function () {
        $('.constraints').toggleClass('constraints-hidden');
    });

    $(document).on('click', '.show-meetings', function () {
        if ($('.meetings').hasClass('meetings-hidden')) {
            $('.meetings').removeClass('meetings-hidden');
            $(this).text('Скрыть ход собрания')
        } else {
            $('.meetings').addClass('meetings-hidden');
            $(this).text('Показать ход собрания')
        }
    });

    $(document).on('click', '.info-affix', function () {
        $(this).parent().siblings('.add-files').fadeIn('fast')
    });
    $(document).on('click', '.materials-list__btn', function () {
        $(this).siblings('.add-files').fadeIn('fast')
    });
    $(document).on('click', '.active-question__sign', function () {
        $(this).siblings('.overlay').show()
    });
    // $(document).on('click', '.active-question .cancel', function () {
    //     $(this).closest('.active-question__content').fadeOut('fast')
    // });
    // $(document).click(function (event) {
    //     if ($(event.target).closest(".active-question").length) return;
    //     $(".active-question__content").fadeOut("fast");
    // });

    $(document).on('click', '.show-all-state', function () {
        var parent = $(this).closest('tr');
        var row = $('.hidden-row');
        if (parent.find(row).hasClass('hidden')) {
            parent.find(row).removeClass('hidden');
            $(this).text('Всего (скрыть)')
        } else {
            parent.find(row).addClass('hidden');
            $(this).text('Всего (показать)')
        }
    });

    $(document).on('click', '.agenda-btn-new-question', function () {
        $(this).closest('.content__block').find('.modal-add-question').closest('.overlay').show();
    });

    if ($('.write-msg')) {
        $(document).on('click', '.show-write-msg', function () {
            $('.write-msg').fadeIn('fast');
        });
        $(document).on('click', '.write-msg .cancel', function () {
            $('.write-msg').fadeOut('fast');
        });
    }

    $(document).on('click', '.modal', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.modal__header .t-delete', function () {
        $(this).closest('.overlay').fadeOut('fast');
    });
    $(document).on('click', '.modal .cancel', function () {
        $(this).closest('.overlay').fadeOut('fast');
        return false;
    });

    $(document).on('click', '.edit-status-meeting', function () {
        $(this).siblings('.overlay').show()
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
        var text = $(this).closest('.content__block').find('.voting-order__text');
        if (text.hasClass('j-invisible')) {
            text.removeClass('j-invisible')
        } else {
            text.addClass('j-invisible')
        }
    });

    $(document).on('click', '.sign-up', function () {
        $(this).val('Зарегистрироваться')
            .removeClass('bg-blue')
            .addClass('bg-grey')
            .attr('disabled', 'true');
    });


    $(document).on('click', '.voting-bill', function () {
        $(this).siblings('.voting-bill').removeClass('voting-bill--active');
        $(this).addClass('voting-bill--active')
    });

    $(document).on('change', '.content__block--photo input[type="file"]', function () {
        var span = $(this).closest('.content__block--photo').find('.content__block--photo-selected');
        var chosenFiles = $(this)[0].files;
        span.text(chosenFiles[0].name);
    });

    $('.select2-docs').select2({
        width: 'resolve',
        dropdownParent: $('.select2-docs').parent()
    });


    if ($('.contenteditable')) {
        $('.contenteditable').first().focus()
    }

    $(document).on('click', '.create-new__modal label', function () {
        var inputRemeeting = $(this).parent().find('input[value="Remeeting"]');
        var inputCopy = $(this).parent().find('input[value="Copyof"]');
        var allSelect = $(this).siblings('.sub-select');
        var select = $(this).next('.select');

        if (inputCopy.is(':checked') || inputRemeeting.is(':checked')) {
            allSelect.hide();
            select.show()
        } else {
            allSelect.hide();
        }
    });

    function selectAllVoting(e) {
        var items = $('.voting-enter__table').find('.voting-actions__choice--item');
        var votingTrue = $('.voting-enter__table').find('.voting-true');
        var votingFalse = $('.voting-enter__table').find('.voting-false');
        var votingAbstained = $('.voting-enter__table').find('.voting-abstained');
        var votingNotValid = $('.voting-enter__table').find('.voting-not-valid');
        if (e.hasClass('voting-true')) {
            items.removeClass('voting-selected').find('input').removeAttr('checked')
            votingTrue.addClass('voting-selected');
            votingTrue.find('input').attr('checked', 'checked');
        }
        if (e.hasClass('voting-false')) {
            items.removeClass('voting-selected').find('input').removeAttr('checked')
            votingFalse.addClass('voting-selected');
            votingFalse.find('input').attr('checked', 'checked');
        }
        if (e.hasClass('voting-abstained')) {
            items.removeClass('voting-selected').find('input').removeAttr('checked')
            votingAbstained.addClass('voting-selected');
            votingAbstained.find('input').attr('checked', 'checked');
        }
        if (e.hasClass('voting-not-valid')) {
            items.removeClass('voting-selected').find('input').removeAttr('checked')
            votingNotValid.addClass('voting-selected');
            votingNotValid.find('input').attr('checked', 'checked');
        }
    }

    $(document).on('click', 'label[for="select-all-question"]', function () {
        var items = $('.voting-enter__table').find('.voting-actions__choice--item');
        var votingForAll = $('.voting-for-all');
        if ($(this).prev().is(':checked')) {
            console.log('not checked');
            items.find('input').removeAttr('readonly');
            items.removeAttr('style');
            votingForAll.removeClass('voting-for-all--active').find('.voting-actions__choice--item').removeClass('voting-selected').find('input').removeAttr('checked')
        } else {
            console.log('checked');
            items.css({
                pointerEvents: 'none'
            });
            items.find('input').attr('readonly', 'true');
            items.removeClass('voting-selected');
            votingForAll.addClass('voting-for-all--active')
        }
    });
    $(document).on('click', '.voting-for-all .voting-actions__choice--item', function () {
        if ($('.voting-enter__select-all__label input').is(':checked')) {
            selectAllVoting($(this))
        }
    });


    (function () {
        var text = $('.voting-enter__td-text');
        text.each(function () {
            if ($(this).height() > 30) {
                $(this).addClass('voting-enter__td-text--hidden')
            }
        })
    })();
    $(document).on('click', '.voting-enter__td-text--hidden', function () {
        $(this).toggleClass('voting-enter__td-text--visible')
    });


    $('.overlay').bind('mousewheel', function () {
        return false
    });

    if ($('.modal-show-on-load').length > 0) {
        $('.modal-show-on-load').closest('.overlay').show();
    }

    $(document).on('click', '.calculationMethod', function () {
        if ($(this).val() === 'DEALING_OVER50') {
            $('.calculationAdd').slideDown("fast");
        } else {
            $('.calculationAdd').slideUp("fast");
        }
    });


    $(document).on('click', '.select2-take-all', function () {
        if ($('.select2-take-all').hasClass('select2-take-all--checked')) {
            $('.select2-docs > option').removeAttr('selected');
            $('.select2-take-all').toggleClass('select2-take-all--checked');
            $('.select2-docs').trigger("change");
        } else {
            $('.select2-docs > option').prop('selected', 'selected');
            $('.select2-take-all').toggleClass('select2-take-all--checked');
            $('.select2-docs').trigger("change");
        }
    });
    $(document).on('click', '.select2-selection__choice__remove', function () {
        $('.select2-take-all').removeClass('select2-take-all--checked');
    });

    $(document).on('click', '.voting_auth', function (event) {
        var _this = $(this);
        var testDiv = $("<div class='testDiv'></div>");
        var _id = $(this).attr('data-votingBtnId');
        event.preventDefault();
        $.ajax({
            url: $(this).parents('form').attr('action').toString(),
            type: 'post',
            success: function (html) {
                var parent = _this.parents('.parentRow');
                testDiv.html(html);
                var _row = testDiv.find('.voting_auth[data-votingBtnId=' + _id + ']').parents('.parentRow');
                parent.html(_row.html());
            }
        })
    });


    $(document).on('blur', '.input-meeting-date', function () {
        if ($(this).val() === '') {
            $('.input-meeting-time').val('')
        }
    });
    $(document).on('change', '.formOfConduct', function () {
        if ($(this).val() === 'ABSENT') {
            $(this).closest('.meeting__info').find('.hide-if-absent').hide()
        } else {
            $(this).closest('.meeting__info').find('.hide-if-absent').show()
        }
    })

    $(document).on('click', '.modalBtnOk', function () {
        $(this).closest('.overlay').hide();
    })

    $(document).on('change', '.event-change', function () {
        var parent = $(this).closest('tr');
       if($(this).val() == 2){
           parent.find('.ast-voting .noborder').val(0).attr('disabled', 'disabled');
       }
       else {
           parent.find('.ast-voting .noborder').removeAttr('disabled');
       }
    });

    $(document).on('change', '.input-meeting-date', function () {
        $('.reg-start-date').val($(this).val());
    });

});