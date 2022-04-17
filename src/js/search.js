import { API_service } from './apiSevice';
import renderFilmsMarkup from './templates/renderFilmsMarkup';

const searchFormRef = document.querySelector('.header__pane-search-form');
const galleryRef = document.querySelector('.gallery');
const paginationRef = document.querySelector('#pagination');
const errorMessage = document.querySelector('.search-form__error');
const filmsApi = new API_service();

searchFormRef.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();

  try {
    filmsApi.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
    if (filmsApi.searchQuery === '') return;

    const films = await filmsApi.fetchMoviesByKeyword();
    if (films.length === 0) {
      addErrorStyles();
      errorMessage.style.display = 'block';
    } else {
      resetErrorStyles();
    }
    renderFilmsMarkup(films);

    searchFormRef.reset();
  } catch (error) {
    console.log(error);
  }
}

export function resetErrorStyles() {
  galleryRef.classList.remove('wrong');
  paginationRef.style.display = 'flex';
  errorMessage.style.display = 'none';
}

export function addErrorStyles() {
  galleryRef.classList.add('wrong');
  paginationRef.style.display = 'none';
  errorMessage.style.display = 'block';
}
