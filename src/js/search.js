import { API_service } from './apiSevice';
import renderFilmsMarkup from './templates/renderFilmsList';

const searchFormRef = document.querySelector('.header__pane-search-form');
const filmsApi = new API_service();

searchFormRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  filmsApi.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
  if (filmsApi.searchQuery === '') return;

  filmsApi.fetchMoviesByKeyword().then(renderFilmsMarkup).catch(console.log);

  searchFormRef.reset();
}
