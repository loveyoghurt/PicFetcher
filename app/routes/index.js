var express = require('express');
var router = express.Router();
var app = require('../app.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/fetchPics', function(req, res, next) {
  // res.send();
  
  var webUrl = 'http://www.baidu.com';
  console.log(req.body.url);
   //发送请求
    request(webUrl, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('img').each(function() {
                console.log(($(this).attr('src')));  
                var src = $(this).attr('src');
                // if(getImgSize($(this).attr('src')) > 300){
                //       var src = $(this).attr('src');
                // // console.log($(this).attr('width'));    
                // }
                
                console.log('正在下载' + src);
                download(src, dir, Math.floor(Math.random()*100000) + src.substr(-4,4));
                console.log('下载完成');
            });
        }
        else{
            console.log(error);
        }
    });
     
    //下载方法
    var download = function(url, dir, filename){
        request.head(url, function(err, res, body){
            request(url).pipe(fs.createWriteStream(dir + "/" + filename));
        });
    };
});

module.exports = router;
