process.on('pum', function(count){
    console.log('2. pum 이벤트 발생, pum이라는 이벤트가 발생하면 이 익명함수를 실행 ' + count);
});


setTimeout(function(){
    console.log('1. 2초 후 pum이벤트 실행');
    process.emit('pum', '2');
    
}, 2000);