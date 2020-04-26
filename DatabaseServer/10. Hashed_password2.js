var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var static = require('serve-static');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var expressErrorHandler = require('express-error-handler');

var mongoose = require('mongoose');
//1. cypto 암호화 모듈
var crypto = require('crypto');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
        secret :'my key',
        resave : true,
        saveUninitialized :true
        }));

var database;
var UserSchema;
var UserModel;


function connectDB(){
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl,{  
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    database = mongoose.connection;
    
    database.on('open', function(){
        console.log('database 연결됨  : '+databaseUrl);
        
        UserSchema = mongoose.Schema({
            id:{type:String, index:'hased', unique:true,'default':''},
            //hashed_passworddhk salt 값을 스키마에 선언
            hashed_password:
            {type:String, require:true, 'default':''},
            salt:
            {type:String, required:true},
            name:
            {type:String, index:'hased', 'default':''},
            age:
            {type:Number, 'default':-1},
            created_at:
            {type:Date, index:{unique:false}, 'default':Date.now()},
            updated_at:
            {type:Date, index:{unique:false}, 'default':Date.now()}
        }, {collection:'user10'});
    
        console.log('UserSchema 정의함 ...');
        
 
        
    database.on('disconnected', function(){
        console.log('database 연결 끊어짐 ...');
    });
    
    database.on('error', console.error.bind(console, 'mongoose 연결 에러 ...'));
    
}


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
        secret :'my key',
        resave : true,
        saveUninitialized :true
        }));

var router = express.Router();
router.route('/process/login2').post(function(req, res){
    console.log('/process/login2 라우팅 함수 연결...');
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    
    console.log('요청 파라미터 >> id : '+paramId+', password : '+paramPassword);
    
    if(database){
        authUser(database, paramId, paramPassword, function(err, docs){
           if(err){
               console.log('에러발생');
               res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
               res.write('<h1>에러발생</h1>');
               res.end();
           } if(docs){
               res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
               res.write('<h1>사용자 로그인 성공</h1>');
               res.end();
               
           }else{
               console.log('에러발생 >> 76');
               res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
               res.write('<h1>사용자 데이터 조회 안됨</h1>');
               res.end();
           }
        });
    }else{
        console.log('에러발생 ... 데이터베이스 연결 안됨 db객체 없음');
        res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
        res.write('<h1>데이터베이스 연결 안됨</h1>');
    }
});


router.route('/process/addUser').post(function(req,res){
    console.log('/process/addUser router function .... ');
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;
    
    
    console.log('paramId : '+paramId+', paramPassword : '+paramPassword+', paramName : '+paramName);
    
    if(database){
        addUser(database, paramId, paramPassword, paramName, function(err, result){
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
        
    }else{
        console.log('100 : 에러발생');
        res.writeHead(200, {"Content-Type":'text/html;charset=UTF-8'});
        res.write('<h1>db 객체 x</h1>');
    }
});

router.route('/process/listUser').post(function(req, res){
    console.log('/process/listeuser 라우팅 함수 호출됨 ... ');
    
    if(database){
        UserModel.findAll(function(err, results){
            if(err){
                console.log('에러 발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>에러 발생</h1>');
                res.end();
            }
            if(results){
                console.log('results');
                console.dir(results);
                
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write("<h2>사용자 리스트 </h2>");
                res.write("<div><ul>");
                
                for( var i = 0; i<results.length; i++){
                    var curId =  results[i]._doc.id; 
                    var curName =  results[i]._doc.name; 
                    res.write('    <li> #'+i+'< : '+curId+', '+curName+' </li>');
                    
                }
                res.write('</ul></div>');
                res.end();
            }else{
                console.log('188 : 에러발생');
                res.writeHead(200, {"Content-Type":'text/html;charset=UTF-8'});
                res.write('<h1>조회된 사용자 없음</h1>');
            }
        });
    }else{
        console.log('194 : 에러발생');
        res.writeHead(200, {"Content-Type":'text/html;charset=UTF-8'});
        res.write('<h1>db 객체 존재 x</h1>');
    }
});


app.use('/', router);

var addUser = function(database, id, password, name, callback){
    console.log('addUser 호출 ... ');
    console.log('입력받은 데이터 >> id : '+id+', password : '+password+'name : '+name);
    
    var user = new UserModel({"id":id, "password":password, "name":name});
    
    user.save(function(err, user){
        if(err){
            console.log('에러발생');
            callback(err, null);
            return;
        }
        console.log('사용자 데이터 추가함');
        callback(null, user);
    });
};


var authUser = function(database, id, password, callback){
    console.log('authUser function 호출 ... ');
    
    UserModel.findById(id, function(err, results){
        if(err){
            callback(err, null);
            return;
        }
        console.log('id >> %s로 검색됨... ');
        if(results.length>0){
            
            var user = new UserModel({id:id});
            var authenticated = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hased_password);
            //사용자가 입력한 패스워드가 같은지 비교
         
            //doc에 password가 password와 일치한다면
            if(authenticated){
                console.log('비밀번호 일치');
                callback(null, results);
            }else{
                console.log('비밀번호 불일치');
                callback(null, null);
            }
        }else{
            console.log('아이디 일치하는 사용자 없음');
            callback(null, null);
        }
    });
    
};



var errorHandler = expressErrorHandler({
    static :{'404':'./public/404.html'}
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server ... + '+app.get('port'));
    connectDB();
});