import MainMenu from "./modules/main-menu";

MainMenu.init();

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

try {
  (function() {
    var block = document.querySelector('.zaem-card');
    var moreButton = document.querySelector('.zaem-card__tariffs-more');

    var closeMenu = function() {
      block.classList.remove('zaem-card_tariffs_opened');
      block.classList.add('zaem-card_tariffs_closed');

      moreButton.textContent = 'Еще тарифы';

      moreButton.removeEventListener('click', closeMenu);
      moreButton.addEventListener('click', openMenu);
    };

    var openMenu = function() {
      block.classList.remove('zaem-card_tariffs_closed');
      block.classList.add('zaem-card_tariffs_opened');

      moreButton.textContent = 'Свернуть меню';

      moreButton.removeEventListener('click', openMenu);
      moreButton.addEventListener('click', closeMenu);
    };

    moreButton.addEventListener('click', openMenu);
  })();
} catch (error) {}

try {
  (function() {
    var blocks = document.querySelectorAll('.offer-card__about');
    var toggleClass = '.offer-card__about-more';

    blocks.forEach(function(element) {
      var toggle = element.parentElement.querySelector(toggleClass);

      toggle.addEventListener('click', function(evt) {
        evt.preventDefault();
        toggle.classList.toggle('offer-card__about-more_upsidedown');
        element.classList.toggle('offer-card__about_closed');
      })
    })

  })();
} catch (error) {}
