



const errorbox = document.querySelector('.list-error');

if(errorbox){
  const closeError = document.querySelector('.error-message-close');

  closeError.addEventListener('click', (e) => {
      errorbox.remove();
    });
}
