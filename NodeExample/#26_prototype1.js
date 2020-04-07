var person1 = {name : 'Daisy', age : 25};
var person2 = {name : 'Hat', age : 25};

//이렇게 객체를 하나씩 만들지 않고 프로토타입으로 만들기

function Person(name, age){
    this.name = name;
    this.age = age;
    
}


//#1
Person.prototype.walk = function(speed){
    console.log('speed : '+speed);
    this.speed = speed;
}

var person3 = new Person('Ups', 25);
var person4 = new Person('John', 20);

person3.walk(10);

console.dir(person3);