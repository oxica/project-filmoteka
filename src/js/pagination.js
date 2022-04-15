import { API_service } from './apiSevice';
import Pagination from 'tui-pagination';
import { renderFilmsMarkup } from './galleryFetch';
import 'tui-pagination/dist/tui-pagination.min.css'

const container = document.getElementById('pagination');

const filmsApi = new API_service();
const options = {   
    totalItems: 200,
     itemsPerPage: 5,
     visiblePages: 4,
     centerAlign: false,
};

const pagination = new Pagination(container, options);

pagination.on('beforeMove', (event) => {
    const currentPage = event.page;

    filmsApi.page = currentPage;
    filmsApi.fetchTrending().then((images) => {
        renderFilmsMarkup(images);
    }).catch(console.log);
});