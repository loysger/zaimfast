import Slider from './slider';
import clamp from 'lodash-es/clamp';
import inRange from 'lodash-es/inRange';

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

  get initValue() {
    return this._initValue;
  }

  _init() {
    const initStep =
      this._initValue / this._stepSize - this._min / this._stepSize;

    this._createSlider((currentStep, hint) => {
      const value = this._getStepValue(currentStep);
      this._input.value = value;
      this.onValueChange(value);

      this._slider.hintContent = value.toLocaleString();
    }, initStep);

    this._slider.hintContent = this._input.value.toLocaleString();

    this._input.addEventListener('change', (evt) => {
      const value = this._checkValue(evt);

      const step = value / this._stepSize - this._min / this._stepSize;
      this._slider.moveSlider(step);
    });
  }

  _checkValue(inputEvent) {
    const value = +inputEvent.target.value;

    if (!inRange(value, this._min, this._max)) {
      inputEvent.target.value = clamp(value, this._min, this._max);
    } else if (value % this._stepSize !== 0) {
      inputEvent.target.value = value + (this._stepSize - (value % this._stepSize));
    }

    return +inputEvent.target.value;
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

  onValueChange() {}
}
