
// Listen on port 4000
// I'm using 'nodemon' to see the change immediately and avoid refershing the page any time
var clientSocket = io.connect('http://localhost:4000');


// attach the div element to js
var message = document.getElementById('message');
var handleBy = document.getElementById('handle-by');
var sedButton = document.getElementById('send');
var messageContent = document.getElementById('message-content');
var broadcast = document.getElementById('broadcast');


sedButton.addEventListener('click',function(){
    clientSocket.emit('chat', {
        message: message.value,
        handleBy: handleBy.value
    })
});


message.addEventListener('keypress',function(){
    clientSocket.emit('typing',handleBy.value);
});

//Listen for event

clientSocket.on('chat', function(data){
    broadcast.innerHTML = "";
    messageContent.innerHTML += '<p>' + data.handleBy + ':' + data.message + '</p>'
});


clientSocket.on('typing',function(data){
    broadcast.innerHTML = '<p>' + data + ' typing.... </p>'; 
});

