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
            },
            {
                // ctrl + 1
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[0].click()
                },
                keys: [17, 49]
            },
            {
                // ctrl + 2
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[1].click()
                },
                keys: [17, 50]
            },
            {
                // ctrl + 3
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[2].click()
                },
                keys: [17, 51]
            },
            {
                // ctrl + 4
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[3].click()
                },
                keys: [17, 52]
            },
            {
                // ctrl + 5
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[4].click()
                },
                keys: [17, 53]
            },
            {
                // ctrl + 6
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[5].click()
                },
                keys: [17, 54]
            },
            {
                // ctrl + 7
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[6].click()
                },
                keys: [17, 55]
            },
            {
                // ctrl + 8
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[7].click()
                },
                keys: [17, 56]
            },
            {
                // ctrl + 9
                func: function () {
                    event.preventDefault();
                    $('.hotkeys').find('.bullet-numbers-hotkey .bullet-number')[8].click()
                },
                keys: [17, 57]
            }
        ];


        (function runOnKeys() {
            var pressed = [];

            document.onkeydown = function (e) {
                e = e || window.event;
                pressed.push(e.keyCode);
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
                if (pressed.length === 2) {
                    pressed.splice(1, 1);
                }
                else {
                    pressed = []
                }
            };

        })()
    }
});