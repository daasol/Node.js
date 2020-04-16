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

router.route('/process/login3:name').post(function(req,res){
    console.log('first router ...');
    
    var paramName = req.params.name;
    var id = req.body.id;
    var pw = req.body.pw;
    
    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write("<h1>Server login response</h1>");
    res.write("<div><p>"+id+"<p></div>");
    res.write("<div><p>"+pw+"<p></div>");
    res.write("<div><p>"+paramName+"<p></div>");
    res.end();
});

//모든 요청에 대해서 에러처리
app.all('*', function(req, res){
    res.status(404).send('<h1>요청 페이지가 존재하지 않음.</h1>');
    //404 페이지 오류
});

app.use('/', router);

var server = http.createServer(app).listen(app.get('port'), function(){
   console.log('express router web server ... ') 
});
