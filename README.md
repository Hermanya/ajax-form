Ajax form
---------
How to use:
- import `<script src="http://hermanya.github.io/ajax-form/ajax-form.js"></script>` or using your bundler of choice
- add `ajax` attribute on a form
- listen for `success` and `error` events on the form

Other features:
- you may add `contentType="urlencoded"` form attribute, `json` by default
- while in progress form disables submit buttons and has `.submitting` class
- if response body is json, then available through `event.detail.parsedResponseBody`

Example:
```html
<script src="http://hermanya.github.io/ajax-form/ajax-form.js"></script>
<form ajax action="/login" method="post">
  <input type="email" name="username" placeholder="email address">
  <input type="password" name="password" placeholder="password">
  <button type="submit">log in</button>
</form>
<script>
  var loginForm = document.querySelector('form[action="/login"]');
  loginForm.addEventListener('success', function () {
    location.hash = 'profile';
  })
  loginForm.addEventListener('error', function () {
    alert('We don't recognize you, double check your credentials.');
  })
</script>
```
