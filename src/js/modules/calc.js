import Slider from "./slider";

const CALC_CLASS_NAME = 'calc';
const SLIDER_CLASS_NAME = 'slider';

export default class Calculator {
  static init() {
    const calcElem = document.querySelector(`.${CALC_CLASS_NAME}`);
    // console.log(calcElem);

    const slidersCollection = calcElem.querySelectorAll(`.${SLIDER_CLASS_NAME}`);
    // console.log(slidersCollection);

    const firstSlider = new Slider(slidersCollection[0], 100);
  }
}
