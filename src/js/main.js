'use strict';

try {
  (function() {
    var burger = document.querySelector('.header__burger');
    var menu = document.querySelector('.main-navigation');
    // var closeButton = document.querySelector('.main-navigation__close');

    var closePopUp = function() {
      menu.classList.remove('main-navigation--opened');
      menu.classList.add('main-navigation--closed');
      burger.classList.add('header__burger--open');
      burger.classList.remove('header__burger--close');
      burger.removeEventListener('click', closePopUp);
      burger.addEventListener('click', openPopUp);
    };

    var openPopUp = function() {
      menu.classList.add('main-navigation--opened');
      menu.classList.remove('main-navigation--closed');
      burger.classList.remove('header__burger--open');
      burger.classList.add('header__burger--close');
      burger.removeEventListener('click', openPopUp);
      burger.addEventListener('click', closePopUp);
    };

    burger.addEventListener('click', openPopUp);
  })();
} catch (error) {}

try {
  (function() {
    var table = document.querySelector('.zaem-condition__table');
    var conditions = table.querySelectorAll('.zaem-condition__item');

    conditions.forEach(function(element) {
      element.classList.add('zaem-condition__item--closed');
      element.addEventListener('click', function() {
        element.classList.toggle('zaem-condition__item--closed');
      });
    });
  })();
} catch (error) {}

try {
  (function() {
    var element = document.querySelector('.zaem-about');
    var button = element.querySelector('.zaem-about__more');

    element.classList.add('zaem-about--closed');
    button.addEventListener('click', function() {
      element.classList.toggle('zaem-about--closed');
    });
  })();
} catch (error) {}

try {
  (function() {
    var elements = document.querySelectorAll('.news-page__text-wrapper');

    elements.forEach(function(element) {
      var button = element.querySelector('.news-page__text-more');

      element.classList.add('news-page__text-wrapper--closed');
      button.addEventListener('click', function() {
        element.classList.toggle('news-page__text-wrapper--closed');
      });
    });
  })();
} catch (error) {}

try {
  (function() {
    var elements = document.querySelectorAll('.js-set-number');
    var targetClass = 'set-number';

    for (var i = 0; i < elements.length; i++) {
      var target = elements[i].querySelector('.' + targetClass);
      target.textContent = i + 1;
    }
  })();
} catch (error) {}
