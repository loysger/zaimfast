import MainMenu from './modules/main-menu';
import SetNumber from './modules/set-number';
import OfferCardAbout from './modules/offer-card-about';
import ZaemCardTariffs from './modules/zaem-card-tariffs';
import Calculator from './modules/calc';

MainMenu.init();
SetNumber.init();
OfferCardAbout.init();
ZaemCardTariffs.init();

const CALC_CLASS_NAME = 'calc';
const CALC_AMOUNT_CLASS_NAME = 'calc__amount';
const CALC_DAYS_CLASS_NAME = 'calc__days';
const calc = document.querySelector(`.${CALC_CLASS_NAME}`);

if (calc) {
  // eslint-disable-next-line no-unused-vars
  const calcAmount = new Calculator(
    calc.querySelector(`.${CALC_AMOUNT_CLASS_NAME}`)
  );
  // eslint-disable-next-line no-unused-vars
  const calcDays = new Calculator(
    calc.querySelector(`.${CALC_DAYS_CLASS_NAME}`)
  );
}
