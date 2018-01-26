var Representatives = []; // Выбранные представители
var RegistryPersonRepresentatives = []; //Добавленные прдеставители по физикам
var RegistryLegalRepresentatives = []; //Добавленные прдеставители по юрикам

// проверяем если в реестре счета для данного пользователя
function FindAccountsForUser() {
    $.post("FindsAccountsForUser", { Name: $(".user_name").val(), DocNum: $(".user_doc").val() }, function (data) {
        $(".user_name").removeClass("validate-input__true");
        $(".user_doc").removeClass("validate-input__true");
        $(".user_name").removeClass("validate-input__false");
        $(".user_doc").removeClass("validate-input__false");

        if (data) {
            $(".user_name").addClass("validate-input__true");
            $(".user_doc").addClass("validate-input__true");
        }
        else {
            $(".user_name").addClass("validate-input__false");
            $(".user_doc").addClass("validate-input__false");
        }
    });
    FindsProbableRepresentativesForUser();
}

// Ищем возможных представителей для пользователя
function FindsProbableRepresentativesForUser() {
    $.post("FindsProbableRepresentativesForUser", { Name: $(".user_name").val(), DocNum: $(".user_doc").val() }, function (data) {
        $(".filter_wrapper").html(data);
    });
}

// парсим страницу на предмет выбранных представителей
function GetChoosenRepresentatives() {
    Representatives = [];
    RegistryPersonRepresentatives = [];
    RegistryLegalRepresentatives = [];
    $(".filter_wrapper input:checked[data-isregistry=False]").each(function () { Representatives.push(this.id); });
    $(".filter_wrapper input:checked[data-isregistry=True][data-islegal=True]").each(function () {
        RegistryLegalRepresentatives.push({
            "lname": $(this).data("lname"), "OGRN": $(this).data("ogrn")
        })
    });
    $(".filter_wrapper input:checked[data-isregistry=True][data-islegal=False]").each(function () {
        RegistryPersonRepresentatives.push({
            "pname": $(this).data("pname"), "docnum": $(this).data("docnum")
        })
    });
}

// добавляем в массив новых представителей
function AddRegistryRepresentative() {
    var lname = $(".entity-name").val();
    var OGRN = $(".entity-doc").val();
    var pname = $(".individual-name").val();
    var docnum = $(".individual-doc").val();
    var rowtext;
    var htmlData;
    if ($("label.modal__tab[data-id='entity'] input").prop("checked")) {
        rowtext = lname + ", " + OGRN;
        htmlData = "data-islegal=True data-lname=" + lname + " data-ogrn=" + OGRN;
    }
    if ($("label.modal__tab[data-id='individual'] input").prop("checked")) {
        rowtext = pname + ", " + docnum;
        htmlData = "data-islegal=False data-pname=" + pname + " data-docnum=" + docnum;
    }
    // Добавляем нового представителя в список выбора
    $(".filter__body table tr:last").after("\
        <tr>\
        <td>\
        <input type='checkbox' \
        data-isregistry=True "+ htmlData+" \
        'checked'>\
        <label></label>\
        <span class='filter__row-text'>"+rowtext+"</span>\
        <div class='filter__edit-btn'>\
        <button class='ast-action-btn'><img src='~/images/icons/edit2.png' alt=''></button>\
        <button class='ast-action-btn'><img src='~/images/icons/cross.png' alt=''></button>\
        </div>\
        </td>\
        </tr>");
}

// удаляем всех представителй и добавляем новых
function RemoveAllRepresentativesAndAddNew() {
    GetChoosenRepresentatives();
    var model = {
        UserId: $("#UserId").val(),
        Representatives: Representatives,
        RegistryLegalRepresentatives: RegistryLegalRepresentatives,
        RegistryPersonRepresentatives: RegistryPersonRepresentatives
    }

    $.ajax({
        url: "../RemoveAllRepresentativesAndAddNew",
        type: "POST",
        data:  JSON.stringify(model),
        contentType: "application/json"}
    );
}

// вызываем функцию добавления пользователя
function AddUser() {
    GetChoosenRepresentatives();
    var model = {
        UserName: $("#UserName").val(),
        Password: $("#Password").val(),
        Email: $("#Email").val(),
        Role: $("#Role").val(),
        FullName: $("#FullName").val(),
        DocumentNumber: $("#DocumentNumber").val(),
        PhoneNumber: $("#PhoneNumber").val(),
        TwoFactorEnabled: $("#identification-new").prop("checked"),
        Representatives: Representatives,
        RegistryLegalRepresentatives: RegistryLegalRepresentatives,
        RegistryPersonRepresentatives: RegistryPersonRepresentatives
    }

    $.ajax({
        url: "AddUser",
        type: "POST",
        data: JSON.stringify(model),
        success: ShowModalResultSuccess,
        error: ShowModalResultFail,
        contentType: "application/json"
    });
}

function ShowModalResultSuccess() {
    $('.modal-add-user-result-succes').show();
};

