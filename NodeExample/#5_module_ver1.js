var calc = { };
//객체 선언 var object_name = { 중괄호 }; 
calc.add = function(a, b){
  return a+b;  
};

console.log('모듈로 분리하기 전 - calc.add : '+calc.add(10,10));

