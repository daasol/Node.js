var nconf = require('nconf');
//
var value = nconf.get('OS');
//내컴퓨터 환경변수에 저장된 시스템 변수 OS 모듈을 확인하고자 하는 예쩨

console.log('OS환경변수 값 : '+value);
