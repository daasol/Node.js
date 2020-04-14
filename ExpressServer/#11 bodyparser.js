var express = require('express');
var http = require('http');
var static = require('serve-static');
var app = express();
var path = require('path');
var bodyparser = require('body-parser');


app.set('port', process.env.PORT || 3000);

app.use(static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(function(req, res, next){
    console.log('first middleware ...');
    
    var userAgent = req.header('User-Agent');
    var paramName = req.body.name || req.query.name;
    
    res.send('<h3>서버에서 첫번째 미들웨어가 응답 : User-Agent : </h3>'+userAgent+'<h3> Param Name : </h3>'+paramName)
    
    next();
});


var server = http.createServer(app).listen(app.get('port'), function(){
   console.log('express web server ... port = '+app.get('port'));
    
});