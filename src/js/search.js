import { API_service } from './apiSevice';
import renderFilmsMarkup from './templates/renderFilmsList';

const searchFormRef = document.querySelector('.header__pane-search-form');
const filmsApi = new API_service();

searchFormRef.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();

  try {
    filmsApi.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
    if (filmsApi.searchQuery === '') return;

    const films = await filmsApi.fetchMoviesByKeyword();
    renderFilmsMarkup(films);

    searchFormRef.reset();
  } catch (error) {
    console.log(error);
  }
}