function ShowModalResultFail() {
    $('.modal-add-user-result-fail').show();
};

function ShowModalAddUserCancel() {
    $('.modal-add-user-cancel').show();
};

// Проверка существоания группы
function NewGroup() {
    if ($("#GroupName").val() !== "") {
        $.post("NewGroup", { GroupName: $("#GroupName").val(), GroupDescription: $("#GroupDescription").val() },
            function (data) {
                if (data === false) {
                    $('.modal-add-group-result-fail').show();
                }
                else {
                    window.location.replace(data);
                }
            });
    }
}

function SelectIssuer() {
    $('#selectedIssuerId').attr('value', $('.filter__body .activeTr').data('issuerid'));
}

function SelectAccount(){
    $('#selectedAccountId').attr('value', $('.filter__body .activeTr').data('accountid'));
}


$(function () {
    //табы для переключения между юр. лицом и физ. лицом во всплывающем окне
    $('.filter__block').each(function (i) {
        if (i !== 0) {
            $(this).hide(0);
        }
    });
    $(document).on('click', '.modal__tab', function () {
        var tabId = $(this).attr('data-id');
        $(this).siblings('.modal__tab').removeClass('modal__tab--active');
        $(this).addClass('modal__tab--active');
        $('.filter__block').hide(0);
        $('.filter__block[data-id=' + tabId + ']').show();
    });

    //показать или скрыть полей "номер документа" и "представители" при выборе роли владельца
    $(document).on('click', '.admin-user-role', function () {
        if ($(this).val() === 'SHAREHOLDER' || $(this).val() === 'ISSUER') {
            $('.owner-row').slideDown("slow");
        } else {
            $('.owner-row').slideUp("slow");
        }
    });

    //клик по кнопке "Добавить" во всплывающем окне представителей
    $(document).on('click', '.filter .add', function () {
        var insideModal = $(this).closest('.filter').find('.filter');
        insideModal.show()
    });

    //клик на поле ввода представителей - открывает окно представителей
    $(document).on('click', '.admin-represent', function () {
        $(this).siblings('.filter').show()
    });

    //клик на кнопку "Выбрать" в окне представителей
    $(document).on('click', '.represent-filter .submit', function () {
        var trArr = document.querySelectorAll('.represent-filter tr');
        var users = '';
        for (var i = 0; i < trArr.length; i++) {
            var checkbox = trArr[i].querySelector('input[type="checkbox"]:checked');
            var span = trArr[i].querySelectorAll('td > span');

            if (checkbox !== null) {
                var user = '';
                for (var j = 0; j < span.length; j++) {
                    user = user + span[j].innerHTML + ' '
                }
                users += user;
            }
        }
        var inp = document.querySelector('.admin-represent');
        inp.setAttribute('value', users);

        if ($('.admin-represent').val().replace(' ', '').length === 0) {
            inp.setAttribute('value', 'Нет')
        }
    });

    // закрываем окошко с представителями
    $(document).on('click', '.represent-modal-filter button', function () {
        $('.represent-modal-filter').hide();
    });


    $(document).on('click', '.represent-filter label, .filter__row-text', function () {
        var checkbox = $(this).closest('tr').find('input[type="checkbox"]');
        checkbox.is(':checked') ? checkbox.prop('checked', false) : checkbox.prop('checked', true);
    });


    $(document).on('click', '#user-cabinet-new .search > span', function () {
        $('#user-cabinet-new .t-search').val('');
        $('#user-cabinet-new .filter').hide();
        $(this).remove();
    });

    // модалка при удалении группы
    $(document).on('click', '.groups-list .group-delete', function () {
        $('#groupToDelete').attr('value', $(this).data('group-id'));
        $('.modal-delete').show();
    });

    // модалка при удалении пользователя
    $(document).on('click', '.users-list .user-delete', function () {
        $('#userToDelete').attr("value", $(this).data('userid'));
        $('.modal-delete-user').show();
    });

    // смена пароля
    $(document).on('click', '#user-cabinet-recovery-password button', function () {
        $.post("PasswordRecovery", {
            OldPassword: $("#OldPassword").val(),
            NewPassword: $("#NewPassword").val(),
            UserName: $("#UserName").val(),
        }, function (data) {
            if (data) {
                $('.modal-change-password-succes').show();
            }
            else {
                $('.modal-change-password-fail').show();
            }
        });
    });

    // клик в меню удалить группу
    $(document).on('click', 'a:contains("Удалить")', function (event) {
        event.preventDefault();
        // немного костыльно, получаем идишинк из ссылки
        var url = $(this).attr("href");
        var id = url.substring(url.lastIndexOf('/') + 1);
        $('#groupToDelete').attr('value', id);
        $('.modal-delete').show();
    });

    $(document).on('click', '.groups-by-user .filter .submit', function () {
        if ($('.activeTr').length > 0) {
            $('input[name="selectedGroup"]').val($('.activeTr').text());
        }
    });
});
