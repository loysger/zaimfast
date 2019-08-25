export default class SetNumber {
  static init() {
    const elements = document.querySelectorAll('.js-set-number');
    const targetClass = 'set-number';

    for (let i = 0; i < elements.length; i++) {
      const target = elements[i].querySelector('.' + targetClass);
      target.textContent = i + 1;
    }
  }
}
