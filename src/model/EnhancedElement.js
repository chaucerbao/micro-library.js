export default class EnhancedElement {
  constructor(selection) {
    if (selection instanceof NodeList || selection instanceof HTMLCollection) {
      let elements = Array.prototype.slice.call(selection);

      this.elements = elements.length ? elements : null;
    } else {
      this.elements = selection ? [selection] : null;
    }
  }

  get length() {
    let elements = this.elements;

    return elements ? elements.length : 0;
  }

  each(callback) {
    let elements = this.elements;

    for (let i = 0, length = this.length; i < length; i++) {
      callback(elements[i]);
    }

    return this;
  }

  attr(key, value) {
    if (typeof value === 'undefined') {
      return this.length ? this.elements[0].getAttribute(key) : null;
    } else {
      this.each((element) => {
        element.setAttribute(key, value);
      });
    }

    return this;
  }

  prop(key, value) {
    if (typeof value === 'undefined') {
      return this.length ? this.elements[0][key] : null;
    } else {
      this.each((element) => {
        element[key] = value;
      });
    }

    return this;
  }

  addClass(classes) {
    this.each((element) => {
      element.classList.add(...classes.split(' '));
    });

    return this;
  }

  removeClass(classes) {
    this.each((element) => {
      element.classList.remove(...classes.split(' '));
    });

    return this;
  }

  empty() {
    let child;

    this.each((element) => {
      while (child = element.lastChild) {
        element.removeChild(child);
      }
    });

    return this;
  }

  remove() {
    this.each((element) => {
      element.parentNode.removeChild(element);
    });
  }
}
