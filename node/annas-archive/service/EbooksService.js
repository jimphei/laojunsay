const pinyin = require("node-pinyin");
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

const Ebooks = require("../model/Ebooks");
const processDownload = require("../util/download");
const getRealLink = require('../util/reallink')

class EbooksService {
  async download(body, cbdownload, cbFinish) {
    const name = body.keyword??body.name;
    const nameStr = pinyin(name, { style: "normal" }).join("");
    const links = body.links;
    let url = links[0].link;
    url = await getRealLink(url)
    let subfix;
    for (const houzui of ["epub", "mobi", "azw3", "pdf"]) {
      if (body.format.includes(houzui)) {
        subfix = houzui;
        break;
      }
    }

    if(subfix == null){
        const dotIndex = url.lastIndexOf(".");
        subfix = url.substring(dotIndex+1, url.length);
        if(subfix.length>5){
            subfix = 'epub'
        }
    }
    
    const fileName = nameStr + '.' + subfix;
    
    const dirPath = path.join(__dirname, "../public/storage");
    processDownload(
      url,
      dirPath,
      fileName,
      (percentage) => {
        cbdownload(percentage);
      },
      (fileName) => {
        cbFinish(fileName);
      }
    );
  }
  saveBook(body) {
    const result = Ebooks.addBook(body);
    console.log(result);
  }
  downloadFile(url, dest, fileName) {
    return new Promise((resolve, reject) => {
      console.log(url, dest, fileName);
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
        console.log("文件夹创建成功");
      } else {
        console.log("文件夹已存在");
      }
      let stream = fs.createWriteStream(path.join(dest, fileName));
      const request = https.get(url, function (response) {
        response.pipe(stream);
        // after download completed close filestream
        stream.on("finish", () => {
          stream.close();
          resolve("ok");
          console.log("Download Completed");
        });
      });
    });
  }
}

module.exports = new EbooksService();
