//https://fifo22.tistory.com/72
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var static = require('serve-static');
var expressSession = require('express-session');

var expressErrorHandler = require('express-error-handler');

var mysql = require('mysql');

//connection.connect();

//pooling 연결을 여러개 만들어놓고 여닫이로 사용함
var pool = mysql.createPool({
    connectionLimit:10, //connection 개수
    host:'127.0.0.1', //host 명
    user:'root',
    password :'1234',
    database:'test',
    port:'3306',
    multipleStatements : true,
    debug:'test'
});

var addUser = function(id, name, age, password, callback){
    console.log('addUser ... ');
    
    pool.getConnection(function(err, conn){
        console.dir(conn);
        if(err){
            if(conn){
                conn.release();
            }
            console.log('addUser error ... ')
            callback(err, null);
            return;
        }
        console.log('database connection id >>'+conn.thradId);
        
        var data = {id:id, name:name, password:password, age:age};
        var exec = conn.query('insert into users set ?', data, function(err, addedUser){
            console.log('addUser 완료... release ... ');
            conn.release();
            console.log('실행된 sql ... '+exec.sql);
            
            if(err){
                console.log('SQL 실행시 에러발생 ... ');
                callback(err, null);
                return;
            }
            callback(null, addedUser);
            
        });
        
    });
};


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


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
        secret :'my key',
        resave : true,
        saveUninitialized :true
        }));

var router = express.Router();

router.route('/process/addUser').post(function(req,res){
    console.log('/process/addUser router function .... ');
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;
    var paramAge = req.body.age;
    
    console.log('paramId : '+paramId+', paramPassword : '+paramPassword+', paramName : '+paramName+', paramAge : '+paramAge);
    
   addUser(paramId, paramName, paramAge, paramPassword, function(err, addedUser){
       //추가시 추가된 데이터가 callback함수로 return된다. (addedUser)
       if(err){
            console.log('에러 발생');
            res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
            res.write('<h1>에러 발생</h1>');
            res.end();
            return;
       }
       if(addedUser){
           console.dir(addedUser);
           console.log('시용자 추가 성공');
           res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
           res.write('<h1>사용자 추가 성공</h1>');
           res.write('<div><p>사용자 : '+paramName+'</div></p>');
           res.end();
       }else{
           console.log('시용자 추가 실패');
           res.writeHead(200, {"Content-Type":'text/html;charset=UTF-8'});
           res.write('<h1>사용자 데이터 추가 안됨</h1>');
       }
       
   });
});

app.use('/', router);


var errorHandler = expressErrorHandler({
    static :{'404':'./public/404.html'}
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server ... + '+app.get('port'));
    
});