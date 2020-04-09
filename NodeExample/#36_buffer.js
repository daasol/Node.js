var output = 'hello ! ';
var buffer = new Buffer(10); //길이가 10인 버퍼 생성

var len = buffer.write(output); //버퍼 안에 문자열을 씀, 길이 반환
console.log('첫 번째 버퍼에 쓰인 문자열 : '+buffer.toString());
console.log('첫 번째 버퍼에 쓰인 문자열 길이 : '+len);

console.log('is Buffer ? : '+Buffer.isBuffer(buffer));


var byteLength = Buffer.byteLength(buffer);
console.log('byteLen : '+byteLength);


var str = buffer.toString('utf8', 0, 4);
console.log('str : '+str);
