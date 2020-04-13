var express = require('express');
var http = require('http');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    console.log('first middleware .... ');
    
    
    next();
});

app.use(function(req, res, next){
    console.log('second middleware ...');
    var person={name : 'Daisy', age : 25};
    var personStr = JSON.stringify(person);
    res.send(personStr);
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server .. port : '+app.get('port'));
});