var calc = require('./#6_module_ver2');
//자신이 만든 모듈은 상대경로 ./ 을 사용
//exports로 선언된  add함수를 사용할 수 있다.

console.log('모듈로 분리한 후 - calc.add : '+calc.add(20, 20));