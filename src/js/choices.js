import  Choices from 'choices.js';
let selectStateInputEl = document.querySelector('.header__select');
const choices = new Choices(selectStateInputEl, {
  searchEnabled: false,
  itemSelectText: ""
})
let selectGenre = document.querySelector('.genre');
const choicesgenre = new Choices(selectGenre, {
   itemSelectText: ""
})