# pairs 

A real-time, multiplayer virtual reality matching pairs game built with 
[ReactVR](https://facebookincubator.github.io/react-vr/),
[Redux](http://redux.js.org/) and
[websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

1. Run ```npm run-script relay``` to start a wsrelay websocket relay server.
2. Run ```npm start``` in a second shell to start a ReactVR webserver.
3. Open ```http://localhost:8081/vr/``` in multiple web browsers to play pairs.

To run pairs over a network, replace localhost with your IP address in the browser URL and [index.vr.js](https://github.com/jimpurbrick/pairs/blob/18e2184bda3e5472c5ad077fde4a87de7293b7f3/index.vr.js#L45).
