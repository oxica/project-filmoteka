const movieNameArry = document.querySelectorAll('.movie__name');

const icon = document.querySelector('.fas')
const switchDayNight = document.querySelector('.day-night-switch');


if (localStorage.getItem('darkMode')===null){
    localStorage.setItem('darkMode', "false");
}
checkDarkModeStatus();

function checkDarkModeStatus(){
    if (localStorage.getItem("darkMode")==='true'){
        addDarkTheme();
        switchDayNight.checked = true;
    }else{
        removeDarkTheme();
        switchDayNight.checked = false;
    }
}



switchDayNight.addEventListener('change', ()=>{
if(switchDayNight.checked){
addDarkTheme()
    
}else{
removeDarkTheme()
}
  localStorage.setItem("darkMode",switchDayNight.checked);
})

function addDarkTheme(){
    document.body.classList.add('dark__theme');
    
    icon.classList.remove('fas', 'fa-sun')
    icon.classList.add('fa-solid', 'fa-moon', 'icon__dark');

    movieNameArry.forEach(movie=>{
       movie.style.color = "var(--white-text-color)"
    })
}
function removeDarkTheme(){
    document.body.classList.remove('dark__theme');

    icon.classList.remove('fa-solid', 'fa-moon','icon__dark' );
    icon.classList.add('fas', 'fa-sun');

    movieNameArry.forEach(movie=>{
        movie.style.color = "var(--main-text-color)"
     })
}