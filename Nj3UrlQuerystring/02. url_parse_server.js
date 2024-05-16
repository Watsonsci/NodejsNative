const http = require('http')
const url = require('url')

http.createServer(function(req,res){
    let path = "http://localhost:3000/search?name=tom"
    let newStr = url.parse(path)
    console.log(newStr);
    console.log(newStr.query);
}).listen(3001,()=>console.log('server running'))