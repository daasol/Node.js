var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var router = express.Router();

//요청 패스워드 수정 - name이라는 파라미터 처럼 넘어옴
router.route('/process/login3/:name').post(function(req, res){
    console.log('/process/login3/:name 라우팅 함수에서 받음');
    
    var paramName = req.params.name;
    
    var id = req.body.id || req.query.id;
    var pw = req.body.pw || req.query.pw;
    
    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
     res.write("<h1>Server login response</h1>");
    res.write("<div><p>"+id+"<p></div>");
    res.write("<div><p>"+pw+"<p></div>");
     res.write("<div><p>"+paramName+"<p></div>");
    res.end();
});

app.use('/', router);

var server = http.createServer(app).listen(app.get('port'), function(){
   console.log('express router web server ... ') 
});