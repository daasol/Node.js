var users = [{name : 'Daisy', age : 25}, {name : 'Hat', age : 25}];

var age_oper = function( a, b){
    return a+b;
}

users.push(age_oper);


console.dir(users);
console.log('thrid function : '+users[2](10, 10));