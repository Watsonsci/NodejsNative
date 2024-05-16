const fs = require('fs')
//静态文件扩展名判断处理
function staticFile(extStr,req,res){
    if(extStr == "css"){
        //正常输出css的文件流  res
        //content-type text/plain  text/html  text/css  text/js  image/jpg  image/png  image/gif
        res.writeHead(200,{"Content-type":"text/css"})
        //获取当前根文件的路径（7.1封装目录），加上url的路径和文件
        fs.createReadStream(global.rootPath + req.url,'utf8').pipe(res)
        return true
    }else if(extStr == 'js'){
        res.writeHead(200,{"Content-Type":"text/js"})
        fs.createReadStream(global.rootPath + req.url,'utf8').pipe(res)
        return true
    }else if(['gif','jpg','jpeg','png'].includes(extStr)){
        res.writeHead(200,{"Content-type":"text/"+extStr})
        fs.createReadStream(global.rootPath + req.url).pipe(res)
        return true
    }
}


module.exports = staticFile