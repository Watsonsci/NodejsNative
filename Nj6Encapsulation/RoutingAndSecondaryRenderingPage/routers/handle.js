//Separate routing processing, each function is a route
const fs = require('fs')
//Process the route corresponding to root
function root(res, data) {
    // res.write("root function")
    // res.end()
    fs.createReadStream('./views/root.html', 'utf-8').pipe(res)
}

//Process the route corresponding to home
function home(res, data) {
    // res.write("home function")
    // res.end()
    fs.createReadStream('./views/home.html', 'utf-8').pipe(res)
}

function about(res, data) {
    // res.write("about function")
    // res.end()
    fs.createReadStream('./views/about.html', 'utf-8').pipe(res)
}

//no_found-404
function no_found(res, data) {
    // res.write('404')
    // res.end()
    fs.createReadStream('./views/404.html', 'utf-8').pipe(res)
}

//Secondary list directory under home directory
function home_list(res, data) {
    fs.createReadStream('./views/home/list.html', 'utf-8').pipe(res)
}


//Export each function
module.exports = {
    root, home, about, no_found, home_list
}