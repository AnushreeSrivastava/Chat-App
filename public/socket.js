//working socket.io server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 40510;

var i = 0;
io.on('connection', function (socket) {
  i = i + 1;
  console.log('a user connected' + i);

});

//use in stageMessage function/////////////////////////////
io.on('connection', function (socket) {//broadcast message

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);

    console.log('message ' + msg);
  });
});
///////////////////////////////////////////////////////////

io.on('connection', function (socket) {//broadcast message conditionally
  socket.on('chat message', function (msg) {
    if (msg == "hello") {
      io.emit('chat message', 'Message received!')
    }
  });
});

http.listen(port, function () {
  console.log('listening on *****:' + port);
});

module.exports.io = io;