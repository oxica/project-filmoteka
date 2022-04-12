import makeFilmsMarkup from './filmsListMarkup';

const filmsListRef = document.querySelector('.films');

export default function renderFilmsMarkup(films) {
  filmsListRef.innerHTML = makeFilmsMarkup(films);
}
