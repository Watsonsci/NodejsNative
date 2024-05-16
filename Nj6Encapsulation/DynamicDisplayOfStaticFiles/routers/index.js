//路由处理入口文件
const fs = require('fs')
const routeHandle = require('./handle')
const staticFile = require('./staticFile')

//路由对应对象
const routeList ={
    "/": routeHandle.root,
    "/home":routeHandle.home,
    "/about":routeHandle.about,
    "/home/list":routeHandle.home_list,
    "/nofound":routeHandle.nofound
}

//路由处理函数
function router(path,req,res,data){
    //在路由运行前需要完成路径判断，如果路径是图片，样式，脚本等就不走路由
    /*
        如果路径后缀是css，js，jpg，png，gif
    */
   //去path中的扩展名
   const extStr = path.substring(path.lastIndexOf(".")+1)
   //判断后缀名是否为指定的字符串,判断是否为静态文件
   if(staticFile(extStr,req,res)){
    //是静态文件，终止当前向下执行代码
        return false
   } 

   let fun = routeList[path];
   //如果fun没有配置路由的话，就直接指定路由为noFound路由
   if(!fun)  fun = routeList["/nofound"]
   fun(res,data)
}

//暴露路由函数
exports.routerFun = router