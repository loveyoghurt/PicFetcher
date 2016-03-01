var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = require('../app.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/fetchPics', function(req, res, next) {
  // res.send();
  // var webUrl = 'http://news.mtime.com/2016/02/25/1552759.html';
  var webUrl = req.body.url;
   //发送请求
    request(webUrl, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            var dir = 'pics/';
            // console.log(body.match(/<img[\s]+src[\s]*=[\s]*((['"](?<src>[^'"]*)[\'"])|(?<src>[^\s]*))/g));
            $('img').each(function() {
                console.log($(this).attr('src'));  
                if($(this).attr('src') !== undefined && $(this).attr('src').lastIndexOf('http') > -1){
                    var src = $(this).attr('src');
                    // if(getImgSize($(this).attr('src')) > 300){
                    //       var src = $(this).attr('src');
                    // // console.log($(this).attr('width'));    
                    // }
                    
                    console.log('正在下载' + src);
                    var filename;
                    if(src.lastIndexOf('?') > -1){
                        filename = src.substring(src.lastIndexOf('/')+1, src.lastIndexOf('?'));
                    }
                    else{
                        filename = src.substring(src.lastIndexOf('/')+1);
                    }
                   
                    download(src, dir, filename);
                    console.log('下载完成');
                }
            });
        }
        else{
            console.log(error);
        }
    });
     
    //下载方法
    var download = function(url, dir, filename){
        
        request.head(url, function(err, res, body){console.log(dir + '----'+filename);
          
            request(url).pipe(fs.createWriteStream(dir + "/" + filename));
        });
    };
});

module.exports = router;
