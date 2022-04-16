import genresData from '../genres.json';

export default function makeFilmsMarkup(films) {
  return films
    .map(
      ({
        poster_path,
        title,
        name,
        release_date,
        first_air_date,
        genre_ids,
        genres,
        vote_average,
        id,
      }) => {
        let filmGenres;
        if (genres) {
          filmGenres = genres.map(({ name }) => name).join(', ');
        }
        if (genre_ids) {
          filmGenres = genresData
            .filter(({ id }) => genre_ids.includes(id))
            .map(({ name }) => name)
            .join(', ');
        }

        return `<li class="films__item" data-id=${id}>
                <div class="films__img">
                <img src=https://image.tmdb.org/t/p/original${poster_path} alt="${
          title || name
        }" loading="lazy">
        </div>
                <div class="films__description">
                  <p class="films__title">${title || name}</p>
                  <div class="films__meta">
                    <p class="films__genres">${filmGenres || 'Action'}</p>
                    <p class="films__data">${(release_date || first_air_date || '2023').slice(
                      0,
                      4,
                    )}</p>
                    <span class="films__rating">${vote_average || '-'}</span>
                  </div>
                </div>
            </li>`;
      },
    )
    .join('');
}
