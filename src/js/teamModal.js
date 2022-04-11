 (() => {
    const refs = {
    openTeamBtn: document.querySelector('[modal-team-open]'),
    closeTeamBtn: document.querySelector('[modal-team-close]'),
    modalTeam: document.querySelector('[modal-team]'),
}

refs.openTeamBtn.addEventListener('click', openModalTeam);

function openModalTeam(evt) {
    evt.preventDefault();
    toggleTeam();

    document.addEventListener('keydown', onEscKeyPress);

    refs.closeTeamBtn.addEventListener('click', closeModalTeam);
    refs.modalTeam.addEventListener('click', onBackdropClick);
}

 function toggleTeam() {
     refs.modalTeam.classList.toggle('is-hidden');
  }

  function closeModalTeam() {
      toggleTeam();
      
      refs.closeTeamBtn.removeEventListener('click', closeModalTeam);
  }

  function onBackdropClick(evt) {
      if (evt.currentTarget === evt.target) {
          toggleTeam();

          document.removeEventListener('keydown', onEscKeyPress);
          refs.modalTeam.removeEventListener('click', onBackdropClick);
      }
  }

  function onEscKeyPress(evt) {
      const ESK_KEY_CODE = 'Escape';
      const isEskKey = evt.code == ESK_KEY_CODE;

      if (isEskKey) {
          toggleTeam();

          document.removeEventListener('keydown', onEscKeyPress);

          refs.closeTeamBtn.removeEventListener('click', closeModalTeam);
          refs.modalTeam.removeEventListener('click', onBackdropClick);
      }
  }


// refs.openTeamBtn.addEventListener('click', toggleModal);
// refs.closeTeamBtn.addEventListener('click', toggleModal);

// function toggleModal() {
//     document.body.classList.toggle("modal-open");
//     refs.modalTeam.classList.toggle('is-hidden');
// }

})();

