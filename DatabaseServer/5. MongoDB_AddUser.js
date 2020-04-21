var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var static = require('serve-static');
var expressErrorHandler = require('express-error-handler');
var MongoClient = require('mongodb').MongoClient;


var db;

function connectDB(){   
    var databaseUrl = 'mongodb://localhost:27017/local';
    MongoClient.connect(databaseUrl, function(err, database){
        if(err) throw err;
        
        console.log('데이터베이스 연결됨 : '+databaseUrl);
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
        resave : true,
        saveUninitialized : true
}));

var router = express.Router();
router.route('/process/login2').post(function(req, res){
    console.log('/process/login2 라우팅 함수 호출');
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    console.log('요청 파라미터 >> id :'+paramId+', pw : '+paramPassword);
    
    if(db){
        authUser(db, paramId, paramPassword, function(err, docs){
            if(err){
                console.log('에러 발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>에러 발생</h1>');
                res.end();
            }if(docs){
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>사용자 로그인 성공</h1>');
                res.write('<div><p>사용자 : '+docs[0].name+'</div></p>');
                res.end();
            }else{
                console.log('60 : 에러발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>사용자 데이터 조회 안됨</h1>');
                res.end();
            }
        });
    }else{
        console.log('67 : 에러발생');
        res.writeHead(200, {"Content-Type":'text/html;charset=UTF-8'});
        res.write('<h1>데이터베이스 연결 안됨</h1>');
    }
});

router.route('/process/addUser').post(function(req,res){
    console.log('/process/addUser 라우팅 함수 호출됨');
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;
    
    console.log('paramId: '+paramId+', paramPassword:'+paramPassword+ ', paramName:'+paramName);
    if(db){
        addUser(db,paramId, paramPassword, paramName, function(err, result){
            if(err){
                console.log('에러 발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>에러 발생</h1>');
                res.end();
            }
            if(result){
                console.dir(result);
                
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>사용자 추가 성공</h1>');
                res.write('<div><p>사용자 : '+paramName+'</div></p>');
                res.end();
            }else{
                console.log('97 : 에러발생');
                res.writeHead(200, {"Content-Type":'text/html;charset=UTF-8'});
                res.write('<h1>사용자 데이터 추가 안됨</h1>');
            }
        });
    } else{
        console.log('103 : 에러발생');
        res.writeHead(200, {"Content-Type":'text/html;charset=UTF-8'});
        res.write('<h1>데이터베이스 연결 안됨</h1>');
    }
});


app.use('/', router);

//사용자 찾기
var authUser = function(db, id, password, callback){
    console.log('authUser 호출 ...');
    
    var user = db.collection('user');
    user.find({"id":id, "password":password}).toArray(function(err, docs){
        if(err){
            callback(err, null);
            return;
        }if(docs.length>0){
            console.log('일치하는 사용자 찾음');
            callback(null, docs);
        }else{
            console.log('87 : 일치하는 사용자 찾지 못함');
            callback(null, null);
        }
    });
};

var addUser = function(db, id, password, name, callback){
    console.log('addUser 호출 ... ');
    console.log('>> id : '+id+' password : '+password+', name : '+name);
    
    var user = db.collection('user');
    
    user.insertMany([{"id":id, "password":password, "name":name}], function(err, result){
        if(err){
            callback(err, null);
            return;
        }
        if(result.insertedCount>0){
            console.log('사용자 추가 완료 ... : '+result.insertedCount);
            callback(null, result);
            
        }else{
            console.log('추가된 레코드가 없음');
            callbacl(null, cnull);
            
        }
        
    });
    //여러개를 추가할 수 있는 메소드이므로 배열로 객체를 넣을 수 있음
    
};


var errorHandler = expressErrorHandler({
    static:{'404':'./public/404.html'}
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server ... ');
    connectDB();
    
});