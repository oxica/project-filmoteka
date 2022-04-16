import { API_service } from './apiSevice';
import renderFilmsMarkup from './templates/renderFilmsMarkup';
import dataStorage from './userService/data-storage';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FIREBASECFG } from './userService/firebase-cfg';

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

homeBtnRef.addEventListener('click', onHomeBtnClick);
libraryBtnRef.addEventListener('click', onMyLibraryBtnClick);
queueBtnRef.addEventListener('click', onQueueBtnClick);
watchedBtnRef.addEventListener('click', onWatchedBtnClick);

async function onHomeBtnClick() {
  try {
    filmsApi.page = 1;
    const films = await filmsApi.fetchTrending();
    renderFilmsMarkup(films);
    watchedBtnRef.classList.remove('header__library-buttons-button--active');
  } catch (error) {
    console.log(error);
  }
}

function onMyLibraryBtnClick() {
  if (libraryBtnRef.classList.contains('current')) return;
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
            const ids = Object.values(snapshot.val());
            renderMarkupByIds(ids);
          } else {
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
            const ids = Object.values(snapshot.val());
            renderMarkupByIds(ids);
          } else {
            console.log('No data available');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  });
}

async function renderMarkupByIds(ids) {
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
