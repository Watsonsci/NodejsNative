//server file

//Load the import package
const http = require('http')
const url = require('url')
//Introduce routing file
const router = require('./routers/index')

//Create a server function and use it as an export exposure
function startServer(){
     //Create a native server operating environment and set the port
     http.createServer(onRequest).listen(global.port,()=>console.log("server running"))
     //Complete the server's data processing and jump req accepts the request, res responds to the request
     function onRequest(req,res) {
         //Get the path requested by the browser
         //When splitting routing, we can place all router codes in the routers directory for processing
         const urlPath = url.parse(req.url).pathname // /home/center

         let postData = ""
         req.on('data',function(chunk){
             //Receive post data sent by all browsers
             postData += chunk
         }).on('end',function(){
             //The end event is an event that will be triggered by all requests after completing the data submission request. Get/post will all come here.
             //req.method to determine whether it is post or get
             //Determine whether it is get
             if(req.method == "GET"){
                 //Get the value of get
                 postData = url.parse(req.url).query
             }
         })
         //Access route
         //urlpath, postData, req, res
         router.routerFun(urlPath,req,res,postData)
     }
}
//exports == module.exports
exports.startServer = startServer