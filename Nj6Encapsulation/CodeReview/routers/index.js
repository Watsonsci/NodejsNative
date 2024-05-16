//Route processing entry file
const fs = require('fs')
const routeHandle = require('./handle')

//routing corresponding object
const routeList ={
     "/": routeHandle.root,
     "/home":routeHandle.home,
     "/about":routeHandle.about,
     "/home/list":routeHandle.home_list,
     "/nofound":routeHandle.nofound
}

//routing processing function
function router(path,req,res,data){
    let fun = routeList[path];
    //If fun does not configure routing, directly specify the routing as noFound routing
    if(!fun) fun = routeList["/nofound"]
    fun(res,data)
}

//Expose routing function
exports.routerFun = router