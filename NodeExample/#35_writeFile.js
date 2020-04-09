var fs = require('fs');
fs.writeFile('./writeFile.txt', 'writeFile Testing', function(err){
    //에러 객체 발견시
    if(err){
        console.log('에러발생 : '+err);
        console.dir(err);
        return;
        
    }
    //에러가 발생하지 않은 경우 실행
    console.log('writeFil.txt 파일에 data 쓰기 완료');
});

