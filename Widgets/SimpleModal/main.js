const openModalBtn = document.getElementsByClassName('btn-open-modal')[0];
const simpleModal = document.getElementById('simpleModal');
const closeModalBtn = document.getElementsByClassName('btn-close-modal')[0];

openModalBtn.addEventListener('click', openModal);

function openModal(){
  simpleModal.style.display = 'block';
  freezeScroll();
}

closeModalBtn.addEventListener('click', closeModal);

function closeModal(){
  simpleModal.style.display = 'none';
  unfreezeScroll();
}

function freezeScroll() {
  document.body.style.overflow = 'hidden';
}

function unfreezeScroll() {
  document.body.style.overflow = '';
}
