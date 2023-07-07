## Middleware in Express.js

In Express.js, middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. These functions can execute any code, make changes to the request and response objects, end the request-response cycle, and call the next middleware function in the stack.

The order of middleware loading is important: Middleware functions that are loaded first are also executed first. They can be loaded at the application level or at the router level.

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

### Why do we need middleware?

Middleware comes into play when we want to apply a specific functionality or perform certain operations on the incoming requests before they reach the routes. It could be logging details of every request, authenticating and authorizing users, parsing incoming requests, handling errors, etc.

It’s the backbone of Express.js as it provides a way to extend the capabilities of what our routes can do. Instead of having all logic inside the route handlers, we use middleware to encapsulate functionality that should be available across multiple routes.

### Example

For instance, we can have a middleware function that logs details of every request:

```javascript
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  next();
});
```

In the above example, every request to the server will first pass through this middleware function. The function logs the HTTP method and URL of the request and then calls `next()`, handing off control to the next middleware function (or route handler).

---

For more detailed information about middleware in Express.js, you can refer to the [Express.js documentation on middleware](https://expressjs.com/en/guide/using-middleware.html).

## Adding Status Codes to the logger middleware

If we just do this:

```js
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl} ${res.statusCode}`);
  next();
});
```

The middleware function logs the status before the route handler has a chance to run. The default status code for the response is 200, so unless the status code is updated within a route handler, it will remain at 200.

When the middleware function runs, the status code is still at its default value. It doesn't update until the route handler runs and sets a different status code. So because we've defined this middleware above our route handlers, we'd always see 200 in our console log, which defeats the purpose!

The Express `response.statusCode` property doesn't reflect status changes until the response headers are written to the network, which generally happens when you call methods like `res.send()` or `res.json()`. At the point where your logging middleware is inspecting `res.statusCode`, the headers haven't been written yet, so it just sees the default value of 200.

If we want our middleware to log the final status code, we would need to place it after our routes in the code, but keep in mind that by the time an error-handling middleware runs, headers may have already been sent to the client and it may not be possible to send a different status code from what has already been sent. 

Here's an alternative solution using a local variable in the `res` object:

```javascript
app.use((req, res, next) => {
  res.on('finish', () => { // the 'finish' event will be emitted when the response is handed over to the OS
    console.log(`Request: ${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});
```

This event listener for 'finish' will log the request method, URL, and the final status code after the response has been fully processed.