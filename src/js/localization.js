const allLang = ['en', 'uk']
const html = document.querySelector("html");
const input = document.querySelector(".header__search-form-input");
const headerItem = document.querySelectorAll('.header__controls-item');
const footerItem = document.querySelectorAll('.contact__item');
const buttonLibrary = document.querySelectorAll('.header__library-buttons-button')
const footerText = document.querySelector('.footer__text-by');
const mistakeMessage = document.querySelector(".search-form__error");
const logBtn = document.getElementById('log-in-btn')
const list = document.querySelectorAll("option");
const firstValueList = [...list]
const newList = [...list]
newList.splice(0, 3)
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
    "headerLibraryBtn": {
        "en": "watched",
        "uk": "переглянуто"
    },
    "headerLibraryBtnque": {
        "en": "queue",
        "uk": "черга"
    },
    "placaholder": {
        "en": "Movie search",
        "uk": "Пошук фільмів"
    }, 
    "footeritem": {
        "en": "©  2022 | All Rights Reserved |",
        "uk": "©  2022 | Усі права захищені  |"
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
    "filab": {
        "en": "About",
        "uk": "Опис"
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
        "uk": "Підписуйтесь"
    },
      "footerapp": {
        "en": "Download Our App",
        "uk": "Завантажте додаток"
    },
      "footeradress": {
        "en": "Kyiv, street E. Konovalets 36-E",
        "uk": "Київ, вул. Є. Коновальця 36-Е"
    },
      "choose": {
        "en": "Choose genre",
        "uk": "Оберіть жанр"
    },
      "mistake": {
        "en": "Oops, films not found!",
        "uk": "Вибач, фільми не знайдено."
    },
     "team": {
        "en": "Developed",
        "uk": "Розроблено"
    },
      "userln": {
        "en": "Log in",
        "uk": "Увійти"
    },
       "userrg": {
        "en": "Registration",
        "uk": "Регістрація"
    },
        
}
const genrelist = {
       "Action": {
        "en": "Action",
        "uk": "Бойовик"
    },
    "Adventure": {
         "en": "Adventure",
         "uk": "Пригоди"
    },
    "Animation": {
         "en": "Animation",
         "uk": "Анімація"
    },
    "Comedy": {
         "en": "Comedy",
         "uk": "Комедія"
    },
    "Crime": {
         "en": "Crime",
         "uk": "Кримінал"
    },
    "Documentary": {
         "en": "Documentary",
         "uk": "Документальне"
    },
    "Drama": {
         "en": "Drama",
         "uk": "Драма"
    },
     "Family": {
         "en": "Family",
         "uk": "Сімейне"
    },
    "Fantasy": {
         "en": "Fantasy",
         "uk": "Фентезі"
    },
    "History": {
         "en": "History",
         "uk": "Історичне"
    },
    "Horror": {
         "en": "Horror",
         "uk": "Жахи"
    },
    "Music": {
         "en": "Music",
         "uk": "Музичне"
    },
     "Mystery": {
         "en": "Mystery",
         "uk": "Містичне"
    },
     "Romance": {
         "en": "Romance",
         "uk": "Романтичне"
    },
    "Science Fiction": {
         "en": "Science Fiction",
         "uk": "Наукова фантастика"
    },
    "TV Movie": {
         "en": "TV Movie",
         "uk": "Серіали"
    },
    "Thriller": {
         "en": "TV Movie",
         "uk": "Трилер"
    },
    "War": {
         "en": "War",
         "uk": "Про війну"
    },
    "Western": {
         "en": "Western",
         "uk": "Вестерн"
    },
    
    
}
let valueLn = localStorage.getItem('language');
if (valueLn === null) {
       valueLn = localStorage.setItem('language', 'en');
        location.href = window.location.pathname + '#en';
        location.reload();
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
    let hash = localStorage.getItem('language')
    // hash = hash.substr(1);
    // if (!allLang.includes(hash)) {
    //     language = localStorage.setItem('language', 'en');
    //     location.href = window.location.pathname + '#en';
    //     location.reload();
    // }
    select.value = hash;
    html.setAttribute("lang", `${hash}`)
    document.querySelector('.header__controls-item').textContent = langArr['headerLink'][hash]
    document.querySelector('.logo-title').textContent = langArr['headerTitle'][hash]
    headerItem[1].textContent = langArr['headerLibrary'][hash]
    document.querySelector('.footer__text').textContent = langArr['footeritem'][hash]
    document.querySelector('.contact__text').textContent = langArr['footercont'][hash]
    document.querySelector('.social__text').textContent = langArr['footerlink'][hash]
    document.querySelector('.app__text').textContent = langArr['footerapp'][hash]
    document.querySelector('.footer__developed').textContent = langArr['team'][hash]
    document.getElementById('log-in-tab').textContent = langArr['userln'][hash]
    document.getElementById('reg-tab').textContent = langArr['userrg'][hash]
    document.getElementById('register').textContent = langArr['userrg'][hash]
    logBtn.textContent = langArr['userln'][hash]
    mistakeMessage.textContent= langArr['mistake'][hash]
    buttonLibrary[0].textContent = langArr['headerLibraryBtn'][hash]
    buttonLibrary[1].textContent = langArr['headerLibraryBtnque'][hash]
    firstValueList[2].textContent = langArr['choose'][hash]
    input.removeAttribute('placeholder') 
    for (let key in genrelist) {
        for (const element of newList) {
            if (element.outerText === key) {
                element.textContent = genrelist[key][hash]
            }
        }    
    }
    if (hash === 'uk') {
        input.setAttribute("placeholder", "Пошук фільмів")
        document.querySelector('.contact__list-adress').textContent = langArr['footeradress'][hash]
        footerText.style.display = "none" 
          
    }
    else {
        input.setAttribute("placeholder", "Movie search")
       
    }
    
       
}
changeLanguage()