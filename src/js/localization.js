const allLang = ['en', 'uk']
const html = document.querySelector("html");
const input = document.querySelector(".header__search-form-input");
const headerItem = document.querySelectorAll('.header__controls-item');
const title = document.querySelector('.cardItem-Title');
const filmsbutton = document.querySelectorAll(".cardItem__button")
const filmList = document.querySelectorAll('.film__details ') 
const filmListF = filmList[0].textContent
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
    },
    "filmvote": {
        "en": "Vote / Votes",
        "uk": "Кількість голосів"
    },
     "filmpop": {
        "en": "Popularity",
        "uk": "Рейтинг"
    },
     "filmtitle": {
        "en": "Original Title",
         "uk": "Оригінальна Назва"
    },
      "filmg": {
        "en": "Genre",
        "uk": "Жанр"
    },
      "filmg": {
        "en": "Genre",
        "uk": "Жанр"
    },
      "filab": {
        "en": "About",
        "uk": "Опис"
    },
     "butff": {
        "en": "Add to watched",
        "uk": "Додати до переглянутого"
    }, 
     "butff": {
        "en": "Add to watched",
        "uk": "Додати до переглянутого"
    }, 
     "butfc": {
        "en": "Add to queue",
        "uk": "Додати до черги"
    },
     "footer": {
        "en": "Developed",
        "uk": "Розроблено"
    },
      "footercont": {
        "en": "CONTACT US",
        "uk": "ЗВ'ЯЗАТИСЯ З НАМИ"
    },
      "footerlink": {
        "en": "FOLLOW US",
        "uk": "Підписуйтесь на нас"
    },
      "footerapp": {
        "en": "Download Our App",
        "uk": "Завантажте наш додаток"
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
        language = localStorage.setItem('language', 'en');
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select.value = hash;
    html.setAttribute("lang", `${hash}`)
    document.querySelector('.header__controls-item').textContent = langArr['headerLink'][hash]
    document.querySelector('.logo-title').textContent = langArr['headerTitle'][hash]
    headerItem[1].textContent = langArr['headerLibrary'][hash]
    document.querySelector('.footer__text').textContent = langArr['footeritem'][hash]
    filmListF.textContent = langArr['filmvote'][hash]
    document.querySelector('.contact__text').textContent = langArr['footercont'][hash]
    document.querySelector('.social__text').textContent = langArr['footerlink'][hash]
    document.querySelector('.app__text').textContent = langArr['footerapp'][hash]
    // document.querySelector('.film__details').textContent = langArr['filmpop'][hash]
    // titletext.textContent = langArr['filmtitle'][hash]
    // genrestext.textContent = langArr['filmg'][hash]
    // document.querySelector('.cardItem__about').textContent = langArr['filab'][hash]
    // filmsbutton[0].textContent = langArr['butff'][hash]
    // filmsbutton[1].textContent = langArr['butfc'][hash]
    input.removeAttribute('placeholder')
    if (hash === 'uk') {
        input.setAttribute("placeholder", "Пошук фільмів")
        localStorage.removeItem('language', 'en');
        localStorage.setItem('language', 'uk');
        
    }
    else {
        input.setAttribute("placeholder", "Movie search")
       language = localStorage.setItem('language', 'en')
       
    }
    
       
}
changeLanguage()