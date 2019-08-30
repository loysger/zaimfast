import Slider from './slider';

const SLIDER_CLASS_NAME = 'slider';
const INPUT_CLASS_NAME = 'calc__input';

export default class Calculator {
  constructor(elem) {
    this._elem = elem;
    this._input = elem.querySelector(`.${INPUT_CLASS_NAME}`);

    this._init();
  }

  _init() {
    this._createSlider((currentStep) => {
      console.log(currentStep);
    });
  }

  _createSlider(onSliderMove) {
    const slider = this._elem.querySelector(`.${SLIDER_CLASS_NAME}`);
    const max = +this._input.max;
    const step = +this._input.dataset.stepSize;
    const steps = max / step;

    this._slider = new Slider(slider, steps, 0);
    this._slider.onMove = onSliderMove;
  }
}
