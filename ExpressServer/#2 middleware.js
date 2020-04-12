var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
//app 객체 = express 서버 객체

app.use(function(req, res, next){
    console.log('first middle ware');
    
    res.writeHead(200, {"Content-Type":"text/html; charset=utf8"});
    res.end('<h1>서버 응답 결과</h1>')
});
//use : 미들웨어 등록,동작할 함수를 넣는다


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server start ! '+ app.get('port'));
});

