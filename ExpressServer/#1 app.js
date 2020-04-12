var express = require('express');
var http = require('http');


var app = express();
//app는 express서버 객체

app.set('port', process.env.PORT || 3000);
//port를 설정해주는데, 환경변수 안에 정의된 PORT가 없다면 3000으로 port를 설정

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server start'+app.get('port') );
});
//express를 이용해 웹서버 만들기 


