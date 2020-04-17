var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
//모듈

var app = express();
app.set('port', process.env.PORT || 3000);

app.use('/public', static(path.join(__dirname, 'public')));

//bodyparser를 미들웨어에 등록
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//cookiepatser를 미들웨어에 등록
app.use(cookieParser());


var router = express.Router();

router.route('/process/setUserCookie').get(function(req, res){
   console.log('/process/setUserCookie 라우팅 함수 호출 ... ');
    
    res.cookie('user', {
        id:'daisy',
        name : '데이지',
        authorized : true
    });
    res.redirect('/process/showCookie');
});

//설정된 쿠키 정보 살펴보기
router.route('/process/showCookie').get(function(req, res){
    //쿠키에 저장된 내용을 확인할 땐 cookies
    console.log('/process/showCookie 라우팅함수 호출됨 ...');
    console.dir(req.cookies);
    //요청객체 res를 통해서도 알 수 있듯 브라우저에 쿠키를 저장하고 있으며, cookies에 'user'가 저장되어있음.
    res.send(req.cookies);
    
    
});



app.use('/', router);
app.all('*', function(req, res){
    res.status(404).send('<h1>요청한 페이지가 존재하지 않음 </h1>');
});



var server = http.createServer(app).listen(app.get('port'), function(){
   console.log('express web serber ... port : '+app.get('port')); 
});