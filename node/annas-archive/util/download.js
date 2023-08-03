const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const progressStream = require("progress-stream");

const processDownload = (url, dirName, fileName, onDownload, onFinish) => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  } 
  let stream = fs
    .createWriteStream(path.join(dirName, fileName))
    .on("error", function (e) {
      console.error("error==>", e);
    })
    .on("ready", function () {
      console.log("开始下载:");
    })
    .on("finish", function () {
        onFinish(fileName);
      console.log("文件下载完成:");
    });

  //请求文件
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/octet-stream" },
    // timeout: 100,
  })
    .then((res) => {
      //获取请求头中的文件大小数据
      let fsize = res.headers.get("content-length");
      //创建进度
      let str = progressStream({
        length: fsize,
        time: 100 /* ms */,
      });
      // 下载进度
      str.on("progress", function (progressData) {
        //不换行输出
        let percentage = Math.round(progressData.percentage) + "%";
        onDownload(progressData.percentage)
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
    })
    .catch((e) => {
      //自定义异常处理
      console.log(e);
    });
};

module.exports = processDownload;
