


console.time('duration_time');
//key값을 괄호 안에 넣어주고, key값으로 닫아준다.
var result = 0;
//result가 정수타입으로 선언되고, 0이 정의된다.
for(var i=0; i<10000; i++){
    
    result+=i;
}
console.timeEnd('duration_time');

console.log('file name : %s', __filename);
console.log('path : %s', __dirname);
