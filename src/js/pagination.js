import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css'

const container = document.getElementById('pagination');

const options = { // below default value of options
     totalItems: 10,
     itemsPerPage: 10,
     visiblePages: 10,
     page: 1,
     centerAlign: false,
    //  firstItemClassName: 'tui-first-child',
    //  lastItemClassName: 'tui-last-child',
};

new Pagination(container, options);