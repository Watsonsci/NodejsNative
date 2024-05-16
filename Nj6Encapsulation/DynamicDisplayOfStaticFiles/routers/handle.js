//分路由处理，每一个函数都是一个路由
const fs = require('fs')
//处理root对应的路由
function root(res,data){
    // res.write("xxx")
    // res.end()
    fs.createReadStream('./views/root.html','utf-8').pipe(res)
}

//处理home对应的路由
function home(res,data){
    fs.createReadStream('./views/home.html','utf-8').pipe(res)
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


//暴露每一个函数
module.exports = {
    root,home,about,nofound,home_list
}