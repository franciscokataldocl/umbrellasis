

const menuwrapper = document.querySelector('.menu-wrapper');
const hamburger = document.querySelector('.hamburger-menu');
const navigationList = document.querySelector('.navigation-list');

menuwrapper.addEventListener('click', (e) => {
  
  hamburger.classList.toggle('animate');
  navigationList.classList.toggle('navigation-open');
});