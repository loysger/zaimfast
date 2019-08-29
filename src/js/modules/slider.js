// <div class="slider">
//   <div class="slider__conteiner">
//     <div class="slider__lenght">
//       <div class="slider__depth"></div>
//       <div class="slider__pin"></div>
//     </div>
//   </div>
// </div>

import throttle from '../../../node_modules/lodash/throttle';

const THROTTLE_TIME = 15;
const MAX_STEPS = 100;
export default class Slider {
  constructor(sliderElement, _steps = 0) {
    this._element = sliderElement;
    this._lengthElement = sliderElement.querySelector('.slider__lenght');
    this._pinElement = sliderElement.querySelector('.slider__pin');
    this._depthElement = sliderElement.querySelector('.slider__depth');
    this._steps = _steps;
    this._cache = {};

    this._init();
  }

  _init() {
    this._setPosition();

    this._pinElement.addEventListener(
      'mousedown',
      this._startTracking.bind(this)
    );
    this._cache.mouseUpHandler = this._stopTracking.bind(this);
    this._cache.mouseMovementHandler = throttle(
      this._moveSlider.bind(this),
      THROTTLE_TIME
    );

    // touch
    this._pinElement.addEventListener(
      'touchstart',
      this._startTracking.bind(this)
    );
    this._cache.touchStopHandler = this._stopTracking.bind(this);
    this._cache.touchMovementHandler = throttle(
      this._moveSlider.bind(this),
      THROTTLE_TIME
    );
  }

  _startTracking(evt) {
    evt.preventDefault();
    this._cache.travelledDistance = 0;
    this._cache.depthWidth = this._depthElement.clientWidth;

    switch (evt.type) {
      case 'touchstart':
        this._cache.touchCoord = evt.touches[0].screenX;

        document.addEventListener('touchend', this._cache.touchStopHandler, {
          once: true
        });
        document.addEventListener(
          `touchmove`,
          this._cache.touchMovementHandler
        );
        break;

      default:
        this._cache.mouseCoord = evt.x;

        document.addEventListener('mouseup', this._cache.mouseUpHandler, {
          once: true
        });
        document.addEventListener(
          `mousemove`,
          this._cache.mouseMovementHandler
        );
        break;
    }
  }

  _stopTracking(evt) {
    this._cache.travelledDistance = 0;

    switch (evt.type) {
      case 'touchend':
        document.removeEventListener(
          'touchmove',
          this._cache.touchMovementHandler
        );
        break;

      default:
        document.removeEventListener(
          'mousemove',
          this._cache.mouseMovementHandler
        );
        break;
    }
  }

  _getStepSize(maxWidth) {
    if (this._cache.maxWidth && this._cache.maxWidth === maxWidth) {
      return this._cache.stepSize;
    }

    let stepSize;

    if (
      this._steps &&
      typeof this._steps === 'number' &&
      this._steps > 0 &&
      this._steps <= MAX_STEPS
    ) {
      stepSize = maxWidth / this._steps;
    } else {
      stepSize = 1;
    }

    this._cache.maxWidth = maxWidth;
    this._cache.stepSize = stepSize;

    return stepSize;
  }

  _setPosition(_percent = 0) {
    const style = this._depthElement.style;
    style.width = `${_percent}%`;
  }

  _moveSlider(evt) {
    const maxWidthValue = this._lengthElement.clientWidth;
    const stepSize = this._getStepSize(maxWidthValue);

    let shift;

    switch (evt.type) {
      case 'touchmove':
        shift = evt.touches[0].screenX - this._cache.touchCoord;
        this._cache.touchCoord = evt.touches[0].screenX;
        break;

      default:
        shift = evt.x - this._cache.mouseCoord;
        this._cache.mouseCoord = evt.x;
        break;
    }

    this._cache.travelledDistance = this._cache.travelledDistance + shift;

    while (Math.abs(this._cache.travelledDistance) >= stepSize) {
      const widthValue = this._cache.depthWidth + stepSize * Math.sign(shift);
      this._cache.depthWidth = widthValue;
      this._cache.travelledDistance =
        (Math.abs(this._cache.travelledDistance) - stepSize) *
        Math.sign(this._cache.travelledDistance);

      let percent;

      if (widthValue <= 0 || widthValue >= maxWidthValue) {
        if (widthValue <= 0) {
          percent = 0;
        } else {
          percent = 100;
        }
      } else {
        percent = (widthValue / maxWidthValue) * 100;
      }

      this._setPosition(percent);
    }
  }
}
