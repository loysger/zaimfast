import Utils from "./utils";

const BURGER = {
  class: 'header__burger',
  mod: {
    open: 'header__burger_close',
    close: 'header__burger_open'
  }
};

const MENU = {
  class: 'main-navigation',
  mod: {
    open: 'main-navigation_opened',
    close: 'main-navigation_closed'
  }
};

const CONTAINER = {
  class: 'main-navigation-container',
  mod: {
    open: 'main-navigation-container_opened',
    close: ''
  }
};

const openMenu = () => {
  const burgerElement = document.querySelector(`.${BURGER.class}`);
  Utils.changeClass(burgerElement, BURGER.mod.close, BURGER.mod.open)

  const menuElement = document.querySelector(`.${MENU.class}`);
  Utils.changeClass(menuElement, MENU.mod.close, MENU.mod.open)

  const containerElement = document.querySelector(`.${CONTAINER.class}`);
  Utils.changeClass(containerElement, CONTAINER.mod.close, CONTAINER.mod.open)
};

const closeMenu = () => {
  const burgerElement = document.querySelector(`.${BURGER.class}`);
  Utils.changeClass(burgerElement, BURGER.mod.close, BURGER.mod.open, true)

  const menuElement = document.querySelector(`.${MENU.class}`);
  Utils.changeClass(menuElement, MENU.mod.close, MENU.mod.open, true)

  const containerElement = document.querySelector(`.${CONTAINER.class}`);
  Utils.changeClass(containerElement, CONTAINER.mod.close, CONTAINER.mod.open, true)
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
