import { API_service } from './apiSevice';
import dataStorage from './userService/data-storage';

const userData = {
  queue: {},

  watched: {},
};

const firebase = new dataStorage(userData);
const filmsApi = new API_service();
const backdrop = document.querySelector('.modal__backdrop');
const filmsListRef = document.querySelector('.films');
const closeBtnRef = document.querySelector('.closeModal');
const modal = document.querySelector('.modal__container');

filmsListRef.addEventListener('click', onFilmCardClick);
closeBtnRef.addEventListener('click', onCloseBtnClick);

async function onFilmCardClick(e) {
  try {
    if (e.target.nodeName === 'UL') return;
    backdrop.classList.remove('is-hidden');

    filmsApi.id = e.target.closest('li').dataset.id;

    let film;
    if (e.target.closest('li').dataset.media === 'movie') {
      film = await filmsApi.fetchMovieById();
    } else {
      film = await filmsApi.fetchMovieByIdForTV();
    }

    modal.insertAdjacentHTML('afterbegin', makeFilmModalMarkup(film));

    document.addEventListener('keydown', onEscBtnPress);
    document.addEventListener('click', onBackdropClick);

    const watchedModalBtn = document.querySelector('.btn__watch');
    watchedModalBtn.addEventListener('click', onWatchedModalBtnClick);
  } catch (error) {
    console.log(error);
  }
}

function makeFilmModalMarkup({
  poster_path,
  original_title,
  title,
  name,
  vote_average,
  vote_count,
  genres,
  overview,
  popularity,
  id,
}) {
  const filmGenres = genres.map(({ name }) => name).join(', ');
  return `<div class="film__image">
      <img class="image" src=https://image.tmdb.org/t/p/original${poster_path} alt=${
    title || original_title || name
  } />
    </div>

    <div class="film__information">
      <div>
        <h2 class="film__title">${title || original_title || name}</h2>
        <ul>
          <li class="film__item">
            <p class="film__details">Vote / Votes</p>
            <p class="film__info--uper">
              <span class="film__rating--orange">${vote_average}</span>
              <span class="film__rating--divider"> / </span>
              <span class="vote-count">${vote_count}</span>
            </p>
          </li>
          <li class="film__item">
            <p class="film__details">Popularity</p>
            <p class="film__info--uper">${popularity}</p>
          </li>
          <li class="film__item">
            <p class="film__details">Original title</p>
            <p>${title || original_title || name}</p>
          </li>
          <li class="film__item">
            <p class="film__details">Genre</p>
            <p class="film__info">${filmGenres}</p>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="film__about__title">About</h3>
        <p class="film__about__text">${overview}</p>
      </div>
      <div class="film__button__wrapper">
        <button type="button" class="film__button btn__watch" data-id=${id}>Add to watched</button>
        <button type="button" class="film__button btn__queue" data-id=${id}>Add to queue</button>
      </div>
      <div class="film__trailer">
        <a class="btn btn-large btn-primary film__trailer__btn" href="#">
          <i class="fa-brands fa-youtube fa-3x"></i>
          <div class="film__trailer__text__wrapper">
            <p class="film__trailer__text">watch trailer</p>
          </div>
        </a>
      </div>
      </div>`;
}

function onCloseBtnClick() {
  const filmImg = document.querySelector('.film__image');
  const filmInfo = document.querySelector('.film__information');
  filmImg.remove();
  filmInfo.remove();

  backdrop.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscBtnPress);
  document.removeEventListener('click', onBackdropClick);
}

function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    onCloseBtnClick();
  }
}

function onBackdropClick(e) {
  if (e.target === backdrop) {
    onCloseBtnClick();
  }
}

function onWatchedModalBtnClick(e) {
  const filmName = document.querySelector('.film__title');
  const film = {
    [filmName.textContent]: e.target.dataset.id,
  };
  console.log(film);
  userData.watched = film;
}
