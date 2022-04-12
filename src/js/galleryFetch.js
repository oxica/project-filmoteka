import { API_service } from './apiSevice';
import genresData from './genres.json';

const filmsListRef = document.querySelector('.films');
const searchFormRef = document.querySelector('.header__pane-search-form');
const filmsApi = new API_service();

filmsApi.fetchTrending().then(renderFilmsMarkup).catch(console.log);

searchFormRef.addEventListener('submit', onFormSubmit);

function renderFilmsMarkup(films) {
  const markup = films
    .map(({ poster_path, title, name, release_date, first_air_date, genre_ids }) => {
      const genres = genresData
        .filter(genre => genre_ids.includes(genre.id))
        .map(genre => genre.name)
        .join(' ');

      return `<li class="films__item">
                <img src=https://image.tmdb.org/t/p/original${poster_path} alt="${
        title || name
      }" class="films__img">
                <p class="films__title">${title || name}</p>
                <div class="films__meta">
                  <p class="films__genres">${genres || 'Action'}</p>
                  <p class="films__data">${(release_date || first_air_date).slice(0, 4)}</p>
                </div>
            </li>`;
    })
    .join('');
  filmsListRef.innerHTML = markup;
}

function onFormSubmit(evt) {
  evt.preventDefault();

  filmsApi.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
  if (filmsApi.searchQuery === '') return;

  filmsApi.fetchMoviesByKeyword().then(renderFilmsMarkup).catch(console.log);

  searchFormRef.reset();
}
