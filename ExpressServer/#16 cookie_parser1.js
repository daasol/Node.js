var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');


var app = express();
app.set('port', process.env.PORT || 3000);

app.use('/public', static(path.join(__dirname, 'public')));

//bodyparser를 미들웨어에 등록
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//cookieparser를 미들웨어에 등록
app.use(cookieParser());

//라우터 등록
var router = express.Router();

//1. /process/setUserCookie path의 라우터 생성
router.route('/process/setUserCookie').get(function(req, res){
    // /process/setUserCookie로 들어온 요청에 대해 라우터가 처리할 작업 ...
});

//2. /process/showCookie path의 라우터 생성
router.route('/process/showCookie').get(function(req, res){
   // /process/showCookie 들어온 요청에 대해 라우터가 처리할 작업 ...
    
});


//3. 라우터 path 등록
app.use('/', router);
//4. error 페이지 등록
app.all('*', function(req, res){
    res.status(404).send('<h1>요청한 페이지가 존재하지 않음 </h1>');
});


//5. 서버 
// server.listen(port) : 해당 포트로 들어오는 요청에 대해 대기
var server = http.createServer(app).listen(app.get('port'), function(){
   console.log('express web serber ... port : '+app.get('port')); 
});
