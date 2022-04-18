//     const refs = {
//     openTeamBtn: document.querySelector('js-modal-open'),
//     closeTeamBtn: document.querySelector('js-modal-close'),
//     modalTeam: document.querySelector('js-modal-team'),
// }
const openTeamBtn = document.querySelector('.js-modal-open');
const closeTeamBtn = document.querySelector('.js-modal-close');
const modalTeam = document.querySelector('.js-modal-team');

openTeamBtn.addEventListener('click', openModalTeam);

function openModalTeam(evt) {
  evt.preventDefault();
  toggleTeam();

  document.addEventListener('keydown', onEscKeyPress);
  document.body.style.overflow = 'hidden';
  closeTeamBtn.addEventListener('click', closeModalTeam);
  modalTeam.addEventListener('click', onBackdropClick);
}

function toggleTeam() {
  modalTeam.classList.toggle('is-hidden');
}

function closeModalTeam() {
  toggleTeam();

  closeTeamBtn.removeEventListener('click', closeModalTeam);
  document.body.removeAttribute('style');
}

function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    document.body.removeAttribute('style');
    toggleTeam();

    document.removeEventListener('keydown', onEscKeyPress);
    modalTeam.removeEventListener('click', onBackdropClick);
  }
}

function onEscKeyPress(evt) {
  const ESK_KEY_CODE = 'Escape';
  const isEskKey = evt.code == ESK_KEY_CODE;

  if (isEskKey) {
    toggleTeam();

    document.removeEventListener('keydown', onEscKeyPress);

    closeTeamBtn.removeEventListener('click', closeModalTeam);
    modalTeam.removeEventListener('click', onBackdropClick);
  }
}

