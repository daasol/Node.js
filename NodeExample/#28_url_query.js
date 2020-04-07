var url = require('url');
//url 모듈 불러오기, 변수에 할당

var urlStr = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=starbucks&oquery=%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4&tqi=UowYUlp0JXVssKeykVCssssst%2BV-040281';

var curUrl = url.parse(urlStr);
console.dir(curUrl);

//검색어만 뽑아내기
var queryString = require('querystring');
var params = queryString.parse(curUrl.query);
//요청 파라미터가 분리된 문자열 : curUrl, 그 안에서 query (검색어)를 뽑아냄
console.log('검색어 : '+params.query);
