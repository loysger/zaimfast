import Slider from './slider';

const SLIDER_CLASS_NAME = 'slider';
const INPUT_CLASS_NAME = 'calc__input';

export default class Calculator {
  constructor(elem) {
    this._elem = elem;
    this._input = elem.querySelector(`.${INPUT_CLASS_NAME}`);
    this._initValue = this._input.defaultValue;
    this._max = +this._input.max;
    this._min = +this._input.min;
    this._stepSize = +this._input.step;

    this._cache = {};

    this._init();
  }

  _init() {
    const initStep =
      this._initValue / this._stepSize - this._min / this._stepSize;

    this._createSlider((currentStep, hint) => {
      const value = this._getStepValue(currentStep);
      this._input.value = value;

      hint.textContent = value.toLocaleString();
    }, initStep);
  }

  _createSlider(onSliderMove, _initStep = 0) {
    const slider = this._elem.querySelector(`.${SLIDER_CLASS_NAME}`);
    const steps = (this._max - this._min) / this._stepSize;

    this._slider = new Slider(slider, steps, _initStep);
    this._slider.onMove = onSliderMove;
  }

  _getStepValue(step) {
    const value = this._stepSize * step + this._min;
    return value;
  }
}
