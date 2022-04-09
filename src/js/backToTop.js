// function trackScroll() {
//   let scrolled = window.pageYOffset;
//   let coords = document.documentElement.clientHeight;

//   if (scrolled > coords) {
//     goTopBtn.classList.add('back-to-top__show');
//   }
//   if (scrolled < coords) {
//     goTopBtn.classList.remove('back-to-top__show');
//   }
// }

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, window.innerHeight);
    setTimeout(backToTop, 0);
  }
}

let goTopBtn = document.querySelector('.back-to-top');

// window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);
