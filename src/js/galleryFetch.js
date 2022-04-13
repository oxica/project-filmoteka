import { API_service } from './apiSevice';
import renderFilmsMarkup from './templates/renderFilmsList';

const filmsApi = new API_service();
const filmsListRef = document.querySelector('.films');
const homeBtnRef = document.querySelector('.btn1');
const libraryBtnRef = document.querySelector('.btn2');
const watchedBtnRef = document.querySelector('.watched');
const queueBtnRef = document.querySelector('.queue');

filmsApi.fetchTrending().then(renderFilmsMarkup).catch(console.log);

homeBtnRef.addEventListener('click', onHomeBtnClick);
// libraryBtnRef.addEventListener('click', onMyLibraryBtnClick);
// watchedBtnRef.addEventListener('click', onWatchedBtnClick);
// queueBtnRef.addEventListener('click', onQueueBtnClick);

async function onHomeBtnClick() {
  try {
    filmsApi.page = 1;
    const films = await filmsApi.fetchTrending();
    renderFilmsMarkup(films);
  } catch (error) {
    console.log(error);
  }
}

function onMyLibraryBtnClick() {
  if (libraryBtnRef.classList.contains('current')) return;
  renderGalleryFromFirebase();
}

function onWatchedBtnClick() {
  if (watchedBtnRef.classList.contains('header__library-buttons-button--active')) return;
  renderGalleryFromFirebase();
}

function onQueueBtnClick() {
  if (queueBtnRef.classList.contains('header__library-buttons-button--active')) return;
  renderGalleryFromFirebase();
}

function renderGalleryFromFirebase() {
  const obj = {};
  const ids = Object.keys(obj);
  renderMarkupByIds(ids);
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
