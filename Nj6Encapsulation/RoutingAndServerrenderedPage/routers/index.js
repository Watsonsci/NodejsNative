//路由处理入口文件

const { log } = require('console')
const fs = require('fs')

//路由处理函数
function router(path,req,res,data){
   res.writeHead(200,{"Content-type":"text/html;charset=utf-8"})
   if(path == "/"){
    //res.write("<h1></h1>")
    fs.createReadStream('./views/root.html','utf-8').pipe(res)
   }else if(path == '/home'){
   // res.write("家文件")
   }
  // res.end()
}

//暴露路由函数
exports.routerFun = router