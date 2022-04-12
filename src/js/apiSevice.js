import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const API_KEY = '7a92417a5af1e8667d171d8c5ef3af4e';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export class API_service {
  language = localStorage.getItem('language');
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.language;
    this.id = null;
  }

  async fetchTrending() {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const { data } = await axios('trending/all/day', {
        params: {
          api_key: API_KEY,
          language: this.language,
          page: this.page,
        },
      });

      Loading.remove();
      console.log(data.results);
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMoviesByKeyword() {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const { data } = await axios('search/movie', {
        params: {
          api_key: API_KEY,
          query: this.searchQuery,
          language: this.language,
        },
      });

      Loading.remove();

      return data.results; //returns an OBJECT. e.g.{page: 1, results: Array(20), total_pages: 8, total_results: 147}
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMovieById() {
    //will throw an error if title "undefined";
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const { data } = await axios(`movie/${this.id}`, {
        //for this to work make sure this.searchQuery type is number!!!
        params: {
          api_key: API_KEY,
          language: this.language,
        },
      });
      Loading.remove();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
