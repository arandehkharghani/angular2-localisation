

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as socketio from 'socket.io';
import * as methodOverride from 'method-override';

var port = process.env.PORT || 8080; 				// set the port
var app = express();

app.use(express.static(__dirname + '/')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    (<any>err).status = 404;
    next(err);
});

app.listen(port);
console.log('App listening on port ', port);

//var io = socketio(server);

//io.on('connection', function(client) {  
//    console.log('Client connected...');

//    client.on('join', function(data) {
//        console.log(data);
//        client.emit('message', 'Hello from server');
//    });
//});
