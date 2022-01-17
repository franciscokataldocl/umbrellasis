const openModalList = document.querySelectorAll('.open-modal');
const modalOuter = document.querySelector('.modal-outer');
const closeModal = document.querySelector('.close-modal');
const cancelButton = document.querySelector('.btn-cancel')

const openModal = Array.from(openModalList);

openModal.map((button)=>{
button.addEventListener('click', (e) => {
  const id = button.getAttribute('data-id');
  modalOuter.classList.toggle('show-modal');
});
});

if(closeModal) {
  closeModal.addEventListener('click', (e) => {

    modalOuter.classList.remove('show-modal');
  });
  
  cancelButton.addEventListener('click', (e) => {
  
    modalOuter.classList.remove('show-modal');
  });
  
  
}
