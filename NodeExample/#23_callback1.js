//add 함수를 선언하고 a, b, callback을 받는다. 이때 callback은 함수 이름이며, 하무거나 해도 상관 없다.
function add( a, b, callback){
     var result = a+b;
    //결과값을 result로 받는다.
    //callback이라는 이름으로 함수를 할당한다.
    callback(result);
    //result를 callback 함수 파라미터에 전달
}

console.log(add(10, 10, function(result){
    console.log('add callback : '+result);
    
}));

//add함수를 호출할 때 a=10, b=10을 집어넣으면 add를 정의한 부분으로 가서 a와 b를 더하고 callback의 첫번째 변수로 result를 넣어 보낸다.

//callback을 익명함수
//function(result){
//    console.log('add callback : '+result);    
//}로 정의하였다.