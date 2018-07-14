//core express code to initialize 

var express = require("express");
var app = express();
var cool = require('cool-ascii-faces')
var port = process.env.PORT || 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname + '/public')); //create a reference to the js file in the public folder
var io = require('socket.io').listen(app.listen(port)); //need this for real time interaction on the same port
console.log("Listening on port " + port);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the SnapCheap !!!' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});



app.get("/", function(req, res){
    res.render("page");
});

app.get("/cool", function(req, res){
    res.send(cool());
});
