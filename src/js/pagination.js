import { API_service } from './apiSevice';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const filmsApi = new API_service();

export function getPageFilms(ids, itemsPerPage, currentPage) {
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;

  return ids.slice(start, end);
}

export function createLibraryPagination(items, renderFn, totalItems) {
  const container = document.getElementById('pagination');
  const itemsPerPage = 20;
  const options = {
    totalItems: totalItems || items.length,
    itemsPerPage,
    visiblePages: 4,
    centerAlign: false,
  };

  const pagination = new Pagination(container, options);

  pagination.on('beforeMove', event => {
    renderFn(getPageFilms(items, itemsPerPage, event.page - 1));
  });

  pagination.movePageTo(0);
}

export function createHomePagination(renderFn) {
  const container = document.getElementById('pagination');
  const itemsPerPage = 20;
  const options = {
    totalItems: 200,
    itemsPerPage,
    visiblePages: 4,
    centerAlign: false,
  };

  filmsApi
    .fetchTrending(true)
    .then(data => {
      renderFn(getPageFilms(data.results, itemsPerPage, 0));
    })
    .catch(console.log);

  const pagination = new Pagination(container, options);

  pagination.on('beforeMove', event => {
    filmsApi.page = event.page;
    filmsApi
      .fetchTrending(true)
      .then(data => {
        // console.log(data, renderFn)
        renderFn(data.results);
      })
      .catch(console.log);
  });

  pagination.movePageTo(0);
}
