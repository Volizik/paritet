$(function () {

    var text = $('.manager-meeting-agenda .meeting-answer');

    text.each(function () {
        if ($(this).height() > 45) {
            $(this).after('<button class="meeting-answer-btn">больше...</button>');
            $(this).addClass('overflow-height')
        }
    });

    $(document).on('click', '.meeting-answer-btn', function () {
        $(this).prev().toggleClass('overflow-height');

        if ($(this).prev().hasClass('overflow-height')) {
            $(this).text('больше...')
        } else {
            $(this).text('меньше...')
        }
    })

});