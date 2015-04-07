export default class EnhancedElement {
  constructor(selection) {
    if (selection && typeof selection.length !== 'undefined') {
      let elements = Array.prototype.slice.call(selection);

      this.elements = elements.length ? elements : null;
    } else {
      this.elements = selection ? [selection] : null;
    }

    this.length = this.elements ? this.elements.length : 0;
  }

  each(callback) {
    let elements = this.elements;

    for (let i = 0, length = this.length; i < length; i++) {
      callback(elements[i]);
    }

    return this;
  }

  select(query) {
    let justOne = /\?$/.test(query),
      selector = justOne ? 'querySelector' : 'querySelectorAll',
      criteria = query.split('?')[0],
      matches = [];

    this.each((element) => {
      let match = element[selector](criteria);

      if (match) {
        if (justOne) {
          if (!matches.length) {
            matches = [match];
          }
        } else {
          matches = matches.concat(Array.prototype.slice.call(match));
        }
      }
    });

    return new EnhancedElement(matches);
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

  hasClass(name) {
    let hasClass = false;

    this.each((element) => {
      if (element.classList.contains(name)) {
        hasClass = true;
      }
    });

    return hasClass;
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

  on(type, selector, callback, useCapture = false) {
    if (typeof selector === 'function') {
      selector = '*';
      [, callback, useCapture] = arguments;
    }

    this.each((element) => {
      element.addEventListener(type, (event) => {
        if (event.target.matches(selector)) {
          callback(event, ...(event.detail || []));
        }
      }, useCapture);
    });

    return this;
  }

  off(type, callback) {
    this.each((element) => {
      element.removeEventListener(type, callback);
    });

    return this;
  }

  once(type, selector, callback, useCapture = false) {
    if (typeof selector === 'function') {
      selector = '*';
      [, callback, useCapture] = arguments;
    }

    let callbackOnce = (event) => {
      if (!callbackOnce.busy) {
        callbackOnce.busy = true;

        callback(event, ...(event.detail || []));

        this.off(type, callbackOnce);
      }
    };

    this.on(type, selector, callbackOnce, useCapture);

    return this;
  }

  trigger(type, ...parameters) {
    this.each((element) => {
      var event = new CustomEvent(type, {
        bubbles: true,
        cancelable: true,
        detail: parameters
      });

      element.dispatchEvent(event);
    });

    return this;
  }
}
