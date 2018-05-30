$(function () {

    var con = new Condition();
    con.init({
        valAttrName: 'data-scv',
        cookieName: '___rrr___',
        customLoad: function (item, name, value, type) {
            console.log(item, name, value, type);
            if (type === 'block') {
                if (parseInt(value) === 1) {
                    item.classList.add('block');

                }
            }
            if (type === 'input') {
                item.value = value;
            }
            if(type === 'checkbox'){
                if (parseInt(value) === 1) {
                    $(item).closest('.voting-actions__choice--item').addClass('voting-selected');
                    item.setAttribute('checked', 'checked');
                }
            }
        }

    });
    con.runLoad();

    $(".voting-actions__choice--item").click(function () {
        $(this).find('input').toggleClass('block');
        var val = parseInt($(this).find('input').attr('data-scv'));
        if (val === 0) {
            $(this).find('input').attr('data-scv', 1)
        }
        else {
            $(this).find('input').attr('data-scv', 0);
        }
        con.runSave();
    });
    // $('.ch').on('click', function (e) {
    //     var val = parseInt($(this).attr('data-scv'));
    //     if (val === 0) {
    //         $(this).attr('data-scv', 1)
    //     }
    //     else {
    //         $(this).attr('data-scv', 0);
    //     }
    //     con.runSave();
    // });
});