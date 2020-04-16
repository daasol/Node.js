var express= require('express');
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

router.route('/process/login2').post(function(req, res){
    console.log('/process/login 라우팅 함수에서 받음');
    //id와 pw확인 (body에서 찾지 못하면 query를 이용해 찾음)
    var paramId =req.body.id || req.query.id;
    var paramPassword =req.body.pw || req.query.pw;
    
    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write("<h1>Server login response</h1>");
    res.write("<div><p>"+paramId+"<p></div>");
    res.write("<div><p>"+paramPassword+"<p></div>");
    res.end();
});



app.use('/', router);
//미들웨어에 라우터 등록


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server ... ');
})