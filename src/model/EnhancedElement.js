export default class EnhancedElement {
  constructor(element) {
    this.element = element;
    this.length = element ? element.length : null;
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
