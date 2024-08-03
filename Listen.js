console.log("i am working");

const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://darttgoblin.github.io/Whisper/WhisperEmbPages/Group/Group.html",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors({
    origin: "https://darttgoblin.github.io/Whisper/WhisperEmbPages/Group/Group.html",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.removeHeader('Permissions-Policy');
    next();
});

console.log("i am still working");

io.on('connection', socket => {
    console.log("sockets are working");
    socket.on('user-connected', user => {
        socket.user = user; 
        socket.emit('recieve-user-connected', user)
    });
    socket.on('user-connected', user => {socket.broadcast.emit('recieve-user-connected', user)});
    socket.on('send-chat-message', messageObj => {socket.broadcast.emit('recieve-chat-message', messageObj);})
    socket.on('disconnect', () => {if (socket.user) {socket.broadcast.emit('recieve-user-disconnected', socket.user)}});
});

server.listen(3000, () => {console.log('Server is running on http://localhost:3000');});

