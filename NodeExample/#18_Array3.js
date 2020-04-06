var users =[{name : 'Daisy', age : 25}, {name : 'Hat', age : 25}, {name : 'Ups', age : 25}];

for (var i=0; i<users.length; i++){
    console.log(i+'번째 user name : '+users[i].name);
}


//java for each 버전

users.forEach(function(item, index){
    console.log('배열 원소 : '+index+' : '+item.name);
});