    //user schema (BasicCode에서 스키마 부분을 분리한다)

var crypto = require('crypto');

var Schema = {};
//main에서 db연결에 대한 설정이 이루어지므로 mongoose를 main으로부터 받아와야함.
Schema.createSchema = function(mongoose){
    console.log('createSchema 호출됨 ... ');
    //객체에 createSchema 라는 함수를 정의함.
    var UserSchema = mongoose.Schema({
                id:{type:String, required:'true', unique:true,'default':''},
                hashed_password:
                {type:String, require:true, 'default':''},
                salt:
                {type:String, required:true},
                name:
                {type:String, index:'hased', 'default':''},
                age:
                {type:Number, 'default':-1},
                created_at:
                {type:Date, index:{unique:false}, 'default':Date.now()},
                updated_at:
                {type:Date, index:{unique:false}, 'default':Date.now()}
            }, {collection:'user11'});

            console.log('UserSchema 정의함 ...');

            UserSchema
                .virtual('password')
                .set(function(password){       
                    this.salt = this.makeSalt();
                    this.hashed_password = this.encryptPassword(password);
                    console.log('virtual password save ... >> '+this.hased_password);
            });

    UserSchema.method('encryptPassword', function(plainText, inSalt ){
        if(inSalt){
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
        }else{
            return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
        }
    });

    UserSchema.method('makeSalt', function(){     
        return Math.round((new Date().valueOf() * Math.random()))+'';
    });

    UserSchema.method('authenticate', function(plainText, inSalt, hashed_password){
        if(inSalt){
            console.log('authenticate 호출됨 ...');
            return this.encryptPassword(plainText, inSalt)===hashed_password;

        }else{
            console.log('authenticate 호출됨 ...');
            return this.encryptPassword(plainText, )===hashed_password;

        }
    });

    UserSchema.static('findById', function(id, callback){
        return this.find({id:id}, callback);
    });

    UserSchema.static('finalAll', function(callback){
        return this.find({}, callback);
    });
    
    return UserSchema;
};

module.exports  = Schema;
//객체 할당.