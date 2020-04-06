var users=[{name : 'Daisy', age : 25}, {name : 'Hat', age : 25}];


console.log('Array num : '+users.length);

users.unshift({name : 'Ups', age : 25});
//배열의 맨 앞쪽에 집어넣기
console.dir(users);

var element = users.shift();
//배열 앞에 있는 요소 삭제
console.dir(element);
