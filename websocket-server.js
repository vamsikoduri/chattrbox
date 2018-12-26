var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
console.log('websockets server started');

var messages = [];

ws.on('connection', function (socket) {
    console.log("************* Connection Established ******************* ");

    // show the previous messages for a new connection.
    messages.forEach(function(message){
            socket.send(message);
    });
    
    socket.on('message', function (data) {
        console.log('message received:' + data);
        messages.push(data);
        ws.clients.forEach(function(clientSocket){
            clientSocket.send(data);
        })
    })


});