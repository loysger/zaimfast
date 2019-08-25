import MainMenu from "./modules/main-menu";
import SetNumber from "./modules/set-number";
import OfferCardAbout from "./modules/offer-card-about";

MainMenu.init();
SetNumber.init();
OfferCardAbout.init();

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
