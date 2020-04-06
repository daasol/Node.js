var  names = ['Daisy', 'Hat', 'Ups'];
//문자열로 각각의 원소를 채워넣은 배열

var users = [{name : 'Daisy', age: 20}, {name : 'Hat', age : 20}, {name : 'Ups', age : 25}];
//객체를 넣은 배열

users.push({name : 'John', age : 22});

console.log('user num : '+users.length);

console.log('first user name : '+users[0].name);
