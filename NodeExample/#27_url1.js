var url = require('url');
//url 모듈 불러오기, 변수에 할당

var urlStr = 'https://www.google.com/search?newwindow=1&hl=ko&sxsrf=ALeKk03e0TfArXYwz46lRBv7EDNtKfjUJA%3A1586244591180&source=hp&ei=7yuMXry2CNnmwQPU8YDQDQ&q=google&oq=google&gs_lcp=CgZwc3ktYWIQAzIFCAAQgwEyBQgAEIMBMgUIABCDATIFCAAQgwEyAggAMgIIADICCAAyBQgAEIMBMgIIADICCABKGwgXEhcyODRnMTc0ZzE3MWcxNTlnMjA4ZzE2MkoPCBgSCzFnMWcxZzFnMWcxUL8eWJUjYJwkaABwAHgAgAGbAogB7giSAQUwLjQuMpgBAKABAaoBB2d3cy13aXqwAQA&sclient=psy-ab&ved=0ahUKEwj86YbL5dXoAhVZc3AKHdQ4ANoQ4dUDCAc&uact=5';

var curUrl = url.parse(urlStr);
console.dir(curUrl);

console.log('query - >' + curUrl.query);

var curStr = url.format(curUrl);
console.log('url -> '+curStr);