var Calc = require('./#32_calc');

var calc1 = new Calc();
calc1.emit('stop');
//stop 이벤트를 전달

console.log('Calc에 stop 이벤트 전달');