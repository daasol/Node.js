var person = {
    name :'Daisy',
    age : 20,
    add : function(a, b){
        return a+b;
    }
};

console.log('name : '+person['name']+', age : '+person.age+', add : '+person.add(30, 30));