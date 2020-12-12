// ...............MOBILE MENU...
const hamburger =document.querySelector('.hamburger');
const line1 =document.querySelector('.line1');
const line2 =document.querySelector('.line2');
const line3 =document.querySelector('.line3');
const x =document.querySelector('.x');
const scrollToTop =document.querySelector('.scroll-to-top');
const navlinks =document.querySelector('.nav-links');
const login= document.querySelector('.login');
const nav= document.querySelector('nav');
const logo= document.querySelector('.logo img');
const links = document.querySelectorAll('.nav-links li');
// const navbuttons = document.querySelectorAll('.nav-buttons');

hamburger.addEventListener('click',()=>{
    navlinks.classList.toggle('open');
    line1.classList.toggle('close');
    line2.classList.toggle('close');
    line3.classList.toggle('close');
    scrollToTop.classList.toggle('close');
    x.classList.toggle('open');
    links.forEach(link =>{
        link.classList.toggle('fade');
    });
    login.classList.toggle('fade');
});


//..........SCROLL BUTTONS..........

const more= document.querySelector('.more');

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
 
    if (window.pageYOffset > 40) { // Make logo small and change nav colour
        logo.classList.add('small');
        nav.classList.add('small');
        more.classList.add('fade');
      }
    else { // make logo normal
      nav.classList.remove('small');
      logo.classList.remove('small');
      more.classList.remove('fade');
    }
    if (window.pageYOffset > 300) { // Show scrollToTop
        scrollToTop.classList.add('fade');
        // scrollToTop.style.display = "block";
    }
    else { // Hide scrollToTop
        scrollToTop.classList.remove('fade');
        // scrollToTop.style.display = "none";
    }
}

scrollToTop.addEventListener("click", smoothScrollBackToTop);


function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};

// window.onscroll = function(ev) {
//   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-20) {
//     // alert("you're at the bottom of the page");
//     // hamburger.style.display="none";
//     hamburger.classList.add('hide');
//     scrollToTop.classList.add('hide');
//   }
//   else{
//     hamburger.classList.remove('hide');
//     scrollToTop.classList.remove('hide');
//         // navbuttons.style.display="block";
//     // navbuttons.classList.remove('fade');
//   }
// };