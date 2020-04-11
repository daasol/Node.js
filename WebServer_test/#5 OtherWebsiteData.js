var http = require('http');
var server = http.createServer();

var host = 'localhost';

var options = {
    host : 'www.google.com',
    port : 80,
    path : '/'
};



server.listen(3000, host, 5000, function(){
    console.log('web server Strat!');
});

server.on('connection', function(socket){
    console.log('client socket : '+socket);
});

var req = http.request(options, function(res){
    console.log('client request.');
    
    var resData = ' ';
    res.on('data', function(chunk){
        resData +=chunk;
    });
    res.on('end', function(){
        console.log(resData);
    });
});
    req.on('error', function(){
        console.log('에러발생');
    });