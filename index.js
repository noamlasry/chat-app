
// using 'express for robust connection'
var express = require('express');
var serverSocket = require('socket.io')
var mainApp = express();
var mainServer = mainApp.listen(4000, function(){console.log('listening')});
mainApp.use(express.static('public'));



var io = serverSocket(mainServer);

// here I'm lestning for messages from the client
io.on('connection', function(serverSocket){
    console.log("connection establish",serverSocket.id);
    // listen for message content to come
    serverSocket.on('client',function(data){io.sockets.emit('client',data);});
    // broadcast client action
    serverSocket.on('typing',function(data){serverSocket.broadcast.emit('typing',data)});

});