import { API_service } from './apiSevice';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css'

const container = document.getElementById('pagination');
const pageNum = 4;
const filmsApi = new API_service(pageNum);

filmsApi.fetchTrending().then().catch(console.log);
//console.log(filmsApi.fetchTrending())

const options = { // below default value of options
     totalItems: 10,
     itemsPerPage: 10,
     visiblePages: 10,
     //page: pageNum,
     centerAlign: false,
    //  firstItemClassName: 'tui-first-child',
    //  lastItemClassName: 'tui-last-child',
};

new Pagination(container, options);