$(function () {

    function admInputFilter(input, table, n) {
        // Declare variables
        if (n === undefined) {
            n = 0;
        }
        var filter, tr;
        filter = input.val().toUpperCase();
        tr = table.find("tbody tr");

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
    $(document).on('keyup', '.content__registers .t-search', function () {
        if($(this).parent().find($('.filter'))) {
            $('#registers-content .filter').fadeIn('fast');
            admInputFilter($(this), $('#registers-content .filter table'), 0);
            admInputFilter($(this), $('#registers-content .filter table'), 1);
        } else {
            admInputFilter($(this), $('.content__registers>table'), 1);
        }

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




    /*-----------------------------------------------------------------------------------*/



//     filterSelection("all");
//
//     function filterSelection(c) {
//         var x, i;
//         x = document.querySelectorAll(".users-list tbody tr");
//         if (c == "all") c = "";
//         // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
//         for (i = 0; i < x.length; i++) {
//             adminFilterRemoveClass(x[i], "show");
//             if (x[i].className.indexOf(c) > -1) adminFilterAddClass(x[i], "show");
//         }
//     }
//
// // Show filtered elements
//     function adminFilterAddClass(element, name) {
//         var i, arr1, arr2;
//         arr1 = element.className.split(" ");
//         arr2 = name.split(" ");
//         for (i = 0; i < arr2.length; i++) {
//             if (arr1.indexOf(arr2[i]) == -1) {
//                 element.className += " " + arr2[i];
//             }
//         }
//     }
//
// // Hide elements that are not selected
//     function adminFilterRemoveClass(element, name) {
//         var i, arr1, arr2;
//         arr1 = element.className.split(" ");
//         arr2 = name.split(" ");
//         for (i = 0; i < arr2.length; i++) {
//             while (arr1.indexOf(arr2[i]) > -1) {
//                 arr1.splice(arr1.indexOf(arr2[i]), 1);
//             }
//         }
//         element.className = arr1.join(" ");
//     }

})


