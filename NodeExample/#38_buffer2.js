var buffer2 =Buffer.from('Hello', 'utf8');
//hello문자열을 넣은 버퍼를 만듦

console.log('buffer2의 길이 : '+ Buffer.byteLength(buffer2));

var str2 = buffer2.toString('utf8', 0, Buffer.byteLength(buffer2));
console.log('str2 : '+str2);