// 3rd Party Libs
let express = require('express')
let socket = require('socket.io')

// App imports
let constants = require('./constants')

let app = express()

app.use(express.static(__dirname));
const PORT = process.env.PORT || constants.DEBUG_PORT;

let server = app.listen(PORT)

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

