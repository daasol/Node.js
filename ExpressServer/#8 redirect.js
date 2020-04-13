var express = require('express');
var http = require('http');
var app = express();

app.set('port', process.env.PORT ||3000);
app.use(function(req, res, next){
    console.log('first middleware...');
    next();
});

app.use(function(req, res, next){
    console.log('second middleware...');
    
    res.redirect('http://google.co.kr');
    
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server ... ');
});