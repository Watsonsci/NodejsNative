const http = require('http')
const qs = require('querystring')
const url = require('url')
const dataList = require('./data/data')

http.createServer(function (req, res) {
     //accept data
     const strurl = url.parse(req.url).query //Get a string without / and ? from the original string
     const query_json = qs.parse(strurl)//Able to convert strings into json objects

     //Get the data that needs to be compared and complete the comparison
     let result = dataList.filter(item => {
         if (item.name == query_json.username && item.pass == query_json.password) {
             return item
         }
     })

     //Set the server to allow cross-domain access to websites
     res.setHeader('Access-Control-Allow-Origin', "*") //* means that all websites can access the current server

     //The result must be displayed after getting it
     res.writeHead(200, { 'Content-type': "text/plain;charset=utf-8" })
     if (result.length != 0) {
         res.write(
             JSON.stringify(
                 {
                     code: 200,//return status code
                     msg: "Login successful", //return description text
                     data: {//The server returns data
                         username: query_json.username
                     }
                 })
         )
     } else {
         res.write(
             JSON.stringify(
                 {
                     code: 100,
                     msg: 'Username and password are incorrect',
                     data:{}
                 }
             )
         )
     }
     res.end()

}).listen(3000, () => console.log('server running'))