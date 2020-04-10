var winston = require('winston');
//윈스톤 외장 모듈 사용

//하나의 파일에 모든 로그를 담으면 파일이 매우 커지므로, 여러개로 나뉜다.
var winstonDaily = require('winston-daily-rotate-file');
//하루에 하나의 파일
var moment = require('moment');
//날짜, 시간 관련 외장모듈

function timeStampFormat(){
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
    //moment를 사용하기 위해서 moment로 기록할 형식을 함수로 정해줌
}

var logger = new (winston.Logger)({ //소괄호 안에 중괄호를 넣어 객체를 설정함. 설정정보는 transports안에 넣어 배열로 선언
    transports : [
        new (winstonDaily)({ //마찬가지로 객체를 바로 만들어 넣는다.
            name : 'info-file', //로그 설정의 이름
            filename : './log/server', //로그 파일 이름
            datePattern : '_yyyy-MM-dd.log',
            colorize:false, //색상에 대한 정보를 넣을것인지
            maxsize : 50000000,//파일이 더 커지면 분리해라 50mb
            maxFiles:1000, //분리된 파일이 몇개까지 만들것
            level : 'info',
            showLevel : true,
            json : false, //json포맷으로 출력할것 or 문자열로 한줄한줄 출력할것?
            timestamp:timeStampFormat
        }),
            new (winston.transports.Console)({
            name :  'debug-console',
            colorize : true,
            level :'debug',
            shoeLevel :true,
            json :false,
            timestamp:timeStampFormat
        })
        
    ]
});



/*
({
    //중괄호에 객체를 넣어줌
    //new 객체 () : 함수로 실행하겠다.
    transports : [
        new (winstonDaily)({
             name : 'info-file',
            filename : './log/server',
            datePattern : '_yyyy-MM-dd.log',
            colorize:false,
            maxsize : 50000000,//파일이 더 커지면 분리해라
            
            maxFiles:1000,
            level:'info',
            showLevel : true,
            json : false,
            timestamp:timeStampFormat
        }), 
        new (winston.transports.Console)({
            name : 'debuf-console',
            colorize : true,
            level : 'debug',
            showLevel : true,
            json : false,
            timestamp : timeStampFormat
             
        })
    
    ]
});
*/
logger.debug('디버깅 메시지입니다');
logger.error('에러 메시지 입니다.');