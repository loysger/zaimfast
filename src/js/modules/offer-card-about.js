const target = {
  class: 'offer-card__about',
  toggleClass: 'offer-card__about_closed'
};

const triggerButton = {
  class: 'offer-card__about-more',
  toggleClass: 'offer-card__about-more_upsidedown'
};

export default class OfferCardAbout {
  static init() {
    const buttonsCollection =
      document.querySelectorAll(`.${triggerButton.class}`) || [];

    buttonsCollection.forEach((button) => {
      const targetElement = button.parentElement.querySelector(
        `.${target.class}`
      );

      button.addEventListener('click', (evt) => {
        evt.preventDefault();
        button.classList.toggle(triggerButton.toggleClass);
        targetElement.classList.toggle(target.toggleClass);
      });
    });
  }
}
