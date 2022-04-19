import { API_service } from './apiSevice';
import dataStorage from './userService/data-storage';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FIREBASECFG } from './userService/firebase-cfg';
import renderMarkupByIds from './library';
import { addErrorStyles } from './search';
import { resetErrorStyles } from './search';

const app = initializeApp(FIREBASECFG);
const db = getDatabase(app);
const auth = getAuth(app);
const lng = localStorage.getItem('language');
const filmsApi = new API_service();
const backdrop = document.querySelector('.modal__backdrop');
const filmsListRef = document.querySelector('.films');
const closeBtnRef = document.querySelector('.closeModal');
const modal = document.querySelector('.modal__container');
const libraryBtnRef = document.querySelector('.btn2');
const userData = {
  queue: {},
  watched: {},
};
new dataStorage(userData);

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
    ids.length = 0;
    modalId = e.target.closest('li').dataset.id;
    const items = document.querySelectorAll('.films__item');
    items.forEach(({ dataset }) => {
      ids.push(dataset.id);
    });
    document.addEventListener('keydown', slider);

    // remove from library
    onAuthStateChanged(auth, user => {
      if (user) {
        const libDataBaseWatched = `users/${user.uid}/lib/watched/`;
        const libDataBaseQueue = `users/${user.uid}/lib/queue/`;

        get(ref(db, libDataBaseWatched))
          .then(snapshot => {
            if (snapshot.exists()) {
              const ids = Object.keys(snapshot.val());
              if (ids.includes(filmsApi.id)) {
                watchedModalBtn.classList.add('active');
                watchedModalBtn.textContent = 'Remove';
              }
            }
          })
          .catch(console.error);

        get(ref(db, libDataBaseQueue))
          .then(snapshot => {
            if (snapshot.exists()) {
              const ids = Object.keys(snapshot.val());
              if (ids.includes(filmsApi.id)) {
                queueModalBtn.classList.add('active');
                queueModalBtn.textContent = 'Remove';
              }
            }
          })
          .catch(console.error);
      }
    });
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
          <p class="film__trailer__text">watch trailer</p>
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
            <p class="film__details">Кількість<br>голосів</p>
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
            <p class="film__details">Оригінальна<br>Назва</p>
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
          <p class="film__trailer__text">дивитись трейлер</p>
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
  const watchedModalBtn = document.querySelector('.btn__watch');
  const userData = {
    queue: {},
    watched: {},
  };
  const firebase = new dataStorage(userData);

  if (watchedModalBtn.classList.contains('active')) {
    userData.watched[e.target.dataset.id] = filmName.textContent;
    firebase.delWatched();
    watchedModalBtn.textContent = 'Add to watched';
    if (lng === "uk") {
      watchedModalBtn.textContent = 'Додати до переглянутого'
    }

    if (libraryBtnRef.classList.contains('current')) {
      onAuthStateChanged(auth, user => {
        if (user) {
          const libDataBaseWatched = `users/${user.uid}/lib/watched/`;

          get(ref(db, libDataBaseWatched))
            .then(snapshot => {
              if (snapshot.exists()) {
                const ids = Object.keys(snapshot.val());
                renderMarkupByIds(ids);
              } else {
                filmsListRef.innerHTML = '';
                addErrorStyles();
              }
            })
            .catch(console.error);
        }
      });
    }
  } else {
    firebase.watched = {
      [e.target.dataset.id]: filmName.textContent,
    };

    if (libraryBtnRef.classList.contains('current')) {
      onAuthStateChanged(auth, user => {
        if (user) {
          const libDataBaseWatched = `users/${user.uid}/lib/watched/`;

          get(ref(db, libDataBaseWatched))
            .then(snapshot => {
              if (snapshot.exists()) {
                const ids = Object.keys(snapshot.val());
                resetErrorStyles();
                renderMarkupByIds(ids);
              }
            })
            .catch(console.error);
        }
      });
    }

    watchedModalBtn.textContent = 'Remove';
    if (lng === "uk") {
        watchedModalBtn.textContent = 'Видалити'
     }
  }

  watchedModalBtn.classList.toggle('active');
}

