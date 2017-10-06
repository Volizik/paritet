$(function() {

    var userList = document.querySelector(".users-list");
    var registersList = document.querySelector(".content__registers table");
    var billsList = document.querySelector(".content__bills table");

    function sortTable(tbl, n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = tbl;
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc";
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.querySelectorAll("tbody tr");
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 0; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].querySelectorAll("td")[n];
                y = rows[i + 1].querySelectorAll("td")[n];
                console.log(x);
                /*check if the two rows should switch place,
                based on the direction, asc or desc:*/
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount ++;
            } else {
                /*If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again.*/
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }


    /*------------users-list--------------*/
    $(document).on('click', '.users-list th.t-login', function () {
        sortTable(userList, 0);
    });
    $(document).on('click', '.users-list th.t-rol', function () {
        sortTable(userList, 1);
    });
    $(document).on('click', '.users-list th.t-name', function () {
        sortTable(userList, 2);
    });
    $(document).on('click', '.users-list th.t-status', function () {
        sortTable(userList, 3);
    });
    $(document).on('click', '.users-list th.t-visited', function () {
        sortTable(userList, 4);
    });
    $(document).on('click', '.users-list th.t-online-status', function () {
        sortTable(userList, 5);
    });
    /*------------!users-list--------------*/



    /*------------registersList--------------*/
    $(document).on('click', '.content__registers table .th-number', function () {
        sortTable(registersList, 0);
    });
    $(document).on('click', '.content__registers table .th-name', function () {
        sortTable(registersList, 1);
    });
    /*------------!registersList--------------*/



    /*------------billsList--------------*/
    $(document).on('click', '.content__bills table .th-number', function () {
        sortTable(billsList, 0);
    });
    $(document).on('click', '.content__bills table .th-name', function () {
        sortTable(billsList, 1);
    });
    /*------------!billsList--------------*/


});