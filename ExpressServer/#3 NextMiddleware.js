var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(function(req, res, next){
    console.log('first middle ware...');
    
    req.user = 'daisy';
    next();
    
    
});

app.use(function(req, res,next){
     res.writeHead(200, {"Context-Type":"text/html; charset=utf8"});
    res.end('<h1>서버 응답 결과:</h1> '+req.user);
    console.log('second middle ware...');
});
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server 실행중... : '+app.get('port') );
    
});