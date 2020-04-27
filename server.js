let express = require('express')
let socket = require('socket.io')
var path = require('path');

let app = express()
let server = app.listen(3000)

app.use(express.static(__dirname));


let io = socket(server)
io.sockets.on('connection', newConnection)

function newConnection(socket){
    console.log('New Connection: ', socket.id)

    // Register event handlers
    socket.on('sharedData', onDataRecivedFromClient)

    function onDataRecivedFromClient(data){
        socket.broadcast.emit('sharedData', data);
        // console.log(data)
    }
}

