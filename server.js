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