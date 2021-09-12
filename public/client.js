
// Listen on port 4000
// I'm using 'nodemon' to see the change immediately and avoid refershing the page any time
var clientSocket = io.connect('http://localhost:4000');


// attach the div element to js
var message = document.getElementById('message');
var handleBy = document.getElementById('handle-by');
var sedButton = document.getElementById('send');
var messageContent = document.getElementById('message-content');
var broadcast = document.getElementById('broadcast');

// send message to server
sedButton.addEventListener('click',function(){
    clientSocket.emit('client', {
        message: message.value,
        handleBy: handleBy.value
    });
    message.value = "";

});

// send client action on keyboard to server
message.addEventListener('keypress',function(){
    clientSocket.emit('typing',handleBy.value);
});

//Listen for event
clientSocket.on('client', function(data){
    broadcast.innerHTML = "";
    messageContent.innerHTML += '<p>' + data.handleBy + ':' + data.message + '</p>'
});


clientSocket.on('typing',function(data){
    broadcast.innerHTML = '<p>' + data + ' typing.... </p>'; 
});

