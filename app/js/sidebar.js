$(function () {
    $(document).on('click', '.sidebar__item--header', function () {
        if ($(this).hasClass('sidebar__item--active')) {
            return false;
        } else {
            $('.sidebar__item--header').removeClass('sidebar__item--active');
            $(this).addClass('sidebar__item--active');
        }
    })
});