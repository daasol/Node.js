var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var static = require('serve-static');

//1.
var multer = require('multer');
var fs = require('fs');
var cors = require('cors');
//다중 서버 접속에 대한 문제를 해결해주는 기능 cors



var app = express();
app.set('port', process.env.PORT || 3000);


app.use('/public', static(path.join(__dirname, '/public')));
app.use('/uploads', static(path.join(__dirname, '/uploads')));
//upload를 위한 폴더, __dirname :  현재 폴더에서 uploads 폴더에 파일 저장.

app.use(cors());
//다중 서버 접속 문제를 해결해주는 cors을 미들웨어에 등록
//bodyparser

var storage = multer.diskStorage({
    destination : function(req, file, callback){
        //multer에서 정의한 파라미터, 함수를 객체의 속성값으로 넘김
        callback(null, 'uploads');
        //파일 업로드 목적지 설정
    },    
    filename : function(req, file, callback){
        //업로드된 파일의 이름이 중복되는 것을 막기 위해 고유정보를 써서 별도의 이름을 만들어줌 (시간정보)
        //callback(null, file.originalname+Date.now());
        //위 경우는 이미지 파일을 이용할 수 없음
        var extension = path.extname(file.originalname);
        //업로드된 file이름에서 png(파일 속성)을 뽑아냄 
        var basename = path.basename(file.originalname, extension);
        //.png만 뺀 나머지를 basename으로 지정
        callback(null, basename+Date.now() +extension);
        //xxx.png 파일로 파일 이름을 지정할 수 있음(조회 가능)
    }
    
});

//multer 모듈을 사용하기 위해 기본 설정
var upload =multer({
   storage : storage,
    limits : {
        files:10, //업로드 가능한 파일 갯수
        fileSize: 1024*1024*1024 //업로드 가능한 파일 사이즈
    }
});




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cookiepatser
app.use(cookieParser());

//expressSession
app.use(expressSession({
    secret : 'my key',
    resave:true,
    saveUninitialized:true
}));

var router = express.Router();

router.route('/process/photo').post(upload.array('photo', 1), function(req, res){
   //post 방식으로 받음, 이때 업로드 파일이 있는 경우, upload함수를 실행 
    //업로드 된 파일이 배열에 들어가도록 upload함수 
    console.log('process/photo 라우팅 함수 호출 ... ');
    
    var files = req.files;
    console.log('==== 업로드된 파일 ====');
    if( files.length >0){
        console.dir(files[0]); //업로드된 파일의 배열인 첫번째 요소
    }else {
        console.log('파일이 없음');
    }
    
    var originalname;
    var filename ;
    var mimetype;
    var size; //파일 사이즈
    
    if (Array.isArray(files)){
        //files가 배열이 맞다면
        for(var i=0; i<files.length ; i++){
            originalname = files[i].originalname;
            filename = files[i].filename;
            mimetype = files[i].mimetype;
            size = files[i].size;
                
        }
    }
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
    res.write("<h1>File Upload sucess</h1>");
    res.write("<p>original file : "+originalname+"</p>");
    res.write("<p>storage file : "+filename+"</p>");
    
    res.end();
    
    
});

// process/product ... routing function 
router.route('/process/product').get(function(req, res){
    
});

//  process/login2 ... routing function
router.route('process/login2').get(function(req, res){
    
});

// process/logout ... routing function
router.route('prcess/lougout').get(function(req, res){
    
});


app.use('/', router);
app.all('*', function(req, res){
    res.status(404).send('<h1>요청한 페이지가 존재하지 않음 </h1>');
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server ... port : '+app.get('port'));
});
