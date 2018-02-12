$(function () {
    if ($('.hotkeys')) {

        var keysObj = [
            {
                //test
                func:function () {
                    console.log('first function')
                },
                keys: [90, 88]
            },
            {
                //фокус на инпутпоиска
                func:function () {
                    $('.hotkeys').find('.t-search').focus();
                },
                keys: [113]
            },
            {
                //клик по сабмит
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.send-hotkey').click()
                },
                keys: [17, 83]
            },
            {
                //клик по кнопке "не дейтвительно"
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.not-valid-hotkey').click()
                },
                keys: [17, 8]
            },
            {
                //клик по кнопке "отмена"
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.cancel-hotkey').click()
                },
                keys: [27]
            }
        ];


        (function runOnKeys() {
            var pressed = [];

            document.onkeydown = function (e) {
                e = e || window.event;
                pressed.push(e.keyCode); //массив нажатых клавиш
                for (var j=0; j<keysObj.length; j++) {
                    if(pressed.length !== keysObj[j]["keys"].length) continue;
                    var on = 0;
                    for( var i = 0; i < keysObj[j]["keys"].length; i++ ) {
                        for( var k = 0; k < pressed.length; k++ ) {
                            if(pressed[k] === keysObj[j]["keys"][i]) {
                                on++;
                                break
                            }
                        }
                        if (on === pressed.length) {
                            keysObj[j].func()
                        }
                    }
                }
            };

            document.onkeyup = function () {
                pressed = [];
            };

        })()
    }
});