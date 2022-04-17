import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Fireworks } from './canvas';

const can = document.querySelector('#blow');

const API_KEY = '7a92417a5af1e8667d171d8c5ef3af4e';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export class API_service {
  language = localStorage.getItem('language');
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.language;
    this.id = null;
    this.genreId = null;
  }

  async fetchTrending(allData = false) {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const { data } = await axios('trending/movie/day', {
        params: {
          api_key: API_KEY,
          language: this.language,
          page: this.page,
        },
      });

      Loading.remove();

      return allData ? data : data.results;
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

      if (this.searchQuery.toLowerCase() === 'goit') {
        can.classList.remove('is-hidden');
        new Fireworks().run();

        const closeClick = () => {
          can.classList.add('is-hidden');
          window.removeEventListener('click', closeClick);
        };
        setTimeout(closeClick, 12000);
        window.addEventListener('click', closeClick);
      }

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

  async fetchMovieByIdForTV() {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const { data } = await axios(`tv/${this.id}`, {
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

  async fetchMovieByGenre() {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const { data } = await axios(`discover/movie`, {
        params: {
          api_key: API_KEY,
          language: this.language,
          with_genres: this.genreId,
        },
      });
      Loading.remove();

      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchYoutube(){
    try{
        let {data} = await axios(`/movie/${this.id}/videos`,{
            params: {
            api_key: API_KEY,
            language: "en - US",
            }
        });
        // console.log(data);
        return data;
    }
   catch(error){
       console.log("error");
   }
  
   
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get movieId() {
    return this.id;
  }

  set movieId(newId) {
    this.id = newId;
  }
}
