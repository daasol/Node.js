var user = require('./(5)Function_module');

function showUser() {
    return user().name+', '+user().id;
}


console.log('사용자 정보 >> '+showUser());
