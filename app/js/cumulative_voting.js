$(function() {


    function onKeyUpCumulativeInput(_this) {
        var parent = _this.closest('.cumulative-voting__block');
        var buttonsParent = parent.find('.voting-actions__choice');
        var buttons = buttonsParent.find('.voting-actions__choice--item');
        var btnTrue = buttonsParent.find('.voting-true');

        if (!buttons.hasClass('voting-selected')) {
            btnTrue.addClass('voting-selected');
            btnTrue.find('input[type="checkbox"]').attr('checked', 'checked');
        }
        if (!_this.closest('.content__block').hasClass('modal-is-shown')) {
            _this.closest('.content__block').find('.voting-send').removeAttr('style');
            _this.closest('.content__block').find('.questionModal').closest('.overlay').show();
            _this.closest('.content__block').find('.questionModal').find('button').focus();
            _this.closest('.content__block').addClass('modal-is-shown');
        }

    }

    $(document).on('keyup', '.cumulative-voting__input', function () {
        onKeyUpCumulativeInput($(this))
    });

    function onChangeCumulativeInput(_this) {
        var parent = _this.closest('.cumulative-voting__block');
        var inputs = parent.find('.cumulative-voting__input');
        var total = parent.find('.cumulative-voting__total').val().replace(',', '.');
        var sumElement = parent.find('.cumulative-voting__sum');
        var sum = 0;

        inputs.each(function () {
            sum += +($(this).val())
        });

        if (sum > total) {
            sumElement.addClass('red');
            parent.find('.cumulative-voting-warning').remove();
            if(+(_this.val()) > 0) {
                parent.find('.voting__block').append('<span class="cumulative-voting-warning">Отдано больше голосов чем имеется. Голосование недействительно</span>')
            }
        } else {
            parent.find('.cumulative-voting-warning').remove();
            sumElement.removeClass('red');
        }

        var sumReverse = sum.toString().split('').reverse();
        var _sumReverse = [];
        for (var j = 0; j < sumReverse.length; j++) {
            if (isNaN(sumReverse[j]) || isNaN(sumReverse[j - 1])) {
                _sumReverse.push(sumReverse[j])
                continue
            }
            if (j % 3 === 0) {
                _sumReverse.push(sumReverse[j] + ' ');
            } else {
                _sumReverse.push(sumReverse[j]);
            }
        }
        sumElement.text(_sumReverse.reverse().join(''));
    }

    $(document).on('blur', '.cumulative-voting__input', function () {
        // $(this).closest('.string').find('.help-hidden-btn').removeClass('help-hidden-btn--is-visible');
        onChangeCumulativeInput($(this))
    });

    $(document).on('focus', '.cumulative-voting__input', function () {
        $(this).closest('.cumulative-voting__block').find('.help-hidden-block').removeClass('help-hidden-block--is-visible');
        $(this).closest('.string').find('.help-hidden-block').addClass('help-hidden-block--is-visible')
    });

    $(document).on('click', '.voting-actions__choice--item', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        var inputs = parent.find('.cumulative-voting__input');
        if (inputs.length > 0) {
            inputs.each(function () {
                $(this).val('')
            });
            parent.find('.cumulative-voting-warning').remove();
            parent.find('.cumulative-voting__sum').removeClass('red').text(0);
        }
    });

    $(document).on('click', '.cumulative-voting__block .voting-actions__choice--item', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        if ($(this).hasClass('voting-false') || $(this).hasClass('voting-abstained')) {

            var total = parent.find('.cumulative-voting__total').val();

            parent.find('.noborder').attr('readonly', '').css({
                pointerEvents: 'none'
            });
            $('.cumulative-voting__sum').text(total);
        } else {
            parent.find('.noborder').removeAttr('readonly').css({
                pointerEvents: 'auto'
            });
        }
    })

    $(document).on('click', '.part-of-voices-btn', function () {
        var inputInfo = $(this).closest('.cumulative-voting__block').find('.data-cumulative-input');
        var members = inputInfo.data('amount');
        var voices = inputInfo.data('total').toString().indexOf(',') > 0 ? inputInfo.data('total').replace(',', '.') : inputInfo.data('total');
        var input = $(this).closest('.string').find('.cumulative-voting__input');
        input.val(Math.floor(voices / members));
        onKeyUpCumulativeInput(input);
        onChangeCumulativeInput(input);
    });
    $(document).on('click', '.remaining-voices-btn', function () {
        var votingBlock = $(this).closest('.cumulative-voting__block');
        var allInputs = votingBlock.find('.cumulative-voting__input');
        var sum = 0;
        var inputInfo = $(this).closest('.cumulative-voting__block').find('.data-cumulative-input');
        var voices = inputInfo.data('total').toString().indexOf(',') > 0 ? inputInfo.data('total').replace(',', '.') : inputInfo.data('total');
        var input = $(this).closest('.string').find('.cumulative-voting__input');
        input.val('');
        allInputs.each(function () {
            sum += +($(this).val());
        });
        input.val(voices - sum);
        onKeyUpCumulativeInput(input);
        onChangeCumulativeInput(input);
    })

});