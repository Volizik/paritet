$(function () {

    function admInputFilter(input, table, n) {
        // Declare variables
        var filter, tr;
        filter = input.val().toUpperCase();
        tr = table.find("tbody tr");
        if (n === undefined) {
            n = 0;
        }

        // Loop through all table rows, and hide those who don't match the search query
        for (var i = 0; i < tr.length; i++) {
            var td = tr[i].querySelectorAll("td")[n];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    /*-------usersList------*/
    $(document).on('keyup', '.filter--input', function () {
        admInputFilter($(this), $('.users-list'));
    });
    /*-------!usersList------*/

    /*-------groupsList------*/
    $(document).on('keyup', '.content__groups .t-search', function () {
        admInputFilter($(this), $('.content__groups .filter table'));
        $('.content__groups .filter').fadeIn('fast')
    });
    /*-------!groupsList------*/

    /*-------RegistersList------*/
    $(document).on('keyup', '.wrap-groups .content__registers .t-search', function () {
        $('#registers-content .filter').fadeIn('fast');
        admInputFilter($(this), $('#registers-content .filter table'), 1);
    });
    $(document).on('keyup', '.wrap-users .content__registers .t-search', function () {
        admInputFilter($(this), $('#registers-content table'), 1);

    });
    /*-------!RegistersList------*/

    /*-------BillsList------*/
    $(document).on('keyup', '.content__bills .t-search', function () {
        admInputFilter($(this), $('.content__bills>table'), 1);
    });
    /*-------!BillsList------*/


    /*search user for new account*/
    $(document).on('keyup', '#user-cabinet-new .t-search', function (event) {
        $('#user-cabinet-new .filter tr').find('input[type="checkbox"]').prop('checked', false);
        if(event.keyCode === 13 && $(this).val().length > 0 || event.keyCode === 8) {
            $('#user-cabinet-new .filter').fadeIn('fast');
            admInputFilter($(this), $('#user-cabinet-new .filter table'), 1)
        }
        admInputFilter($(this), $('#user-cabinet-new .filter table'), 1)
    })



    $(document).on('keyup', '.filter__body--item .t-search',function () {
        $(this).parent().find('.filter').fadeIn('fast');
        admInputFilter($(this), $('.header__filter .filter .filter table'), 1);
    })

    /*-----------------------------------------------------------------------------------*/
})


