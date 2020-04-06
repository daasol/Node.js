var users = [{name : 'Daisy', age : 25}, {name : 'Hat', age : 25}, {name : 'Ups', age : 25}];

delete users[1];

console.dir(users);
users.forEach(function(item, index){
    console.log('num #'+index);
    console.dir(item);
})

users.splice(1,0, {name : 'John', age : 26});
console.dir(users);

users.splice(2, 0, {name : 'Hat', age : 25});
console.dir(users);

users.splice(3, 1);
//index 2부터 시작하여 1개를 삭제하겠다.
console.dir(users);