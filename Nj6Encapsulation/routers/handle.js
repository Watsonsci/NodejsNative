//分路由处理，每一个函数都是一个路由
const fs = require('fs')
const qs = require('querystring')

let dataObj = {}

//处理root对应的路由
function root(res,data){
    // res.write("xxx")
    // res.end()
    fs.createReadStream('./views/root.html','utf-8').pipe(res)
}

//处理home对应的路由
function home(res,data){
    //data = "username=tom&password=456"//模拟传入home的data是一个 querystring字符串
    if(data) dataObj = qs.parse(data)
    rander('./views/home.html',dataObj,res)
    //需要寻找当前页面中的指定占位符
   // fs.createReadStream('./views/home.html','utf-8').pipe(res)
}

function about(res,data){
    fs.createReadStream('./views/about.html','utf-8').pipe(res)
}

//no_found-404
function nofound(res,data){
    fs.createReadStream('./views/404.html','utf-8').pipe(res)
}

//home目录下的二级list目录
function home_list(res,data){
    fs.createReadStream('./views/home/list.html','utf-8').pipe(res)
}

//专门用来完成页面动态渲染的函数
function rander(filePath,dataObj,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    //读取当前filePath指定的文件内容
    fs.readFile(filePath,function(err,data){
        if(err){
            return err
        }
        //在异步函数中调用同步函数对象
        let str = data.toString() //str就是home.html的完整html网页
        for(const key in dataObj){//需要读取dataObj对象中的key
            str =str.replaceAll(`{{${key}}}`,dataObj[key])
        }
        //获取str字符串中还存在{{变量名}}的占位符，把所有占位符换成空
        //因为变量的不确定性，所以导致需要使用正则表达式来完成对应的判断
        str = str.replaceAll(/{{\w*}}/g,"")
        //输出
        res.write(str)
        res.end()
    })

   
}


//暴露每一个函数
module.exports = {
    root,home,about,nofound,home_list
}