window.addEventListener('submit', function (event) {
    var form = event.target;

    if (form.getAttribute('ajax') !== null) {
        makeFormLookSubmitting();
        event.preventDefault();
        doAjaxInstead();
    }

    function makeFormLookSubmitting () {
        form.classList.add('submitting');
        Array.from(form.querySelectorAll('[type="submit"]')).forEach(function (element) {
            element.setAttribute('disabled', 'true');
        })
    }

    function doAjaxInstead () {
        var xhr = new XMLHttpRequest(),
            customPart = {
                detail: {
                    xhr: xhr
                }
            };
        xhr.open(form.getAttribute('method'), form.action, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                makeFormLookNormal();
                if (xhr.status === 200) {
                    try {
                        customPart.detail.parsedResponseBody = JSON.parse(xhr.responseText);
                    } catch (e) {
                        'it is not JSON';
                    }
                    form.dispatchEvent(new CustomEvent('success', customPart));
                } else {
                    form.dispatchEvent(new CustomEvent('error', customPart));
                }
            }
        };
        xhr.onerror = function (e) {
            makeFormLookNormal();
            form.dispatchEvent(new CustomEvent('error', customPart));
        };

        xhr.send(body(xhr)());
    }

    function body (xhr) {
        return {
            'json': function () {
                xhr.setRequestHeader("Content-type", "application/json");
                return jsonBody()
            },
            'urlencoded': function () {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                return urlEncodedBody();
            }
        }[form.getAttribute('contentType') || 'json'] || contentTypeUnsupported;
    }

    function contentTypeUnsupported () {
        throw new Error('contentType of _ is unsuported. Valid values: json and urlencoded'.replace('_', form.id))
    }

    function jsonBody () {
        return JSON.stringify(Array.from(form.querySelectorAll('[name]')).reduce(function (fields, element) {
            fields[element.getAttribute('name')] = element.value;
            return fields;
        }, {}));
    }

    function urlEncodedBody () {
        return JSON.stringify(Array.from(form.querySelectorAll('[name]')).map(function (element) {
            return [element.getAttribute('name'), element.value].map(encodeURIComponent).join('=');
        }).join('&'));
    }

    function makeFormLookNormal () {
        form.classList.remove('submitting');
        Array.from(form.querySelectorAll('[type="submit"]')).forEach(function (element) {
            element.removeAttribute('disabled');
        })
    }
});
