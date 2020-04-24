var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var static = require('serve-static');
var mongoose = require('mongoose');
var expressErrorHandler = require('express-error-handler');

var db;
var UserSchema;
var UserModel;
function connectDB(){
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    //databse 연결부분
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl,{  
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
 });
    db = mongoose.connection;
    
    //연결 확인을 event 발생으로 확인할 수 있음
    db.on('open', function(){
        console.log('데이터베이스에 연결됨 : '+databaseUrl);
       
        
    //db연결 이후, schema를 정의함. 그 후, schema객체가 반환됨.
   UserSchema =  mongoose.Schema({ 
        id:String, name:String, password:String
        }, {collection:'user'});
        console.log('UserSchema 정의함');
        
        // 기존 collection과 방금 n정의한 schema연결
        UserModel =  mongoose.model('user', UserSchema);
        console.log('UserModel 정의함');
    });
    
    db.on('disconnected', function(){
        console.log('데이터베이스 연결 끊어짐 ... ');

    });
    db.on('error', console.error.bind(console, 'mongoose 연결 에러'));

}

var app = express();
app.set('port', process.env.PORT ||3000);
app.use('/public', static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret :'my key',
    resave : true,
    saveUninitialized : true
}));

var router = express.Router();
router.route('/process/login2').post(function(req, res){   
    console.log('/porcess/login2 router function .... '); 
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    
    console.log('요청 파라미터 id >> '+paramId+', pw >> '+paramPassword);
    
    if(db){
        authUser(db, paramId, paramPassword, function(err, docs){
            if(err){
                console.log('에러 발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>에러발생</h1>');
                res.end();
            }if(docs){
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>사용자 로그인 성공</h1>');
                res.write('<div><p>사용자 : '+docs[0].name+'</p></div>');
                res.end();
            }else{
                console.log('에러발생 >>> 56');
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>사용자 데이터 조회 안됨 </h1>');
                res.end();
            } 
        });
    }else{
        console.log('62: 에러발생');
        res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
        res.write('<h1>데이터베이스 연결 안됨 (db)객체 없음 > 65</h1>');
        
    }

});

router.route('/process/addUser').post(function(req,res){
    console.log('/porcess/addUser router function ... ');
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;
    
    console.log('paramId : '+paramId+', paramPassword : '+paramPassword+', '+'paramName : '+paramName);
    if(db){
        addUser(db, paramId, paramPassword, paramName, function(err, result){
            if(err){
                console.log('에러발생');
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>에러발생</h1>');
                res.end();
                
            }if(result){
                console.dir(result);
                
                res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
                res.write('<h1>사용자 추가 성공</h1>');
                res.write('<div><p>사용자 : '+paramName+'</p></div>');
                res.end();
            }else{
                console.log('94 : 에러발생');
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

app.use('/', router);

var authUser =function(db, id, password, callback){
    console.log('authUser 호출 ....');
    
    
    UserModel.find({"id":id, "password":password}, function(err, docs){
        if(err){
            callback(err, null);
            return;          
        } 
        if(docs.length>0){
            console.log('일치하는 사용자 찾음');
            callback(null, docs);
        }else{
            console.log('일치하는 사용자 찾지 못함');
            callback(null, null);
            
        }
    });
};

var addUser = function(db, id, password, name, callback){
    console.log('addUser 호출 ... ');
    console.log(' id >> '+id+', password >>'+ password+', name >> '+name);
    
    
    //UserModel을 프로토타입으로 객체생성
    var user =new UserModel({"id":id, "password":password, "name":name});
    
    //
    user.save(function(err, user){
        //저장시 에러 발생확인
        if(err){
            callback(err, null);
            return;
            console.log('에러발생 172')
            
        }
        console.log('사용자 데이터 추가함.');
        callback(null, user);
        
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