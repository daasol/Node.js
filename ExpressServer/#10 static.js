var express = require('express');
var http = require('http');
var static = require('serve-static');
var app = express();
var path = require('path');

app.set('port', process.env.PORT || 3000);

app.use(static(path.join(__dirname, 'public')));
//상위폴더와 파일 이름을 붙여줄 수 있다 dirname/public 으로 path를 만들어주는 모듈
//dirname = #10이 실행되는 폴더
//public = 오픈, 사용할 폴더 
app.use(function(req, res, next){
    console.log('first middleware ...');
    next();
});

app.use(function(req, res, next){
   console.log('second middle ware ... ');
    
    
});

var server = http.createServer(app).listen(app.get('port'), function(){
   console.log('express web server ... port = '+app.get('port'));
    
});