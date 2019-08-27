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
      `mousedown`,
      this._startMouseTracking.bind(this)
    );
  }

  _startMouseTracking(evt) {
    evt.preventDefault();

    this._depthWidth = this._depthElement.clientWidth;

    this._mouseUpHandler = this._stopMouseTracking.bind(this);
    this._mouseMovementHandler = this._moveSlider.bind(this);

    document.addEventListener('mouseup', this._mouseUpHandler, {
      once: true
    });
    document.addEventListener(`mousemove`, this._mouseMovementHandler);
  }

  _stopMouseTracking() {
    document.removeEventListener('mousemove', this._mouseMovementHandler);
  }

  _moveSlider(evt) {
    const style = this._depthElement.style;
    const widthValue = this._depthWidth + evt.movementX;
    const maxWidthValue = this._lengthElement.clientWidth;

    let percent;

    this._depthWidth = widthValue;

    if (widthValue <= 0 || widthValue >= maxWidthValue) {
      if (widthValue <= 0) {
        percent = 0;
      } else {
        percent = 100;
      }
    } else {
      percent = widthValue / maxWidthValue * 100;
    }

    style.width = `${percent}%`;
  }
}
