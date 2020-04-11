var http = require('http');
var fs = require('fs');
var mime = require('mime');
var server = http.createServer();


var port = 9900;
var host = 'localhost';

server.listen(port, host, 5000, function(){
    console.log('web server Strat!');
});

server.on('connection', function(socket){
    //connection 이라는 이벤트가 발생시(클라이언트 접속시) callback함수 실행 -> 내부적으로 소켓이 만들어져 callback함수로 전달됨
    console.log('client socket : '+socket);
    
});

server.on('request', function(req, res){
    //클라이언트가 요청하는 경우 req 와 res 객체를 전달한다.
    console.log('client request.');
    
    var filename = 'sp.png';
    fs.readFile(filename, function(err, data){
        if(err){
            res.writeHead(500, {'Content-Type':'text/html'});
            res.end('500 Internal Server '+err); 
        }else{
             res.writeHead(200, {'Content-Type':filename});
             res.end(data);
        }        
        
    });
});
