var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var static = require('serve-static');

//에러 핸들러 모듈 추가
var expressErrorHandler = require('express-error-handler');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use('/public', static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret : 'my key',
    resave:true,
    saveUninitialized:true
}));


var router = express.Router();


var errorHandler = expressErrorHandler({
    static : {
        '404' : './public/404.html'
    }
});

app.use('/', router);
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server ... ');
});