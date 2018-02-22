$(function () {

    var text = $('.need-hide');

    if (text.length > 0) {
        text.each(function () {
            if ($(this).height() > 51) {
                $(this).after('<button type="button" class="need-hide-btn">больше...</button>');
                $(this).addClass('overflow-height')
            }
        });
    }

    $(document).on('click', '.need-hide-btn', function () {
        $(this).prev().toggleClass('overflow-height');

        if ($(this).prev().hasClass('overflow-height')) {
            $(this).text('больше...')
        } else {
            $(this).text('меньше...')
        }
    })

});