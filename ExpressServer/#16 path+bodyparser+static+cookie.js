router.route('/process/setUserCookie').get(function(req, res){
    // .../process/setUserCookie 경로에 접속했을 때 라우터가 처리할 것 callback
    console.log('setUserCookie 라우터 작동 ...');
    
    //쿠키 생성
    res.cookie('daisy', { id:'daisy', name:'데이지', authorized:true });
    
    //쿠키 생성하고 다음 페이지로 이동
    res.redirect('/process/showCookie');
});


//2. /process/showCookie 라우터 등록
router.route('/process/showCookie').get(function(req, res){
    // .../process/showCookies 경로에 접속했을 때 라우터가 처리할 것 callback
    console.log('/process/showCookie 라우팅함수 호출됨 ...');
    console.dir(req.cookies);
    res.send(req.cookies);
});
