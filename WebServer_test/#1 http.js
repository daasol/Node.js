var http = require('http');
var server = http.createServer();

var port = 3000;
server.listen(port, function(){
    console.log('web server Strat! : '+port);
});
//클라이언트 요청 대기 (포트번호, callback함수)
