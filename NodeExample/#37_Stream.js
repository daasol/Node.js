var fs = require('fs');

var infile = fs.createReadStream('./writeFile.txt', {flags : 'r'});
//해당 파일을 읽어오고, 권한을 할당함 read

infile.on('data', function(data){
   //data가 function에 전달됨
    console.log('읽어들인 데이터 : '+data);
});

infile.on('end', function(){
    console.log('읽기 종료');
});