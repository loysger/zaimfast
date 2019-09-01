// <div class="slider">
//   <div class="slider__conteiner">
//     <div class="slider__lenght">
//       <div class="slider__depth"></div>
//       <div class="slider__pin"></div>
//     </div>
//   </div>
// </div>

import debounce from 'lodash-es/debounce';

const MAX_STEPS = 1000;
export default class Slider {
  constructor(sliderElement, _steps = 0, _initialStep = 0) {
    this._element = sliderElement;
    this._lengthElement = sliderElement.querySelector('.slider__lenght');
    this._pinElement = sliderElement.querySelector('.slider__pin');
    this._depthElement = sliderElement.querySelector('.slider__depth');
    this._hintElement = sliderElement.querySelector('.slider__hint');
    this._hintContent = sliderElement.querySelector('.slider__hint-content');
    this._steps = _steps;
    this._cache = {};

    this._init(_initialStep);
  }

  set _currentStep(value) {
    if (value <= 0) {
      this._currentStep_ = 0;
    } else if (value >= this._steps) {
      this._currentStep_ = this._steps;
    } else {
      this._currentStep_ = value;
    }
  }

  get _currentStep() {
    return this._currentStep_;
  }

  set hintContent(content) {
    this._hintContent.textContent = content;
  }

  get hintContent() {
    return this._hintContent.textContent;
  }

  _init(initialStep) {
    this._cache.maxWidthValue = this._lengthElement.clientWidth;
    this._moveSlider(0, initialStep);

    this._lengthElement.addEventListener(
      'click',
      this._lengthClickHandler.bind(this)
    );

    this._pinElement.addEventListener(
      'mousedown',
      this._startTracking.bind(this)
    );
    this._cache.mouseUpHandler = this._stopTracking.bind(this);
    this._cache.mouseMovementHandler = this._moveHandler.bind(this);

    // touch
    this._pinElement.addEventListener(
      'touchstart',
      this._startTracking.bind(this)
    );
    this._cache.touchStopHandler = this._stopTracking.bind(this);
    this._cache.touchMovementHandler = this._moveHandler.bind(this);
  }

  _startTracking(evt) {
    evt.preventDefault();
    this._cache.travelledDistance = 0;
    this._cache.depthWidth = this._depthElement.clientWidth;
    this._cache.maxWidthValue = this._lengthElement.clientWidth;

    this._depthElement.style.transition = 'none 0s ease 0s';

    this._hintElement.classList.add('slider__hint_true');

    // если задебауншеная функция существует отменяем ее для стабильного
    // отображения хинта
    if (this._cache.removeHintDebounced) {
      this._cache.removeHintDebounced.cancel();
    }

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
    this._depthElement.style.transition = '';

    const TIMEOUT = 500 // ms
    this._cache.hintTimeout = setTimeout(() => {
      this._hintElement.classList.remove('slider__hint_true');
    }, TIMEOUT);

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
      this.onMove(_exacStep, this._hintContent);
    } else {
      const predictedStep = this._currentStep + relStep;

      if (
        this._cache.prevPredictedStep !== predictedStep &&
        predictedStep > 0 &&
        predictedStep <= this._steps
      ) {
        const targetPercent =
          ((predictedStep * stepSize) / this._cache.maxWidthValue) * 100;

        this._cache.prevPredictedStep = predictedStep;
        this._setPosition(targetPercent);
        this.onMove(predictedStep, this._hintContent);
      }

      if (
        this._cache.prevPredictedStep !== predictedStep &&
        predictedStep === 0
      ) {
        this._cache.prevPredictedStep = predictedStep;
        this._setPosition(0);
        this.onMove(predictedStep, this._hintContent);
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

  _lengthClickHandler(evt) {
    evt.preventDefault();
    if (!evt.path.includes(this._pinElement)) {
      const coefficient = (evt.offsetX / this._lengthElement.clientWidth) * 100;
      const targetStep = Math.round((this._steps / 100) * coefficient);

      this._moveSlider(0, targetStep);
      this._hintElement.classList.add('slider__hint_true');
      this._removeHintDebounced();

      // если есть таймер на удаления хинта - отменяем его
      if (this._cache.hintTimeout) {
        clearTimeout(this._cache.hintTimeout);
      }
    }
  }

  _removeHintDebounced() {
    const TIMEOUT = 1000; // ms

    if (!this._cache.removeHintDebounced) {
      this._cache.removeHintDebounced = debounce(() => {
        this._hintElement.classList.remove('slider__hint_true');
      }, TIMEOUT);
    }

    return this._cache.removeHintDebounced();
  }

  moveSlider(stepToMoveTo) {
    this._moveSlider(0, stepToMoveTo);
  }

  onMove() {}
}
