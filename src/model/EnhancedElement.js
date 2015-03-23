export default class EnhancedElement {
  constructor(element) {
    switch (Object.prototype.toString.call(element)) {
      case '[object HTMLCollection]':
      case '[object NodeList]':
        this.element = element.length ? Array.prototype.slice.call(element) : null;
        this.length = element.length;
        break;
      default:
        this.element = element;
        this.length = undefined;
        break;
    }
  }

  addClass(classes) {
    this.each((element) => {
      element.classList.add(...classes.split(' '));
    });

    return this;
  }

  each(callback) {
    let elements = this.length ? this.element : [this.element];

    for (let i = 0, length = elements.length; i < length; i++) {
      callback(elements[i]);
    }
  }
}
