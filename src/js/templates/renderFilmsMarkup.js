import makeFilmsMarkup from './filmsListMarkupTempl';

const filmsListRef = document.querySelector('.films');

export default function renderFilmsMarkup(films) {
  filmsListRef.innerHTML = makeFilmsMarkup(films);
}
