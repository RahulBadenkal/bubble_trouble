// 3rd Party Libs
let express = require('express')
let socket = require('socket.io')

// App imports
// let constants = require('./constants')  // TODO: Learn how to share code between front end and backend

let app = express()
app.use(express.static(__dirname));
const PORT = process.env.PORT || 3000;
let server = app.listen(PORT)
let io = socket(server)

let pool = [];    // list of sockets waiting for peers
let rooms = {};    // map socket.id => room
let names = {};    // map socket.id => name
let allUsers = {}; // map socket.id => socket


function findPeerForLoneSocket(socket){
    if (pool.length === 0){
        pool.push(socket)
    }
    else{
        // somebody is in queue, pair them!
        let peer = pool.pop()
        let room = socket.id + '#' + peer.id
        // join them both
        peer.join(room)
        socket.join(room)
        // register rooms to their names
        rooms[peer.id] = room
        rooms[socket.id] = room
        // exchange names between the two of them and start the chat
        console.log('Found Pair')
        peer.emit('startGame', {'gameType': 'multi', 'peerName': names[socket.id], 'room':room})
        socket.emit('startGame', {'gameType': 'multi', 'peerName': names[peer.id], 'room':room})
    }
}

// On new connection
io.sockets.on('connection', function(socket){
    console.log('New Connection socket ID: ', socket.id)
    logMsg('New Connection')
    
    // Register event handlers
    socket.on('join', function(data){
        names[socket.id] = data.username;
        allUsers[socket.id] = socket;
        findPeerForLoneSocket(socket)
        logMsg('Join')
    })
    
    socket.on('message', function(data){
        let room = rooms[socket.id]
        socket.broadcast.to(room).emit('message', data)  // Sent only to peer
    })
    
    socket.on('exit', function(data){
        let room = data.room
        let peerID = room.split('#');
        peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
        let peer = allUsers[peerID]
        // Inform to other peer that you are quitting
        socket.broadcast.to(room).emit('peerLeft');
        // Leave room for both users
        socket.leave(room)
        peer.leave(room)
        removeFromPool(socket)
        removeFromPool(peer)
        logMsg('Exit')
    })
    
    socket.on('disconnect', function () {
        if (rooms.hasOwnProperty(socket.id)){
            // Remove the room
            let room = rooms[socket.id];
            let peerID = room.split('#');
            peerID = peerID[0] === socket.id ? peerID[1] : peerID[0]
            let peer = allUsers[peerID].leave(room)
            // Inform to other peer that you are quitting
            socket.broadcast.to(room).emit('peerLeft');
            socket.leave(room)
            peer.leave(room)
            removeFromPool(peer)
            removeFromPool(socket)
        }else{
            removeFromPool(socket)
        }
        
        logMsg('Disconnect')
    });
    
    function removeFromPool(toRemove){
        for (let i=pool.length-1; i>=0; i--){
            let socket = pool[i]
            if (socket.id === toRemove.id){
                pool.splice(i, 1)
            }
        }
    }
    
    function logMsg(x){
        let ids = '['
        for (let i=0; i<pool.length; i++){
            ids += pool[i].id + ', '
        }
        ids += ']'
        console.log(x)
        console.log('Pool:', ids)
        console.log(rooms)
        console.log('-------------')
    }

})


