function handleFileSelect(evt) {
    var files = evt.target.files;

    for (var i = 0, f; i < files.length; i++) {
        f = files[i];
        if (!f.type.match('image.*')) continue;

        var reader = new FileReader();
        reader.onload = (function () {
            return function (e) {
                $('.content__block--photo img')[0].src = e.target.result
            };
        })(f);
        reader.readAsDataURL(f);
    }
}
$('.content__block--photo input[type="file"]').on('change', handleFileSelect);