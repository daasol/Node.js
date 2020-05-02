var require = function(path){
    var exports = {};
    
    exports.getUser = function(){
          return {id:'daisy', name:'데이지'};
    };
    
    exports.group = {id:'group1', name:'직장동료'};
    
    return exports;
};

var user =require('...');

function showUser(){
    return user.getUser().name+','+user.group.name;
}
console.log('사용자 정보 ... '+showUser());
