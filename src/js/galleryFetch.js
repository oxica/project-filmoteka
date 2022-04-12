import { API_service } from './apiSevice';
import renderFilmsMarkup from './templates/renderFilmsList';

const filmsApi = new API_service();
const homeBtnRef = document.querySelector('.btn1');
const libraryBtnRef = document.querySelector('.btn2');

filmsApi.fetchTrending().then(renderFilmsMarkup).catch(console.log);

// libraryBtnRef.addEventListener('click', () => {
//   filmsApi.fetchMoviesByKeyword().then(renderFilmsMarkup).catch(console.log);
// });

homeBtnRef.addEventListener('click', async () => {
  filmsApi.page = 1;
  const films = await filmsApi.fetchTrending();
  renderFilmsMarkup(films);
});
