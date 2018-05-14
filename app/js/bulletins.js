$(function () {

    // ajax для кнопок "Подписать и отправить"
    $(document).on('click', '.voting-send', function (e) {
        e.preventDefault();
        var _this = $(this);
        var parent = $(this).closest('.content__block');
        console.log(parent.find('form').attr('action'));
        $.ajax({
            url: parent.find('form').attr('action').toString(),
            type: 'post',
            success: function (data) {
                parent.html(data)
            },
            error: function (err) {
                console.error(err)
            }
        })
    });

    $(document).on('click', '.voting-actions__choice--item', function () {
        var parent = $(this).closest('.voting-actions');
        var siblingsVotingActions = parent.siblings('.voting-actions')
        var inputs = parent.find('input[type="radio"]');
        var votingFalse = parent.find('.if-voting-false');
        var votingTrue = parent.find('.if-voting-true');
        var thisRadio = $(this).find('input[type="radio"]');
        var contentBlock = $(this).closest('.content__block');
        var thisClassList = $(this).attr('class').split(' ');
        var editedThisClassList = '';
        contentBlock.find('.help-hidden-block').removeClass('help-hidden-block--is-visible');

        // Берем классы нажатой кнопки, и переводим их в строку, по которой будет удобно искать кнопку в соседней строке
        for (var i=0; i<thisClassList.length; i++) {
            editedThisClassList += '.' + thisClassList[i].trim();
        }

        if (parent.hasClass('voting-actions-disable')) {
            return false
        }
        if (!contentBlock.hasClass('modal-is-shown')) {
            contentBlock.find('.modal-first-click').closest('.overlay').show().focus();
            contentBlock.find('.modal-first-click').find('button').focus();
            contentBlock.addClass('modal-is-shown');
            contentBlock.find('.voting-send').show();
        }
        // Запрещаем клик по кнопке, которая уже нажата в соседней строке
        if (siblingsVotingActions.find(editedThisClassList).hasClass('voting-selected')) {
            return false
        }
        if ($(this).hasClass('voting-selected')) {
            $(this).removeClass('voting-selected');
            thisRadio.removeAttr('checked');
            votingFalse.show();
            votingTrue.hide();
            parent.find('.cumulative-voting__sum').text('0');
            return false
        } else if (parent.find('.voting-selected').length > 0) {
            parent.find('.voting-actions__choice--item').removeClass('voting-selected');
            $(this).addClass('voting-selected');
            inputs.each(function () {
                $(this).removeAttr('checked')
            });
            thisRadio.attr('checked', 'checked');
            votingFalse.hide();
            if ($(this).hasClass('voting-veto')) {
                votingTrue.hide();
                return false
            } else {
                votingTrue.show();
                return false
            }
        } else {
            $(this).addClass('voting-selected');
            thisRadio.attr('checked', 'checked');
            votingFalse.hide();
            if ($(this).hasClass('voting-veto')) {
                votingTrue.hide();
                return false
            } else {
                votingTrue.show();
                return false
            }
        }
    });

    // function showError(_this) {
    //     // Превышение количества нажатия кнопки ЗА для голосования с кандидатами
    //     var parent = _this.closest('.candidate-question');
    //     var maxAmountCandidates = parent.find('.dataCumulativeInput').data('amount-candidates');
    //     var count = parent.find('.voting-true.voting-selected').length;
    //     if (count > maxAmountCandidates) {
    //         parent.find('.cumulative-voting-warning__amount-yes-voting').remove();
    //         parent.find('.candidatesList').before('<span class="cumulative-voting-warning__amount-yes-voting">Превышено количество голосов ЗА. Голосование недействительно</span>')
    //     } else {
    //         parent.find('.cumulative-voting-warning__amount-yes-voting').remove();
    //     }
    // }



    $(document).on('click', '.candidate-question .voting-actions__choice--item', function () {
        // showError($(this))
    });








});
