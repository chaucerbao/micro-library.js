function send(method, url, payload) {
  let formData, property;

  if (method.match(/GET|DELETE/)) {
    let queryString = '';

    /* Serialize the payload */
    for (property in payload) {
      queryString += (queryString ? '&' : '?') + property + '=' + payload[property];
    }
    url += queryString;
  } else if (payload instanceof HTMLFormElement) {
    /* Attach the form */
    formData = new FormData(payload);
  } else {
    /* Manually create the FormData object */
    formData = new FormData();
    for (property in payload) {
      formData.append(property, payload[property]);
    }
  }

  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    request.open(method, url);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        resolve(request);
      } else {
        reject(request);
      }
    };

    request.onerror = function() {
      reject(Error('Network error'));
    };

    request.send(formData);
  });
};

export function get(url, payload) {
  return send('GET', url, payload);
};

export function post(url, payload) {
  return send('POST', url, payload);
};

export function put(url, payload) {
  return send('PUT', url, payload);
};

export function del(url, payload) {
  return send('DELETE', url, payload);
};
