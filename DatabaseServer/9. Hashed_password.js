//https://fifo22.tistory.com/71
var mongoose = require('mongoose');
var database;
var UserSchema;
var UserModel;

function connectDB(){
    var databaseUrl = "mongodb://localhost:27017/local";
    
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl, {
        useNewUrlParser:true, 
        useFindAndModify:false,
        useUnifiedTopology:true
    });
    
    database = mongoose.connection;
    
    database.on('open', function(){
        console.log('database 연결됨 ... >> ' + databaseUrl);
        
        createUserSchema();
        
        doTest();
    });
    
    database.on('disconnected', function(){
        console.log('데이터베이스 연결 끊어짐 ... ');
    });
    
    database.on('error', console.error.bind(console, 'mongoose 연결 에러 ...'));
}

function createUserSchema(){
    UserSchema = mongoose.Schema({
            id:{type:String, index:'hased', unique:true},
            name:{type:String, index:'hased'},
            //password column삭제
            age:{type:Number, 'default':-1},
            created_at:{type:Date, index:{unique:false}, 'default':Date.now()},
            updated_at:{type:Date, index:{unique:false}, 'default':Date.now()},
        }, {collection:'users4'});
        
        console.log('UserSchema 정의함 ...');
        
    //사용자가 info를 실행하면 set이 실행됨
        UserSchema.virtual('info')
            .set(function(info){
            var splitted = info.split(' ');
            this.id = splitted[0]; //this는 여기서 schema객체
            this.name = splitted[1];
            console.log('virtual info 속성 설정됨 >> id :  '+this.id+', name : '+this.name);
        })
            .get(function(){return this.id+' ' +this.name});
    
    UserModel = mongoose.model("users4", UserSchema);
    console.log('UserModel 정의함')
    
}

function doTest(){
    //UserModel 객체를 만들어서 test
    
    var user = new UserModel({"info":"Daisy 데이지"});
    user.save(function(err){
       if(err){
           console.log('64 에러발생 ... ');
           return;
       } 
        console.log('67 데이터 추가함 ...');
    });
}

connectDB();



