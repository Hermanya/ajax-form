Ajax form
---------
How to use:
- import `<script src="ajax-form.js"></script>` or using your bundler of choice
- add `ajax` attribute on a form, like `<form ajax id="my-form" action="/path" method="post">`
- listen for events:
    ```
var form = document.querySelector('#my-form');
form.addEventListener('success', function (event) {
    console.log(event.detail); // has xhr and parsedResponseBody properties
});
form.addEventListener('error', function (event) {
    console.log(event.detail); // has xhr property
});
    ```

Other features:
- you may add `contentType="urlencoded"` form attribute, `json` by default
- while in progress form disables submit buttons and has `.submitting` class
- if response body is json, then available through `event.detail.parsedResponseBody`
