var users=[{name : 'Daisy', age : 25}, {name : 'Hat', age : 25}];


console.log('Array num : '+users.length);

users.push({name : 'Ups', age : 25});
console.log('Array num : '+users.length);

var element = users.pop();
console.log('Array num : '+users.length);
console.dir(element);
