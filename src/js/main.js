'use strict';

(function() {

  var burger = document.querySelector('.header__burger');
  var menu = document.querySelector('.main-navigation');
  var closeButton = document.querySelector('.main-navigation__close');

  var closePopUp = function() {
    menu.classList.add('no-display');
    closeButton.removeEventListener('click', closePopUp);
  };

  burger.addEventListener('click', function() {
    menu.classList.remove('no-display');
    closeButton.addEventListener('click', closePopUp);
  });

})();
