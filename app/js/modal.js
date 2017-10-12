var modal = document.querySelector('.modal-delete');
var btn = document.querySelector('.delete');
var span = document.querySelector('.modal__header>.t-delete');
var cancel = document.querySelector('.modal__footer>.cancel');
btn.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
cancel.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}