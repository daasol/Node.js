
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var exrpessSession = require('express-session');


var app = express();
app.set('port', process.env.PORT || 3000);

app.use('/public', static(path.join(__dirname, 'public')));

//bodyparser를 미들웨어에 등록
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//cookieparser를 미들웨어에 등록
app.use(cookieParser());

//session을 미들웨어에 등록  -> require로 로딩하는 함수에 객체를 넣는다.
app.use(exrpessSession({
    secret : 'my key',
    resave:true,
    saveUninitialized:true
    //세션 정보를 저장할 파일을 미리만들지, 저장할때 만들지 정하기
}));

var router = express.Router();

router.route('/process/product').get(function(req, res){
    console.log('/porcess/product 라우팅 함수 호출 ... ');
    if(req.session.user) {
        //product 페이지에 user 세션이 있으면
        console.log('user 세션이 존재')
        res.redirect('/public/product.html');
        
    }else {
        res.redirect('/public/login2.html');
        console.log('세션이 존재하지 않아 /public/login2.html redirect');
        
    }
});

//login2.html에서  post 방식으로 들어오기 떄문에 post매소드
//post방식으로 들어올때 callback함수 실행
router.route('/process/login2').post(function(req, res){
    console.log('/process/login2 라우팅 함수 호출...');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword =req.body.pw || req.query.pw;
    console.log(paramId+" , "+paramPassword);
    
    if(req.session.user){
        //session에 user 정보가 있다면, 로그인 되어있는 것
        console.log('이미 로그인 되어있음 .. 상품페이지로 이동');
        
        res.redirect('/public/product.html');
        
    }else{
        req.session.user = {
          //세션이 없다면, 추가함
            id : paramId,
            name : 'daisy',
            authorized:true
        };
        
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>login2 sucess </h1>');
        res.write('<p>Id : '+paramId+'</p>');
        res.write('<br><br><a href = "/public/product.html"> 상품페이지로 이동하기 </a>');
        
        //웹 브라우저로 전송
        res.end();
    }
});

router.route('/process/logout').get(function(req,res){
    console.log('/process/logout 라우팅 함수 호출 .... ');
    if(req.session.user){
       console.log('로그아웃 합니다.');
        //로그아웃시 세션안에 정보를 삭제
        req.session.destroy(function(err){
            if(err){
                //제대로 삭제되지 않았으면
                console.log('세션 삭제시 에러발생');
                return;
            }
            console.log('세션 삭제 성공');
            res.redirect('/public/login2.html')
        });
        
    }else{
        //로그인 되어있지 않은 상태의 logout페이지라면
        console.log('로그인 되어있지 않음');
        res.redirect('/public/login2.html');
    }
})

//3. 라우터 path 등록
app.use('/', router);
//4. error 페이지 등록
app.all('*', function(req, res){
    res.status(404).send('<h1>요청한 페이지가 존재하지 않음 </h1>');
});


var server = http.createServer(app).listen(app.get('port'), function(){
   console.log('express web serber ... port : '+app.get('port')); 
});
