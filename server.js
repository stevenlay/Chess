var express = require('express');
var app = express();
app.use(express.static('chess'));
var http = require('http').Server(app);
var port = 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/chess/default.html');
});

http.listen(port, function() {
    console.log('listening on *: ' + port);
});

// setup my socket server
//var io = require('socket.io')(http);

}// Called when the client calls socket.emit('move')
//socket.on('move', function(msg) {
//    socket.broadcast.emit('move', msg);
});