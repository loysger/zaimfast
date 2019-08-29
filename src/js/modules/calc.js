import Slider from './slider';

const CALC_CLASS_NAME = 'calc';
const SLIDER_CLASS_NAME = 'slider';

export default class Calculator {
  constructor(elem) {
    this._elem = elem;
    this._sliders = [];

    this._init();
  }

  static init() {
    const calcsArray = [];

    const calcElements = document.querySelectorAll(`.${CALC_CLASS_NAME}`);
    calcElements.forEach((elem) => {
      calcsArray.push(new Calculator(elem));
    });
  }

  _init() {
    if (this._elem) {
      const slidersCollection = this._elem.querySelectorAll(
        `.${SLIDER_CLASS_NAME}`
      );
      this._createSliders(slidersCollection);
    }
  }

  _createSliders(slidersCollection) {
    slidersCollection.forEach((sliderElement) => {
      this._sliders.push(new Slider(sliderElement));
    });
  }
}
