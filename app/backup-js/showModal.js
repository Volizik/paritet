function showModal(dopClass) {
   event.preventDefault();
   var main = document.querySelector('.modal');
   if (main) {
       if (dopClass === undefined) {
           main.style.display = 'block';
       } else {
           main = document.querySelector('.modal' + '.' + dopClass.replace('.', ''));
           main.style.display = 'block';
       }
   } else {
       return false
   }

}
