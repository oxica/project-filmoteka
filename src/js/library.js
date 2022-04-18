import { API_service } from './apiSevice';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FIREBASECFG } from './userService/firebase-cfg';
import renderFilmsMarkup from './templates/renderFilmsMarkup';
import dataStorage from './userService/data-storage';
import { resetErrorStyles } from './search';
import { addErrorStyles } from './search';
import { createLibraryPagination, createHomePagination } from './pagination';

const app = initializeApp(FIREBASECFG);
const db = getDatabase(app);
const auth = getAuth(app);

const userData = {
  queue: {},
  watched: {},
};
new dataStorage(userData);
const filmsApi = new API_service();

const homeBtnRef = document.querySelector('.btn1');
const libraryBtnRef = document.querySelector('.btn2');
const watchedBtnRef = document.querySelector('.watched');
const queueBtnRef = document.querySelector('.queue');
const filmsList = document.querySelector('.films');

homeBtnRef.addEventListener('click', onHomeBtnClick);
libraryBtnRef.addEventListener('click', onMyLibraryBtnClick);
queueBtnRef.addEventListener('click', onQueueBtnClick);
watchedBtnRef.addEventListener('click', onWatchedBtnClick);

async function onHomeBtnClick() {
  try {
    resetErrorStyles();
    createHomePagination(renderFilmsMarkup);
    watchedBtnRef.classList.remove('header__library-buttons-button--active');
  } catch (error) {
    console.log(error);
  }
}

function onMyLibraryBtnClick() {
  if (libraryBtnRef.classList.contains('current')) return;
  resetErrorStyles();
  onWatchedBtnClick();
}

function onWatchedBtnClick() {
  if (watchedBtnRef.classList.contains('header__library-buttons-button--active')) return;

  onAuthStateChanged(auth, user => {
    if (user) {
      const libDataBase = `users/${user.uid}/lib/watched/`;

      get(ref(db, libDataBase))
        .then(snapshot => {
          if (snapshot.exists()) {
            resetErrorStyles();
            const ids = Object.keys(snapshot.val());

            createLibraryPagination(ids, renderMarkupByIds);
          } else {
            filmsList.innerHTML = '';
            addErrorStyles();
            console.log('No data available');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  });

  watchedBtnRef.classList.add('header__library-buttons-button--active');
  queueBtnRef.classList.remove('header__library-buttons-button--active');
}

function onQueueBtnClick() {
  if (queueBtnRef.classList.contains('header__library-buttons-button--active')) return;
  queueBtnRef.classList.add('header__library-buttons-button--active');
  watchedBtnRef.classList.remove('header__library-buttons-button--active');

  onAuthStateChanged(auth, user => {
    if (user) {
      const libDataBase = `users/${user.uid}/lib/queue/`;

      get(ref(db, libDataBase))
        .then(snapshot => {
          if (snapshot.exists()) {
            resetErrorStyles();
            const ids = Object.keys(snapshot.val());
            createLibraryPagination(ids, renderMarkupByIds);
          } else {
            filmsList.innerHTML = '';
            addErrorStyles();
            console.log('No data available');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  });
}

export default async function renderMarkupByIds(ids) {
  try {
    const arrProm = ids.map(async id => {
      filmsApi.id = id;
      return await filmsApi.fetchMovieById();
    });
    const films = await Promise.all(arrProm);
    renderFilmsMarkup(films);
  } catch (error) {
    console.log(error);
  }
}
