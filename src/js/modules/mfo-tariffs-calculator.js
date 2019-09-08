import clamp from 'lodash-es/clamp';
import Calculator from './calc';

const CALC_CLASS_NAME = 'calc';
const CALC_AMOUNT_CLASS_NAME = 'calc__amount';
const CALC_DAYS_CLASS_NAME = 'calc__days';

const TARIFF_CLASS_NAME = 'tariff';
const TARIFF_SUMM_CLASS_NAME = 'tariff__summ';
const TARIFF_DAYS_CLASS_NAME = 'tariff__days';
const TARIFF_OVERHEAD_CLASS_NAME = 'tariff__overhead';

class Tariff {
  constructor(tarifElement) {
    this._element = tarifElement;
    this._summElem = tarifElement.querySelector(`.${TARIFF_SUMM_CLASS_NAME}`);
    this._daysElem = tarifElement.querySelector(`.${TARIFF_DAYS_CLASS_NAME}`);
    this._overheadElem = tarifElement.querySelector(
      `.${TARIFF_OVERHEAD_CLASS_NAME}`
    );
    this._data = Object.assign({}, tarifElement.dataset);
    this._tariffs = [];
  }

  set summ(val) {
    this._summElem.textContent = clamp(
      val,
      this._data.minsumm,
      this._data.maxsumm
    ).toLocaleString();

    this._updateOverhead();
  }

  set days(val) {
    this._daysElem.textContent = clamp(
      val,
      this._data.mindays,
      this._data.maxdays
    ).toLocaleString();

    this._updateOverhead();
  }

  _updateOverhead() {
    const summ = +this._summElem.textContent.replace(/\s/g, '');
    const days = +this._daysElem.textContent;
    const rate = +this._data.rate;

    const overHead = Math.round((summ / 100) * rate * days);

    this._overheadElem.textContent = overHead.toLocaleString();
  }
}

export default class TariffsCalculator {
  constructor() {
    this._calcElement = document.querySelector(`.${CALC_CLASS_NAME}`);
    this._tariffs = [];
  }

  init() {
    if (this._calcElement) {
      this._calcAmount = new Calculator(
        this._calcElement.querySelector(`.${CALC_AMOUNT_CLASS_NAME}`)
      );
      this._calcDays = new Calculator(
        this._calcElement.querySelector(`.${CALC_DAYS_CLASS_NAME}`)
      );

      const tariffsCollection = document.querySelectorAll(
        `.${TARIFF_CLASS_NAME}`
      );
      if (tariffsCollection) {
        tariffsCollection.forEach((tariff) => {
          this._tariffs.push(new Tariff(tariff));
        });
      }

      this._bind();
    }
  }

  _bind() {
    this._updateSumm(this._calcAmount.initValue);
    this._calcAmount.onValueChange = (value) => {
      this._updateSumm(value);
    };

    this._updateDays(this._calcDays.initValue);
    this._calcDays.onValueChange = (value) => {
      this._updateDays(value);
    };
  }

  _updateSumm(value) {
    this._tariffs.forEach((tariffClass) => {
      tariffClass.summ = value;
    });
  }

  _updateDays(value) {
    this._tariffs.forEach((tariffClass) => {
      tariffClass.days = value;
    });
  }
}
