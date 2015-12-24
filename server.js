var bodyParser = require('body-parser');
var controller = require('./controllers/controller');
var express = require('express');
var app = express();

//configure application-level middleware
app.use(express.static(__dirname + '/views'));
app.use('/build', express.static(__dirname + '/build'));
app.use('/public/img', express.static(__dirname + '/public/img'));
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

//routes
app.post('/api/1/apps', controller.create);
app.delete('/api/1/apps/:id', controller.delete);

// using port 3000
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});

exports.app = server;