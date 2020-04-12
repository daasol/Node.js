var http = require('http');
var server = http.createServer();

var port = 3000;
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
    console.log('client request >>>> ');
    
    //console.dir(req); req객체 확인해보기
    
    res.writeHead(200, {"Content-Type": "text/html ;charset=utf8"});
    //헤더정보출력 -> 클라이언트쪽으로  = 클라이언트로 전송
    //200 : 정상
    //"Content-Type": "text/html;charset=utf8" html  : 헤더정보
    
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write(' <head>');
    res.write(' <title>응답 페이지</title>');
    res.write(' </head>');
    res.write(' <body>');
    res.write(' <h1>웹서버로부터 받은 응답</h1>');
    res.write(' </body>');
    res.write('</html>');
    res.end();
});
