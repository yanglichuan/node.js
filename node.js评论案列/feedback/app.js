// app application 应用程序
// 把当前模块所有的依赖项都声明再文件模块最上面
// 为了让目录结构保持统一清晰，所以我们约定，把所有的 HTML 文件都放到 views（视图） 目录中
// 我们为了方便的统一处理这些静态资源，所以我们约定把所有的静态资源都存放在 public 目录中
// 哪些资源能被用户访问，哪些资源不能被用户访问，我现在可以通过代码来进行非常灵活的控制
// / index.html
// /public 整个 public 目录中的资源都允许被访问

var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')
var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]
http
    .createServer(function (req,res) { //简写方式，该函数会直接被注册为server的request请求事件处理函数

      //使用url.parse方法，将路径解析为一个方便操作的对象，第二个参数为true 表示直接将查询字符转为一个对象（通过query属性来访问
      var parseObj = url.parse(req.url,true)
      console.log(parseObj)
      var pathname = parseObj.pathname;
      //这里的pathname相当于url
      if(pathname ==="/"){
        fs.readFile('./views/index.html',function (err,data) {
          if(err){
            return res.end('404')
          }
          var htmlStr = template.render(data.toString(),{
            comments:comments
          })
          res.end(htmlStr )

        })
      }else if(pathname.indexOf('/public/')===0){
        // /public/css/main.css
        // /public/js/main.js
        // /public/lib/jquery.js
        // 统一处理：
        //    如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源
        //    所以我们就直接可以把请求路径当作文件路径来直接进行读取
        fs.readFile('.'+pathname,function (err,data) {
          if(err){
            return res.end('404')
          }
          res.end(data)
        })
      }else if(pathname==='/post'){
        //其他的都处理成404找不到
        fs.readFile('./views/post.html',function (err,data) {
          if(err){
            return res.end('404')
          }
          res.end(data)
        })
      }else if(pathname==='/pinglun'){
  //注意：这个时候无论/pinglun?xxx 之后是什么，我都不用担心了，因为我的pathname是不包含？之后那个路径
      // 我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串给解析成一个对象了
      // 所以接下来要做的就是：
      //    1. 获取表单提交的数据 parseObj.query
      //    2. 将当前时间日期添加到数据对象中，然后存储到数组中
      //    3. 让用户重定向跳转到首页 /
      //       当用户重新请求 / 的时候，我数组中的数据已经发生变化了，所以用户看到的页面也就变了
      var comment = parseObj.query
      comment.dataTime ='2017-11-2 17:11:22'
      comments.unshift(comment) //注意 只有数组才有这个方法
      // 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了

      // 如何通过服务器让客户端重定向？
      //    1. 状态码设置为 302 临时重定向
      //        statusCode
      //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
      //        setHeader
      // 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求
      // 所以你就能看到客户端自动跳转了
      res.statusCode = 302
      res.setHeader('Location','/')
      res.end()} else{
        //其他页面都找不到
        fs.readFile('./views/404.html',function (err,data) {
          if(err){
            return res.end("404")
          }
          res.end(data)
        })
      }

    })
   .listen(3000,function () {
     console.log('run')
   })
