var path = require('path');

var directories = [ 'Users', 'USER', 'brackets_nodejs'];
//배열 선언
var dirStr = directories.join();
//join은 3개의 문자열이 모두 문자열로 합쳐진다.

console.log('dir : ' +dirStr);

var dirStr2 = directories.join(path.sep);
console.log('dir2 : '+ dirStr2);

var dir3 = path.join('/Users/Daisy', 'notepad.exe');
//파일의 path를 구성하기 위한 각각의 요소를 합쳐준다.
console.log('dir3 : '+dir3);


var filepath = path.join('/Users/Daisy/filepathTest', 'test.exe');
//파일의 path를 구성하기 위한 각각의 요소를 합쳐준다.
console.log('filepath : '+filepath);

//path가 제공하는 이외의 기능들
var dirname = path.dirname(filepath);
console.log('dirname : '+dirname);

var basename = path.basename(filepath);
console.log('basename : '+basename);

var extname = path.extname(filepath);
console.log('extname : '+extname);