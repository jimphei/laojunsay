const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
const progressStream = require('progress-stream');

const url = `https://momot.rs/d1/y/1690991761/30/e/zlib2/pilimi-zlib2-21080000-21179999/21134912~/M0sZx6IzsyqRO6yLqfMXGA/批判性思维与说服性写作-独立思考者的精进
技巧-通过25种思维练习-30项写作训练-路易丝-卡茨--annas-archive.epub`;
const dirName = "/mnt/f/jimphei/node/annas-archive/service/storage";
const fileName = "ceshiceshi.epub";

const processDownload = (url,dirName,fileName,onDownload,onFinish)=>{
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
        console.log("文件夹创建成功");
      } else {
        console.log("文件夹已存在");
      }
      
      
      let stream = fs.createWriteStream(path.join(dirName, fileName)).on('error', function (e) {
          console.error('error==>', e)
      }).on('ready', function () {
          console.log("开始下载:");
      }).on('finish', function () {
          console.log('文件下载完成:');
      });
      
      
      //请求文件
      fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/octet-stream' },
          // timeout: 100,    
      }).then(res => {
          //获取请求头中的文件大小数据
          let fsize = res.headers.get("content-length");
          //创建进度
          let str = progressStream({
              length: fsize,
              time: 100 /* ms */
          });
          // 下载进度 
          str.on('progress', function (progressData) {
              //不换行输出
              let percentage = Math.round(progressData.percentage) + '%';
              console.log(percentage);
              // process.stdout.write('\033[2J'+);
              // console.log(progress);
              /*
              {
                  percentage: 9.05,
                  transferred: 949624,
                  length: 10485760,
                  remaining: 9536136,
                  eta: 42,
                  runtime: 3,
                  delta: 295396,
                  speed: 949624
              }
              */
          });
          res.body.pipe(str).pipe(stream);
      }).catch(e => {
          //自定义异常处理
          console.log(e);
      });
}

module.exports = processDownload



