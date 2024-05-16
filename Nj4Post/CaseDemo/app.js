const http = require('http')
const qs = require('querystring')
const { jsonToStr } = require('./util/common')
//Introduce data
const dataJson = require("./data/data")

http.createServer(onRequest).listen(3001)

function onRequest(req, res) {
     //Cross domain allowed
     res.setHeader('Access-Control-Allow-Origin', "*") //* means that all websites can access the current server

     //accept data
     let postData = ""
     req.on('data', (data) => {
         postData += data
     })

     //Data processing
     req.on('end', () => {
         postData = qs.parse(postData)
         let searchData = dataJson.filter(item=>{
             if(item.shopType == postData.keywords){
                 return item
             }
         })
        
         res.write(jsonToStr({
             code: 200,
             msg: "Operation successful",
             data: {searchData}
         }))
         res.end()
     })

   
}