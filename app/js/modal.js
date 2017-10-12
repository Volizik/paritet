var modal = document.querySelector('.modal-delete');
var btn = document.querySelector('.delete');
var span = document.querySelector('.modal__header>.t-delete');
var cancel = document.querySelector('.modal__footer>.cancel');
$(document).on('click', btn, function (e) {
    e.preventDefault();
    modal.style.display = "block";
})
$(document).on('click', span, function () {
    modal.style.display = "none";
})
$(document).on('click', cancel, function () {
    modal.style.display = "none";
})
$(document).on('click', cancel, function () {
    modal.style.display = "none";
})
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}