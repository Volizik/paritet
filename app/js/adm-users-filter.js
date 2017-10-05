$(function () {

    $(document).on('keyup', '.filter--input', function () {
        admInputFilter();
    });

    function admInputFilter() {
        // Declare variables
        var input, filter, table, tr, td, i;
        input = document.querySelector(".filter--input");
        filter = input.value.toUpperCase();
        table = document.querySelector(".users-list");
        tr = table.querySelectorAll("tbody tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].querySelectorAll("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }



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


