var express = require('express');
var http = require('http');
var app = express();

app.set('port', process.env.PORT||3000);
app.use(function(req, res, next){
    console.log('first middleware ... ');
    next();
});

app.use(function(req, res, next){
    console.log('second middleware ... ');
    
    var UserAgent = req.header('User-Agent');
    //헤더 정보중 user-agent정보를 뽑아낼 수 있음
    var paramName = req.query.name;
    //name 객체를 query 객체에 넣어준다.
    res.send('<h3>서버에서 응답 UserAgent : '+UserAgent +' ,  '+'</h3>'+'<h3>  paramName : '+paramName+'</h3>');
});

var server = http.createServer(app).listen(app.get('port'), function(){
   console.log('express web server ... port + '+app.get('port')); 
});