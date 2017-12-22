$(function () {

var legalcount = 0,
    personcount = 0;

    $(document).on('click', '.add-issuer-btn', function () {
        var form = $('.add-issuer-form'),
            labelLegal = $('label[data-id="entity"]'),
            labelPerson = $('label[data-id="individual"]'),
            entityName = $('.entity-name').val(),
            entityDoc = $('.entity-doc').val(),
            individualName = $('.individual-name').val(),
            individualDoc = $('.individual-doc').val();

        if (labelLegal.hasClass('modal__tab--active')) {
            form.append('<input name="legalRepres[' + legalcount + '].Name" type="hidden" value="' + entityName + '">');
            form.append('<input name="legalRepres[' + legalcount + '].OGRN" type="hidden" value="' + entityDoc + '">');
            legalcount++;
        } else if (labelPerson.hasClass('modal__tab--active')) {
            form.append('<input name="PersonRepres[' + personcount + '].Name" type="hidden" value="' + individualName + '">');
            form.append('<input name="PersonRepres[' + personcount + '].OGRN" type="hidden" value="' + individualDoc + '">');
            personcount++;
        }
    })

});