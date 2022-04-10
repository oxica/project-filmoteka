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

// function backToTop() {
//   if (window.pageYOffset > 0) {
//     window.scrollBy(0, window.innerHeight);
//     setTimeout(backToTop, 0);
//   }
// }

// let goTopBtn = document.querySelector('.back-to-top');

// window.addEventListener('scroll', trackScroll);
// goTopBtn.addEventListener('click', backToTop);

//Get the button:
mybutton = document.getElementById('myBtn');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
