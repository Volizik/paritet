$(function () {



    $(document).on('click', '.admin-user-role', function () {
        if ($(this).val() === 'SHAREHOLDER') {
            $('.owner-row').removeClass('hidden')
        } else {
            $('.owner-row').addClass('hidden')
        }
    });

    $(document).on('click', '.filter .add', function () {
        var insideModal = $(this).closest('.filter').find('.filter');
        insideModal.show()
    });

    $(document).on('click', '.admin-represent', function () {
        $(this).siblings('.filter').show()
    })
})