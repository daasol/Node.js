var http = require('http');
var server = http.createServer();

var host='192.168.0.6';
//혹은 192.168.0.6 or localhost

var port = 3000;
server.listen(port, 50000, function(){
    console.log('web server Strat! : '+port+ 'host information : '+host);
});
//listen(포트번호, '동시 접속할 수 있는 클라이언트 수', callback함수)
