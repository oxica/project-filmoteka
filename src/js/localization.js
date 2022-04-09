localStorage.setItem("language", "en");
const allLang = ['en', 'ua']
// const html = document.querySelector("html");
// const input = document.querySelector(".header__serch-input");
// const langArr = {
//     "headerTitle": {
//         "en": "Filmoteka",
//         "ua": "Фільмотека" 
//     },
//     "headerLink": {
//         "en": "HOME",
//         "ua": "ДОДОМУ"
//     },
//     "headerLibrary": {
//         "en": "MY LIBRARY",
//         "ua": "Моя БІБЛІОТЕКА"
//     },
//     "placaholder": {
//         "en": "Movie search",
//         "ua": "Пошук фільмів"
//     }, 
//     "footeritem": {
//         "en": "©  2020 | All Rights Reserved |",
//         "ua": "©  2020 | Усі права захищені  |"
//     }

// }
// const select = document.querySelector('select');
// select.addEventListener('change', changeURLLanguage);
// function changeURLLanguage() {
//     let lang = select.value;
//     location.href = window.location.pathname + '#' + lang;
//     location.reload();
// }
// function changeLanguage() {
//     let hash = window.location.hash;
//     hash = hash.substr(1);
//     if (!allLang.includes(hash)) {
//         location.href = window.location.pathname + '#en';
//         location.reload();
//     }
//     select.value = hash;
//     html.setAttribute("lang", ${hash})
//     document.querySelector('.header__controls-item').textContent = langArr['headerLink'][hash]
//     document.querySelector('.header__title').textContent = langArr['headerLink'][hash]
//     document.querySelector('.footer__item').textContent = langArr['footeritem'][hash]
//     if (hash === 'ua') {
//         input.setAttribute("placeholder", "Пошук фільмів")
//     } else {
//         input.setAttribute("placeholder", "Movie search")
//     }
    
       
// }
// changeLanguage()