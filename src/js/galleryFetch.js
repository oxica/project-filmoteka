import { API_service } from './apiSevice';
import renderFilmsMarkup from '../js/templates/renderFilmsMarkup';
import {updatePagination} from './pagination'

const filmsApi = new API_service();

filmsApi.fetchTrending(true)
        .then((data) => {
          renderFilmsMarkup(data.results);
          updatePagination(data.total_results)
        })
        .catch(console.log);
