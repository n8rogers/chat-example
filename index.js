var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/script.js', function(req, res){
	res.sendFile(__dirname + '/script.js');
});

io.on('connection', function(socket){
	console.log("New Connection Detected.");
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	socket.on('user activity', function(user){
		io.emit('user activity', user);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
