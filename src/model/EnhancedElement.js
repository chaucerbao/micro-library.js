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

  each(callback) {
    let elements = this.length ? this.element : [this.element];

    for (let i = 0, length = elements.length; i < length; i++) {
      callback(elements[i]);
    }

    return this;
  }

  attr(key, value) {
    if (typeof value === 'undefined') {
      return this.length ? this.element[0].getAttribute(key) : this.element.getAttribute(key);
    } else {
      this.each((element) => {
        element.setAttribute(key, value);
      });
    }

    return this;
  }

  prop(key, value) {
    if (typeof value === 'undefined') {
      return this.length ? this.element[0][key] : this.element[key];
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
