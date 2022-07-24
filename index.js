const path = require('path')
const express = require('express');
const app = express();

const SocketIO = require('socket.io')


//setting
app.set('port', process.env.PORT || 3000);



//static files
app.use(express.static(path.join(__dirname, 'public')))


//start the server
const server =app.listen(app.get('port'), ()=>{
    console.log("Server on port", app.get('port'));
})







//websockets
SocketIO(server);
const io = SocketIO(server)


io.on('connection', (socket)=>{
    console.log("Alguien se ha conectado", socket.id);
    socket.on('chat:message', (data)=>{
        io.sockets.emit('server-message',data)
    });


    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing',data)
    })
});











