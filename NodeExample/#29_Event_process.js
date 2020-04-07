process.on('exit', function(){
    console.log('3. exit event!');
});
//이벤트를 받기위함, 'exit이라는 이벤트를 받고, 이 이벤트를 function()에서 처리하겠다.

setTimeout(function (){
    console.log('2. 2초후 exit 실행되었음');
    
    process.exit();
}, 2000);
//일정시간 후에 함수 실행

console.log('1. 2초 후 실행될 것.')