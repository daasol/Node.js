var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var static = require('serve-static');

//1. 에러 핸들러 모듈 추가
var expressErrorHandler = require('express-error-handler');
//2. mongodb 모듈 사용
var MongoClient = require('mongodb').MongoClient;

//3. db 연결을 위한 정보 설정
var database;
function connectDB(){
    var databaseUrl = 'mongdb://localhost:27017/local'
    
    //mongdb 객체를 참조하여 연결함수
    MongoClient.connect(databaseUrl, function(err, db){
        //연결 후, 에러와 db정보를 받는 콜백함수
        if(err){
            console.log('db 연결시 에러발생');
            return;
        }
        console.log('db에 연결됨 : '+databaseUrl);
        database = db;
    });
}

var app = express();
app.set('port', process.env.PORT || 3000);

app.use('/public', static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret : 'my key',
    resave:true,
    saveUninitialized:true
}));


var router = express.Router();

app.use('/', router);

var errorHandler = expressErrorHandler({
    static : {
        '404' : './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server ... ');
    connectDB();
    
});

