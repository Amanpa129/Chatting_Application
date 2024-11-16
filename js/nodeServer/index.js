


const io = require('socket.io')(8000,{
    cors:{
        origin: "*",
    }
})
const users = {};


io.on('connection', socket => {
    // New user joined
    socket.on('new-user-joined', id => {
        console.log("New user", id);
        users[socket.id] = id;
        socket.broadcast.emit('user-joined', id);
    });

    // Message sent by user
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, id: users[socket.id] });
    });


    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id]
    });

});





console.log("server is running on port 8000");
