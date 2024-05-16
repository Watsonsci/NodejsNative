//Route processing entry file
const fs = require('fs')
const routeHandle = require('./handle')

//routing corresponding object
const routeList ={
     "/": routeHandle.root,
     "/home":routeHandle.home,
     "/about":routeHandle.about,
     "/home/list":routeHandle.home_list,
     "noFound":routeHandle.no_found
}

//routing processing function
function router(path,req,res,data){
// res.writeHead(200,{"Content-type":"text/html;charset=utf-8"})
// if(path == "/"){
// fs.createReadStream('./views/root.html','utf-8').pipe(res)
// }else if(path == '/home'){
// fs.createReadStream('./views/home.html','utf-8').pipe(res)
// }else{
// fs.createReadStream('./views/404.html','utf-8').pipe(res)
// }

    let fun = routeList[path];
    //If fun does not configure routing, directly specify the routing as noFound routing
    if(!fun) fun = routeList["noFound"]
    fun(res,data)
// if(fun){
// fun(res,data)
// }
    //You can prevent the 404 page from being created here
    //fs.createReadStream('./views/404.html','utf-8').pipe(res)
}

//Expose routing function
exports.routerFun = router