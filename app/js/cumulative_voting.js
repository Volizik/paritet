$(function() {

    $(document).on('keyup', '.cumulative-voting__input', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        var buttonsParent = parent.find('.voting-actions__choice');
        var buttons = buttonsParent.find('.voting-actions__choice--item');
        var btnTrue = buttonsParent.find('.voting-true');

        if (!buttons.hasClass('voting-selected')) {
            btnTrue.addClass('voting-selected');
            btnTrue.find('input[type="checkbox"]').attr('checked', 'checked');
        }
    });

    $(document).on('blur', '.cumulative-voting__input', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        var inputs = parent.find('.cumulative-voting__input');
        var total = parent.find('.cumulative-voting__total').html();
        var sumElement = parent.find('.cumulative-voting__sum');
        var sum = 0;
        var _total = '';

        for (var i=0; i<total.length; i++) {
            var num = total[i];
            if (isNaN(num)) {
                continue
            }
            _total += num
        }

        inputs.each(function () {
            sum += +($(this).val())
        });
        sumElement.text(sum);

        if (sum > _total) {
            sumElement.addClass('red');
            $(this).parent().find('.cumulative-voting-warning').remove();
            if(+($(this).val()) > 0) {
                $(this).parent().append('<span class="red cumulative-voting-warning">Количество отданных голосов превышает имеющееся количество голосов. Голосование будет признано недействительным</span>')
            }
        } else {
            inputs.parent().find('.cumulative-voting-warning').remove();
            sumElement.removeClass('red');
        }

    });

    $(document).on('click', '.voting-actions__choice--item', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        var inputs = parent.find('.cumulative-voting__input');
        if (inputs.length > 0) {
            if ($(this).hasClass('voting-selected')) {
                return
            }

            inputs.each(function () {
                $(this).val('')
            });
            parent.find('.cumulative-voting-warning').remove();
            parent.find('.cumulative-voting__sum').removeClass('red').text(0);
        }
    })

});