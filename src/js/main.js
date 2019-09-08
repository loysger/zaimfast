import MainMenu from './modules/main-menu';
import SetNumber from './modules/set-number';
import OfferCardAbout from './modules/offer-card-about';
import ZaemCardTariffs from './modules/zaem-card-tariffs';
import TariffsCalculator from './modules/mfo-tariffs-calculator';

MainMenu.init();
SetNumber.init();
OfferCardAbout.init();
ZaemCardTariffs.init();
const tarifsCalculator = new TariffsCalculator;
tarifsCalculator.init();
