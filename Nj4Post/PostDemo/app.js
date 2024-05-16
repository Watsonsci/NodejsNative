const http = require('http')
//Load and introduce querystring
const qs = require('querystring')

//onRequest is the function name. The function name can be the handle (memory address) of the function, and the function body can be found directly.
http.createServer(onRequest).listen(3002)
//When the server starts, if there is request data, it will be placed in the onRequest function for processing.
function onRequest(req,res){
     res.setHeader('Access-Control-Allow-Origin', "*") //* means that all websites can access the current server
     //console.log(req.url);//Unable to accept post data, obtain in get mode
     //Every time a request is made to send data, the data event will be entered.
     let postData = ""
     req.on("data",function(data){
         //After entering data, you can complete the data acquisition of this function. Data is our data value.
         postData += data
     })

     //Automatically triggered when the requested page is completed
     req.on("end",function(){
          //qs.parse is a JSON object that can complete the conversion of buffer data
          let data = qs.parse(postData)
          console.log(data.username,data.password);
         
          res.write(JSON.stringify({"username":data.username}))
          res.end()
     })

    
}