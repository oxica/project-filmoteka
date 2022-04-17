import { API_service } from './apiSevice';
import dataStorage from './userService/data-storage';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
const lng = localStorage.getItem('language');
const filmsApi = new API_service();
const backdrop = document.querySelector('.modal__backdrop');
const filmsListRef = document.querySelector('.films');
const closeBtnRef = document.querySelector('.closeModal');
const modal = document.querySelector('.modal__container');
const userData = {
  queue: {},
  watched: {},
};
const firebase = new dataStorage(userData);

let modalId;
const ids = [];

filmsListRef.addEventListener('click', onFilmCardClick);
closeBtnRef.addEventListener('click', onCloseBtnClick);

async function onFilmCardClick(e) {
  try {
    if (e.target.nodeName === 'UL') return;
    backdrop.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', onEscBtnPress);
    document.addEventListener('click', onBackdropClick);

    filmsApi.id = e.target.closest('li').dataset.id;
    const film = await filmsApi.fetchMovieById();
    if (lng === 'en') {
      modal.insertAdjacentHTML('afterbegin', makeFilmModalMarkup(film));
    } else {
      modal.insertAdjacentHTML('afterbegin', makeFilmModalMarkupUk(film));
    }
    const watchedModalBtn = document.querySelector('.btn__watch');
    const queueModalBtn = document.querySelector('.btn__queue');
    const youtubeBtn = document.querySelector('.film__trailer__btn');

    watchedModalBtn.addEventListener('click', onWatchedModalBtnClick);
    queueModalBtn.addEventListener('click', onQueueModalBtnClick);
    youtubeBtn.addEventListener('click', onYoutubeBtnClick);

    // slider
    modalId = e.target.closest('li').dataset.id;
    const items = document.querySelectorAll('.films__item');
    items.forEach(item => {
      ids.push(item.dataset.id);
    });
    document.addEventListener('keydown', onArrowsClick);
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

function makeFilmModalMarkupUk({
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
            <p class="film__details">Кількість голосів</p>
            <p class="film__info--uper">
              <span class="film__rating--orange">${vote_average}</span>
              <span class="film__rating--divider"> / </span>
              <span class="vote-count">${vote_count}</span>
            </p>
          </li>
          <li class="film__item">
            <p class="film__details">Рейтинг</p>
            <p class="film__info--uper">${popularity}</p>
          </li>
          <li class="film__item">
            <p class="film__details">Оригінальна Назва</p>
            <p>${title || original_title || name}</p>
          </li>
          <li class="film__item">
            <p class="film__details">Жанр</p>
            <p class="film__info">${filmGenres}</p>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="film__about__title">Опис</h3>
        <p class="film__about__text">${overview}</p>
      </div>
      <div class="film__button__wrapper">
        <button type="button" class="film__button btn__watch" data-id=${id}>Додати до переглянутого</button>
        <button type="button" class="film__button btn__queue" data-id=${id}>Додати до черги</button>
      </div>
      <div class="film__trailer">
        <a class="btn btn-large btn-primary film__trailer__btn" href="#">
          <i class="fa-brands fa-youtube fa-3x"></i>
          <div class="film__trailer__text__wrapper">
            <p class="film__trailer__text">дивитись трейлер</p>
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
  document.body.style.overflow = 'scroll';
  document.removeEventListener('keydown', onEscBtnPress);
  document.removeEventListener('click', onBackdropClick);

  modalId = null;
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

  firebase.watched = {
    [filmName.textContent]: e.target.dataset.id,
  };
}

function onQueueModalBtnClick(e) {
  const filmName = document.querySelector('.film__title');

  firebase.queue = {
    [filmName.textContent]: e.target.dataset.id,
  };
}

//Плеєр
function onYoutubeBtnClick() {
  let idBtn = document.querySelector('.film__button');

  filmsApi.movieId = idBtn.dataset.id;

  filmsApi
    .fetchYoutube()
    .then(data => {
      let results = data.results[0];
      let key = results.key;
      return key;
    })
    .then(key => iframeRender(key));
}

// function iframeRender(key) {
//   const BASE_YOUTUBE_URL = 'https://www.youtube.com/embed/';
//   const instance = basicLightbox.create(
//     `<iframe width="100%" height="100%"
//       src="${BASE_YOUTUBE_URL}${key}"?autoplay=1&mute=1&controls=1>
//       </iframe>
//     `,
//   );

function iframeRender(key) {
  const BASE_YOUTUBE_URL = 'https://www.youtube.com/embed/';
  const instance = basicLightbox.create(
    `<button type="button" id="youtube-close-btn"><i class="fa-regular fa-circle-xmark"></i></button><iframe
      src="${BASE_YOUTUBE_URL}${key}"?autoplay=1&mute=1&controls=1>
      </iframe>
    `,
    {
      onShow: instance => {
        instance.element().querySelector('#youtube-close-btn').onclick = instance.close;
      },
    },
  );

  instance.show();
}

async function onArrowsClick(e) {
  if (e.code === 'ArrowRight') {
    if (ids.indexOf(modalId) === ids.length - 1) return;

    const filmImg = document.querySelector('.film__image');
    const filmInfo = document.querySelector('.film__information');
    filmImg.remove();
    filmInfo.remove();

    filmsApi.id = ids[ids.indexOf(modalId) + 1];
    const film = await filmsApi.fetchMovieById();
    modal.insertAdjacentHTML('afterbegin', makeFilmModalMarkup(film));
    modalId = filmsApi.id;
  }

  if (e.code === 'ArrowLeft') {
    if (ids.indexOf(modalId) === 0) return;

    const filmImg = document.querySelector('.film__image');
    const filmInfo = document.querySelector('.film__information');
    filmImg.remove();
    filmInfo.remove();

    filmsApi.id = ids[ids.indexOf(modalId) - 1];
    const film = await filmsApi.fetchMovieById();
    modal.insertAdjacentHTML('afterbegin', makeFilmModalMarkup(film));
    modalId = filmsApi.id;
  }
}
