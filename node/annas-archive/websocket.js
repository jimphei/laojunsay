var scoketio={}  //要暴露出去的对象 
var scoket_io=require('socket.io')
// var cors=require('cors')
scoketio.setSocketIo=function(server)
{
    var io=scoket_io(server,{cors:true});   //server就是服务器监听的对象
    io.on('connection',function(socket)  //监听connect行为，传入一个socket对象
    {
        console.log('a user has join');
        socket.on('message',function(obj)   //监听message行为，也就是用户发信息的行为
        {
            io.emit('message',obj)  //io向所有用户的窗口广播该socket对象的信息
            console.log(obj.userid+'说：'+obj.content);//控制台输出谁说了什么
        })
    })
}

module.exports=scoketio;
