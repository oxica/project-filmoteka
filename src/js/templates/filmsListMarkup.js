import genresData from '../genres.json';

export default function makeFilmsMarkup(films) {
  return films
    .map(({ poster_path, title, name, release_date, first_air_date, genre_ids, vote_average }) => {
      const genres = genresData
        .filter(({ id }) => genre_ids.includes(id))
        .map(({ name }) => name)
        .join(', ');

      return `<li class="films__item">
                <img src=https://image.tmdb.org/t/p/original${poster_path} alt="${
        title || name
      }" class="films__img">
                <p class="films__title">${title || name}</p>
                <div class="films__meta">
                  <p class="films__genres">${genres || 'Action'}</p>
                  <p class="films__data">${(release_date || first_air_date).slice(0, 4)}</p>
                  <span class="films__rating">${vote_average || '-'}</span>
                </div>
            </li>`;
    })
    .join('');
}
