var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var static = require('serve-static');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var expressErrorHandler = require('express-error-handler');

var db;
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

    db = mongoose.connection;
    
    db.on('open', function(){
        console.log('database 연결됨  : '+databaseUrl);
        
        UserSchema = mongoose.Schema({
            id:{type:String, required:true, unique:true}, 
            name:{type:String, index:'hashed'}, 
            password:{type:String},
            age :{type:Number, 'default':-1},
            created_at:{type:Date, index:{unique:false}, 'default':Date.now()},
            updated_at:{type:Date, index:{unique:false}, 'default':Date.now()}
        }, {collection:'user2'});
        console.log('UserSchema 정의함...');
        
        //특정 id 찾는 함수 등록
        UserSchema.static('findById', function(id, callback){
            return this.find({"id":id, callback});
            //id를 찾고, callback으로 전달
        });
        
        /*
        위와 같은 메서드 등록은 아래와 같은 방법으로도 설정할 수 있다. 
        
         UserSchema.statics.findById = function(id, callback){
            return this.find({"id":id, callback});
            //id를 찾고, callback으로 전달
        };
        
        */
       
        
        //모든 데이터 찾기  함수 등록
        UserSchema.static('findAll', function(callback){
            return this.find({}, callback);
            
        });
        
        UserModel = mongoose.model('user2', UserSchema);
        console.log('UserModel 정의함 ...');
    });
    
    db.on('disconnected', function(){
        console.log('database 연결 끊어짐 ...');
    });
    
    db.on('error', console.error.bind(console, 'mongoose 연결 에러 ...'));
    
}

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

var router = express.Router();
router.route('/process/login2').post(function(req, res){
    console.log('/process/login2 라우팅 함수 연결...');
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    
    console.log('요청 파라미터 >> id : '+paramId+', password : '+paramPassword);
    
    if(db){
        authUser(db, paramId, paramPassword, function(err, docs){
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
    
    if(db){
        addUser(db, paramId, paramPassword, paramName, function(err, result){
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

app.use('/', router);

var authUser = function(db, id, password, callback){
    console.log('authUser function 호출 ... ');
    
    UserModel.find({"id":id, "password":password}, function(err, docs){
       if(err){
           callback(err, null);
           return;
       } if(docs.length>0){
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


var errorHandler = expressErrorHandler({
    static :{'404':'./public/404.html'}
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server ... + '+app.get('port'));
    connectDB();
});