function onQueueModalBtnClick(e) {
  const filmName = document.querySelector('.film__title');
  const queueModalBtn = document.querySelector('.btn__queue');
  const userData = {
    queue: {},
    watched: {},
  };
  const firebase = new dataStorage(userData);

  if (queueModalBtn.classList.contains('active')) {
    userData.queue[e.target.dataset.id] = filmName.textContent;
    firebase.delQueue();
    if (libraryBtnRef.classList.contains('current')) {
      onAuthStateChanged(auth, user => {
        if (user) {
          const libDataBaseWatched = `users/${user.uid}/lib/queue/`;

          get(ref(db, libDataBaseWatched))
            .then(snapshot => {
              if (snapshot.exists()) {
                const ids = Object.keys(snapshot.val());
                renderMarkupByIds(ids);
              } else {
                filmsListRef.innerHTML = '';
                addErrorStyles();
              }
            })
            .catch(console.error);
        }
      });
    }
    queueModalBtn.textContent = 'Add to queue';
    if (lng === "uk") {
      queueModalBtn.textContent = 'Додати до черги'
    }
  } else {
    firebase.queue = {
      [e.target.dataset.id]: filmName.textContent,
    };

    if (libraryBtnRef.classList.contains('current')) {
      onAuthStateChanged(auth, user => {
        if (user) {
          const libDataBaseWatched = `users/${user.uid}/lib/queue/`;

          get(ref(db, libDataBaseWatched))
            .then(snapshot => {
              if (snapshot.exists()) {
                const ids = Object.keys(snapshot.val());
                resetErrorStyles();
                renderMarkupByIds(ids);
              }
            })
            .catch(console.error);
        }
      });
    }
    if (lng === 'en') {
      queueModalBtn.textContent = 'Remove';
    } else {
      queueModalBtn.textContent = 'Видалити';
    }
  }
  queueModalBtn.classList.toggle('active');
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

// slider functions
function slider(e) {
  if (e.code === 'ArrowRight') {
    if (ids.indexOf(modalId) === ids.length - 1) return;
    filmsApi.id = ids[ids.indexOf(modalId) + 1];
    onArrowsKeydown();
  }

  if (e.code === 'ArrowLeft') {
    if (ids.indexOf(modalId) === 0) return;
    filmsApi.id = ids[ids.indexOf(modalId) - 1];
    onArrowsKeydown();
  }
}

async function onArrowsKeydown() {
  const filmImg = document.querySelector('.film__image');
  const filmInfo = document.querySelector('.film__information');
  filmImg.remove();
  filmInfo.remove();

  const film = await filmsApi.fetchMovieById();
  modal.insertAdjacentHTML('afterbegin', makeFilmModalMarkup(film));
  modalId = filmsApi.id;

  const watchedModalBtn = document.querySelector('.btn__watch');
  const queueModalBtn = document.querySelector('.btn__queue');
  const youtubeBtn = document.querySelector('.film__trailer__btn');

  watchedModalBtn.addEventListener('click', onWatchedModalBtnClick);
  queueModalBtn.addEventListener('click', onQueueModalBtnClick);
  youtubeBtn.addEventListener('click', onYoutubeBtnClick);

  onAuthStateChanged(auth, user => {
    if (user) {
      const libDataBaseWatched = `users/${user.uid}/lib/watched/`;
      const libDataBaseQueue = `users/${user.uid}/lib/queue/`;

      get(ref(db, libDataBaseWatched))
        .then(snapshot => {
          if (snapshot.exists()) {
            const ids = Object.keys(snapshot.val());
            if (ids.includes(filmsApi.id)) {
              watchedModalBtn.classList.add('active');
              watchedModalBtn.textContent = 'Remove';
            }
          }
        })
        .catch(console.error);

      get(ref(db, libDataBaseQueue))
        .then(snapshot => {
          if (snapshot.exists()) {
            const ids = Object.keys(snapshot.val());
            if (ids.includes(filmsApi.id)) {
              queueModalBtn.classList.add('active');
              queueModalBtn.textContent = 'Remove';
              if (lng === 'uk') {
                queueModalBtn.textContent = 'Видалити'
              }
            }
          }
        })
        .catch(console.error);
    }
  });
}
