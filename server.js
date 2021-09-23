require("dotenv").config();
const express = require('express')
const app = express()
const http = require('http').createServer(app)
// var bodyParser = require('body-parser');
const userRouter= require("./api/user/user.router");
app.use(express.json());
const path= require('path');
const bcrypt = require ('bcrypt');

const PORT = process.env.PORT || 3001

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))
app.use("/api/users",userRouter);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname) + '/index.html')
});

app.get('/login', (req, res) => {
    res.sendFile( path.resolve(__dirname )+ '/login.html')
});
app.get('/register', (req, res) => {
    res.sendFile( path.resolve(__dirname )+ '/register.html')
});

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})