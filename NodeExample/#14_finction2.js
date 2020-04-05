var person = {};

person.name ='Daisy';
person['age']=20;
person.add = function(a, b) {
    return a+b;
}

console.log('객체 안에 함수 할당하기 : '+person.add(20, 20));