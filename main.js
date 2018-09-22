// requires Underscore.js and jspack
// can use Winston for logging
// see package.json for dependencies for the implementation
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    socket.on('beep', function () {
        socket.emit('boop');
    });

    socket.on('params', function (msg) {
        console.log(msg);
        socket.broadcast.emit('orientationForUnity', {
            "beta": msg.beta,
            "gamma": msg.gamma,
            "alpha": msg.alpha,
            "dist": msg.dist
        });
    });

    socket.on('draw', function (msg) {
        console.log(msg);
        socket.broadcast.emit('draw', msg)
    })
});

http.listen(process.env.PORT || 3000, function () {
    console.log('listening on *:3000');
});