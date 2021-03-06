const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);


// serving index.html on client side
// You do not need to use app.get('/'...) because it is taken care of by ReactRouter
app.use(express.static(path.resolve(__dirname + '/../compiled')));
app.use(express.static(path.resolve(__dirname + '/../node_modules')));

require('./routes/middleware.js')(app, express);

require('./routes/routes.js')(app, express);

require('./routes/socketio.js')(app, express, http, io);

const port = process.env.PORT || 4568;

http.listen(port, () => {
  console.log('Music happening on =>', port);
});
