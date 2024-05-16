//加载引入包
const http = require('http')
const url = require('url')
//引入路由文件
const router = require('./routers/index')

//创建服务器函数，作为导出暴露使用
function startServer(){
    //创建原生服务器运行环境,并设定端口
    http.createServer(onRequest).listen(global.port,()=>console.log("server running"))
    //完成服务器的数据处理和跳转 req接受请求，res响应请求
    function onRequest(req,res) {
        //获取浏览器请求的路径
        //拆分路由时我们可以将所有router代码都放置到routers目录下处理
        const urlPath = url.parse(req.url).pathname //  /public/css/root.css
        let postData = ""
        req.on('data',function(chunk){
            //接收到所有浏览器发送过来的post数据
            postData += chunk
        }).on('end',function(){
            //end事件是所有request在完成数据提交请求后都会触发的事件，get/post都会来到这里
            //req.method来判断是否是post 还是get
            //判断是否为get
            if(req.method == "GET"){
                //对get进行取值
                postData = url.parse(req.url).query
            }
        })
        //访问路由
        //urlpath，postData，req，res
        router.routerFun(urlPath,req,res,postData)
    }
}
exports.startServer = startServer