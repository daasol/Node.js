var user = require('./(1)user1');
//exports라는 객체가 return된다. 
//getUser, group이라는 객체가 속성으로 들어간다


function showUser(){
    return user.getUser().name+', '+user.group.name;
    //getUser에 id, name이라는 속성이 있는 것을 알고있으므로 직접 name을 참조해도된다.
}

console.log('사용자 정보 >>> '+showUser());