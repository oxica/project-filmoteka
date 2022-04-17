import { API_service } from './apiSevice';
import Pagination from 'tui-pagination';
import renderFilmsMarkup from '../js/templates/renderFilmsMarkup';
import 'tui-pagination/dist/tui-pagination.min.css';

const container = document.getElementById('pagination');

const filmsApi = new API_service();
const options = {
  totalItems: 200,
  itemsPerPage: 5,
  visiblePages: 4,
  centerAlign: false,
};

const pagination = new Pagination(container, options);

pagination.on('beforeMove', event => {
  filmsApi.page = event.page;
    filmsApi.fetchTrending()
        .then(renderFilmsMarkup)
        .catch(console.log);
});

export function updatePagination(totalItems) {
    pagination.reset(totalItems);   
}

