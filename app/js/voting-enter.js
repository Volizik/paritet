// $(function () {
//     if ($('.hotkeys')) {
//         var arr = [];
//         var hotKeysObj = [
//             {
//                 func: function () {
//                     console.log('!!!')
//                 },
//                 keys: ["17", "49"]
//             },
//             {
//                 func: function () {
//                     $('.hotkeys').find('.t-search').focus();
//                     console.log('+++')
//                 },
//                 keys: ["113"]
//             }
//         ];
//
//         function implode(glue, pieces) {
//             if ( pieces instanceof Array ) {
//
//                 return (glue + pieces.join(glue));
//             }
//             else {
//                 return pieces;
//             }
//         }
//
//         console.log(hotKeysObj[0].func, implode(',', hotKeysObj[0].keys));
//         for (var y = 0; y < hotKeysObj.length; y++) {
//             runOnKeys(hotKeysObj[y].func, implode(',', hotKeysObj[y].keys));
//             console.log(hotKeysObj[y].func, implode(',', hotKeysObj[y].keys));
//         }
//         console.log(arr);
//
//         function runOnKeys(func) {
//             // console.log(arguments)
//             var codes = [].slice.call(arguments, 1);
//             var pressed = {};
//             arr.push(codes);
//
//
//             document.onkeydown = function (e) {
//
//                 e = e || window.event;
//
//                 pressed[e.keyCode] = true;
//                 // console.log(pressed)
//                 for (var i = 0; i < codes.length; i++) {
//                     if (!pressed[codes[i]]) {
//                         // console.log(codes[i]);
//                         return;
//                     }
//                 }
//                 pressed = {};
//
//                 func();
//
//             };
//
//
//             document.onkeyup = function (e) {
//                 e = e || window.event;
//
//                 delete pressed[e.keyCode];
//             };
//
//         }
//
//         // runOnKeys (
//         //     function() {
//         //         console.log('!!!')
//         //     },
//         //     "17",
//         //     "49"
//         // );
//         // runOnKeys (
//         //     function() {
//         //       $('.hotkeys').find('.t-search').focus();
//         //     },
//         //     "113"
//         // );
//
//     }
//
//
// });