var user = require('./(3)Module_exports.js');

function showUser(){
    return user.getUser().name+', '+user.group.name;
}

console.log('사용자 정보 >> '+showUser());