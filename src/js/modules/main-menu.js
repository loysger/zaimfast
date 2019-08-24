const BURGER = {
  class: 'header__burger',
  openMod: 'header__burger_cross'
};

const MENU = {
  class: 'main-navigation',
  openMod: 'main-navigation_closed'
};

const CONTAINER = {
  class: 'main-navigation-container',
  openMod: 'main-navigation-container_opened'
};

const openMenu = () => {
  const burgerElement = document.querySelector(`.${BURGER.class}`);
  burgerElement.classList.add(BURGER.openMod);

  const menuElement = document.querySelector(`.${MENU.class}`);
  menuElement.classList.remove(MENU.openMod);

  const containerElement = document.querySelector(`.${CONTAINER.class}`);
  containerElement.classList.add(CONTAINER.openMod);
};

const closeMenu = () => {
  const burgerElement = document.querySelector(`.${BURGER.class}`);
  burgerElement.classList.remove(BURGER.openMod);

  const menuElement = document.querySelector(`.${MENU.class}`);
  menuElement.classList.add(MENU.openMod);

  const containerElement = document.querySelector(`.${CONTAINER.class}`);
  containerElement.classList.remove(CONTAINER.openMod);
};

export default class MainMenu {
  static init() {
    const body = document.querySelector('body');

    body.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(BURGER.class)) {
        openMenu();
        body.style.overflowY = 'hidden';
      }
      if (evt.target.classList.contains(CONTAINER.class)) {
        closeMenu();
        body.style.overflowY = 'auto';
      }
    });
  }
}
