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
const MAX_STEPS = 1000;
export default class Slider {
  constructor(sliderElement, _steps = 0, _initialStep = 0) {
    this._element = sliderElement;
    this._lengthElement = sliderElement.querySelector('.slider__lenght');
    this._pinElement = sliderElement.querySelector('.slider__pin');
    this._depthElement = sliderElement.querySelector('.slider__depth');
    this._steps = _steps;
    this._cache = {};

    this._init(_initialStep);
  }

  _init(initialStep) {
    this._cache.maxWidthValue = this._lengthElement.clientWidth;
    this._moveSlider(0, initialStep);

    this._pinElement.addEventListener(
      'mousedown',
      this._startTracking.bind(this)
    );
    this._cache.mouseUpHandler = this._stopTracking.bind(this);
    this._cache.mouseMovementHandler = throttle(
      this._moveHandler.bind(this),
      THROTTLE_TIME
    );

    // touch
    this._pinElement.addEventListener(
      'touchstart',
      this._startTracking.bind(this)
    );
    this._cache.touchStopHandler = this._stopTracking.bind(this);
    this._cache.touchMovementHandler = throttle(
      this._moveHandler.bind(this),
      THROTTLE_TIME
    );
  }

  _startTracking(evt) {
    evt.preventDefault();
    this._cache.travelledDistance = 0;
    this._cache.depthWidth = this._depthElement.clientWidth;
    this._cache.maxWidthValue = this._lengthElement.clientWidth;

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

    this._currentStep = this._cache.currentStep;
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

  _moveSlider(relStep, _exacStep) {
    const stepSize = this._getStepSize(this._cache.maxWidthValue);

    if (_exacStep || _exacStep >= 0) {
      this._currentStep = _exacStep;
      this._cache.currentStep = _exacStep;
      const targetPercent =
        ((_exacStep * stepSize) / this._cache.maxWidthValue) * 100;
      this._setPosition(targetPercent);
      this.onMove(_exacStep);
    } else {
      const predictedStep = this._currentStep + relStep;

      if (predictedStep > 0 && predictedStep <= this._steps) {
        const targetPercent =
          ((predictedStep * stepSize) / this._cache.maxWidthValue) * 100;

        this._setPosition(targetPercent);
        this.onMove(predictedStep);
      }

      if (predictedStep === 0) {
        this._setPosition(0);
        this.onMove(predictedStep);
      }

      this._cache.currentStep = predictedStep;
    }
  }

  _moveHandler(evt) {
    switch (evt.type) {
      case 'touchmove':
        this._cache.travelledDistance =
          evt.touches[0].screenX - this._cache.touchCoord;
        break;

      default:
        this._cache.travelledDistance = evt.x - this._cache.mouseCoord;
        break;
    }
    const stepSize = this._getStepSize(this._cache.maxWidthValue);
    const fullStepsDone = Math.floor(this._cache.travelledDistance / stepSize);

    this._moveSlider(fullStepsDone);
  }

  onMove() {}
}
