//readFile
var fs = require('fs');
//function -> 콜백함수
fs.readFile('./package.json', 'utf8', function(err, data){
    //파일을 모두 읽었을 때 
    console.log(data);
    
});
