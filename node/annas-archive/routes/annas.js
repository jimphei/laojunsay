var express = require("express");
const service = require("../service/EbooksService");
const processDownload = require("../util/download");
var router = express.Router();
const ArchiveOfAnna = require("../src/archive-of-anna");
router.post("/search", async (req, res, next) => {
  const data = req.body;
  const result = await ArchiveOfAnna.search(data.keyword);
  res.json(result);
  res.end();
});
router.get("/detail", async (req, res, next) => {
  const { md5: md5 } = req.query;
  const detail = await ArchiveOfAnna.fetch_by_md5(md5);
  res.json(detail);
  res.end();
});

router.post("/download", async (req, res, next) => {
  const body = req.body;
  service.download(body);
  res.end();
});

router.get("/ws", function (req, res, next) {
  //只有当前页面可以获得
  res.io.on("connection", function (socket) {
    socket.emit("news", {
      hello: "world",
    });
    socket.on("my other event", function (data) {
      console.log(data);
    });
  });
});

router.get("/test", async (req, res, next) => {
  const url = `https://momot.rs/d1/y/1690991761/30/e/zlib2/pilimi-zlib2-21080000-21179999/21134912~/M0sZx6IzsyqRO6yLqfMXGA/批判性思维与说服性写作-独立思考者的精进
技巧-通过25种思维练习-30项写作训练-路易丝-卡茨--annas-archive.epub`;
  const dirName = "/mnt/f/jimphei/node/annas-archive/service/storage";
  const fileName = "ceshiceshi.epub";
  processDownload(
    url,
    dirName,
    fileName,
    (percentage) => {
      res.send(percentage);
    },
    (fileName) => {
      res.send(fileName);
    }
  );
});
module.exports = router;
