var EventEmitter = require('events').EventEmitter;
var util = require('util');
//상속을 쉽게 도와주는 모듈


var Calc= function(){
    this.on('stop', function(){
        //stop이라는 이벤트가 발생했을 때 함수를 실행해달라
        console.log('Calc에 stop 이벤트 전달됨');
    });
};

util.inherits(Calc, EventEmitter);
//뒤에있는 마라미터를 부모로 하여 상속받음. 

Calc.prototype.add = function( a, b){
    return a+b;
    
}

module.exports = Calc;

