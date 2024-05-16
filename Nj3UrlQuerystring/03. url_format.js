const url = require('url')

let pathJson = url.format({
    protocol:'http',
    host:'localhost:3001',
    search:'?name=tom&age=25',
    pathname:'/studentreg',
})

console.log(pathJson); // http://localhost:3001/studentreg?name=tom&age=25