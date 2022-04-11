const allLang = ['en', 'uk']
const html = document.querySelector("html");
const input = document.querySelector(".header__search-form-input");
const headerItem = document.querySelectorAll('.header__controls-item');
const footerItem = document.querySelectorAll('.footer__item');
// import { renderFilmsMarkup } from './apiSevice';
// import { onFormSubmit} from './apiSevice';
// import { API_service } from './apiSevice';
// const filmsApi = new API_service();
const langArr = {
    "headerTitle": {
        "en": "Filmoteka",
        "uk": "Фільмотека" 
    },
    "headerLink": {
        "en": "HOME",
        "uk": "ДОДОМУ"
    },
    "headerLibrary": {
        "en": "MY LIBRARY",
        "uk": "МOЯ БІБЛІОТЕКА"
    },
    "placaholder": {
        "en": "Movie search",
        "uk": "Пошук фільмів"
    }, 
    "footeritem": {
        "en": "©  2020 | All Rights Reserved |",
        "uk": "©  2020 | Усі права захищені  |"
    },
    "footeritems": {
        "en": "Developed",
        "uk": "Розроблено"
    }

}
const select = document.querySelector('select');
select.addEventListener('change', changeURLLanguage);
function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    localStorage.setItem("language", `${lang}`);
    location.reload()
}
function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select.value = hash;
    html.setAttribute("lang", `${hash}`)
    html.setAttribute("lang", `${hash}`)
    document.querySelector('.header__controls-item').textContent = langArr['headerLink'][hash]
    document.querySelector('.logo').textContent = langArr['headerTitle'][hash]
    headerItem[1].textContent = langArr['headerLibrary'][hash]
    footerItem[0].textContent = langArr['footeritem'][hash]
    input.removeAttribute('placeholder')
    if (hash === 'uk') {
        input.setAttribute("placeholder", "Пошук фільмів")
        // filmsApi.fetchTrending().then(renderFilmsMarkup).catch(console.log);
        
    }
    else {
        input.setAttribute("placeholder", "Movie search")
       
    }
    
       
}
changeLanguage()
