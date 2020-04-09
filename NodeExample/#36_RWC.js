var fs = require('fs');

fs.open('./writeFile.txt', 'w', function(err, fd){
    if(err){
        console.log('파일 open시 에러발생');
        console.dir(err);
        return;
    }
    var buf = new Buffer('hello !\n');
    fs.write(fd, buf,  0, buf.length, null, function(err, written, buffer){
        if (err){
             console.log('파일 write시 에러발생');
            console.dir(err);
            return;
        }
        //파일 디스크립터 필요
        console.log('파일 쓰기 완료');
    
        fs.close(fd, function(){
        console.log('파일 닫기 완료');
        });
    //파일 닫기
        
    });
    
});
//w(writle) : 쓸 수 있는 권한, r(read) : 읽을 수 있는 권한