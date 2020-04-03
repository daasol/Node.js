console.log('argv 속성의 parameter num : ' + process.argv.length);
console.dir(process.argv);


process.argv.forEach(function(item, index){
    console.log(index + ' : '+item);
});