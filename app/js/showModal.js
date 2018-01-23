$(function () {
   function showModal(dopClass) {
       var main = document.querySelector('.modal');
       if (dopClass === undefined) {
           main.style.display = 'block';
       } else {
           main = document.querySelector('.modal' + '.' + dopClass.replace('.', ''));
           main.style.display = 'block';
       }
   }
});
