var express =require('express');
var http = require('http');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    console.log('first middle ware...');
    req.user='daisy';
    next();
});

app.use(function(req, res, next){
    console.log('second middle ware...');
    var person  = {
        name : 'daisy',
        age : 25
    };
    res.send(person);
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server... port : '+app.get('port'));
});