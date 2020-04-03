console.log('안녕하세요.');

console.log('숫자 %d', 10);
console.log('문자열. %s', '안녕');

var person = {
    name : 'dasol',
    age : 25
    
};

console.log('자바스크립트 객체.  %j', person);

console.dir(person);

console.time('duration_time');
//key값을 괄호 안에 넣어주고, key값으로 닫아준다.
var result = 0;
//result가 정수타입으로 선언되고, 0이 정의된다.
for(var i=0; i<10000; i++){
    
    result+=i;
}
console.timeEnd('duration_time');