//모듈 파일 입니다.

//전역객체로, 어디서든 사용가능 
//module파일에 exports로 추가하면 모듈을 require하는 다른 곳에서도 exports로 추가한 매소드 흑은 객체를 사용할 수 있음
exports.getUser = function(){
 return {id:'daisy', name:'데이지'} ;  
};

exports.group = {id:'group01', name:'동료그룹'};


