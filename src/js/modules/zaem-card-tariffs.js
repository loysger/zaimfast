const BLOCK = {
  class: 'zaem-card',
  toggleClass: 'zaem-card_tariffs_closed'
}

const BUTTON = {
  class: 'zaem-card__tariffs-more',
  text: {
    default: 'Еще тарифы',
    alt: 'Свернуть'
  }
}

const tuggleButtonText = (button) => {
  if (button.textContent === BUTTON.text.default) {
    button.textContent = BUTTON.text.alt;
  } else {
    button.textContent = BUTTON.text.default;
  }
}

export default class ZaemCardTariffs {
  static init() {
    const body = document.querySelector('body');

    body.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(BUTTON.class)) {
        document.querySelector(`.${BLOCK.class}`).classList.toggle(BLOCK.toggleClass);

        tuggleButtonText(evt.target);
      }
    })
  }
}
