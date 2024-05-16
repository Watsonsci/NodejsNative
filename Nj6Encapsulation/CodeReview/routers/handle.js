//Separate routing processing, each function is a route
const fs = require('fs')
//Process the route corresponding to root
function root(res,data){
     // res.write("xxx")
     // res.end()
     fs.createReadStream('./views/root.html','utf-8').pipe(res)
}

//Process the route corresponding to home
function home(res,data){
     fs.createReadStream('./views/home.html','utf-8').pipe(res)
}

function about(res,data){
     fs.createReadStream('./views/about.html','utf-8').pipe(res)
}

//no_found-404a
function nofound(res,data){
     fs.createReadStream('./views/404.html','utf-8').pipe(res)
}

//Secondary list directory under home directory
function home_list(res,data){
     fs.createReadStream('./views/home/list.html','utf-8').pipe(res)
}


//Expose each function
module.exports = {
     root,home,about,nofound,home_list
}