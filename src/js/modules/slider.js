// <div class="slider">
//   <div class="slider__conteiner">
//     <div class="slider__lenght">
//       <div class="slider__depth"></div>
//       <div class="slider__pin"></div>
//     </div>
//   </div>
// </div>

export default class Slider {
  constructor(sliderElement) {
    this._element = sliderElement;
    this._lengthElement = sliderElement.querySelector('.slider__lenght');
    this._pinElement = sliderElement.querySelector('.slider__pin');
    this._depthElement = sliderElement.querySelector('.slider__depth');

    this._init();
  }

  _init() {
    this._pinElement.addEventListener(
      'mousedown',
      this._startTracking.bind(this)
    );

    // touch
    this._pinElement.addEventListener(
      'touchstart',
      this._startTracking.bind(this)
    );
  }

  _startTracking(evt) {
    evt.preventDefault();
    this._depthWidth = this._depthElement.clientWidth;

    switch (evt.type) {
      case 'touchstart':
        this._touchCood = evt.touches[0].screenX;

        this._touchStopHandler = this._stopTracking.bind(this);
        this._touchMovementHandler = this._moveSlider.bind(this);

        document.addEventListener('touchend', this._touchStopHandler, {
          once: true
        });
        document.addEventListener(`touchmove`, this._touchMovementHandler);
        break;

      default:
        this._mouseUpHandler = this._stopTracking.bind(this);
        this._mouseMovementHandler = this._moveSlider.bind(this);

        document.addEventListener('mouseup', this._mouseUpHandler, {
          once: true
        });
        document.addEventListener(`mousemove`, this._mouseMovementHandler);
        break;
    }
  }

  _stopTracking(evt) {
    switch (evt.type) {
      case 'touchend':
        document.removeEventListener('touchmove', this._touchMovementHandler);
        break;

      default:
        document.removeEventListener('mousemove', this._mouseMovementHandler);
        break;
    }
  }

  _moveSlider(evt) {
    const style = this._depthElement.style;
    const maxWidthValue = this._lengthElement.clientWidth;

    let shift;

    switch (evt.type) {
      case 'touchmove':
        shift = evt.touches[0].screenX - this._touchCood;
        this._touchCood = evt.touches[0].screenX;
        break;

      default:
        shift = evt.movementX;
        break;
    }

    const widthValue = this._depthWidth + shift;

    this._depthWidth = widthValue;

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

    style.width = `${percent}%`;
  }
}
