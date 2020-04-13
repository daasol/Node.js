var express = require('express');
var http = require('http');

var app = express();
app.set('port', process.env.PORT ||3000);
app.use(function(req, res, next){
    console.log('first middle ware ...');
    req.user='daisy';
    next();
});

app.use(function(req, res, next){
    console.log('second middle ware ...' );
    //res.writeHead(200, {"Context-Type" : "text/html;charset=utf8"});
    res.send('<h1>미들웨어(서버)에서 응답한 결과</h1> + '+req.user);
    //res.end('<h1>미들웨어(서버)에서 응답한 결과</h1> + '+req.user);
});

app.server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server ... +' +app.get('port'));
});