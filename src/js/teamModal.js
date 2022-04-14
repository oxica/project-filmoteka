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

    closeTeamBtn.addEventListener('click', closeModalTeam);
    modalTeam.addEventListener('click', onBackdropClick);
}

function toggleTeam() {
    modalTeam.classList.toggle('is-hidden');
}

function closeModalTeam() {
    toggleTeam();
      
    closeTeamBtn.removeEventListener('click', closeModalTeam);
}

function onBackdropClick(evt) {
    if (evt.currentTarget === evt.target) {
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

// (() => {
    
// refs.openTeamBtn.addEventListener('click', toggleModal);
// refs.closeTeamBtn.addEventListener('click', toggleModal);

// function toggleModal() {
//     document.body.classList.toggle("modal-open");
//     refs.modalTeam.classList.toggle('is-hidden');
// }

// })();

