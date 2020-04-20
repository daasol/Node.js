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
var db;

function connectDB(){
    var databaseUrl = 'mongodb://localhost:27017/local'
     MongoClient.connect(databaseUrl, function(err, database) {
        if(err) throw err;
         
        console.log('데이터베이스에 연결됨: '+databaseUrl);
         
         //mongodb 버전 3.0이상을 사용할 때는, connection을 할 때에 database명을 명시해야 함
        db = database.db('local'); 
         
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
router.route('/process/login2').post(function(req, res){
    console.log('/process/login 라우팅 함수 호출');
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    console.log('요청 파라미터 -> id : '+paramId+' password : '+paramPassword);
    
    if(db){
        authUser(db, paramId, paramPassword, function(err, docs){
            if(err){
                console.log('에러발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>에러 발생</h1>');
                res.end();
                
            }if(docs){
                console.dir(docs);
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>사용자 로그인 성공</h1>');
                res.write('<div><p>사용자 : '+docs[0].name+'</p></div>');
                res.write('<br><br><a href = "/public/login2.html"> 다시 로그인 하기</a>');
                res.end();
                
            }else{
                console.log('70 에러발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>사용자 데이터 조회 안됨.</h1>');
                res.end();
            }
        });
    }else{
        console.log('77 에러발생');
        res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
        res.write('<h1>사용자 데이터 조회 안됨.</h1>');
        res.end();
    }
    
});

app.use('/', router);


var authUser = function(db, id, password, callback){
    console.log('authUser 호출됨.');
    
    var user = db.collection('user');
    //console.dir(user);
    user.find({"id":id, "password":password}).toArray(function(err, docs){
        if(err){
            callback(err, null);
            return;
            
        }if (docs.length>0){
            console.log('172 일치하는 사용자를 찾음');
            callback(null, docs);
        }else {
            console.log('175 (docs<0)일치하는 사용자를 찾지 못함');
            callback(null, null);
            
        }
    });
}
//404에러
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

