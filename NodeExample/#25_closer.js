function add(a, b, callback){
    var result = a+b;
    callback(result);
    
    
    var count = 0;
    //함수에 history를 적고 싶다.
    var history  = function(){
        count+=1;
        return a+ ' + '+ b+' = '+result+', count : '+count;
    };
    
    return history;
}

var add_his = add(20, 20, function(result){
   console.log('callback함수 -> add result : '+result); 
});

//자바 스크립트에서 add_his에 담긴것이 함수인지 변수인지 구분할 수 없어서 
console.log('add_ his 의 자료형 : '+typeof(add_his));
console.log('history 함수 -> add history : '+add_his());
console.log('history 함수 -> add history : '+add_his());
console.log('history 함수 -> add history : '+add_his());

