'use strict';

try {
  (function() {
    var burger = document.querySelector('.header__burger');
    var menu = document.querySelector('.main-navigation');
    var container = document.querySelector('.main-navigation-container');

    var closePopUp = function() {
      menu.classList.remove('main-navigation_opened');
      menu.classList.add('main-navigation_closed');

      container.classList.remove('main-navigation-container_opened');

      burger.classList.remove('header__burger_close');
      burger.classList.add('header__burger_open');

      container.removeEventListener('click', closePopUp);

      burger.removeEventListener('click', closePopUp);
      burger.addEventListener('click', openPopUp);
    };

    var openPopUp = function() {
      menu.classList.remove('main-navigation_closed');
      menu.classList.add('main-navigation_opened');

      container.classList.add('main-navigation-container_opened');

      burger.classList.remove('header__burger_open');
      burger.classList.add('header__burger_close');

      container.addEventListener('click', closePopUp);

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
      element.classList.add('zaem-condition__item_closed');
      element.addEventListener('click', function() {
        element.classList.toggle('zaem-condition__item_closed');
      });
    });
  })();
} catch (error) {}

try {
  (function() {
    var element = document.querySelector('.zaem-about');
    var button = element.querySelector('.zaem-about__more');

    element.classList.add('zaem-about_closed');
    button.addEventListener('click', function() {
      element.classList.toggle('zaem-about_closed');
    });
  })();
} catch (error) {}

try {
  (function() {
    var elements = document.querySelectorAll('.news-page__text-wrapper');

    elements.forEach(function(element) {
      var button = element.querySelector('.news-page__text-more');

      element.classList.add('news-page__text-wrapper_closed');
      button.addEventListener('click', function() {
        element.classList.toggle('news-page__text-wrapper_closed');
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
