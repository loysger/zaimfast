export default class Utils {
  static changeClass(element, classToRemove, classToAdd, _isReverse) {
    if (_isReverse) {
      [classToRemove, classToAdd] = [classToAdd, classToRemove]
    }

    if (classToRemove) {
      element.classList.remove(classToRemove);
    }
    if (classToAdd) {
      element.classList.add(classToAdd);
    }
  }
}
