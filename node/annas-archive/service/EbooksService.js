const pinyin = require("node-pinyin");
const fs = require("fs");
const path = require('path')
const http = require('http');
const https = require('https');

const Ebooks = require('../model/Ebooks')
class EbooksService{
    async download(body){
        const name = '测试测试'
        const nameStr = pinyin(name,{style:'normal'}).join('')
        const links = body.links
        const url = links[0].link
        const dotIndex = url.lastIndexOf('.')
        const subfix = url.substring(dotIndex,url.length)
        const fileName = nameStr + subfix
        const dirPath = path.join(__dirname, "storage");
        const ret = await this.downloadFile(url,dirPath,fileName)
        console.log(ret)
    }
    saveBook(body){
        const result = Ebooks.addBook(body)
        console.log(result)
    }
    downloadFile(url,dest,fileName){
        return new Promise((resolve,reject)=>{
            console.log(url,dest,fileName)
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
                console.log("文件夹创建成功");
              } else {
                console.log("文件夹已存在");
              }  
              let stream = fs.createWriteStream(path.join(dest, fileName));
              const request = https.get(url, function(response) {
                response.pipe(stream);
                // after download completed close filestream
                stream.on("finish", () => {
                    stream.close();
                    resolve('ok')
                    console.log("Download Completed");
                });
             }); 
          
        })        
    }
}

module.exports = new EbooksService()