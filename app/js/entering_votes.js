$(function () {

    // Автоматическое нажатие кнопок голосования при вводе в инпут
    function voisesButtonClickEmit(_this) {
        var votingActions = _this.closest('.voting-actions');
        var siblingVotingAction = votingActions.siblings('.voting-actions');
        var buttons = votingActions.find('.voting-actions__choice--item');
        var btnTrue = votingActions.find('.voting-true');
        var btnFalse = votingActions.find('.voting-false');

        // Если не нажата ни одна кнопка
        if (!buttons.hasClass('voting-selected')) {
            var siblingVotingActionButtonSelected = siblingVotingAction.find('.voting-actions__choice--item.voting-selected');
            if (siblingVotingActionButtonSelected.length > 0) {
                if (siblingVotingActionButtonSelected.hasClass('voting-true')) {
                    btnFalse.click()
                } else {
                    btnTrue.click()
                }
            } else {
                btnTrue.click()
            }
        }
        this.unclick = function () {
            //если кнопка нажата - отжимаем
            if (buttons.hasClass('voting-selected')) {
                votingActions.find('.voting-selected').click()
            }
        };
        return this;
    }

    //Валидация вводимых символов
    function isAllowedKeyCode(key) {
        // Разрешенные клавиши для ввода дроби
        if ((+key >= 0 && +key <= 9) || key === '/' || key === ' ' || key === 'Backspace' || key === 'Delete' || key === 'ArrowRight' || key === 'ArrowLeft') {
            return true
        } else {
            return false
        }
    }

    // Возвращает обьект с полем result:"true" если value не больше чем total, иначе false
    function comparingIsLager(total, value) {
        return $.ajax({
            url: '/FractionCalculator/ComparingIsLager',
            type: 'get',
            data: {
                value1: total,
                value2: value
            },
            dataType: 'json',
            success: function (html) {
                // console.log('comparingIsLager success ', html)
            },
            error: function (err) {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
        })
    }

    function additionFraction(stringOfFractions) {
        return $.ajax({
            url: '/FractionCalculator/SumOfFractions',
            type: 'get',
            data: {
                value: stringOfFractions
            },
            dataType: 'json',
            success: function (html) {},
            error: function (err) {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
        })
    }

    // Простое разделенное голосование
    $(document).on('keydown', '.votes-cast', function(e) {
        voisesButtonClickEmit($(this));
        var remainingBtn = $(this).closest('.voting__block').find('.remainingVoicesBtn');
        remainingBtn.show();
        return isAllowedKeyCode(e.originalEvent.key);
    });
    $(document).on('blur', '.votes-cast', function() {
        var _this = $(this);
        var parent = $(this).closest('.voting__block');
        var votingVoicesTotal = parent.find('.votingVoicesTotal').val().replace(/\u00a0/g, '');
        var arrOfInputs = parent.find('.votes-cast');
        var arrOfInputsVal = [];
        arrOfInputs.each(function () {
            // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
            if ($(this).val().trim() === '') {
                $(this).val(0)
            }
            arrOfInputsVal.push($(this).val().replace(/\u00a0/g, '')); // Значение каждого инпута заносим в массив
        });
        // candidateQuestionFunc($(this));
        additionFraction(arrOfInputsVal.join(';')).done(function (e) {
            // Складываем дроби, и сравниваем с "Голосов всего"
            var sum = e.result.replace(/\u00a0/g, '');
            comparingIsLager(votingVoicesTotal, sum).done(function (data) {
                if (data.result === 'true') {
                    _this.closest('.question').find('.cumulative-voting-warning').remove()
                } else {
                    _this.closest('.question').find('.cumulative-voting-warning').remove();
                    _this.closest('.voting__block').before('<span class="cumulative-voting-warning">Отдано больше голосов чем имеется. Голосование недействительно</span>')
                }
            })
        });


    });
    $(document).on('click', '.remainingVoicesBtn', function () {
        // Вычитание
        var parent = $(this).closest('.voting__block');
        var votesCastFirst = parent.find('.votesCastFirst').val(); // Значение первого инпута в обыкновенном голосовании
        var votesCastSecond = parent.find('.votesCastSecond'); // Значение второго инпута в обыкновенном голосовании
        var votingVoicesTotal = parent.find('.votingVoicesTotal').val().replace(/\u00a0/g, ''); // Количество голосов всего (Вырезаем все спецсимволы пробела)
        var _this = $(this);
        $.ajax({
            url: '/FractionCalculator/Subtract',
            type: 'get',
            data: {
                value1: votingVoicesTotal,
                value2: votesCastFirst
            },
            dataType: 'json',
            success: function (html) {
                var request = html.result.replace(/\u00a0/g, '').replace('  ', ' '); // Удаляем спецсимволы пробела, и двойные пробелы заменяем на одинарные
                if (request.indexOf('-') !== -1 || request.indexOf('Invalid') !== -1) {  // Если в ответе есть отрицательное значение
                    votesCastSecond.val('Ошибка');
                    voisesButtonClickEmit(_this).unclick() // отжимаем нажатую кнопку при ошибке
                } else {
                    votesCastSecond.val(request);
                    voisesButtonClickEmit(_this); // нажимаем кнопку
                }
            },
            error: function (err) {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
        })
    });



    // Срабатываение кнопки кумулятивного голосования
    function cumulativeButtonClickEmit(_this) {
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
        this.unclick = function () {
            //если кнопка нажата - отжимаем
            if (buttons.hasClass('voting-selected')) {
                buttonsParent.find('.voting-selected').click()
            }
        };
        return this;

    }

    //Вычитание массива дробей из дроби
    function fractionMinusListOfFraction(arrOfInputsValWithoutThis, _this) {
        var stringForSend = arrOfInputsValWithoutThis.join(';');
        var parent = _this.closest('.cumulative-voting__block');
        var totalVoices = parent.find('.dataCumulativeInput').data('total').replace(/\u00a0/g, ''); // Количество голосов всего (Вырезаем все спецсимволы пробела);
        var input = _this.closest('.string').find('.cumulative-voting__input');
        return $.ajax({
            url: '/FractionCalculator/FractionMinusListOfFraction',
            type: 'get',
            data: {
                value1: totalVoices,
                listOfFraction: stringForSend
            },
            dataType: 'json',
            success: function (html) {
                var request = html.result.replace(/\u00a0/g, '').replace('  ', ' '); // Удаляем спецсимволы пробела, и двойные пробелы заменяем на одинарные
                if (request.indexOf('-') !== -1 || request.indexOf('Invalid') !== -1) {  // Если в ответе есть отрицательное значение
                    input.val('Ошибка');
                    console.log(html);
                } else {
                    input.val(request);
                    cumulativeButtonClickEmit(_this); // Имитируем клик по кнопке ЗА, показываем модалку(если первый клик)
                    sumOfEnterFraction(_this).done(function (data) { // Суммируем все значения инпутов, и отображаем в отведенном для этого теге
                        // После успешного выполнения считаем, что бы количество голоов всего не превышало количество введенных голосов
                        comparingIsLager(totalVoices, data.result.replace(/\u00a0/g, '')).done(function (result) {
                            // Если количество введенных голосов превышает количество "Голосов всего" - выводим сообщение об ошибке. Иначе удаляем сообщение
                            if (result.result === 'false') {
                                parent.find('.cumulative-voting-warning').remove();
                                parent.find('.voting__block').append('<span class="cumulative-voting-warning">Отдано больше голосов чем имеется. Голосование недействительно</span>')
                            } else if (result.result === 'true') {
                                parent.find('.cumulative-voting-warning').remove();
                            }
                        })
                        // Если сумма значений равняется нулю - скрыть "Голосов отдано" иначе - показать
                        if (parent.find('.cumulative-voting__sum').text().trim() === '0') {
                            console.log('is hidden');
                            parent.find('.cumulative-voting__sum').closest('.bulleting-item').hide();
                        } else {
                            console.log('is visible');
                            parent.find('.cumulative-voting__sum').closest('.bulleting-item').show();
                        }
                    })
                }
            },
            error: function (err) {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
        })
    }

    // Суммируем все значения инпутов кумулятивного голосования
    function sumOfEnterFraction(_this) {
        var parent = _this.closest('.cumulative-voting__block');
        var cumulativeVotingSum = parent.find('.cumulative-voting__sum');
        var arrOfInputs = parent.find('.cumulative-voting__input');
        var arrOfInputsVal = [];
        arrOfInputs.each(function () {
            // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
            if ($(this).val().trim() === '') {
                $(this).val(0)
            }
            arrOfInputsVal.push($(this).val()); // Значение каждого инпута заносим в массив
        });
        var stringForSend = arrOfInputsVal.join(';'); // Обьединяем все в строку для отправки на сервер
        return $.ajax({
            url: '/FractionCalculator/SumOfFractions',
            type: 'get',
            data: {
                value: stringForSend
            },
            dataType: 'json',
            success: function (html) {
                var request = html.result.replace('  ', ' '); // Двойные пробелы заменяем на одинарные
                cumulativeVotingSum.html(request);
            },
            error: function (err) {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
        })
    }

    // Кумулятивное голосование
    $(document).on('click', '.part-of-voices-btn', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        var inputInfo = parent.find('.dataCumulativeInput');
        var amountCandidates = inputInfo.data('amount-candidates');
        var totalVoices = inputInfo.data('total').replace(/\u00a0/g, ''); // Удаляем спецсимвол пробела
        var input = $(this).closest('.string').find('.cumulative-voting__input');
        var _this = $(this);
        $.ajax({
            url: '/FractionCalculator/Divide',
            type: 'get',
            data: {
                value1: totalVoices,
                value2: amountCandidates
            },
            dataType: 'json',
            success: function (html) {
                var request = html.result.replace(/\u00a0/g, '').replace('  ', ' '); // Удаляем спецсимволы пробела, и двойные пробелы заменяем на одинарные
                if (request.indexOf('-') !== -1 || request.indexOf('Invalid') !== -1) {  // Если в ответе есть отрицательное значение
                    input.val('Ошибка');
                    cumulativeButtonClickEmit(_this)
                } else {
                    input.val(request);
                    cumulativeButtonClickEmit(_this);
                    sumOfEnterFraction(_this).done(function (data) {
                        var totalVoices = parent.find('.dataCumulativeInput').data('total').replace(/\u00a0/g, ''); // Количество голосов всего (Вырезаем все спецсимволы пробела);
                        comparingIsLager(totalVoices, data.result.replace(/\u00a0/g, '')).done(function (result) {
                            // Если количество введенных голосов превышает количество "Голосов всего" - выводим сообщение об ошибке. Иначе удаляем сообщение
                            if (result.result === 'false') {
                                parent.find('.cumulative-voting-warning').remove();
                                parent.find('.voting__block').append('<span class="cumulative-voting-warning">Отдано больше голосов чем имеется. Голосование недействительно</span>')
                            } else if (result.result === 'true') {
                                parent.find('.cumulative-voting-warning').remove();
                            }
                        })
                        // Если сумма значений равняется нулю - скрыть "Голосов отдано" иначе - показать
                        if (parent.find('.cumulative-voting__sum').text().trim() === '0') {
                            console.log('is hidden');
                            parent.find('.cumulative-voting__sum').closest('.bulleting-item').hide();
                        } else {
                            console.log('is visible');
                            parent.find('.cumulative-voting__sum').closest('.bulleting-item').show();
                        }
                    });
                }
            },
            error: function (err) {
                alert('Ошибка! Ответ сервера: ' + err.status);
            }
        })
    });
    $(document).on('click', '.remaining-voices-btn', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        var thisInput = $(this).closest('.string').find('.cumulative-voting__input').val();
        var arrOfInputs = parent.find('.cumulative-voting__input');
        var arrOfInputsValWithoutThis = [];
        arrOfInputs.each(function () {
            // Заменяем пробелы на 0, что бы с сервера не возвращалась ошибка
            if ($(this).val().trim() === '') {
                $(this).val(0)
            }
            arrOfInputsValWithoutThis.push($(this).val()); // Значение каждого инпута заносим в массив
        });
        arrOfInputsValWithoutThis.splice(arrOfInputsValWithoutThis.indexOf(thisInput), 1); // удаляем из массива значение инпута, по кнопке которого кликнули
        fractionMinusListOfFraction(arrOfInputsValWithoutThis, $(this));
    });
    $(document).on('focus', '.cumulative-voting__input', function () {
        $(this).closest('.cumulative-voting__block').find('.help-hidden-block').removeClass('help-hidden-block--is-visible');
        $(this).closest('.string').find('.help-hidden-block').addClass('help-hidden-block--is-visible')
    });
    $(document).on('keydown', '.cumulative-voting__input', function (e) {
        cumulativeButtonClickEmit($(this));
        return isAllowedKeyCode(e.originalEvent.key);
    });
    $(document).on('blur', '.cumulative-voting__input', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        sumOfEnterFraction($(this)).done(function (data) {
            var totalVoices = parent.find('.dataCumulativeInput').data('total').replace(/\u00a0/g, ''); // Количество голосов всего (Вырезаем все спецсимволы пробела);
            comparingIsLager(totalVoices, data.result.replace(/\u00a0/g, '')).done(function (result) {
                // Если количество введенных голосов превышает количество "Голосов всего" - выводим сообщение об ошибке. Иначе удаляем сообщение
                if (result.result === 'false') {
                    parent.find('.cumulative-voting-warning').remove();
                    parent.find('.voting__block').append('<span class="cumulative-voting-warning">Отдано больше голосов чем имеется. Голосование недействительно</span>')
                } else if (result.result === 'true') {
                    parent.find('.cumulative-voting-warning').remove();
                }

            })
            // Если сумма значений равняется нулю - скрыть "Голосов отдано" иначе - показать
            if (parent.find('.cumulative-voting__sum').text().trim() === '0') {
                console.log('is hidden');
                parent.find('.cumulative-voting__sum').closest('.bulleting-item').hide();
            } else {
                console.log('is visible');
                parent.find('.cumulative-voting__sum').closest('.bulleting-item').show();
            }
        });
    });
    $(document).on('click', '.cumulative-voting__block .voting-actions__choice--item', function () {
        var parent = $(this).closest('.cumulative-voting__block');
        var inputs = parent.find('.cumulative-voting__input');
        if ($(this).hasClass('voting-false') || $(this).hasClass('voting-abstained')) {
            // Если нажаты против или возжерживаюсь - запрещаем ввод голосов и отдаем все голоса
            var total = parent.find('.dataCumulativeInput').data('total');
            parent.find('.cumulative-voting__sum').closest('.bulleting-item').show();
            parent.find('.noborder').attr('readonly', '').css({
                pointerEvents: 'none'
            });
            $('.cumulative-voting__sum').text(total);
            inputs.each(function () {
                $(this).val('0')
            });
            parent.find('.cumulative-voting-warning').remove();
        } else {
            parent.find('.cumulative-voting__sum').closest('.bulleting-item').hide();
            $('.cumulative-voting__sum').text('0');
            inputs.each(function () {
                $(this).val('0')
            });
            parent.find('.noborder').removeAttr('readonly').css({
                pointerEvents: 'auto'
            });
        }
    })
});