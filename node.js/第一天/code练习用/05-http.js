//用Node来创建一个web服务器
//在Node中专门提供了一个核心模块 ;http
//http这个核心模块的职责就是帮你创建编写的服务器

//1 加载http模块
var http =require('http');

//2使用httpt中的createServer()方法创建一个web服务器
var server = http.createServer();

//3服务器的作用
// 提供服务
// 发请求
// 接受请求
// 处理请求
// 给反馈
// 注册request 请求事件
// 当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数：回调处理函数

server.on('request',function () {
  console.log("收到客户端的请求了")
});

//4绑定端口号 启动服务器
server.listen(3000,function () {
  console.log("服务器启动成功，可以可以通过 http://127.0.0.1:3000/ 来进行访问");
});
