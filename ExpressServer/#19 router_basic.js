var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use('/public', static(path.join(__dirname, '/public')));

//bodyparser
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

var router = exrpess.Router();

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
