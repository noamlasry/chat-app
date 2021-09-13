
// Listen on port 5000
// I'm using 'nodemon' to see the change immediately and avoid refershing the page any time
var clientSocket = io.connect('http://localhost:5000');


// attach the div element to js
var sender = document.getElementById('sender');
var clientName = document.getElementById('client-name');
var messageContent = document.getElementById('message-content');
var recipient = document.getElementById('recipient');
var message = document.getElementById('message');
var sedButton = document.getElementById('send');

var typing = document.getElementById('typing');

// send message to server
sedButton.addEventListener('click',function(){
    clientSocket.emit('client', {
        message: message.value,
        sender: sender.value,
        recipient:recipient.value
    });
    // clean message input for new message
    clientName.innerHTML = 'Contact Name: '+sender.value;
    message.value = "";
});

// send client action on keyboard to server
message.addEventListener('keypress',function(){
    clientSocket.emit('typing',sender.value);
});


// sent to server that cliet typing a message
clientSocket.on('typing',function(data){
    typing.innerHTML = '<p style="color:red;">' + data + ' typing.... </p>'; 
});

sedButton.addEventListener('click',function(){
    clientSocket.emit('naming',recipient.value);
});

clientSocket.on('naming',function(data){
    clientName.innerHTML = 'Contact Name: '+ data;
});


//Listen for event
clientSocket.on('client', function(data){
    // clean typing area
    typing.innerHTML = "";
    // write message that get from the server
    messageContent.innerHTML += '<p><strong>'  + data.sender + '</strong>: ' + data.message + '</p>';
});



