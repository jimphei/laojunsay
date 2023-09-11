var scoketio = {}; //要暴露出去的对象
const socketIO = require("socket.io");
const ArchiveOfAnna = require("./src/archive-of-anna");
const service = require("./service/EbooksService");
// var cors=require('cors')
scoketio.setSocketIo = function (httpServer) {
  const io = socketIO(httpServer);
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    socket.on("downloadBook", async (data) => {
      const detail = await ArchiveOfAnna.fetch_by_md5(data.md5);
      const keyword = data.keyword;
      detail["keyword"] = keyword;
      service.download(
        detail,
        (percentage) => {
          io.emit("processing", percentage);
        },
        (fileName) => {
          detail["storage"] = '/storage/'+ fileName;
          service.saveBook(detail);
        }
      );
    });
  });
};

module.exports = scoketio;
