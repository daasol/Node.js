function User(id, name ){
    this.id=id;
    this.name=name;
    
}

User.prototype.getUser = function(){
    return {id:this.id, name:this.name};
};

User.prototype.group ={id:"group1", name:"직장동료"};

User.prototype.printUser=function(){
    console.log('user name >> '+this.name+', group >> '+this.group.name);
};

module.exports = new User('daisy', '데이지');